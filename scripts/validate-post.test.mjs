import { test } from "node:test";
import assert from "node:assert/strict";
import { validatePost } from "./validate-post.mjs";

const SLUGS = {
  serviceSlugs: ["full-stack-web-development", "payment-integration"],
  projectSlugs: ["djp-athlete-platform"],
};

const body = "word ".repeat(1100);

const goodTitle = "How to Hire a Developer"; // <= 60
const goodDesc = "x".repeat(155); // 150-160

function frontmatter({ title = goodTitle, desc = goodDesc } = {}) {
  return [
    "---",
    `title: "${title}"`,
    `description: "${desc}"`,
    'excerpt: "e"',
    'date: "2026-06-15"',
    "readingMinutes: 6",
    "keywords:",
    '  - "hire developer"',
    "---",
    "",
  ].join("\n");
}

const goodLinks =
  "See [svc](/services/full-stack-web-development) and [proj](/portfolio/djp-athlete-platform) and [contact](/contact).";

test("accepts a well-formed post", () => {
  const src = frontmatter() + body + goodLinks;
  const { ok, errors } = validatePost(src, SLUGS);
  assert.equal(ok, true, errors.join("; "));
});

test("rejects a missing description", () => {
  const src =
    '---\ntitle: "T"\nexcerpt: "e"\ndate: "2026-06-15"\nreadingMinutes: 6\nkeywords:\n  - "k"\n---\n' +
    body +
    goodLinks;
  const { ok, errors } = validatePost(src, SLUGS);
  assert.equal(ok, false);
  assert.ok(errors.some((e) => /description/i.test(e)));
});

test("rejects an over-length title", () => {
  const src = frontmatter({ title: "x".repeat(61) }) + body + goodLinks;
  const { ok, errors } = validatePost(src, SLUGS);
  assert.equal(ok, false);
  assert.ok(errors.some((e) => /title/i.test(e)));
});

test("rejects a link to a non-existent project slug", () => {
  const bad =
    "See [svc](/services/full-stack-web-development) and [proj](/portfolio/does-not-exist) and [contact](/contact).";
  const src = frontmatter() + body + bad;
  const { ok, errors } = validatePost(src, SLUGS);
  assert.equal(ok, false);
  assert.ok(errors.some((e) => /does-not-exist/.test(e)));
});

test("rejects when no /contact CTA is present", () => {
  const noContact =
    "See [svc](/services/full-stack-web-development) and [proj](/portfolio/djp-athlete-platform).";
  const src = frontmatter() + body + noContact;
  const { ok, errors } = validatePost(src, SLUGS);
  assert.equal(ok, false);
  assert.ok(errors.some((e) => /contact/i.test(e)));
});

test("rejects a too-short body", () => {
  const src = frontmatter() + "only a few words " + goodLinks;
  const { ok, errors } = validatePost(src, SLUGS);
  assert.equal(ok, false);
  assert.ok(errors.some((e) => /word count|words/i.test(e)));
});
