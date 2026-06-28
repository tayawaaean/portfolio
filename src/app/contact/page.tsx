import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ScrollReveal from "@/components/ui/ScrollReveal";

const DESCRIPTION =
  "Get in touch to hire Aean Tayawa for Next.js, React, and AI web app projects — available for remote freelance and contract work with clients in the US, Canada, and Europe.";

export const metadata: Metadata = {
  title: "Contact — Hire a Full-Stack Developer",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Hire a Full-Stack Developer | Aean Tayawa",
    description: DESCRIPTION,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SocialIcons />

      <div className="pt-24 pb-20 px-8 md:px-16 max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 italic">
            Contact Me
          </h1>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </main>
  );
}
