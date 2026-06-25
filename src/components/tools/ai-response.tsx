"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { GlowButtonShell } from "@/components/motion-primitives/glow-button-shell";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { GlowCard } from "@/components/motion-primitives/glow-card";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";
import { formatResponse } from "@/lib/format-response";
import { GUEST_USAGE_LIMIT } from "@/lib/guest-usage-limit";
import { ResultExportActions } from "@/components/tools/result-export-actions";

type AIResponseCardProps = {
  response: string;
  title?: string;
  icon: LucideIcon;
  exportFileName?: string;
  exportSubtitle?: string;
  sharePath?: string;
};

export function AIResponseCard({
  response,
  title = "Your Result",
  icon: Icon,
  exportFileName,
  exportSubtitle,
  sharePath,
}: AIResponseCardProps) {
  const resolvedFileName = exportFileName ?? "ai-result";
  const [glowActive, setGlowActive] = useState(true);

  useEffect(() => {
    setGlowActive(true);
    const timer = window.setTimeout(() => setGlowActive(false), 3500);
    return () => window.clearTimeout(timer);
  }, [response]);

  return (
    <GlowCard active={glowActive}>
      <div className="glass-card animate-fade-up overflow-hidden rounded-2xl">
      <div className="border-b border-sky-400/10 bg-sky-400/5">
        <div className="flex items-center gap-3 px-4 pt-4 sm:px-6">
          <Icon className="h-5 w-5 shrink-0 text-sky-400" />
          <h2 className="font-semibold text-white">{title}</h2>
        </div>
        <div className="px-4 pb-4 pt-3 sm:px-6">
          <ResultExportActions
            content={response}
            fileName={resolvedFileName}
            title={title}
            subtitle={exportSubtitle}
            sharePath={sharePath}
          />
        </div>
      </div>
      <div
        className="prose-response space-y-1 px-4 py-5 text-sm leading-relaxed text-sky-100/90 sm:px-6 sm:text-base"
        dangerouslySetInnerHTML={{
          __html: `<p class='mb-2 text-sky-100/90'>${formatResponse(response)}</p>`,
        }}
      />
      </div>
    </GlowCard>
  );
}

const loadingShimmerClassName =
  "text-base font-medium [--base-color:#7dd3fc] [--base-gradient-color:#ffffff] dark:[--base-color:#7dd3fc] dark:[--base-gradient-color:#ffffff]";

export function AIToolLoadingCard({ message }: { message: string }) {
  return (
    <GlowCard active>
      <div className="glass-card px-6 py-12 text-center sm:px-8">
        <TextShimmer as="p" className={loadingShimmerClassName} duration={1.5}>
          {message}
        </TextShimmer>
      </div>
    </GlowCard>
  );
}

export function AIEmptyState({ message }: { message: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 text-center">
      <p className="text-sm text-sky-300/50">{message}</p>
    </div>
  );
}

export function AIErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      {message}
    </div>
  );
}

type AIToolStatusProps = {
  error?: string;
  signInRequired?: boolean;
  guestUsesRemaining?: number | null;
  isAuthenticated?: boolean;
};

export function AIToolStatus({
  error,
  signInRequired,
  guestUsesRemaining,
  isAuthenticated,
}: AIToolStatusProps) {
  return (
    <>
      {!isAuthenticated &&
        !signInRequired &&
        guestUsesRemaining != null &&
        guestUsesRemaining > 0 && (
        <div className="relative overflow-hidden rounded-xl border border-sky-400/20 bg-navy-900/60 px-4 py-3">
          <BorderTrail
            lengthRatio={0.5}
            thickness={3}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400"
          />
          <p className="relative z-10 text-sm text-sky-200/80">
            {guestUsesRemaining} of {GUEST_USAGE_LIMIT} free tries remaining without sign-in.
          </p>
        </div>
      )}

      {signInRequired && (
        <div className="rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-4 text-sm text-orange-100">
          <p className="font-medium text-orange-200">
            You&apos;ve used your {GUEST_USAGE_LIMIT} free tries.
          </p>
          <p className="mt-1 text-orange-100/90">
            Sign in with Google to keep using all AI tools for free.
          </p>
          <Link href="/signin" className="mt-3 inline-flex transition-transform hover:scale-[1.02]">
            <GlowButtonShell>
              <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white">
                <LogIn className="h-4 w-4" />
                Sign In to Continue
              </span>
            </GlowButtonShell>
          </Link>
        </div>
      )}

      {error && !signInRequired && <AIErrorBanner message={error} />}
    </>
  );
}
