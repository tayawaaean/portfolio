# Autonomous SEO Blog Pipeline — Design

**Date:** 2026-06-28
**Status:** Approved (brainstorming) — pending implementation plan
**Author:** Aean Tayawa (with Claude Code)

## Goal

Continuously publish SEO-optimized, buyer-intent blog posts to the portfolio with
**zero per-post human effort**, so the blog generates organic search traffic and
converts readers into client inquiries. The blog content *pattern* already exists
(two seed posts targeting queries like "hire a full-stack developer" and "Stripe
Connect marketplace", each ending in a `/contact` CTA); this project adds the
**automation, scheduling, and quality guardrails** to keep producing posts like
those without hand-writing each one.

## Decisions (locked during brainstorming)

| Decision | Choice | Rationale |
| --- | --- | --- |
| Review model | **Fully autonomous publishing** (no human approval gate) | User wants maximum hands-off. Risk mitigated with non-human guardrails (Section 5). |
| Generation engine | **Scheduled Claude Code agent on the user's Max plan** | Zero marginal API cost; full agent can research, ground in the repo, validate the build, and commit. Subject to normal plan usage limits (weekly cadence is negligible). |
| Topic strategy | **Curated backlog the user controls + agent research** | User steers lead-gen direction; agent sharpens the angle and executes. Best signal-to-noise. |
| Cadence | **Weekly** (~4 posts/month) | Steady, Google-friendly signal without flooding or thin content. |
| Content format | **MDX files with frontmatter** | Agent writes natural Markdown (no fragile JSX escaping) — far more reliable for automated authoring. Requires a small, standard MDX setup. |
| Scheduler location | **Claude Code cloud routine** | True set-and-forget; runs on time even if the user's PC is off. |
| Pipeline depth | **Multi-stage with an adversarial editor (Option B)** | Fully autonomous publishing means the quality gates are the only thing between the agent and the live client-facing brand. An independent fact-check/brand-voice stage + a build gate keep a bad post off the site. |

## Non-goals (YAGNI)

- No CMS or admin UI.
- No database — content stays as version-controlled files.
- No AI image generation; reuse the existing `next/og` OG-image system.
- No social-media auto-posting.
- No analytics dashboard.

These can be added later if desired; none are required for the core pipeline.

## Architecture & data flow

The "scheduler" is a Claude Code cloud routine; the "creator" is the agent it runs;
the Next.js app only **renders** whatever `.mdx` lands in the content folder. No
generation code runs inside the app.

```
[Weekly Claude Code cloud routine]
  → read backlog.yaml (top pending topic) + playbook.md + grounding data (src/data/*)
  → STAGE 1  Research: live keyword/angle sharpening; dedupe vs all published posts
  → STAGE 2  Draft:    write the .mdx (buyer-intent, internal links, contextual CTA)
  → STAGE 3  Adversarial edit: fact-check vs repo, brand voice, anti-spam, link validity
  → STAGE 4  Validate: frontmatter schema + `tsc --noEmit` + `next build`
                       └─ fail ─▶ abort, NO commit (broken post never reaches git)
  → commit post + mark topic `published` in backlog → push → Vercel auto-deploys
```

## Components

### 1. Content storage & rendering (MDX migration)

- **`src/content/blog/posts/*.mdx`** — one file per post. Frontmatter fields:
  `title`, `description`, `excerpt`, `date` (ISO `YYYY-MM-DD`), `keywords` (array),
  `readingMinutes` (number), `cluster` (optional string for topic grouping).
  Body is Markdown/MDX.
- **`src/lib/blog.ts`** — the post loader. Reads the `posts/` folder, parses
  frontmatter with `gray-matter`, and exposes:
  - `getAllPosts(): PostMeta[]` (sorted newest-first; used by the index and sitemap)
  - `getPost(slug): { meta, content } | null`
  - `getAllSlugs(): string[]` (for `generateStaticParams`)
  Validates required frontmatter fields and unique slugs at load time.
- **Rendering** — [src/app/blog/[slug]/page.tsx](../../../src/app/blog/[slug]/page.tsx)
  keeps its current layout, JSON-LD, metadata, and CTA. Only the body source changes:
  compile the MDX string with `next-mdx-remote-client/rsc` inside the existing RSC page,
  using a components map that applies the current Tailwind prose styling (the
  `[&>p]:…` arbitrary-variant classes already on the wrapper) to MDX elements.
- **Index & sitemap** — [src/app/blog/page.tsx](../../../src/app/blog/page.tsx) and
  [src/app/sitemap.ts](../../../src/app/sitemap.ts) switch from
  `import { posts } from "@/content/blog/posts"` to the `getAllPosts()` loader.
- **Migration** — convert the two existing seed posts in `src/content/blog/posts.tsx`
  to `.mdx` (preserving slugs, dates, keywords, and copy) and delete `posts.tsx`.
- **New dependency:** `next-mdx-remote-client@^2` (the maintained, React-19 fork;
  the original `next-mdx-remote` is archived and carries CVE-2026-0969, which
  Vercel blocks on deploy). Frontmatter is parsed natively (`parseFrontmatter` /
  `getFrontmatter`) — no `gray-matter`. No `next.config.mjs` changes.

### 2. Topic backlog (the user's control surface)

- **`src/content/blog/backlog.yaml`** — the single place the user steers the blog.
  Global field `paused: boolean` (kill switch). A `topics` list, each item:
  - `topic` — human description of the post idea
  - `targetKeyword` — primary buyer-intent keyword
  - `intent` — e.g. `hire`, `cost`, `how-to`, `comparison`
  - `linkServices` — service slugs the post should link to (validated against `services.ts`)
  - `status` — `pending` | `published`
  - `publishedSlug` — filled in by the agent when published
- The agent always selects the **top `pending`** item. Editing this file is how the
  user adds, reorders, or removes future topics. Seeded with an initial set of
  buyer-intent topics tied to the user's services.

### 3. The playbook (version-controlled agent instructions)

- **`docs/automation/blog-playbook.md`** — the agent's standing instructions, in the
  repo so behavior is reviewable and editable. Contains the pipeline stages,
  grounding rules, the "never claim" list, SEO/lead-gen requirements, the commit
  convention, and the stop conditions. The cloud routine's prompt simply points the
  agent at this playbook.

### 4. Validation script

- **`scripts/validate-post.mjs`** — a Node ESM script of pure, testable checks
  runnable on any `.mdx` file. Enforces:
  - frontmatter schema (all required fields present, correct types)
  - slug uniqueness vs existing posts
  - title ≤ 60 chars; `description` 150–160 chars
  - word count 1,000–1,500
  - ≥ 1 internal link to a real `/services/<slug>` (validated against `services.ts`)
  - ≥ 1 internal link to a real `/portfolio/<slug>` (validated against `projects.ts`)
  - ≥ 1 link to `/contact`
  - no link to a non-existent internal slug (link-integrity)
  Used both by the pipeline (Stage 4) and in tests.

## Quality guardrails (the heart — Section 5)

Because publishing is fully autonomous, these gates replace the human reviewer:

1. **Grounding.** Any claim about the user's own work must trace to `src/data/*`
   (`projects.ts`, `services.ts`, `testimonials.ts`, `skills.ts`). The agent treats
   these files as the source of truth and may not invent clients, metrics, or
   capabilities.
2. **"Never claim" list.** No invented client names or statistics; no testimonials it
   cannot cite from `testimonials.ts`; no "leads/manages a team" claims (per the
   project's documented history of correcting that). Encoded in the playbook.
3. **Adversarial edit (Stage 3).** A distinct reviewer pass is instructed to *attack*
   the draft: flag invented claims, off-brand voice, thin or duplicate content, and
   any internal link whose slug does not exist in the repo. The draft is revised until
   it survives or is rejected.
4. **Internal-link integrity.** Every `/services/*` and `/portfolio/*` link is checked
   against the real slugs in `services.ts` / `projects.ts` (directly addressing the
   prior `djpathlete` vs `djp-athlete-platform` slug mistake). A broken internal link
   fails validation.
5. **SEO / lead-gen shape.** Buyer-intent title ≤ 60 chars; meta description 150–160;
   ≥ 1 link to a relevant service; ≥ 1 to a real project; a contextual `/contact` CTA;
   FAQ section with FAQPage JSON-LD where natural; 1,000–1,500 words; a unique angle
   versus every published post (dedupe check in Stage 1).
6. **Build gate (Stage 4).** `tsc --noEmit` **and** `next build` must pass before the
   commit. A post that breaks the build is never committed.

## Scheduler, deploy & safety

- **Routine.** A Claude Code routine (created via `/schedule`) runs weekly with a
  fixed prompt that points at `docs/automation/blog-playbook.md`.
- **Git access.** One operational setup step: grant the cloud routine GitHub **push
  access** via a scoped fine-grained PAT so it can commit and push from the cloud.
- **Reversibility.** One post = one commit. A bad post is undone with a one-line
  `git revert`.
- **Kill switch.** `paused: true` in `backlog.yaml` halts publishing without deleting
  the routine.
- **Graceful stop.** If no `pending` topics remain, the agent makes no commit and logs
  that the backlog is empty (so the user knows to refill it).
- **Deploy branch (precondition, not built here).** Vercel deploys from the production
  branch. The SEO work currently lives on `seo-foundation`; the routine must target
  whatever branch Vercel builds (expected `main` after `seo-foundation` is merged).
  This is confirmed/operationalized before the routine is wired, not part of the app code.

## Testing

- **Loader unit tests** — frontmatter parsing, required-field validation, slug
  uniqueness, newest-first sorting.
- **`validate-post` tests** — run the validator against fixtures, including a
  deliberately bad post (missing fields, over-length title, broken internal link)
  that **must** be rejected, and a good post that must pass.
- **Migration check** — the two migrated seed posts render equivalently to the
  pre-migration output (same title, date, headings, body text, CTA, JSON-LD).
- **Build verification** — `tsc --noEmit` clean and `next build` green after the
  migration and loader changes.

## Open precondition for the user (before the routine goes live)

1. Confirm the **production/deploy branch** (and whether `seo-foundation` is being
   merged to `main`).
2. Provide/authorize the **GitHub push credential** for the cloud routine.
3. Approve the **initial seed backlog** of topics (drafted as part of implementation).
