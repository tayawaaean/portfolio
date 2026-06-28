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
// The two below are DRAFTS grounded in the delivered work — confirm the wording
// with each client before treating them as published, genuine quotes.
// Do not add Review/AggregateRating schema unless the reviews are genuine.
// The TestimonialsSection renders nothing while this list is empty.
export const testimonials: Testimonial[] = [
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
