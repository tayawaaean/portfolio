# Activating the weekly blog automation

The scalable setup is a **GitHub Actions** workflow ([.github/workflows/blog.yml](../../.github/workflows/blog.yml))
that runs weekly, generates one post on your **Claude Max subscription** (no API
bill), and pushes it (Vercel auto-deploys). It needs **no personal access token** —
the workflow's built-in `GITHUB_TOKEN` already has write access to this repo.

## One-time setup (≈2 minutes)

1. **Mint a subscription token** (locally, requires Pro/Max — does NOT use an API key):

   ```bash
   claude setup-token
   ```

   Copy the token it prints (valid ~1 year).

2. **Add it as a GitHub Actions secret:**
   - Repo → **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `CLAUDE_CODE_OAUTH_TOKEN`
   - Value: the token from step 1
   - Make sure there is **no** `ANTHROPIC_API_KEY` secret (it would override the
     subscription and bill per token).

3. **Test it now** (don't wait for Monday):
   - Repo → **Actions → "Weekly autonomous SEO blog post" → Run workflow**.
   - Watch the run; on success a new post lands on `main` and Vercel deploys.

That's it. After this it runs every **Monday 09:00 Asia/Singapore** on its own.

## Why this design

- **No PAT to manage** — `GITHUB_TOKEN` is auto-scoped to this repo and rotates itself.
- **Free generation** — runs on your Max plan via the OAuth token, not a metered API key.
- **Free to run** — Actions minutes are unlimited on public repos and have a generous
  monthly free quota on private repos (a weekly job uses a few minutes).
- **Reversible** — one post = one commit (`git revert` to undo).

## Control & maintenance

- **Steer topics:** edit `src/content/blog/backlog.yaml` (add/reorder/remove `pending` topics).
- **Pause:** set `paused: true` in `backlog.yaml` and commit.
- **Cadence:** change the `cron` in `.github/workflows/blog.yml`.
- **Token renewal:** the subscription token expires after ~1 year — re-run
  `claude setup-token` and update the secret. (Set a reminder.)

## Notes / status

- The earlier **claude.ai cloud routine** (`trig_011ZfD1o64H8jwk78N8Wxzsk`) was the first
  attempt; it could generate but its sandbox has read-only git (push 403). It has been
  **disabled** in favor of this Actions workflow. The local `.env.local` `BLOG_BOT_TOKEN`
  PAT is no longer needed for this setup.
