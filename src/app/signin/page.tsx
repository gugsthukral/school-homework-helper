import type { Metadata } from "next";
import Link from "next/link";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { SiteLogo } from "@/components/layout/site-logo";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.signin);

type Props = { searchParams: Promise<{ error?: string }> };

export default async function SignInPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <SiteLogo className="mx-auto object-center md:object-left" />
          </Link>
          <h1 className="page-title mt-6 text-2xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in or create an account with Google to save your progress.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              Sign in failed. Please try again.
            </div>
          )}

          <GoogleSignInButton label="Sign in with Google" />

          <p className="mt-6 text-center text-xs text-slate-400">
            We only support Google sign-in. By continuing, you agree to our Terms of Service.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/" className="text-orange-400 hover:underline">
            Continue without signing in
          </Link>
        </p>
      </div>
    </div>
  );
}
