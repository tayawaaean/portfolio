"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const contacts = [
  {
    icon: Mail,
    label: "tayawaaean@gmail.com",
    href: "mailto:tayawaaean@gmail.com",
  },
  {
    icon: FaGithub,
    label: "GitHub: @tayawaaean",
    href: "https://github.com/tayawaaean",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn: Aean Gabrielle D. Tayawa",
    href: "https://linkedin.com/in/aeantayawa",
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-xl font-bold text-white mb-6">Get in Touch</h2>
      <div className="space-y-5">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <Icon
                size={18}
                className="text-gray-500 group-hover:text-white transition-colors"
              />
              <span className="text-sm">{contact.label}</span>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}
