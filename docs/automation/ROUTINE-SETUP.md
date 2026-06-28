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

## What's already done (no action needed)
- MDX blog rendering (`next-mdx-remote-client`), the post loader, sitemap + index
  wired to it, the two seed posts migrated and expanded.
- The topic backlog (`src/content/blog/backlog.yaml`) with 8 seeded buyer-intent
  topics and the `paused` kill switch.
- The validator (`scripts/validate-post.mjs`) + tests, and the agent playbook
  (`docs/automation/blog-playbook.md`).
