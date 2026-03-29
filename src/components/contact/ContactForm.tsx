"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <input
          type="text"
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={status === "sending"}
          className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors duration-300 placeholder:text-gray-500 disabled:opacity-50"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={status === "sending"}
          className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors duration-300 placeholder:text-gray-500 disabled:opacity-50"
        />
      </div>
      <div>
        <textarea
          placeholder="Message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          disabled={status === "sending"}
          className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors duration-300 resize-none placeholder:text-gray-500 disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="w-full bg-white text-black font-bold py-3 text-sm tracking-wider uppercase hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "sending" && (
          <>
            Sending
            <Loader2 size={14} className="animate-spin" />
          </>
        )}
        {status === "sent" && (
          <>
            Sent
            <Check size={14} />
          </>
        )}
        {status === "idle" && (
          <>
            Send
            <Send size={14} />
          </>
        )}
        {status === "error" && (
          <>
            Try Again
            <Send size={14} />
          </>
        )}
      </button>

      {status === "sent" && (
        <p className="text-emerald-400 text-xs text-center font-mono tracking-wider">
          Message sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs text-center font-mono tracking-wider">
          Something went wrong. Please try again.
        </p>
      )}
    </motion.form>
  );
}
