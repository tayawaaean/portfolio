import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
