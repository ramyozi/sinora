#!/usr/bin/env node
/**
 * Purge em dashes (U+2014) from the repo.
 * Replaces ` — ` with ` - ` and stray `—` with `-`.
 * Logs every file touched. Exits with non-zero if any em dash remains.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const EM_DASH = "—";

const trackedFiles = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

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

let changedFiles = 0;
let totalReplacements = 0;

for (const file of trackedFiles) {
  const dotIdx = file.lastIndexOf(".");
  const ext = dotIdx >= 0 ? file.slice(dotIdx) : "";
  if (!allowedExtensions.has(ext)) continue;

  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (!content.includes(EM_DASH)) continue;

  const before = content;
  content = content.replace(/ — /g, " - ");
  content = content.replace(/—/g, "-");
  const replacements = (before.match(/—/g) || []).length;

  writeFileSync(file, content);
  changedFiles += 1;
  totalReplacements += replacements;
  console.log(`  ${file}: ${replacements} occurrence(s)`);
}

console.log(`\nDone: ${changedFiles} file(s) modified, ${totalReplacements} em dash(es) replaced.`);
