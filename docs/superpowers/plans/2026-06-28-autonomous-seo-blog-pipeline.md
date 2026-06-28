# Autonomous SEO Blog Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the blog to MDX and add the supporting pieces (loader, topic backlog, agent playbook, post validator) so a scheduled Claude Code agent can autonomously generate SEO/lead-gen posts that pass a build gate before publishing.

**Architecture:** Posts become `.mdx` files in `src/content/blog/posts/` with YAML frontmatter, rendered in the existing `[slug]` Server Component via `next-mdx-remote-client/rsc`. A version-controlled `backlog.yaml` (topics) + `blog-playbook.md` (agent instructions) + `scripts/validate-post.mjs` (pre-commit checks) define the autonomous pipeline. This plan delivers everything **except** activating the live cloud routine (a documented, user-authorized one-step flip).

**Tech Stack:** Next.js 16 (App Router, RSC, SSG), React 19, TypeScript 5, Tailwind 3, `next-mdx-remote-client@^2`, Node 22 built-in test runner (`node:test`).

## Global Constraints

- **Framework/runtime:** Next.js `^16.2.1`, React `^19.2.4`, TypeScript `^5`, Node `v22` — copied from `package.json`. Site is static/SSG.
- **MDX library:** `next-mdx-remote-client@^2` ONLY. Do NOT use `next-mdx-remote` (archived April 2026, CVE-2026-0969 RCE, Vercel blocks deploys using it). No `gray-matter` (frontmatter parsed natively via `parseFrontmatter: true` / `getFrontmatter`). No `next.config.mjs` MDX changes, no `mdx-components.tsx` convention.
- **Content is files, no DB/CMS.** One post = one `.mdx` = one commit (reversible via `git revert`).
- **Frontmatter schema (exact):** `title` (string), `description` (string), `excerpt` (string), `date` (ISO `YYYY-MM-DD` string), `keywords` (string array), `readingMinutes` (number). Optional: `cluster` (string).
- **SEO/lead-gen rules per post:** `title` ≤ 60 chars; `description` 150–160 chars; body 1,000–1,500 words; ≥ 1 internal link to a real `/services/<slug>`; ≥ 1 to a real `/portfolio/<slug>`; ≥ 1 link to `/contact`. Internal links validated against slugs in `src/data/services.ts` and `src/data/projects.ts`.
- **Real slugs (verified 2026-06-28):**
  - Services: `full-stack-web-development`, `saas-marketplace-development`, `payment-integration`, `ai-integration`, `progressive-web-apps`, `gis-mapping`.
  - Projects: `djp-athlete-platform`, `entertainment-booking-marketplace`, `salon-management`, `athlete-performance-monitoring`, `job-referral-platform`, `typing-assessment-platform`, `ai-transcription-platform`, `ai-email-marketing`, `arec-gis-platform`, `solar-calculator`, `market-picking-assistant`, `mayhem-creations`, `efficyon`, `video-review`.
- **"Never claim" list (baked into the playbook):** no invented clients/metrics; no testimonials not present in `src/data/testimonials.ts`; no "leads/manages a team" claims; only claim work traceable to `src/data/*`.
- **Build gate:** `npx tsc --noEmit` clean AND `npx next build` green before any post commit.
- **Git hygiene:** stage only the files each task names (explicit `git add <paths>` — never `git add -A`/`.`). Do NOT touch `src/lib/site.ts`, `src/app/layout.tsx`, or other SEO files (a parallel session owns those). Do NOT `git push`. Do NOT create/activate the live cloud routine.

---

## File Structure

| Path | Responsibility | Task |
| --- | --- | --- |
| `src/content/blog/posts/how-to-hire-a-full-stack-developer.mdx` | Migrated seed post 1 | 2 |
| `src/content/blog/posts/building-a-stripe-connect-marketplace.mdx` | Migrated seed post 2 | 2 |
| `src/content/blog/posts.ts` | Async loader: `getAllPostsMeta()`, `getPostSource()`, `PostMeta` type. Replaces `posts.tsx`. | 3 |
| `src/content/blog/posts.tsx` | **Deleted** (replaced by `posts.ts`) | 3 |
| `src/app/blog/[slug]/page.tsx` | Render MDX body via `MDXRemote` + components map; metadata/JSON-LD from `PostMeta` | 3 |
| `src/app/blog/page.tsx` | Index: `await getAllPostsMeta()` | 3 |
| `src/app/sitemap.ts` | Blog routes from `await getAllPostsMeta()` | 3 |
| `scripts/validate-post.mjs` | Pure pre-commit validator (frontmatter, lengths, word count, link integrity) | 4 |
| `scripts/validate-post.test.mjs` | `node:test` suite for the validator | 4 |
| `src/content/blog/backlog.yaml` | User-controlled topic queue + `paused` kill switch | 5 |
| `docs/automation/blog-playbook.md` | Standing agent instructions (pipeline, guardrails, frontmatter, commands) | 6 |
| `docs/automation/ROUTINE-SETUP.md` | One-time runbook to activate the weekly cloud routine | 7 |
| `docs/superpowers/specs/2026-06-28-autonomous-seo-blog-pipeline-design.md` | Spec dep-note correction | 1 |

---

### Task 1: Dependencies, types, and spec correction

**Files:**
- Modify: `package.json` (add dep; bump React types only if needed)
- Modify: `docs/superpowers/specs/2026-06-28-autonomous-seo-blog-pipeline-design.md`

**Interfaces:**
- Produces: `next-mdx-remote-client` available to import as `next-mdx-remote-client/rsc` and `next-mdx-remote-client/utils`.

- [ ] **Step 1: Install the MDX client**

Run: `npm install next-mdx-remote-client@^2`
Expected: installs cleanly; `package.json` dependencies gains `next-mdx-remote-client`. If npm errors on a peer/types conflict involving `@types/react`, run `npm install -D @types/react@^19 @types/react-dom@^19` and retry. (Do not add `--force`/`--legacy-peer-deps` without first trying the types bump.)

- [ ] **Step 2: Baseline typecheck still clean**

Run: `npx tsc --noEmit`
Expected: no errors (the install alone changes no source yet).

- [ ] **Step 3: Correct the spec's dependency note**

In the spec file, replace the MDX dependency wording so it matches reality. Find the bullet under "Content storage & rendering (MDX migration)" that says:

```
- **New dependencies:** `next-mdx-remote`, `gray-matter`. MDX inherently needs a
  compiler; these are the standard App Router choice and were accepted with the
  MDX decision.
```

Replace with:

```
- **New dependency:** `next-mdx-remote-client@^2` (the maintained, React-19 fork;
  the original `next-mdx-remote` is archived and carries CVE-2026-0969, which
  Vercel blocks on deploy). Frontmatter is parsed natively (`parseFrontmatter` /
  `getFrontmatter`) — no `gray-matter`. No `next.config.mjs` changes.
```

Also update the rendering bullet that names `next-mdx-remote/rsc` to `next-mdx-remote-client/rsc`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json docs/superpowers/specs/2026-06-28-autonomous-seo-blog-pipeline-design.md
git commit -m "build: add next-mdx-remote-client; correct spec MDX dep note"
```

---

### Task 2: Migrate the two seed posts to MDX

**Files:**
- Create: `src/content/blog/posts/how-to-hire-a-full-stack-developer.mdx`
- Create: `src/content/blog/posts/building-a-stripe-connect-marketplace.mdx`

**Interfaces:**
- Produces: two `.mdx` files whose frontmatter matches the Global Constraints schema and whose bodies satisfy the internal-link rules (so they pass Task 4's validator). Slugs = filenames without `.mdx`.

Note: these are enriched vs. the originals — real internal links added (better SEO + uniform validation). Bodies use plain apostrophes/quotes (MDX is not ESLint-linted, so no `&apos;` needed).

- [ ] **Step 1: Write seed post 1**

Create `src/content/blog/posts/how-to-hire-a-full-stack-developer.mdx`:

```mdx
---
title: "How to Hire a Full-Stack Developer for Your Startup"
description: "A practical guide for founders hiring a full-stack developer: what the role covers, how to evaluate candidates in one call, the red flags to avoid, and remote logistics."
excerpt: "What 'full-stack' should actually mean, how to evaluate a candidate in a single call, and the red flags that save you months of rework."
date: "2026-06-15"
readingMinutes: 6
keywords:
  - "hire full stack developer"
  - "hire next.js developer"
  - "hiring a remote developer"
  - "freelance developer for startup"
---

Hiring your first developer is one of the highest-leverage decisions a founder makes. Get it right and you ship a real product in weeks. Get it wrong and you spend months untangling code you can't maintain. Here is how to evaluate a full-stack developer without being technical yourself.

## What "full-stack" should actually mean

A real full-stack developer can own a feature end to end: the database schema, the API, the user interface, and the deployment. The value isn't that they know every framework — it's that they can make decisions across all those layers without waiting on three other people. For an early-stage product, that single-owner accountability is worth more than deep specialization. It is exactly the model behind my [full-stack web development](/services/full-stack-web-development) work.

## How to evaluate a candidate in one call

You don't need to read code to judge a developer. Ask them to walk you through a project they shipped and listen for these things:

- Can they explain a technical decision in plain language and the trade-off behind it?
- Do they talk about the *users* and the business problem, or only the technology?
- Did they handle the unglamorous parts — payments, edge cases, deployment, handoff — or just the happy path?
- Can you see the work live, and does it actually function?

A useful test is to ask for something you can click. For example, the [DJP Athlete platform](/portfolio/djp-athlete-platform) is a full production system you can look at and reason about — that is the bar a candidate's portfolio should clear.

## Red flags worth a month of rework

- No deployed work to show. A portfolio of private repos and screenshots is far weaker than something you can click.
- Vague answers about who owns the code and the accounts. You should own your repository, your database, and your domain — full stop.
- No mention of testing, documentation, or handoff. That's how you end up locked in.

## Working across time zones

Plenty of excellent developers work remotely from outside your country, and the cost difference can be significant. The thing that actually matters is overlap and communication: a few hours of shared working time for calls and reviews, written updates you can follow, and a clear milestone plan. Time zone is a logistics question, not a quality one.

## The bottom line

Hire for ownership and communication over a specific framework. The best signal is simple: can they show you something real, explain why they built it that way, and tell you honestly what they'd do differently. If you want to talk through a project, [get in touch](/contact) — I'm happy to give you a candid read on scope and approach.
```

- [ ] **Step 2: Write seed post 2**

Create `src/content/blog/posts/building-a-stripe-connect-marketplace.mdx`:

```mdx
---
title: "Building a Stripe Connect Marketplace: What It Takes"
description: "A grounded look at building a two-sided marketplace with Stripe Connect: the flows you must get right, where teams get burned, and a realistic timeline from someone who shipped one."
excerpt: "Marketplaces are harder than they look. Here are the Stripe Connect flows you must get right and where most teams get burned."
date: "2026-06-22"
readingMinutes: 7
keywords:
  - "stripe connect marketplace"
  - "build a marketplace"
  - "two-sided marketplace development"
  - "marketplace payments"
---

A marketplace looks simple from the outside: buyers on one side, sellers on the other, payments in the middle. The reality is that the middle is where almost all the engineering effort goes — and where marketplaces quietly lose money when it's done carelessly.

## Why marketplaces are harder than they look

A normal store moves money from a customer to you. A marketplace moves money from a customer to *someone else*, takes a cut, and has to handle refunds, disputes, payout timing, and tax across all of it. Each of those is a state machine with failure paths, and your database has to stay consistent with what actually happened at the payment provider. This is the core of my [SaaS & marketplace development](/services/saas-marketplace-development) work.

## Stripe Connect in one paragraph

Stripe Connect lets a platform onboard sellers, accept a payment from a buyer, automatically split it (your fee plus the seller's payout), and handle the seller's compliance and bank details. It removes an enormous amount of work — but you still have to design the flows around it correctly, which is where careful [payment integration](/services/payment-integration) earns its keep.

## The flows you must get right

- **Onboarding:** sellers must complete Stripe's verification before they can be paid. Your UI has to handle the "not yet ready" state gracefully.
- **The split:** decide application fees versus separate transfers, and make it auditable.
- **Refunds and disputes:** who eats the cost, and how does it reflect in the seller's balance?
- **Webhooks as truth:** treat Stripe webhooks as the source of truth and reconcile your database against them — never assume a client-side success means the money moved.

## Where teams get burned

- Building the happy path only, then discovering refunds and declined payouts in production.
- Storing payment state in their own database and letting it drift out of sync with Stripe.
- Underestimating onboarding friction and losing sellers before they can transact.

## A realistic timeline

A functional Connect marketplace MVP — onboarding, a booking or order flow, split payments, and a basic admin view — is typically a few weeks of focused work, not a weekend. The payment plumbing is the part to never rush; it's the part that costs real money when it breaks.

I've built a curated booking marketplace on Stripe Connect with automated payment splitting — you can see the shape of it in the [entertainment booking marketplace](/portfolio/entertainment-booking-marketplace) project. If you're planning something similar, [reach out](/contact) and I'll walk you through the flows that matter for your specific model.
```

- [ ] **Step 3: Sanity-check frontmatter lengths**

Run: `node -e "const fs=require('fs');for(const f of ['how-to-hire-a-full-stack-developer','building-a-stripe-connect-marketplace']){const s=fs.readFileSync('src/content/blog/posts/'+f+'.mdx','utf8');const d=s.match(/description: \"(.*)\"/)[1];const t=s.match(/title: \"(.*)\"/)[1];console.log(f,'title',t.length,'desc',d.length);}"`
Expected: each `title` ≤ 60 and `desc` between 150 and 160. (Adjust copy if any value is out of range before committing.)

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/posts/how-to-hire-a-full-stack-developer.mdx src/content/blog/posts/building-a-stripe-connect-marketplace.mdx
git commit -m "content: migrate seed blog posts to MDX with internal links"
```

---

### Task 3: Loader + consumer migration + delete posts.tsx (keystone)

**Files:**
- Create: `src/content/blog/posts.ts`
- Delete: `src/content/blog/posts.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Produces:
  - `interface PostMeta { slug: string; title: string; description: string; excerpt: string; date: string; keywords: string[]; readingMinutes: number; cluster?: string }`
  - `async function getAllPostsMeta(): Promise<PostMeta[]>` — newest-first.
  - `async function getPostSource(slug: string): Promise<string | null>` — raw MDX text.
- Consumes (from Task 2): `.mdx` files in `src/content/blog/posts/`.

- [ ] **Step 1: Write the loader**

Create `src/content/blog/posts.ts`:

```ts
import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { getFrontmatter } from "next-mdx-remote-client/utils";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog/posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  keywords: string[];
  readingMinutes: number;
  cluster?: string;
}

type Frontmatter = Omit<PostMeta, "slug">;

/** All posts' metadata (frontmatter only), newest-first. Memoized per render pass. */
export const getAllPostsMeta = cache(async (): Promise<PostMeta[]> => {
  const entries = await fs.readdir(POSTS_DIR);
  const files = entries.filter((f) => f.endsWith(".mdx"));
  const metas = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const { frontmatter } = getFrontmatter<Frontmatter>(source);
      return { slug: file.replace(/\.mdx$/, ""), ...frontmatter };
    }),
  );
  return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
});

/** Raw MDX source for one slug, or null if it does not exist. */
export async function getPostSource(slug: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Rewrite the `[slug]` page to render MDX**

Replace `src/app/blog/[slug]/page.tsx` with (keeps layout, JSON-LD, CTA, date formatting; swaps the body source and the data accessor):

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import type { MDXComponents } from "next-mdx-remote-client/rsc";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import JsonLd from "@/components/seo/JsonLd";
import { getAllPostsMeta, getPostSource } from "@/content/blog/posts";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPostsMeta()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getAllPostsMeta()).find((p) => p.slug === slug);
  if (!post) {
    return { title: "Post Not Found", robots: { index: false, follow: false } };
  }
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const components: MDXComponents = {
  p: (props) => <p className="text-gray-300 leading-[1.8] mb-6" {...props} />,
  h2: (props) => (
    <h2 className="font-display text-2xl font-bold text-white mt-10 mb-4" {...props} />
  ),
  ul: (props) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
  li: (props) => <li className="text-gray-300 leading-[1.7]" {...props} />,
  strong: (props) => <strong className="text-white" {...props} />,
  em: (props) => <em className="text-gray-200" {...props} />,
  a: (props) => (
    <a
      className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition-colors"
      {...props}
    />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, source] = await Promise.all([
    getAllPostsMeta().then((all) => all.find((p) => p.slug === slug)),
    getPostSource(slug),
  ]);
  if (!post || !source) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": `${SITE_URL}/#person`, name: SITE_NAME },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    inLanguage: "en",
  };

  return (
    <main className="min-h-screen">
      <JsonLd data={articleLd} />
      <Navbar />
      <SocialIcons />
      <article className="pt-28 pb-20 px-8 md:px-16 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="font-mono text-xs text-gray-500 hover:text-white transition-colors duration-300"
        >
          &larr; All posts
        </Link>

        <p className="font-mono text-xs text-gray-500 mt-8 mb-3">
          {formatDate(post.date)} &middot; {post.readingMinutes} min read
        </p>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-8">
          {post.title}
        </h1>

        <div>
          <MDXRemote
            source={source}
            options={{ parseFrontmatter: true }}
            components={components}
          />
        </div>

        <div className="mt-14 pt-8 border-t border-border-subtle">
          <p className="text-gray-400 text-sm mb-5">
            Working on something like this? Let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-mono text-sm tracking-wider rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </article>
    </main>
  );
}
```

- [ ] **Step 3: Update the blog index**

In `src/app/blog/page.tsx`: change the import `import { posts } from "@/content/blog/posts";` to `import { getAllPostsMeta } from "@/content/blog/posts";`, make the component `async`, and replace `const sorted = [...posts].sort(...)` with `const sorted = await getAllPostsMeta();` (loader already sorts newest-first; drop the local sort).

- [ ] **Step 4: Update the sitemap**

In `src/app/sitemap.ts`: change `import { posts } from "@/content/blog/posts";` to `import { getAllPostsMeta } from "@/content/blog/posts";`, make `export default async function sitemap()` async, and build `blogRoutes` from `const posts = await getAllPostsMeta();` (the rest of the `.map` is unchanged).

- [ ] **Step 5: Delete the old module**

Run: `git rm src/content/blog/posts.tsx`
Expected: file removed; no remaining importers of a `.body` field.

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean. (If MDX component props raise an implicit-any/JSX typing error, add `@types/react@^19`/`@types/react-dom@^19` per Task 1 Step 1 and re-run.)

- [ ] **Step 7: Build and verify both posts render**

Run: `npx next build`
Expected: green; route list shows `/blog` and `/blog/[slug]` and prerenders 2 blog params.

Then verify rendered HTML for migration parity:
Run: `node -e "const fs=require('fs');const p='.next/server/app/blog/how-to-hire-a-full-stack-developer.html';const h=fs.readFileSync(p,'utf8');for(const n of ['full-stack developer','/services/full-stack-web-development','/portfolio/djp-athlete-platform','/contact','BlogPosting']){if(!h.includes(n))throw new Error('MISSING '+n);}console.log('post1 OK');"`
Expected: `post1 OK` (asserts heading text, both internal links, CTA, and JSON-LD type are present). If the prerendered HTML path differs, locate it under `.next/server/app/blog/` first.

- [ ] **Step 8: Commit**

```bash
git add src/content/blog/posts.ts src/app/blog/[slug]/page.tsx src/app/blog/page.tsx src/app/sitemap.ts
git commit -m "feat: render blog from MDX files via next-mdx-remote-client"
```

---

### Task 4: Post validator (TDD)

**Files:**
- Create: `scripts/validate-post.mjs`
- Create: `scripts/validate-post.test.mjs`

**Interfaces:**
- Produces: `export function validatePost(mdxSource, { serviceSlugs, projectSlugs }): { ok: boolean, errors: string[] }` and `export function loadSlugs(dataDir)` reading slugs from `projects.ts`/`services.ts`. A CLI entry (`node scripts/validate-post.mjs <file.mdx>`) exits non-zero with printed errors on failure.

- [ ] **Step 1: Write the failing test**

Create `scripts/validate-post.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test scripts/validate-post.test.mjs`
Expected: FAIL — cannot find module `./validate-post.mjs` (not written yet).

- [ ] **Step 3: Write the validator**

Create `scripts/validate-post.mjs`:

```js
import { readFileSync } from "node:fs";
import path from "node:path";

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
if (import.meta.url === `file://${process.argv[1]}`) {
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
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test scripts/validate-post.test.mjs`
Expected: all tests PASS.

- [ ] **Step 5: Run the validator against the real migrated posts**

Run: `node scripts/validate-post.mjs src/content/blog/posts/how-to-hire-a-full-stack-developer.mdx && node scripts/validate-post.mjs src/content/blog/posts/building-a-stripe-connect-marketplace.mdx`
Expected: `OK ...` for both. (If a real post fails, fix the post copy — these are the canonical examples the playbook points to.)

- [ ] **Step 6: Commit**

```bash
git add scripts/validate-post.mjs scripts/validate-post.test.mjs
git commit -m "feat: add MDX post validator with node:test coverage"
```

---

### Task 5: Topic backlog

**Files:**
- Create: `src/content/blog/backlog.yaml`

**Interfaces:**
- Produces: a YAML file with `paused: boolean` and `topics: [{ topic, targetKeyword, intent, linkServices: [slug], status, publishedSlug }]`. The agent reads the top `status: pending` item.

- [ ] **Step 1: Write the backlog with seeded buyer-intent topics**

Create `src/content/blog/backlog.yaml`:

```yaml
# Autonomous blog topic backlog — the single place to steer the blog.
# Edit freely: add/reorder/remove topics. The agent always takes the TOP
# item with status: pending, writes it, then sets status: published +
# publishedSlug. Set `paused: true` to halt all publishing (kill switch).
paused: false

topics:
  - topic: "How much does it cost to build an MVP in 2026"
    targetKeyword: "cost to build an mvp"
    intent: cost
    linkServices: [full-stack-web-development]
    status: pending
    publishedSlug: null

  - topic: "MVP vs full product: what to build first as a startup"
    targetKeyword: "mvp development for startups"
    intent: how-to
    linkServices: [full-stack-web-development]
    status: pending
    publishedSlug: null

  - topic: "What does it cost to integrate Stripe payments"
    targetKeyword: "stripe payment integration cost"
    intent: cost
    linkServices: [payment-integration]
    status: pending
    publishedSlug: null

  - topic: "How to add AI features to an existing web app"
    targetKeyword: "add ai to web app"
    intent: how-to
    linkServices: [ai-integration]
    status: pending
    publishedSlug: null

  - topic: "Next.js vs WordPress for a startup website"
    targetKeyword: "next.js vs wordpress"
    intent: comparison
    linkServices: [full-stack-web-development]
    status: pending
    publishedSlug: null

  - topic: "Why turn your web app into a PWA"
    targetKeyword: "progressive web app benefits"
    intent: how-to
    linkServices: [progressive-web-apps]
    status: pending
    publishedSlug: null

  - topic: "Hiring an offshore developer in the Philippines: a founder's guide"
    targetKeyword: "hire developer philippines"
    intent: hire
    linkServices: [full-stack-web-development]
    status: pending
    publishedSlug: null

  - topic: "Building a two-sided booking platform: features and timeline"
    targetKeyword: "booking platform development"
    intent: how-to
    linkServices: [saas-marketplace-development]
    status: pending
    publishedSlug: null
```

- [ ] **Step 2: Verify it parses as YAML**

Run: `node -e "const fs=require('fs');const t=fs.readFileSync('src/content/blog/backlog.yaml','utf8');if(!/paused:\s*false/.test(t))throw new Error('no paused flag');const n=(t.match(/status: pending/g)||[]).length;if(n<1)throw new Error('no pending topics');console.log('backlog OK, pending:',n);"`
Expected: `backlog OK, pending: 8`.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/backlog.yaml
git commit -m "feat: seed autonomous blog topic backlog"
```

---

### Task 6: Agent playbook

**Files:**
- Create: `docs/automation/blog-playbook.md`

**Interfaces:**
- Produces: the standing instructions a scheduled Claude Code agent follows each run. Self-contained: pipeline stages, grounding/never-claim rules, exact frontmatter format, commands, stop conditions.

- [ ] **Step 1: Write the playbook**

Create `docs/automation/blog-playbook.md` with this content:

```markdown
# Blog Generation Playbook (autonomous agent instructions)

You are the autonomous blog writer for the Aean Tayawa portfolio. Each run you
produce ONE new SEO/lead-gen blog post, validate it, and commit it. Follow this
playbook exactly. The goal is organic search traffic that converts founders into
client inquiries — quality and accuracy protect a client-facing brand.

## 0. Stop conditions (check first)
- Open `src/content/blog/backlog.yaml`. If `paused: true`, STOP — make no changes.
- If no topic has `status: pending`, STOP and report "backlog empty" — do not invent
  a topic. (The owner refills the backlog.)
- Select the FIRST topic with `status: pending`. That is this run's topic.

## 1. Research
- Use web search to sharpen the angle and find the real buyer-intent phrasing for
  `targetKeyword`. Note the questions buyers actually ask.
- Read every existing post in `src/content/blog/posts/*.mdx`. Your post MUST take a
  distinct angle — no overlapping thesis or recycled structure. If the topic is
  already well covered, skip to the next pending topic.

## 2. Ground in real facts (MANDATORY)
- Your only source of truth about Aean's work is `src/data/`:
  `projects.ts`, `services.ts`, `testimonials.ts`, `skills.ts`.
- NEVER claim: invented clients, invented metrics/numbers, testimonials not in
  `testimonials.ts`, or that Aean "leads/manages a team". Only state work you can
  trace to those files.
- Internal links: link ONLY to slugs that exist. Service slugs and project slugs
  live in `services.ts` / `projects.ts`. Copy them exactly — never hand-type.

## 3. Draft the post
Create `src/content/blog/posts/<slug>.mdx` where `<slug>` is kebab-case from the
title and unique vs existing files. Frontmatter (exact keys/format):

    ---
    title: "<= 60 chars, includes the target keyword naturally"
    description: "150-160 chars, compelling meta description with the keyword"
    excerpt: "one-sentence hook for the blog index"
    date: "YYYY-MM-DD"   # today's date
    readingMinutes: <integer estimate>
    keywords:
      - "<target keyword>"
      - "<2-4 related buyer-intent phrases>"
    ---

Body rules (Markdown, not JSX — plain apostrophes/quotes are fine):
- 1,000–1,500 words. Clear `##` section headings. Buyer-intent, practical, honest.
- Include at least one `## FAQ`-style Q&A section where natural.
- Internal links REQUIRED: >= 1 to a relevant `/services/<slug>`, >= 1 to a real
  `/portfolio/<slug>`, and >= 1 `/contact` call-to-action near the end.
- Voice: direct, senior-engineer, no hype, no emoji, no fabricated stats.

## 4. Adversarial self-edit (do this as a separate critical pass)
Re-read the draft as a skeptical editor trying to REJECT it. Fix anything you find:
- Any claim not grounded in `src/data/*`? Remove or rephrase.
- Off-brand, hypey, or padded? Tighten.
- Thin or duplicative vs existing posts? Re-angle or rewrite.
- Any internal link whose slug is not in `services.ts`/`projects.ts`? Fix it.

## 5. Validate (build gate — must pass before commit)
Run, from the repo root:

    node scripts/validate-post.mjs src/content/blog/posts/<slug>.mdx
    npx tsc --noEmit
    npx next build

If ANY of these fail, fix the post and re-run. NEVER commit a post that fails the
validator or breaks the build.

## 6. Publish
- In `backlog.yaml`, set the chosen topic's `status: published` and
  `publishedSlug: <slug>`.
- Commit ONLY the new post and the backlog change:

      git add src/content/blog/posts/<slug>.mdx src/content/blog/backlog.yaml
      git commit -m "content: publish blog post — <title>"

- Push to the production branch (configured in ROUTINE-SETUP.md). Vercel deploys.
- One post = one commit, so a bad post is reversible with `git revert`.

## 7. Report
End the run with: the slug, title, target keyword, internal links used, word count,
and the validator/build results.
```

- [ ] **Step 2: Commit**

```bash
git add docs/automation/blog-playbook.md
git commit -m "docs: add autonomous blog generation playbook"
```

---

### Task 7: Routine activation runbook + final verification

**Files:**
- Create: `docs/automation/ROUTINE-SETUP.md`

**Interfaces:**
- Produces: the one-time, user-authorized steps to turn on the weekly cloud routine. Nothing here is executed by this plan.

- [ ] **Step 1: Write the runbook**

Create `docs/automation/ROUTINE-SETUP.md`:

```markdown
# Activating the weekly blog routine (one-time, owner-run)

Everything in the app is built and committed. These are the only steps left, and
they are intentionally left to you because they publish to the live site.

## Preconditions
1. **Confirm the production/deploy branch** Vercel builds (e.g. `main`). The routine
   must commit/push to that branch. Merge `feat/blog-pipeline` into it first.
2. **GitHub push credential** for the cloud runner: create a fine-grained PAT scoped
   to this repo with Contents: read/write. The routine uses it to push.

## Create the routine
Use the Claude Code scheduling skill (`/schedule`) to create a weekly routine:
- Schedule: weekly (e.g. Mondays 09:00 your timezone).
- Working dir: this repo, on the production branch.
- Prompt: "Follow docs/automation/blog-playbook.md to generate, validate, and
  publish exactly one new blog post. Obey its stop conditions."

## Kill switch & control
- Pause anytime: set `paused: true` in `src/content/blog/backlog.yaml` and commit.
- Steer topics: edit `backlog.yaml` (add/reorder/remove pending topics).
- Roll back a bad post: `git revert <commit>` and push.

## First run
Trigger the routine once manually and review the resulting commit/deploy before
trusting the weekly cadence.
```

- [ ] **Step 2: Full-suite final verification**

Run each and confirm:
- `node --test scripts/validate-post.test.mjs` → all PASS
- `node scripts/validate-post.mjs src/content/blog/posts/how-to-hire-a-full-stack-developer.mdx` → OK
- `node scripts/validate-post.mjs src/content/blog/posts/building-a-stripe-connect-marketplace.mdx` → OK
- `npx tsc --noEmit` → clean
- `npx next build` → green; sitemap + both blog posts present

- [ ] **Step 3: Commit**

```bash
git add docs/automation/ROUTINE-SETUP.md
git commit -m "docs: add routine activation runbook"
```

---

## Self-Review

**Spec coverage:**
- MDX migration + loader → Tasks 2–3. Index/sitemap consumer updates → Task 3. ✓
- Backlog (control surface + kill switch) → Task 5. ✓
- Playbook (grounding, never-claim, SEO rules, pipeline, build gate) → Task 6. ✓
- Validator (frontmatter, lengths, word count, link integrity) → Task 4. ✓
- Adversarial edit stage → playbook §4 (executed by the agent at run time, not app code). ✓
- Scheduler/deploy/safety + preconditions → Task 7 runbook (activation deliberately deferred). ✓
- Testing (validator unit tests + migration parity via build HTML assert) → Tasks 4 & 3. ✓
- Non-goals (no CMS/DB/image-gen/social) → respected; nothing added. ✓

**Placeholder scan:** `publishedSlug: null` and the playbook's `<slug>`/`<title>` are intentional runtime placeholders in generated artifacts, not plan gaps. No "TBD/TODO" in any task. ✓

**Type consistency:** `getAllPostsMeta`/`getPostSource`/`PostMeta` used identically in Tasks 3's loader, `[slug]` page, index, and sitemap. `validatePost(src, {serviceSlugs, projectSlugs})` signature matches between test (Task 4 Step 1) and implementation (Step 3). ✓

## Execution

Per the user's standing autonomy instruction (working unattended), execute with
**subagent-driven-development** (fresh subagent per task + review between tasks).
Do NOT push and do NOT activate the routine (Task 7 is documentation only).
