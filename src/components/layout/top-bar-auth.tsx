"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type TopBarAuthProps = {
  compact?: boolean;
  variant?: "light" | "dark";
};

export function TopBarAuth({ compact = false, variant = "light" }: TopBarAuthProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const isDark = variant === "dark";
  const linkClass = isDark
    ? "text-sky-300 transition-colors hover:text-orange-400"
    : "text-slate-600 transition-colors hover:text-orange-500";
  const nameClass = isDark ? "text-sky-200" : "text-slate-600";
  const skeletonClass = isDark ? "bg-navy-800" : "bg-slate-200";

  if (!ready) {
    return (
      <div className="flex h-8 items-center gap-2 sm:gap-3" aria-hidden>
        <span className={cn("h-4 w-14 rounded", skeletonClass)} />
        <span className={cn("h-4 w-16 rounded", skeletonClass)} />
      </div>
    );
  }

  if (user) {
    const avatar = user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null;
    const name =
      user.user_metadata?.full_name ??
      user.user_metadata?.name ??
      user.email?.split("@")[0];

    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          {avatar ? (
            <Image
              src={avatar}
              alt={name ?? "User"}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full ring-2 ring-sky-400/30"
            />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-400/20">
              <User className="h-3.5 w-3.5 text-sky-400" />
            </span>
          )}
          {!compact && (
            <span className={cn("hidden max-w-[100px] truncate text-xs sm:inline sm:max-w-[120px] sm:text-sm", nameClass)}>
              {name}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className={cn("flex items-center gap-1 text-xs font-medium sm:text-sm", linkClass)}
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Link href="/signin" className={cn("text-xs font-medium sm:text-sm", linkClass)}>
        Sign In
      </Link>
      <Link
        href="/signin"
        className="rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-1 text-xs font-semibold text-white shadow-md shadow-orange-500/20 transition-opacity hover:opacity-90 sm:px-4 sm:py-1.5 sm:text-sm"
      >
        Sign Up
      </Link>
    </div>
  );
}
