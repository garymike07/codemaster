import OpenAI from "openai";

/**
 * Free models — ordered to put known-working, low-latency models first.
 * Based on benchmark results (run `bun run benchmark:openrouter`).
 */
export const FREE_MODELS = [
  // Fastest responders (< 1.5s on primary key)
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "cohere/north-mini-code:free",
  "poolside/laguna-xs.2:free",
  "liquid/lfm-2.5-1.2b-thinking:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
  "nvidia/nemotron-3.5-content-safety:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "nvidia/nemotron-nano-9b-v2:free",
  // Moderate responders (1.5-5s)
  "nvidia/nemotron-3-super-120b-a12b:free",
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "poolside/laguna-m.1:free",
  // Slower but still work
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  // Often rate-limited
  "google/gemma-4-26b-a4b-it:free",
] as const;

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

// ── Model health cache ──────────────────────────────────────────
interface ModelHealth {
  healthy: boolean;
  latencyMs: number;
  lastTested: number;
  retryAfter: number;
}

const healthCache = new Map<string, ModelHealth>();
const CACHE_TTL_MS = 60_000;
const RATE_LIMIT_BACKOFF_MS = 10_000;

// ── Helpers ─────────────────────────────────────────────────────

function classifyError(error: unknown): "auth" | "rate_limit" | "unknown" {
  if (error instanceof OpenAI.APIError) {
    if (error.status === 401 || error.status === 403) return "auth";
    if (error.status === 429) return "rate_limit";
  }
  const msg = error instanceof Error ? error.message : String(error);
  if (/401|403|unauthorized|forbidden|invalid.*api.?key/i.test(msg)) return "auth";
  if (/429|rate.?limit|too many requests/i.test(msg)) return "rate_limit";
  return "unknown";
}

function getApiKeys(): string[] {
  const keys = [
    process.env.CONVEX_OPENROUTER_API_KEY,
    process.env.OPENROUTER_API_KEY,
  ].filter((k): k is string => !!k && k.length > 0);
  if (keys.length === 0) {
    throw new Error(
      "No OpenRouter API keys configured. Set CONVEX_OPENROUTER_API_KEY or OPENROUTER_API_KEY in your environment."
    );
  }
  return keys;
}

function createClient(apiKey: string): OpenAI {
  return new OpenAI({
    apiKey,
    baseURL: OPENROUTER_BASE_URL,
    timeout: 120000,
    maxRetries: 0,
    defaultHeaders: {
      "HTTP-Referer": "https://codemaster.dev",
      "X-Title": "CodeMaster",
    },
  });
}

let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    _client = createClient(getApiKeys()[0]);
  }
  return _client;
}

function cacheKey(apiKey: string, model: string): string {
  return `${apiKey}::${model}`;
}

function tryWithKey(
  apiKey: string,
  model: string,
  fn: (model: string, client: OpenAI) => Promise<unknown>,
): Promise<unknown> {
  const entry = healthCache.get(cacheKey(apiKey, model));
  if (entry && !entry.healthy && Date.now() < entry.retryAfter) {
    return Promise.reject(new Error(`Skipped (backoff until ${entry.retryAfter})`));
  }
  return fn(model, createClient(apiKey));
}

function markSuccess(apiKey: string, model: string, latencyMs: number) {
  healthCache.set(cacheKey(apiKey, model), {
    healthy: true,
    latencyMs,
    lastTested: Date.now(),
    retryAfter: 0,
  });
}

function markRateLimited(apiKey: string, model: string) {
  healthCache.set(cacheKey(apiKey, model), {
    healthy: false,
    latencyMs: 0,
    lastTested: Date.now(),
    retryAfter: Date.now() + RATE_LIMIT_BACKOFF_MS,
  });
}

function markAuthError(apiKey: string, model: string) {
  healthCache.set(cacheKey(apiKey, model), {
    healthy: false,
    latencyMs: 0,
    lastTested: Date.now(),
    retryAfter: Date.now() + 300_000,
  });
}

// ── Public API ──────────────────────────────────────────────────

export async function callWithFallback<T>(
  fn: (model: string, client: OpenAI) => Promise<T>,
): Promise<T> {
  const keys = getApiKeys();
  const errors: string[] = [];

  // Collect live keys
  const liveKeys: string[] = [];
  for (const apiKey of keys) {
    const h = healthCache.get(cacheKey(apiKey, FREE_MODELS[0]));
    if (!h || h.healthy || Date.now() >= h.retryAfter) {
      liveKeys.push(apiKey);
    }
  }

  if (liveKeys.length === 0) {
    throw new Error(
      "All API keys are marked as invalid. Check CONVEX_OPENROUTER_API_KEY and OPENROUTER_API_KEY."
    );
  }

  // ── Phase 1: parallel probe on first call (empty cache) ──
  // If we have no known-good models, fire all combos at once
  // and return the first success.
  const hasKnownGood = [...healthCache.values()].some((h) => h.healthy);
  if (!hasKnownGood) {
    const probes: Promise<{ apiKey: string; model: string; result: T; latency: number }>[] = [];
    for (const apiKey of liveKeys) {
      for (const model of FREE_MODELS) {
        const start = Date.now();
        probes.push(
          tryWithKey(apiKey, model, fn as any).then((result) => ({
            apiKey,
            model,
            result: result as T,
            latency: Date.now() - start,
          })).catch((err) => {
            throw { apiKey, model, error: err };
          })
        );
      }
    }

    const results = await Promise.allSettled(probes);
    for (const r of results) {
      if (r.status === "fulfilled") {
        const { apiKey, model, result, latency } = r.value;
        markSuccess(apiKey, model, latency);
        return result;
      }
    }

    // All failed — record failures for diagnostics
    for (const r of results) {
      if (r.status === "rejected") {
        const { apiKey, model, error } = r.reason as { apiKey: string; model: string; error: unknown };
        const category = classifyError(error);
        const msg = error instanceof Error ? error.message : String(error);
        errors.push(`[key=...${apiKey.slice(-4)} model=${model}] ${category}: ${msg}`);
        if (category === "auth") markAuthError(apiKey, model);
        else if (category === "rate_limit") markRateLimited(apiKey, model);
      }
    }

    throw new Error(
      `All models exhausted on all keys (parallel probe).\n${errors.join("\n")}`
    );
  }

  // ── Phase 2: cached models (fast path) ──
  // Try known-good models in order of lowest latency first.
  const candidates: { apiKey: string; model: string; latencyMs: number }[] = [];
  for (const apiKey of liveKeys) {
    for (const model of FREE_MODELS) {
      const entry = healthCache.get(cacheKey(apiKey, model));
      if (entry?.healthy) {
        candidates.push({ apiKey, model, latencyMs: entry.latencyMs });
      }
    }
  }
  candidates.sort((a, b) => a.latencyMs - b.latencyMs);

  for (const { apiKey, model } of candidates) {
    const keySuffix = apiKey.slice(-4);
    try {
      const start = Date.now();
      const client = createClient(apiKey);
      const result = await fn(model, client);
      markSuccess(apiKey, model, Date.now() - start);
      return result;
    } catch (error) {
      const category = classifyError(error);
      const msg = error instanceof Error ? error.message : String(error);
      errors.push(`[key=...${keySuffix} model=${model}] ${category}: ${msg}`);
      console.warn(`[aiRouter] ${errors[errors.length - 1]}`);
      if (category === "auth") markAuthError(apiKey, model);
      else if (category === "rate_limit") markRateLimited(apiKey, model);
    }
  }

  // ── Phase 3: sequential sweep of all remaining ──
  for (const apiKey of liveKeys) {
    for (const model of FREE_MODELS) {
      const entry = healthCache.get(cacheKey(apiKey, model));
      if (entry?.healthy) continue; // already tried above
      if (entry && !entry.healthy && Date.now() < entry.retryAfter) continue; // in backoff

      const keySuffix = apiKey.slice(-4);
      try {
        const start = Date.now();
        const client = createClient(apiKey);
        const result = await fn(model, client);
        markSuccess(apiKey, model, Date.now() - start);
        return result;
      } catch (error) {
        const category = classifyError(error);
        const msg = error instanceof Error ? error.message : String(error);
        errors.push(`[key=...${keySuffix} model=${model}] ${category}: ${msg}`);
        console.warn(`[aiRouter] ${errors[errors.length - 1]}`);
        if (category === "auth") markAuthError(apiKey, model);
        else if (category === "rate_limit") markRateLimited(apiKey, model);
      }
    }
  }

  throw new Error(
    `All models exhausted on all keys.\n${errors.join("\n")}`
  );
}

export { getClient, OPENROUTER_BASE_URL };
