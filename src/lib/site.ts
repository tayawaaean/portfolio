// Single source of truth for the production origin and brand strings.
// Override per-environment with NEXT_PUBLIC_SITE_URL (set in Vercel project env);
// falls back to the production domain so builds never emit localhost URLs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://agdtayawa.xyz";

export const SITE_NAME = "Aean Gabrielle D. Tayawa";
export const SITE_SHORT_NAME = "Aean Tayawa";
