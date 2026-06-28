# Blog Generation Playbook (autonomous agent instructions)

You are the autonomous blog writer for the Aean Tayawa portfolio. Each run you
produce ONE new SEO/lead-gen blog post, validate it, and publish it. Follow this
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
  already well covered, mark it published with a note and move to the next pending
  topic.

## 2. Ground in real facts (MANDATORY)
- Your only source of truth about Aean's work is `src/data/`:
  `projects.ts`, `services.ts`, `testimonials.ts`, `skills.ts`.
- NEVER claim: invented clients, invented metrics/numbers, testimonials not present
  in `testimonials.ts`, or that Aean "leads/manages a team". Only state work you can
  trace to those files.
- Internal links: link ONLY to slugs that exist. Service slugs and project slugs
  live in `services.ts` / `projects.ts`. Copy them exactly — never hand-type. The
  validator (step 5) rejects any unknown slug.

## 3. Draft the post
Create `src/content/blog/posts/<slug>.mdx` where `<slug>` is kebab-case from the
title and unique vs existing files. Frontmatter — exact keys and format:

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

Body rules (Markdown, not JSX — plain apostrophes/quotes are fine, no `&apos;`):
- 1,000–1,500 words. Clear `##` section headings. Buyer-intent, practical, honest.
- Include at least one FAQ-style Q&A section where natural.
- Internal links REQUIRED: >= 1 to a relevant `/services/<slug>`, >= 1 to a real
  `/portfolio/<slug>`, and >= 1 `/contact` call-to-action near the end. Prefer the
  services listed in the backlog item's `linkServices`.
- Voice: direct, senior-engineer, no hype, no emoji, no fabricated stats.
- The two existing posts are the canonical examples of tone, length, and structure.

## 4. Adversarial self-edit (a SEPARATE critical pass)
Re-read the draft as a skeptical editor trying to REJECT it. Fix anything you find:
- Any claim not grounded in `src/data/*`? Remove or rephrase.
- Off-brand, hypey, or padded? Tighten.
- Thin or duplicative vs existing posts? Re-angle or rewrite.
- Any internal link whose slug is not in `services.ts`/`projects.ts`? Fix it.

## 5. Validate (build gate — must pass before publishing)
Run, from the repo root:

    node scripts/validate-post.mjs src/content/blog/posts/<slug>.mdx
    npx tsc --noEmit
    npx next build

If ANY of these fail, fix the post and re-run. NEVER publish a post that fails the
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
