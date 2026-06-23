#!/usr/bin/env bun
/**
 * OpenRouter Model Benchmark
 *
 * Tests all free models against all configured keys to find which
 * models have available quota and the fastest response times.
 *
 * Results are cached in .openrouter-benchmark.json so the runtime
 * can prioritise working models.
 *
 * Usage:
 *   bun run benchmark:openrouter
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CACHE_PATH = resolve(ROOT, ".openrouter-benchmark.json");

// ── Helpers ─────────────────────────────────────────────────────

function loadEnv() {
  const envPath = resolve(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    console.error("❌ .env.local not found at", envPath);
    process.exit(1);
  }
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] = value;
  }
}

function maskKey(key: string): string {
  return key.length < 12 ? key.slice(0, 4) + "****" : key.slice(0, 8) + "****" + key.slice(-4);
}

const FREE_MODELS = [
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "nvidia/nemotron-3.5-content-safety:free",
  "cohere/north-mini-code:free",
  "google/gemma-4-26b-a4b-it:free",
  "poolside/laguna-m.1:free",
  "poolside/laguna-xs.2:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
  "liquid/lfm-2.5-1.2b-thinking:free",
];

const TEST_PROMPT = "Reply with exactly one word: hello";

// ── Benchmark ───────────────────────────────────────────────────

interface ModelResult {
  model: string;
  key: string;
  status: number;
  latencyMs: number;
  ok: boolean;
  error?: string;
}

async function testModel(
  apiKey: string,
  model: string,
  signal: AbortSignal,
): Promise<ModelResult> {
  const start = Date.now();
  try {
    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://codemaster.dev",
        "X-Title": "CodeMaster",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: TEST_PROMPT }],
        max_tokens: 5,
      }),
      signal,
    });

    const latencyMs = Date.now() - start;
    const ok = resp.ok;

    return {
      model,
      key: apiKey.slice(-4),
      status: resp.status,
      latencyMs,
      ok,
      error: ok ? undefined : resp.status === 429
        ? "Rate limited"
        : `HTTP ${resp.status}`,
    };
  } catch (err) {
    const latencyMs = Date.now() - start;
    const msg = err instanceof Error ? err.message : String(err);
    return {
      model,
      key: apiKey.slice(-4),
      status: 0,
      latencyMs,
      ok: false,
      error: msg.includes("abort") ? "Aborted" : msg,
    };
  }
}

// ── Output ──────────────────────────────────────────────────────

function formatTable(results: ModelResult[]): string {
  const lines: string[] = [];
  lines.push(" Model".padEnd(42) + " Key  Status  Latency  Result");
  lines.push("─".repeat(80));

  const grouped = new Map<string, ModelResult[]>();
  for (const r of results) {
    const arr = grouped.get(r.model) ?? [];
    arr.push(r);
    grouped.set(r.model, arr);
  }

  for (const model of FREE_MODELS) {
    const entries = grouped.get(model) ?? [];
    if (entries.length === 0) {
      lines.push(` ${model.padEnd(40)} — skipped —`);
      continue;
    }
    for (const e of entries) {
      const latency = e.latencyMs < 1000 ? `${e.latencyMs}ms` : `${(e.latencyMs / 1000).toFixed(1)}s`;
      const result = e.ok ? "✅" : "❌";
      lines.push(
        ` ${model.padEnd(40)} ${e.key.padEnd(5)} ${String(e.status).padEnd(6)} ${latency.padEnd(7)} ${result}`,
      );
      if (e.error) {
        lines.push(` ${"".padEnd(40)} ${"".padEnd(5)} ${"".padEnd(6)} ${"".padEnd(7)} ${e.error.slice(0, 60)}`);
      }
    }
  }

  return lines.join("\n");
}

// ── Main ────────────────────────────────────────────────────────

async function main() {
  console.log("🧪  OpenRouter Model Benchmark");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  loadEnv();

  const keyConfigs: { name: string; envVar: string }[] = [
    { name: "CONVEX_OPENROUTER_API_KEY (primary)", envVar: "CONVEX_OPENROUTER_API_KEY" },
    { name: "OPENROUTER_API_KEY (fallback)", envVar: "OPENROUTER_API_KEY" },
  ];

  const available = keyConfigs.filter((c) => process.env[c.envVar]);
  if (available.length === 0) {
    console.error("❌ No OpenRouter API keys found in .env.local");
    process.exit(1);
  }

  console.log(`Found ${available.length} API key(s):`);
  for (const cfg of available) {
    console.log(`  ${cfg.name}: ${maskKey(process.env[cfg.envVar]!)}`);
  }
  console.log(`\nTesting ${FREE_MODELS.length} models...`);
  console.log("");

  const allResults: ModelResult[] = [];
  const workingModels: { model: string; key: string; latencyMs: number }[] = [];

  for (const cfg of available) {
    const apiKey = process.env[cfg.envVar]!;
    console.log(`━━━ ${cfg.name} ━━━`);

    // Test models sequentially to avoid rate-limit penalties
    for (const model of FREE_MODELS) {
      const ac = new AbortController();
      const timeout = setTimeout(() => ac.abort(), 15_000);

      const result = await testModel(apiKey, model, ac.signal);
      clearTimeout(timeout);
      allResults.push(result);

      const latency = result.latencyMs < 1000
        ? `${result.latencyMs}ms`
        : `${(result.latencyMs / 1000).toFixed(1)}s`;

      const icon = result.ok ? "✅" : "❌";
      console.log(`  ${icon} ${model.padEnd(42)} ${latency}`);

      if (result.ok) {
        workingModels.push({ model: result.model, key: result.key, latencyMs: result.latencyMs });
      } else if (result.error) {
        console.log(`     ${"".padEnd(42)} ${result.error.slice(0, 60)}`);
      }

      // Short delay between requests to avoid hammering
      await new Promise((r) => setTimeout(r, 200));
    }
    console.log("");
  }

  // ── Summary ───────────────────────────────────────────────────
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  workingModels.sort((a, b) => a.latencyMs - b.latencyMs);

  if (workingModels.length === 0) {
    console.log("❌ No working models found. All are rate-limited or unavailable.");
    console.log("   Run again later or add credits to your OpenRouter account.");
    process.exit(1);
  }

  console.log(`✅ ${workingModels.length}/${FREE_MODELS.length * available.length} model×key combos working`);
  console.log("");
  console.log("📊 Full results:");
  console.log(formatTable(allResults));

  console.log("");
  console.log("⚡ Fastest working models:");
  for (const w of workingModels.slice(0, 5)) {
    console.log(`   ${w.model.padEnd(42)} key=${w.key}  ${w.latencyMs}ms`);
  }

  // ── Write cache ───────────────────────────────────────────────
  const cache = {
    timestamp: Date.now(),
    ttl: 300_000, // 5 min
    workingModels: workingModels.map((w) => ({
      model: w.model,
      keySuffix: w.key,
      latencyMs: w.latencyMs,
    })),
  };
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  console.log(`\n📝 Wrote cache to ${CACHE_PATH}`);
  console.log("   The runtime will prioritise these models.");

  if (workingModels.length > 0) {
    console.log("\n🎯 Recommended model order (fastest first):");
    workingModels.slice(0, 3).forEach((w, i) => {
      console.log(`   ${i + 1}. ${w.model} (${w.latencyMs}ms)`);
    });
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
