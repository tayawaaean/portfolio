import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getFrontmatter } from "next-mdx-remote-client/utils";

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

/** Strip #fragment, ?query, and a trailing slash so allow-list checks are exact. */
function normalizeLink(href) {
  let h = href.split("#")[0].split("?")[0];
  if (h.length > 1 && h.endsWith("/")) h = h.slice(0, -1);
  return h;
}

/** Collect internal links from BOTH Markdown `](/x)` and raw `href="/x"` (JSX/HTML). */
function extractInternalLinks(body) {
  const md = [...body.matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
  const href = [...body.matchAll(/href\s*=\s*["'](\/[^"']+)["']/g)].map((m) => m[1]);
  return [...md, ...href].map(normalizeLink);
}

export function validatePost(src, { serviceSlugs, projectSlugs }) {
  const errors = [];

  // Parse frontmatter with the SAME parser the loader/renderer uses, so the
  // validator never diverges from what next-mdx-remote-client accepts.
  let frontmatter = {};
  let body = src;
  try {
    const parsed = getFrontmatter(src);
    frontmatter = parsed.frontmatter || {};
    body = parsed.strippedSource || "";
  } catch (e) {
    return { ok: false, errors: [`frontmatter parse error: ${e.message}`] };
  }
  if (!frontmatter || Object.keys(frontmatter).length === 0)
    errors.push("missing frontmatter block");

  const title = typeof frontmatter.title === "string" ? frontmatter.title : null;
  const desc =
    typeof frontmatter.description === "string" ? frontmatter.description : null;
  const excerpt =
    typeof frontmatter.excerpt === "string" ? frontmatter.excerpt : null;
  const date = typeof frontmatter.date === "string" ? frontmatter.date : null;

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
    errors.push("missing or malformed date (quote it as \"YYYY-MM-DD\")");
  if (typeof frontmatter.readingMinutes !== "number")
    errors.push("missing numeric readingMinutes (unquoted integer)");
  if (!Array.isArray(frontmatter.keywords) || frontmatter.keywords.length === 0)
    errors.push("missing keywords list");

  const words = body.trim().split(/\s+/).filter(Boolean).length;
  if (words < LIMITS.wordsMin || words > LIMITS.wordsMax)
    errors.push(`body word count ${words} outside ${LIMITS.wordsMin}-${LIMITS.wordsMax}`);

  const links = extractInternalLinks(body);
  const hasService = links.some((l) => l.startsWith("/services/"));
  const hasProject = links.some((l) => l.startsWith("/portfolio/"));
  const hasContact = links.some((l) => l === "/contact");
  if (!hasService) errors.push("no internal link to a /services/<slug>");
  if (!hasProject) errors.push("no internal link to a /portfolio/<slug>");
  if (!hasContact) errors.push("no exact /contact CTA link");

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
