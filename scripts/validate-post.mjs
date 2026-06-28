import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const LIMITS = {
  titleMax: 60,
  descMin: 150,
  descMax: 160,
  wordsMin: 1000,
  wordsMax: 1500,
};

/** Extract a `slug: "..."` set from a data .ts file read as text. */
export function loadSlugs(dataDir) {
  const read = (f) => {
    const text = readFileSync(path.join(dataDir, f), "utf8");
    return [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  };
  return { serviceSlugs: read("services.ts"), projectSlugs: read("projects.ts") };
}

/** Split frontmatter block from body. Returns { fm: rawText, body }. */
function splitFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: "", body: src };
  return { fm: m[1], body: m[2] };
}

function fmString(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*"([^"]*)"`, "m"));
  return m ? m[1] : null;
}

function fmHasList(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s.*\\n?)+)`, "m"));
  return !!m && m[1].trim().length > 0;
}

export function validatePost(src, { serviceSlugs, projectSlugs }) {
  const errors = [];
  const { fm, body } = splitFrontmatter(src);
  if (!fm) errors.push("missing frontmatter block");

  const title = fmString(fm, "title");
  const desc = fmString(fm, "description");
  const excerpt = fmString(fm, "excerpt");
  const date = fmString(fm, "date");

  if (!title) errors.push("missing title");
  else if (title.length > LIMITS.titleMax)
    errors.push(`title too long (${title.length} > ${LIMITS.titleMax})`);

  if (!desc) errors.push("missing description");
  else if (desc.length < LIMITS.descMin || desc.length > LIMITS.descMax)
    errors.push(
      `description length ${desc.length} outside ${LIMITS.descMin}-${LIMITS.descMax}`,
    );

  if (!excerpt) errors.push("missing excerpt");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    errors.push("missing or malformed date (YYYY-MM-DD)");
  if (!/^readingMinutes:\s*\d+/m.test(fm))
    errors.push("missing numeric readingMinutes");
  if (!fmHasList(fm, "keywords")) errors.push("missing keywords list");

  const words = body.trim().split(/\s+/).filter(Boolean).length;
  if (words < LIMITS.wordsMin || words > LIMITS.wordsMax)
    errors.push(`body word count ${words} outside ${LIMITS.wordsMin}-${LIMITS.wordsMax}`);

  const links = [...body.matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
  const hasService = links.some((l) => l.startsWith("/services/"));
  const hasProject = links.some((l) => l.startsWith("/portfolio/"));
  const hasContact = links.some((l) => l === "/contact" || l.startsWith("/contact"));
  if (!hasService) errors.push("no internal link to a /services/<slug>");
  if (!hasProject) errors.push("no internal link to a /portfolio/<slug>");
  if (!hasContact) errors.push("no /contact CTA link");

  for (const l of links) {
    const sm = l.match(/^\/services\/([^/]+)$/);
    const pm = l.match(/^\/portfolio\/([^/]+)$/);
    if (sm && !serviceSlugs.includes(sm[1]))
      errors.push(`unknown service slug: ${sm[1]}`);
    if (pm && !projectSlugs.includes(pm[1]))
      errors.push(`unknown project slug: ${pm[1]}`);
  }

  return { ok: errors.length === 0, errors };
}

// CLI: node scripts/validate-post.mjs <file.mdx>
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: node scripts/validate-post.mjs <file.mdx>");
    process.exit(2);
  }
  const slugs = loadSlugs(path.join(process.cwd(), "src/data"));
  const { ok, errors } = validatePost(readFileSync(file, "utf8"), slugs);
  if (!ok) {
    console.error(`INVALID ${file}:`);
    for (const e of errors) console.error(" - " + e);
    process.exit(1);
  }
  console.log(`OK ${file}`);
}
