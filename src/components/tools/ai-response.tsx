import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { LogIn } from "lucide-react";
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

  return (
    <div className="glass-card animate-fade-up overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-400/10 bg-sky-400/5 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Icon className="h-5 w-5 shrink-0 text-sky-400" />
          <h2 className="font-semibold text-white">{title}</h2>
        </div>
        <ResultExportActions
          content={response}
          fileName={resolvedFileName}
          title={title}
          subtitle={exportSubtitle}
          sharePath={sharePath}
          className="w-full sm:w-auto"
        />
      </div>
      <div
        className="prose-response space-y-1 px-4 py-5 text-sm leading-relaxed text-sky-100/90 sm:px-6 sm:text-base"
        dangerouslySetInnerHTML={{
          __html: `<p class='mb-2 text-sky-100/90'>${formatResponse(response)}</p>`,
        }}
      />
    </div>
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
        <p className="rounded-xl border border-sky-400/20 bg-sky-400/5 px-4 py-3 text-sm text-sky-200/80">
          {guestUsesRemaining} of {GUEST_USAGE_LIMIT} free tries remaining without sign-in.
        </p>
      )}

      {signInRequired && (
        <div className="rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-4 text-sm text-orange-100">
          <p className="font-medium text-orange-200">
            You&apos;ve used your {GUEST_USAGE_LIMIT} free tries.
          </p>
          <p className="mt-1 text-orange-100/90">
            Sign in with Google to keep using all AI tools for free.
          </p>
          <Link
            href="/signin"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
          >
            <LogIn className="h-4 w-4" />
            Sign In to Continue
          </Link>
        </div>
      )}

      {error && !signInRequired && <AIErrorBanner message={error} />}
    </>
  );
}
