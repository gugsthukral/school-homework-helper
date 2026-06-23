"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { inputClassName, labelClassName } from "@/lib/tool-form-config";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <Send className="h-7 w-7 text-green-400" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Message Sent!</h3>
        <p className="mt-2 text-sm text-sky-200/60">
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-6 text-sm font-medium text-orange-400 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClassName}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClassName}>
          Subject
        </label>
        <select
          id="subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClassName}
        >
          <option value="">Select a topic</option>
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="feedback">Feedback</option>
          <option value="partnership">Partnership / Schools</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={cn(inputClassName, "resize-none")}
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] sm:w-auto"
      >
        <Send className="h-5 w-5" />
        Send Message
      </button>
    </form>
  );
}
