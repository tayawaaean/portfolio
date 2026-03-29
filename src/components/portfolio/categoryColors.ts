export interface CategoryColorSet {
  primary: string;
  secondary: string;
  accent: string;
}

const categoryMap: [string, CategoryColorSet][] = [
  ["Fitness", { primary: "139,92,246", secondary: "59,130,246", accent: "168,85,247" }],
  ["Sports", { primary: "34,197,94", secondary: "16,185,129", accent: "52,211,153" }],
  ["HR Tech", { primary: "244,63,94", secondary: "251,113,133", accent: "236,72,153" }],
  ["Recruitment", { primary: "244,63,94", secondary: "251,113,133", accent: "236,72,153" }],
  ["Marketing", { primary: "245,158,11", secondary: "251,191,36", accent: "234,179,8" }],
  ["Entertainment", { primary: "236,72,153", secondary: "219,39,119", accent: "244,114,182" }],
  ["Energy", { primary: "34,197,94", secondary: "22,163,74", accent: "74,222,128" }],
  ["Government", { primary: "34,197,94", secondary: "22,163,74", accent: "74,222,128" }],
  ["Solar", { primary: "245,158,11", secondary: "234,179,8", accent: "251,191,36" }],
  ["E-Commerce", { primary: "249,115,22", secondary: "251,146,60", accent: "234,88,12" }],
  ["SaaS", { primary: "99,102,241", secondary: "129,140,248", accent: "79,70,229" }],
  ["Productivity", { primary: "99,102,241", secondary: "129,140,248", accent: "79,70,229" }],
  ["AI", { primary: "129,140,248", secondary: "168,85,247", accent: "139,92,246" }],
  ["Review", { primary: "59,130,246", secondary: "96,165,250", accent: "37,99,235" }],
  ["Data Analytics", { primary: "6,182,212", secondary: "34,211,238", accent: "8,145,178" }],
  ["Beauty", { primary: "244,114,182", secondary: "236,72,153", accent: "219,39,119" }],
  ["Salon", { primary: "244,114,182", secondary: "236,72,153", accent: "219,39,119" }],
  ["Marketplace", { primary: "168,85,247", secondary: "139,92,246", accent: "192,132,252" }],
];

const fallback: CategoryColorSet = { primary: "99,102,241", secondary: "129,140,248", accent: "79,70,229" };

export function getCategoryColors(category: string): CategoryColorSet {
  const lower = category.toLowerCase();
  for (const [key, colors] of categoryMap) {
    if (lower.includes(key.toLowerCase())) return colors;
  }
  return fallback;
}

export function getCategoryGradient(category: string): string {
  const c = getCategoryColors(category);
  return `radial-gradient(ellipse at 20% 50%, rgba(${c.primary},0.15), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(${c.secondary},0.1), transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(${c.accent},0.08), transparent 50%)`;
}

export function getCategoryAccentRgb(category: string): string {
  return getCategoryColors(category).primary;
}
