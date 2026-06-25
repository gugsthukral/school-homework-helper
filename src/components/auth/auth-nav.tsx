"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export function AuthNav() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return <div className="hidden h-9 w-24 animate-pulse rounded-full bg-slate-200 md:block" />;
  }

  if (user) {
    const avatar =
      user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null;
    const name =
      user.user_metadata?.full_name ??
      user.user_metadata?.name ??
      user.email?.split("@")[0];

    return (
      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-2">
          {avatar ? (
            <Image
              src={avatar}
              alt={name ?? "User"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full ring-2 ring-sky-400/30"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400/20">
              <User className="h-4 w-4 text-sky-400" />
            </span>
          )}
          <span className="max-w-[120px] truncate text-sm text-slate-700">{name}</span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-500"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-3 md:flex">
      <Link
        href="/signin"
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
      >
        Sign In
      </Link>
      <Link
        href="/signin"
        className="rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-orange-500/40"
      >
        Sign Up Free
      </Link>
    </div>
  );
}

export function AuthNavMobile({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    onClose();
    window.location.href = "/";
  }

  if (user) {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        className="mt-2 rounded-full border border-sky-400/30 px-5 py-2.5 text-center text-sm font-medium text-slate-700"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link
      href="/signin"
      onClick={onClose}
      className="mt-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2.5 text-center text-sm font-semibold text-white"
    >
      Sign In with Google
    </Link>
  );
}
