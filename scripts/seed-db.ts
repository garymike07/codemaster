import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

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

async function seed(force = false) {
  console.log("🌱 CodeMaster — Database Seeder");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  loadEnv();

  const convexUrl = process.env.VITE_CONVEX_URL || "http://127.0.0.1:3212";
  const deployment = process.env.CONVEX_DEPLOYMENT || "local";

  console.log(`📡 Convex URL: ${convexUrl}`);
  console.log(`📦 Deployment: ${deployment}\n`);

  const mutation = force ? "seed:seedPopulateAll" : "ensureSeeded:run";

  try {
    console.log("⏳ Checking/Seeding database...");
    const result = execSync(
      `bunx convex run ${mutation} --args '{}'`,
      {
        cwd: ROOT,
        stdio: "pipe",
        encoding: "utf-8",
        timeout: 120_000,
      }
    );
    const out = result.trim();
    console.log(out);
    if (out.includes("already exists")) {
      console.log("\n✅ Database already seeded — nothing to do.");
    } else {
      console.log("\n🎉 Database seeded successfully!");
    }
  } catch (err) {
    if (err instanceof Error && "stdout" in err) {
      const e = err as Error & { stdout: string; stderr: string };
      if (e.stdout) console.log(e.stdout.trim());
      if (e.stderr) console.error("⚠️", e.stderr.trim());
    }
    console.log("\n⚠️  convex run failed. Trying HTTP fallback...\n");

    try {
      const response = await fetch(
        `${convexUrl}/api/mutation/${mutation}?format=json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        }
      );
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }
      const data = await response.json();
      if (data.seeded === false) {
        console.log("✅ Database already seeded — nothing to do.");
      } else {
        console.log("✅ Seed complete:", JSON.stringify(data, null, 2));
        console.log("\n🎉 Database seeded successfully!");
      }
    } catch (fallbackErr) {
      console.error("\n❌ All seeding methods failed.");
      console.error("   Make sure `bunx convex dev` is running.");
      console.error("   Then try: bun run seed\n");
      process.exit(1);
    }
  }
}

const force = process.argv.includes("--force");
seed(force);
