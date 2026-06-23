"use client";

import { useCallback, useEffect, useState } from "react";
import type { EnrichedScienceProject } from "@/lib/science-projects-types";

type GuestUsageState = {
  authenticated: boolean;
  remaining: number | null;
  limitReached: boolean;
};

export function useAITool(apiPath: string) {
  const [response, setResponse] = useState("");
  const [projects, setProjects] = useState<EnrichedScienceProject[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInRequired, setSignInRequired] = useState(false);
  const [guestUsage, setGuestUsage] = useState<GuestUsageState>({
    authenticated: false,
    remaining: null,
    limitReached: false,
  });

  const refreshGuestUsage = useCallback(async () => {
    try {
      const res = await fetch("/api/guest-usage");
      const data = await res.json();

      if (data.authenticated) {
        setGuestUsage({ authenticated: true, remaining: null, limitReached: false });
        setSignInRequired(false);
        return;
      }

      setGuestUsage({
        authenticated: false,
        remaining: data.remaining ?? null,
        limitReached: Boolean(data.limitReached),
      });
      setSignInRequired(Boolean(data.limitReached));
    } catch {
      // Ignore — guest hint is optional
    }
  }, []);

  useEffect(() => {
    refreshGuestUsage();
  }, [refreshGuestUsage]);

  async function submit(body: Record<string, unknown>) {
    setError("");
    setResponse("");
    setProjects(null);
    setSignInRequired(false);
    setLoading(true);

    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.signInRequired) {
          setSignInRequired(true);
          setGuestUsage((prev) => ({ ...prev, limitReached: true, remaining: 0 }));
          return;
        }
        throw new Error(data.error ?? "Request failed.");
      }

      setResponse(data.response);

      if (Array.isArray(data.projects)) {
        setProjects(data.projects as EnrichedScienceProject[]);
      }

      if (typeof data.guestUsesRemaining === "number") {
        const limitReached = data.guestUsesRemaining <= 0;
        setGuestUsage({
          authenticated: false,
          remaining: data.guestUsesRemaining,
          limitReached,
        });
        if (limitReached) {
          setSignInRequired(true);
        }
      } else {
        setGuestUsage({ authenticated: true, remaining: null, limitReached: false });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return {
    response,
    projects,
    error,
    loading,
    submit,
    setResponse,
    signInRequired,
    guestUsesRemaining: guestUsage.remaining,
    guestLimitReached: guestUsage.limitReached,
    isAuthenticated: guestUsage.authenticated,
  };
}
