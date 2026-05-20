#!/usr/bin/env node
/**
 * Anti-regression check: fails CI if any em dash (U+2014) is found in tracked source files.
 * The project rule is to use ":" or "-" instead. Documents the offenders and exits 1.
 */
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const EM_DASH = "—";

const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".css",
  ".html",
]);

const trackedFiles = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

const offenders = [];

for (const file of trackedFiles) {
  const dotIdx = file.lastIndexOf(".");
  const ext = dotIdx >= 0 ? file.slice(dotIdx) : "";
  if (!allowedExtensions.has(ext)) continue;
  // Permit this check script and the purge tool to mention the em dash literal.
  if (file === "scripts/check-em-dashes.mjs") continue;
  if (file === "scripts/purge-em-dashes.mjs") continue;

  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (!content.includes(EM_DASH)) continue;

  const lines = content.split(/\r?\n/);
  lines.forEach((line, idx) => {
    if (line.includes(EM_DASH)) {
      offenders.push({ file, line: idx + 1, content: line.trim().slice(0, 120) });
    }
  });
}

if (offenders.length === 0) {
  console.log("OK: no em dash found in tracked source files.");
  process.exit(0);
}

console.error("Em dashes found. The project rule forbids them. Use ':' or '-' instead.\n");
for (const o of offenders) {
  console.error(`  ${o.file}:${o.line}  ${o.content}`);
}
console.error(`\nTotal: ${offenders.length} occurrence(s).`);
process.exit(1);
