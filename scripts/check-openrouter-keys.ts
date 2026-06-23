#!/usr/bin/env bun
/**
 * OpenRouter API Key Health Check
 *
 * Tests all configured OpenRouter keys and reports which ones work,
 * what models they can access, and any rate-limit information.
 *
 * Usage:
 *   bun run scripts/check-openrouter-keys.ts
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Helpers ─────────────────────────────────────────────────────

function loadEnv() {
  const envPath = resolve(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    console.error("❌ .env.local not found at", envPath);
    console.error("   Copy .env.example to .env.local and configure it.");
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
  if (key.length < 12) return key.slice(0, 4) + "****";
  return key.slice(0, 8) + "****" + key.slice(-4);
}

function statusIcon(success: boolean): string {
  return success ? "✓" : "✗";
}

// ── Test logic ──────────────────────────────────────────────────

type KeyResult = {
  keyName: string;
  keyPrefix: string;
  healthy: boolean;
  models: { model: string; status: number; latencyMs: number }[];
  errors: { model: string; message: string }[];
  rateLimited: boolean;
};

async function testKey(
  keyName: string,
  apiKey: string,
  models: string[],
): Promise<KeyResult> {
  const result: KeyResult = {
    keyName,
    keyPrefix: maskKey(apiKey),
    healthy: false,
    models: [],
    errors: [],
    rateLimited: false,
  };

  for (const model of models) {
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
          messages: [{ role: "user", content: "Say hello in one word." }],
          max_tokens: 10,
        }),
        signal: AbortSignal.timeout(30_000),
      });

      const latency = Date.now() - start;

      if (resp.status === 429) {
        const reset = resp.headers.get("X-RateLimit-Reset") || "?";
        result.models.push({ model, status: 429, latencyMs: latency });
        result.rateLimited = true;
        result.errors.push({
          model,
          message: `Rate limited. Resets at: ${reset}`,
        });
        // Rate-limited — stop testing more models on this key
        break;
      }

      if (resp.ok) {
        result.models.push({ model, status: resp.status, latencyMs: latency });
        result.healthy = true;
      } else {
        const body = await resp.text().catch(() => "");
        result.models.push({ model, status: resp.status, latencyMs: latency });
        result.errors.push({ model, message: `${resp.status}: ${body}` });

        // Auth errors — skip remaining models
        if (resp.status === 401 || resp.status === 403) break;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push({ model, message: msg });
    }
  }

  return result;
}

// ── Main ────────────────────────────────────────────────────────

async function main() {
  console.log("🔑  OpenRouter API Key Health Check");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  loadEnv();

  const keyConfigs: { name: string; envVar: string }[] = [
    { name: "CONVEX_OPENROUTER_API_KEY (primary)", envVar: "CONVEX_OPENROUTER_API_KEY" },
    { name: "OPENROUTER_API_KEY (fallback)", envVar: "OPENROUTER_API_KEY" },
  ];

  const available = keyConfigs.filter((c) => process.env[c.envVar]);
  if (available.length === 0) {
    console.error("❌ No OpenRouter API keys found in .env.local");
    console.error("   Add CONVEX_OPENROUTER_API_KEY and/or OPENROUTER_API_KEY");
    process.exit(1);
  }

  const models = [
    "qwen/qwen3-coder:free",
    "google/gemma-4-31b-it:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "openai/gpt-oss-120b:free",
  ];

  const results: KeyResult[] = [];

  for (const cfg of available) {
    console.log(`Testing ${cfg.name} ...`);
    const result = await testKey(
      cfg.name,
      process.env[cfg.envVar]!,
      models,
    );
    results.push(result);
    printResult(result);
    console.log("");
  }

  // ── Summary ───────────────────────────────────────────────────
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  const healthy = results.filter((r) => r.healthy).length;
  console.log(`\n📊 Summary: ${healthy}/${results.length} keys healthy`);

  const anyRateLimited = results.some((r) => r.rateLimited);
  if (anyRateLimited) {
    console.log("⚠️  Some keys are rate-limited. Wait before retrying.");
  }

  if (healthy === results.length) {
    console.log("✅ All keys are working correctly.");
  } else if (healthy > 0) {
    console.log("⚡ At least one key works — fallback will handle the rest.");
  } else {
    console.log("❌ No keys work. Check your API keys at https://openrouter.ai/keys");
    process.exit(1);
  }
}

function printResult(result: KeyResult) {
  console.log(`   Key:      ${result.keyPrefix}`);
  console.log(`   Healthy:  ${result.healthy ? "✅ Yes" : "❌ No"}`);

  if (result.models.length > 0) {
    console.log("   Models:");
    for (const m of result.models) {
      const icon = statusIcon(m.status >= 200 && m.status < 300);
      const latency = m.latencyMs < 1000 ? `${m.latencyMs}ms` : `${(m.latencyMs / 1000).toFixed(1)}s`;
      console.log(`     ${icon} ${m.model.padEnd(35)} ${m.status}  ${latency}`);
    }
  }

  if (result.errors.length > 0) {
    console.log("   Errors:");
    for (const e of result.errors.slice(0, 3)) {
      console.log(`     ${e.message.slice(0, 120)}`);
    }
    if (result.errors.length > 3) {
      console.log(`     ... and ${result.errors.length - 3} more`);
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
