#!/usr/bin/env node

/**
 * =============================================================================
 * FREELANCER STARTER — Client Project Initialization Script
 * =============================================================================
 *
 * Usage:
 *   Interactive:
 *     pnpm init:project
 *
 *   Non-interactive (CI / automation):
 *     pnpm init:project --name "Acme CRM" --slug "acme-crm" \
 *       --desc "Custom CRM for Acme Corp" \
 *       --url "https://acme.example.com" \
 *       --email "support@acme.example.com" \
 *       --remote "git@github.com:acme/crm.git" \
 *       --cleanup \
 *       --yes
 * =============================================================================
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import readline from "node:readline";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// -----------------------------------------------------------------------------
// CLI Argument Parsing
// -----------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    name: "",
    slug: "",
    desc: "",
    url: "",
    email: "",
    remote: "",
    cleanup: false,
    yes: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--name" && args[i + 1]) parsed.name = args[++i];
    else if (arg === "--slug" && args[i + 1]) parsed.slug = args[++i];
    else if (arg === "--desc" && args[i + 1]) parsed.desc = args[++i];
    else if (arg === "--url" && args[i + 1]) parsed.url = args[++i];
    else if (arg === "--email" && args[i + 1]) parsed.email = args[++i];
    else if (arg === "--remote" && args[i + 1]) parsed.remote = args[++i];
    else if (arg === "--cleanup") parsed.cleanup = true;
    else if (arg === "--yes" || arg === "-y") parsed.yes = true;
  }

  return parsed;
}

// -----------------------------------------------------------------------------
// Interactive Prompt Helper
// -----------------------------------------------------------------------------
async function askQuestion(rl, query, defaultValue) {
  return new Promise((resolve) => {
    const promptText = defaultValue ? `${query} (${defaultValue}): ` : `${query}: `;
    rl.question(promptText, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

// -----------------------------------------------------------------------------
// Main Initialization Flow
// -----------------------------------------------------------------------------
async function main() {
  console.log("\n🚀 Welcome to Freelancer Starter Project Rebrander\n");

  const cliArgs = parseArgs();
  let config = { ...cliArgs };

  // If missing args and not explicitly forced non-interactive, prompt user
  if (!config.yes && (!config.name || !config.url || !config.email)) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      config.name = await askQuestion(rl, "Client / Project Name", config.name || "Acme App");
      const defaultSlug = config.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      config.slug = await askQuestion(rl, "Project Slug (kebab-case)", config.slug || defaultSlug);
      config.desc = await askQuestion(
        rl,
        "Short Description",
        config.desc || `${config.name} web application.`,
      );
      config.url = await askQuestion(rl, "Production URL", config.url || "https://example.com");
      config.email = await askQuestion(rl, "Support Email", config.email || "support@example.com");

      if (!config.remote) {
        config.remote = await askQuestion(rl, "Git Remote URL (optional, leave empty to skip)", "");
      }

      if (!config.cleanup) {
        const delScript = await askQuestion(
          rl,
          "Delete this init script after running? (y/N)",
          "N",
        );
        config.cleanup = /^y(es)?$/i.test(delScript);
      }
    } finally {
      rl.close();
    }
  }

  // Fallbacks if still empty
  if (!config.name) config.name = "My Client Project";
  if (!config.slug) config.slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (!config.desc) config.desc = "Production web application.";
  if (!config.url) config.url = "https://example.com";
  if (!config.email) config.email = "support@example.com";

  console.log("\n⚙️  Applying configuration:");
  console.log(`   - Name:        ${config.name}`);
  console.log(`   - Slug:        ${config.slug}`);
  console.log(`   - Description: ${config.desc}`);
  console.log(`   - URL:         ${config.url}`);
  console.log(`   - Support:     ${config.email}`);
  if (config.remote) console.log(`   - Remote:      ${config.remote}`);
  console.log(`   - Self-delete: ${config.cleanup ? "Yes" : "No"}`);
  console.log("");

  // 1. Update package.json
  const pkgPath = path.join(rootDir, "package.json");
  if (fs.existsSync(pkgPath)) {
    console.log("📝 Updating package.json...");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.name = config.slug;
    pkg.version = "0.1.0";
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
  }

  // 2. Update src/config/site.ts
  const siteConfigPath = path.join(rootDir, "src", "config", "site.ts");
  if (fs.existsSync(siteConfigPath)) {
    console.log("📝 Updating src/config/site.ts...");
    let content = fs.readFileSync(siteConfigPath, "utf-8");
    content = content.replace(/name:\s*"[^"]*"/, `name: "${config.name}"`);
    content = content.replace(/description:\s*"[^"]*"/, `description: "${config.desc}"`);
    content = content.replace(/supportEmail:\s*"[^"]*"/, `supportEmail: "${config.email}"`);
    fs.writeFileSync(siteConfigPath, content, "utf-8");
  }

  // 3. Generate fresh BETTER_AUTH_SECRET & create .env
  console.log("🔑 Generating new BETTER_AUTH_SECRET...");
  const newSecret = crypto.randomBytes(32).toString("base64");
  const envExamplePath = path.join(rootDir, ".env.example");
  const envPath = path.join(rootDir, ".env");

  if (fs.existsSync(envExamplePath)) {
    console.log("📄 Generating .env from .env.example...");
    let envContent = fs.readFileSync(envExamplePath, "utf-8");
    envContent = envContent.replace(
      /BETTER_AUTH_SECRET="[^"]*"/,
      `BETTER_AUTH_SECRET="${newSecret}"`,
    );
    envContent = envContent.replace(
      /EMAIL_FROM="[^"]*"/,
      `EMAIL_FROM="${config.name} <${config.email}>"`,
    );
    fs.writeFileSync(envPath, envContent, "utf-8");
  }

  // 4. Update README title if README exists
  const readmePath = path.join(rootDir, "README.md");
  if (fs.existsSync(readmePath)) {
    console.log("📝 Updating README.md...");
    let readme = fs.readFileSync(readmePath, "utf-8");
    readme = readme.replace(/^#\s+.*/m, `# ${config.name}\n\n${config.desc}`);
    fs.writeFileSync(readmePath, readme, "utf-8");
  }

  // 5. Reinitialize Git
  console.log("📦 Re-initializing Git repository...");
  try {
    const gitDir = path.join(rootDir, ".git");
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }
    execSync("git init -b main", { cwd: rootDir, stdio: "ignore" });
    execSync("git add .", { cwd: rootDir, stdio: "ignore" });
    execSync(`git commit -m "chore: initial commit for ${config.name}"`, {
      cwd: rootDir,
      stdio: "ignore",
    });
    console.log("✅ Git initialized on main with clean initial commit");

    if (config.remote) {
      console.log(`🔗 Adding git remote origin: ${config.remote}...`);
      execSync(`git remote add origin ${config.remote}`, { cwd: rootDir, stdio: "ignore" });
      console.log("💡 You can push via: git push -u origin main");
    }
  } catch (err) {
    console.warn("⚠️  Git operations encountered an issue (is git installed?):", err.message);
  }

  // 6. Cleanup if requested
  if (config.cleanup) {
    console.log("🧹 Cleaning up init script...");
    try {
      fs.unlinkSync(__filename);
      // Remove init:project script from package.json
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
        delete pkg.scripts["init:project"];
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
      }
      console.log("✅ Cleanup complete.");
    } catch (e) {
      console.warn("Could not delete init script:", e.message);
    }
  }

  console.log("\n🎉 Project initialization complete!");
  console.log("👉 Next steps:");
  console.log("   1. Review your newly created .env file");
  console.log("   2. Run 'pnpm db:up && pnpm db:migrate'");
  console.log("   3. Run 'pnpm dev' and start building!\n");
}

main().catch((err) => {
  console.error("❌ Initialization failed:", err);
  process.exit(1);
});
