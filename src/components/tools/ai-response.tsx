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
        <div className="border-b border-slate-100 bg-white px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-orange-50 ring-1 ring-slate-100">
              <Icon className="h-5 w-5 text-orange-500" />
            </span>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </div>
          <div className="mt-4">
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
          className="prose-response border-t border-slate-100 bg-slate-50/50 px-4 py-5 text-sm leading-relaxed text-slate-700 sm:px-6 sm:text-base"
          dangerouslySetInnerHTML={{
            __html: `<p class='mb-2 text-slate-700'>${formatResponse(response)}</p>`,
          }}
        />
      </div>
    </GlowCard>
  );
}

const loadingShimmerClassName =
  "text-base font-medium [--base-color:#f97316] [--base-gradient-color:#0a1628]";

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
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}

export function AIErrorBanner({ message }: { message: string }) {
  return (
    <div className="theme-error-banner rounded-xl border px-4 py-3 text-sm">
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
        <div className="theme-guest-banner relative w-full max-w-[50%] overflow-hidden rounded-xl border px-4 py-3">
          <BorderTrail
            lengthRatio={0.5}
            thickness={3}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400"
          />
          <p className="theme-guest-banner-text relative z-10 text-sm">
            {guestUsesRemaining} of {GUEST_USAGE_LIMIT} free tries remaining without sign-in.
          </p>
        </div>
      )}

      {signInRequired && (
        <div className="theme-signin-banner w-full max-w-[50%] rounded-xl border px-4 py-4 text-sm">
          <p className="theme-signin-banner-title font-medium">
            You&apos;ve used your {GUEST_USAGE_LIMIT} free tries.
          </p>
          <p className="theme-signin-banner-text mt-1">
            Sign in with Google to keep using all AI tools for free.
          </p>
          <Link href="/signin" className="mt-3 inline-flex transition-transform hover:scale-[1.02]">
            <GlowButtonShell>
              <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold">
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
