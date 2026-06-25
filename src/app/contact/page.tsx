import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { ContactForm } from "@/components/contact/contact-form";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.contact);

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
            <h3 className="mt-4 font-semibold text-slate-900">Email Us</h3>
            <p className="mt-2 text-sm text-slate-500">For general inquiries and support.</p>
            <a
              href="mailto:hello@schoolhomeworkhelper.com"
              className="mt-3 inline-block text-sm font-medium text-orange-400 hover:underline"
            >
              hello@schoolhomeworkhelper.com
            </a>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <MapPin className="h-8 w-8 text-orange-400" />
            <h3 className="mt-4 font-semibold text-slate-900">Location</h3>
            <p className="mt-2 text-sm text-slate-500">India</p>
            <p className="mt-1 text-xs text-slate-400">Serving students across India</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <MessageSquare className="h-8 w-8 text-sky-400" />
            <h3 className="mt-4 font-semibold text-slate-900">Response Time</h3>
            <p className="mt-2 text-sm text-slate-500">
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
