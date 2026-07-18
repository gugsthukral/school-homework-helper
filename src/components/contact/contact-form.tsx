"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { inputClassName, labelClassName } from "@/lib/tool-form-config";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "We could not send your message.");
      }

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not send your message. Please try again."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="glass-card rounded-2xl p-8 text-center" role="status">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <Send className="h-7 w-7 text-green-500" />
        </div>
        <h3 className="page-title mt-4 text-xl font-semibold">Message sent</h3>
        <p className="page-description mt-2 text-sm">
          Thanks for contacting us. We&apos;ll reply to the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-orange-400 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
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
            maxLength={254}
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
          minLength={10}
          maxLength={5000}
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={cn(inputClassName, "resize-none")}
          placeholder="How can we help you?"
        />
      </div>

      {status === "error" ? (
        <p className="theme-error-banner rounded-xl border px-4 py-3 text-sm" role="alert">
          {error}{" "}
          <a href="mailto:hello@schoolhomeworkhelper.com" className="font-medium underline">
            Email us directly
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send className="h-5 w-5" />
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      <p className="text-xs text-slate-400">
        You can also email us directly at{" "}
        <a href="mailto:hello@schoolhomeworkhelper.com" className="text-orange-400 hover:underline">
          hello@schoolhomeworkhelper.com
        </a>
        .
      </p>
    </form>
  );
}
