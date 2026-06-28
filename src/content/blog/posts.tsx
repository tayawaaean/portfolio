import type { ReactNode } from "react";

export interface Post {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingMinutes: number;
  keywords: string[];
  body: ReactNode;
}

// Seed posts — starter drafts written to target buyer-journey queries.
// Expand and edit in your own voice; add more entries over time.
export const posts: Post[] = [
  {
    slug: "how-to-hire-a-full-stack-developer",
    title: "How to Hire a Full-Stack Developer for Your Startup",
    description:
      "A practical guide for founders hiring a full-stack developer: what the role really covers, how to evaluate candidates in one call, the red flags to watch for, and how to work across time zones.",
    excerpt:
      "What 'full-stack' should actually mean, how to evaluate a candidate in a single call, and the red flags that save you months of rework.",
    date: "2026-06-15",
    readingMinutes: 6,
    keywords: [
      "hire full stack developer",
      "hire next.js developer",
      "hiring a remote developer",
      "freelance developer for startup",
    ],
    body: (
      <>
        <p>
          Hiring your first developer is one of the highest-leverage decisions a
          founder makes. Get it right and you ship a real product in weeks. Get
          it wrong and you spend months untangling code you can&apos;t maintain.
          Here is how to evaluate a full-stack developer without being technical
          yourself.
        </p>

        <h2>What &ldquo;full-stack&rdquo; should actually mean</h2>
        <p>
          A real full-stack developer can own a feature end to end: the database
          schema, the API, the user interface, and the deployment. The value
          isn&apos;t that they know every framework — it&apos;s that they can
          make decisions across all those layers without waiting on three other
          people. For an early-stage product, that single-owner accountability
          is worth more than deep specialization.
        </p>

        <h2>How to evaluate a candidate in one call</h2>
        <p>
          You don&apos;t need to read code to judge a developer. Ask them to walk
          you through a project they shipped and listen for these things:
        </p>
        <ul>
          <li>
            Can they explain a technical decision in plain language and the
            trade-off behind it?
          </li>
          <li>
            Do they talk about the <em>users</em> and the business problem, or
            only the technology?
          </li>
          <li>
            Did they handle the unglamorous parts — payments, edge cases,
            deployment, handoff — or just the happy path?
          </li>
          <li>Can you see the work live, and does it actually function?</li>
        </ul>

        <h2>Red flags worth a month of rework</h2>
        <ul>
          <li>
            No deployed work to show. A portfolio of private repos and
            screenshots is far weaker than something you can click.
          </li>
          <li>
            Vague answers about who owns the code and the accounts. You should
            own your repository, your database, and your domain — full stop.
          </li>
          <li>
            No mention of testing, documentation, or handoff. That&apos;s how you
            end up locked in.
          </li>
        </ul>

        <h2>Working across time zones</h2>
        <p>
          Plenty of excellent developers work remotely from outside your
          country, and the cost difference can be significant. The thing that
          actually matters is overlap and communication: a few hours of shared
          working time for calls and reviews, written updates you can follow, and
          a clear milestone plan. Time zone is a logistics question, not a
          quality one.
        </p>

        <h2>The bottom line</h2>
        <p>
          Hire for ownership and communication over a specific framework. The
          best signal is simple: can they show you something real, explain why
          they built it that way, and tell you honestly what they&apos;d do
          differently. If you want to talk through a project, get in touch —
          I&apos;m happy to give you a candid read on scope and approach.
        </p>
      </>
    ),
  },
  {
    slug: "building-a-stripe-connect-marketplace",
    title: "Building a Stripe Connect Marketplace: What It Actually Takes",
    description:
      "A grounded look at building a two-sided marketplace with Stripe Connect — the flows you must get right, where teams get burned, and a realistic timeline from a developer who has shipped one.",
    excerpt:
      "Marketplaces are harder than they look. Here are the Stripe Connect flows you must get right and where most teams get burned.",
    date: "2026-06-22",
    readingMinutes: 7,
    keywords: [
      "stripe connect marketplace",
      "build a marketplace",
      "two-sided marketplace development",
      "marketplace payments",
    ],
    body: (
      <>
        <p>
          A marketplace looks simple from the outside: buyers on one side,
          sellers on the other, payments in the middle. The reality is that the
          middle is where almost all the engineering effort goes — and where
          marketplaces quietly lose money when it&apos;s done carelessly.
        </p>

        <h2>Why marketplaces are harder than they look</h2>
        <p>
          A normal store moves money from a customer to you. A marketplace moves
          money from a customer to <em>someone else</em>, takes a cut, and has to
          handle refunds, disputes, payout timing, and tax across all of it. Each
          of those is a state machine with failure paths, and your database has
          to stay consistent with what actually happened at the payment provider.
        </p>

        <h2>Stripe Connect in one paragraph</h2>
        <p>
          Stripe Connect lets a platform onboard sellers, accept a payment from a
          buyer, automatically split it (your fee plus the seller&apos;s payout),
          and handle the seller&apos;s compliance and bank details. It removes an
          enormous amount of work — but you still have to design the flows around
          it correctly.
        </p>

        <h2>The flows you must get right</h2>
        <ul>
          <li>
            <strong>Onboarding:</strong> sellers must complete Stripe&apos;s
            verification before they can be paid. Your UI has to handle the
            &ldquo;not yet ready&rdquo; state gracefully.
          </li>
          <li>
            <strong>The split:</strong> decide application fees versus separate
            transfers, and make it auditable.
          </li>
          <li>
            <strong>Refunds and disputes:</strong> who eats the cost, and how does
            it reflect in the seller&apos;s balance?
          </li>
          <li>
            <strong>Webhooks as truth:</strong> treat Stripe webhooks as the
            source of truth and reconcile your database against them — never
            assume a client-side success means the money moved.
          </li>
        </ul>

        <h2>Where teams get burned</h2>
        <ul>
          <li>
            Building the happy path only, then discovering refunds and declined
            payouts in production.
          </li>
          <li>
            Storing payment state in their own database and letting it drift out
            of sync with Stripe.
          </li>
          <li>
            Underestimating onboarding friction and losing sellers before they
            can transact.
          </li>
        </ul>

        <h2>A realistic timeline</h2>
        <p>
          A functional Connect marketplace MVP — onboarding, a booking or order
          flow, split payments, and a basic admin view — is typically a few weeks
          of focused work, not a weekend. The payment plumbing is the part to
          never rush; it&apos;s the part that costs real money when it breaks.
        </p>

        <p>
          I&apos;ve built a curated booking marketplace on Stripe Connect with
          automated payment splitting and travel coordination. If you&apos;re
          planning something similar, reach out and I&apos;ll walk you through the
          flows that matter for your specific model.
        </p>
      </>
    ),
  },
];
