export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** Short label used in cards/nav. */
  title: string;
  /** SEO <title> (brand suffix appended by the route). */
  metaTitle: string;
  metaDescription: string;
  /** Buyer-intent H1 for the page. */
  h1: string;
  tagline: string;
  keywords: string[];
  intro: string;
  problem: string;
  approach: string[];
  deliverables: string[];
  tech: string[];
  faqs: ServiceFaq[];
  /** Real project slugs from src/data/projects.ts to cross-link. */
  relatedProjectSlugs: string[];
}

export const services: Service[] = [
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    metaTitle: "Full-Stack Web Development Services — Next.js & React",
    metaDescription:
      "Hire a full-stack developer to design, build, and ship production web applications in Next.js, React, TypeScript, and Node.js — for startups and agencies in the US, Canada, and Europe.",
    h1: "Full-Stack Web Development",
    tagline: "Production web apps, owned end to end.",
    keywords: [
      "full stack web development",
      "hire next.js developer",
      "react developer for hire",
      "typescript web app developer",
    ],
    intro:
      "I design, build, and ship complete web applications — database and APIs through to a polished, fast front end — so you work with one accountable developer instead of stitching freelancers together.",
    problem:
      "Most projects stall in the gap between a designer's mockups and a working, deployed product. You need someone who can own the database schema, the API, the UI, and the deployment, and make decisions across all of them.",
    approach: [
      "Start with a short discovery call to pin down scope, users, and the core flows that actually drive value.",
      "Model the data and APIs first so the foundation is solid, then build the UI against real endpoints.",
      "Ship in clear phases with deliverables and a preview deployment at each milestone, so you see progress weekly.",
      "Hand off clean, documented code and a deployment you fully own — no lock-in.",
    ],
    deliverables: [
      "A deployed, production-ready web application",
      "Database schema, typed APIs, and authentication",
      "Responsive, accessible front end",
      "Source code, documentation, and handoff",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Tailwind CSS"],
    faqs: [
      {
        q: "Do you work with international clients?",
        a: "Yes — I work remotely with clients across the US, Canada, and Europe, with daily overlapping hours for calls and reviews.",
      },
      {
        q: "Can you take a project from idea to launch?",
        a: "Yes. I own the full lifecycle: planning, database, backend, frontend, and deployment, plus the handoff so your team can maintain it.",
      },
    ],
    relatedProjectSlugs: ["djp-athlete-platform", "mayhem-creations", "efficyon"],
  },
  {
    slug: "saas-marketplace-development",
    title: "SaaS & Marketplace Platforms",
    metaTitle: "SaaS & Marketplace Development — Multi-Tenant Platforms",
    metaDescription:
      "Build a SaaS or two-sided marketplace: multi-tenant architecture, subscription billing, booking flows, vendor onboarding, and payment splitting — by a developer who has shipped them in production.",
    h1: "SaaS & Marketplace Platform Development",
    tagline: "Two-sided platforms that handle the hard parts.",
    keywords: [
      "saas development",
      "marketplace developer",
      "two-sided marketplace",
      "multi-tenant saas",
      "subscription billing developer",
    ],
    intro:
      "I build the parts of a SaaS or marketplace that are genuinely hard: multi-role access, subscription billing, booking and negotiation flows, vendor onboarding, and splitting payments between parties.",
    problem:
      "Marketplaces and SaaS products fail on the edge cases — declined bookings, refunds, role permissions, payout timing. Off-the-shelf tools cover the demo but break on the real workflow.",
    approach: [
      "Map every role and state (buyer, seller, admin) and the full lifecycle before writing code.",
      "Build subscription or commission billing with Stripe, including the failure paths.",
      "Design the data model for multi-tenancy and permissions from day one.",
      "Instrument the flows so you can see conversion and drop-off after launch.",
    ],
    deliverables: [
      "Multi-tenant or multi-role platform",
      "Subscription or commission billing",
      "Booking / order / negotiation flows",
      "Admin dashboard and reporting",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe Connect", "PostgreSQL", "Tailwind CSS"],
    faqs: [
      {
        q: "Can you handle marketplace payments and payouts?",
        a: "Yes — I use Stripe Connect for automated payment splitting and payouts, including handling declined requests, refunds, and edge cases.",
      },
      {
        q: "Have you built this before?",
        a: "Yes. I've shipped a curated booking marketplace and a multi-role salon CRM, among others — see the related case studies below.",
      },
    ],
    relatedProjectSlugs: [
      "entertainment-booking-marketplace",
      "salon-management",
      "job-referral-platform",
    ],
  },
  {
    slug: "payment-integration",
    title: "Stripe Payment Integration",
    metaTitle: "Stripe Payment Integration — Checkout, Connect & Billing",
    metaDescription:
      "Stripe integration done right: Checkout, Stripe Connect payment splitting, subscriptions, milestone payments, and invoicing — built to handle refunds, retries, and edge cases.",
    h1: "Stripe Payment Integration",
    tagline: "Payments that handle the unhappy path.",
    keywords: [
      "stripe integration developer",
      "stripe connect developer",
      "subscription billing",
      "payment integration",
    ],
    intro:
      "I integrate Stripe properly — not just the happy-path checkout, but subscriptions, Connect payment splitting, milestone payments, refunds, retries, and webhooks that stay consistent with your database.",
    problem:
      "Payment bugs are the most expensive bugs. A webhook missed, a refund mishandled, or a subscription state out of sync can mean lost revenue and angry customers.",
    approach: [
      "Map every money movement and state transition before integrating.",
      "Use webhooks as the source of truth and reconcile against your database.",
      "Build and test the failure paths: declines, refunds, disputes, retries.",
      "Add observability so you can see and debug every transaction.",
    ],
    deliverables: [
      "Stripe Checkout or Elements integration",
      "Subscriptions or Stripe Connect splitting",
      "Reliable webhook handling and reconciliation",
      "Invoicing and receipts",
    ],
    tech: ["Stripe", "Stripe Connect", "Next.js", "TypeScript", "Supabase"],
    faqs: [
      {
        q: "Can you split payments between multiple parties?",
        a: "Yes — Stripe Connect lets me route a single payment to multiple recipients (e.g. platform fee plus a vendor payout) automatically.",
      },
      {
        q: "Do you handle subscriptions and proration?",
        a: "Yes, including upgrades, downgrades, proration, trials, dunning, and cancellation flows.",
      },
    ],
    relatedProjectSlugs: [
      "entertainment-booking-marketplace",
      "djp-athlete-platform",
      "mayhem-creations",
    ],
  },
  {
    slug: "ai-integration",
    title: "AI Integration & LLM Features",
    metaTitle: "AI Integration Services — LLM Features & Automation",
    metaDescription:
      "Add real AI features to your product: LLM-powered content generation, classification, data analysis, and automation using the Claude and OpenAI APIs — built into production apps, not demos.",
    h1: "AI Integration & LLM Features",
    tagline: "AI features that ship, not science projects.",
    keywords: [
      "ai integration developer",
      "llm developer",
      "claude api developer",
      "openai integration",
      "ai automation",
    ],
    intro:
      "I add AI features that earn their place in a product — content generation, classification, matching, summarization, and automation — using the Claude and OpenAI APIs, wired into real workflows with guardrails.",
    problem:
      "AI demos are easy; AI in production is not. Without structure, prompts drift, costs balloon, and outputs can't be trusted. The hard part is making it reliable, reviewable, and cost-aware.",
    approach: [
      "Identify where AI actually adds value versus where deterministic code is better.",
      "Design prompts and schemas for structured, validated output.",
      "Add human-in-the-loop review where the stakes warrant it.",
      "Instrument cost and quality so the feature stays sustainable.",
    ],
    deliverables: [
      "LLM-powered feature integrated into your app",
      "Structured, validated AI output",
      "Optional human review dashboard",
      "Cost and quality monitoring",
    ],
    tech: ["Claude API", "OpenAI API", "Next.js", "TypeScript", "Supabase"],
    faqs: [
      {
        q: "Which AI models do you work with?",
        a: "Primarily the Claude and OpenAI APIs. I help choose the right model for the task based on quality, latency, and cost.",
      },
      {
        q: "Can you keep AI costs predictable?",
        a: "Yes — I instrument token usage, cache where possible, and pick model tiers per task so spend stays controlled.",
      },
    ],
    relatedProjectSlugs: [
      "ai-transcription-platform",
      "ai-email-marketing",
      "market-picking-assistant",
    ],
  },
  {
    slug: "progressive-web-apps",
    title: "Progressive Web App Development",
    metaTitle: "Progressive Web App Development — Native-Like, No App Store",
    metaDescription:
      "Build a Progressive Web App (PWA): a fast, installable, native-like experience across devices without App Store overhead or separate native codebases.",
    h1: "Progressive Web App Development",
    tagline: "Native-like, without the App Store tax.",
    keywords: [
      "progressive web app developer",
      "pwa development",
      "installable web app",
      "next.js pwa",
    ],
    intro:
      "I build Progressive Web Apps that feel native — installable, offline-capable, and fast on any device — without the cost and review overhead of maintaining separate iOS and Android codebases.",
    problem:
      "Native apps are expensive to build and maintain, and the App Store adds friction and fees. For many products, a PWA delivers the same experience at a fraction of the cost and reaches every platform from one codebase.",
    approach: [
      "Assess whether a PWA fits your product (most content and SaaS apps do).",
      "Build a fast, installable experience with offline support where it matters.",
      "Optimize for Core Web Vitals so it feels instant.",
      "Ship to one URL that works everywhere — no store approvals.",
    ],
    deliverables: [
      "Installable, offline-capable PWA",
      "Cross-platform from a single codebase",
      "Core Web Vitals optimization",
      "Push-ready architecture",
    ],
    tech: ["Next.js", "React", "TypeScript", "Service Workers", "Tailwind CSS"],
    faqs: [
      {
        q: "Will a PWA work on iPhone?",
        a: "Yes — PWAs install and run on iOS and Android. For most content and SaaS products the experience is indistinguishable from native.",
      },
      {
        q: "When should I choose native instead?",
        a: "When you need deep hardware features or platform-specific UX. I'll tell you honestly if native is the better fit for your case.",
      },
    ],
    relatedProjectSlugs: ["djp-athlete-platform"],
  },
  {
    slug: "gis-mapping",
    title: "GIS & Mapping Applications",
    metaTitle: "GIS & Mapping Development — Interactive Geospatial Apps",
    metaDescription:
      "Interactive maps and geospatial applications: Leaflet/MapBox mapping, heatmaps, geocoding, and location-based features — including a national platform adopted by a government department.",
    h1: "GIS & Mapping Applications",
    tagline: "Geospatial data people can actually use.",
    keywords: [
      "gis developer",
      "mapping application developer",
      "leaflet developer",
      "mapbox developer",
      "geospatial web app",
    ],
    intro:
      "I build interactive mapping and geospatial applications — heatmaps, geocoding, location-based search, and field data collection — that turn raw coordinates into something teams and the public can actually use.",
    problem:
      "Geospatial data is powerful but hard to present. Most teams have the data and no good way to explore it, filter it, or collect more of it from the field.",
    approach: [
      "Choose the right mapping stack (Leaflet or MapBox) for your data and budget.",
      "Build interactive layers, heatmaps, and filters that make the data explorable.",
      "Add geocoding and location search where users need it.",
      "Support field data collection with offline sync if needed.",
    ],
    deliverables: [
      "Interactive map application",
      "Heatmaps, layers, and filtering",
      "Geocoding and location search",
      "Optional field-collection mobile app",
    ],
    tech: ["Leaflet", "MapBox", "React", "Node.js", "MongoDB", "React Native"],
    faqs: [
      {
        q: "Have you built GIS apps in production?",
        a: "Yes — I built AREC GIS, a platform adopted by the Philippine Department of Energy to track renewable-energy systems nationwide. See the case study below.",
      },
      {
        q: "Can users collect data in the field?",
        a: "Yes — I can pair the web app with a mobile app that supports offline data collection and syncs when back online.",
      },
    ],
    relatedProjectSlugs: ["arec-gis-platform", "solar-calculator"],
  },
];
