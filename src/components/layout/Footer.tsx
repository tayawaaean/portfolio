import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { socials } from "@/data/socials";
import { SITE_NAME } from "@/lib/site";

// Server component: site-wide footer providing crawlable internal links,
// a contentinfo landmark, and the full social set (incl. GitHub, which the
// floating SocialIcons widget omits).
const iconMap: Record<string, React.ElementType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  github: FaGithub,
};

const nav = [
  { href: "/about", label: "About Aean" },
  { href: "/services", label: "Web development services" },
  { href: "/portfolio", label: "Project case studies" },
  { href: "/blog", label: "Blog & guides" },
  { href: "/contact", label: "Start a project" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-10">
          {/* Identity */}
          <div>
            <p className="font-display text-xl font-bold text-white">
              {SITE_NAME}
            </p>
            <p className="text-gray-500 text-sm mt-3 max-w-xs leading-relaxed">
              Full-stack Next.js, React &amp; AI developer building
              production-ready web apps for clients across the US, Canada &amp;
              Europe.
            </p>
            <div className="flex items-center gap-4 mt-5">
              {socials.map((s) => {
                const Icon = iconMap[s.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE_NAME} on ${s.name}`}
                    className="text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore nav */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-600 mb-1">
              Explore
            </p>
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300 w-fit"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Availability */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-600 mb-1">
              Availability
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Open to remote full-stack &amp; Next.js projects worldwide. Based
              in the Philippines (GMT+8) with daily overlap for US &amp; EU
              hours.
            </p>
            <Link
              href="/contact"
              className="text-white text-sm underline underline-offset-4 hover:text-gray-300 transition-colors w-fit"
            >
              Get in touch &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs font-mono">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
