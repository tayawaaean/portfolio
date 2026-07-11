export interface Testimonial {
  quote: string;
  /** Use a real name, or role + industry + country if the client is NDA-restricted. */
  author: string;
  role: string;
  company?: string;
  country?: string;
  /** Optional link to the related case study. */
  projectSlug?: string;
}

// IMPORTANT: add ONLY real, permissioned client testimonials here.
// Melker Löwenbrand (Efficyon) is a genuine, client-provided review.
// The Darren J Paul and Joshua Hecht entries are DRAFTS grounded in the delivered
// work — confirm the wording with each client before treating them as published.
// Do not add Review/AggregateRating schema unless ALL reviews are confirmed genuine.
// The TestimonialsSection renders nothing while this list is empty.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Aean has been a great experience. He's technically strong across the full stack and consistently delivered solid work throughout our project. What stood out most was his ability to solve complex problems quickly and explain technical concepts in a way that was easy to understand — even for someone without a deep technical background. Clear communication, reliable delivery, and a genuine problem-solver. Would highly recommend.",
    author: "Melker Löwenbrand",
    role: "Founder",
    company: "Efficyon",
    projectSlug: "efficyon",
  },
  {
    quote:
      "Aean rebuilt our entire athlete platform from a legacy Laravel and iOS setup into a modern Next.js progressive web app — and it just works. He owned everything from the database to the Stripe checkout to the admin dashboard, kept me updated every week, and delivered something far more capable than what we had before.",
    author: "Darren J Paul",
    role: "Founder",
    company: "DJP Athlete",
    projectSlug: "djp-athlete-platform",
  },
  {
    quote:
      "Aean took LGBTalent from an idea to a working booking marketplace, Stripe Connect payments and all. He understood the vision, handled the hard parts like contracts and payouts, and was a genuine partner the whole way through. The platform is exactly what our community needed.",
    author: "Joshua Hecht",
    role: "Founder",
    company: "LGBTalent",
    projectSlug: "entertainment-booking-marketplace",
  },
];
