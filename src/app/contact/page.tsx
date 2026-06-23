import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | School Homework Helper",
  description: "Get in touch with School Homework Helper for support, feedback, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <PageLayout
      badge="Contact"
      title="Get in Touch"
      description="Have a question, suggestion, or feedback? We'd love to hear from you."
      backHref="/"
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <Mail className="h-8 w-8 text-sky-400" />
            <h3 className="mt-4 font-semibold text-white">Email Us</h3>
            <p className="mt-2 text-sm text-sky-200/60">For general inquiries and support.</p>
            <a
              href="mailto:hello@schoolhomeworkhelper.com"
              className="mt-3 inline-block text-sm font-medium text-orange-400 hover:underline"
            >
              hello@schoolhomeworkhelper.com
            </a>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <MapPin className="h-8 w-8 text-orange-400" />
            <h3 className="mt-4 font-semibold text-white">Location</h3>
            <p className="mt-2 text-sm text-sky-200/60">India</p>
            <p className="mt-1 text-xs text-sky-300/40">Serving students across India</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <MessageSquare className="h-8 w-8 text-sky-400" />
            <h3 className="mt-4 font-semibold text-white">Response Time</h3>
            <p className="mt-2 text-sm text-sky-200/60">
              We typically respond within 24–48 hours on business days.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </PageLayout>
  );
}
