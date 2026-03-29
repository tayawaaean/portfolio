"use client";

import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { socials } from "@/data/socials";

const iconMap: Record<string, React.ElementType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
};

export default function SocialIcons() {
  const displayed = socials.filter((s) => s.icon in iconMap);

  return (
    <div className="fixed bottom-8 right-8 z-30 hidden md:flex items-center gap-5">
      {displayed.map((social) => {
        const Icon = iconMap[social.icon];
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label={social.name}
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
