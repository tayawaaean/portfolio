// Single source of truth for the production origin and brand strings.
// Override per-environment with NEXT_PUBLIC_SITE_URL (set in Vercel project env);
// falls back to the production domain so builds never emit localhost URLs.
// Canonical host is the WWW subdomain because the deployment redirects the
// apex (agdtayawa.xyz) -> www.agdtayawa.xyz. Keeping this in sync avoids
// redirecting sitemap/canonical URLs that Search Console refuses to fetch.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.agdtayawa.xyz";

export const SITE_NAME = "Aean Gabrielle D. Tayawa";
export const SITE_SHORT_NAME = "Aean Tayawa";
