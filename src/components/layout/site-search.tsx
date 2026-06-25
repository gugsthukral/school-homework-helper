"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Calculator, GraduationCap, Layers, Search, X } from "lucide-react";
import {
  searchSite,
  searchTypeLabels,
  type SearchResult,
  type SearchResultType,
} from "@/lib/search-index";
import { cn } from "@/lib/utils";

const typeIcons: Record<SearchResultType, typeof Search> = {
  blog: BookOpen,
  tool: Calculator,
  class: GraduationCap,
  subject: Layers,
  chapter: BookOpen,
  page: Search,
};

type SiteSearchProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function SiteSearch({ variant = "desktop", onNavigate }: SiteSearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(0);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      close();
      onNavigate?.();
      router.push(href);
    },
    [close, onNavigate, router]
  );

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    setResults(searchSite(query));
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [close, open]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      navigate(results[activeIndex].href);
    }
  };

  if (variant === "mobile" && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-orange-500"
      >
        <Search className="h-4 w-4" />
        Search site...
      </button>
    );
  }

  return (
    <>
      {variant === "desktop" && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="site-search-trigger flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:border-orange-300 hover:text-orange-400"
          aria-label="Search site"
          title="Search (Ctrl+K)"
        >
          <Search className="h-4 w-4" />
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/40 px-3 pt-[10.5rem] backdrop-blur-sm sm:px-4 sm:pt-[11.75rem] md:pt-[12.5rem]">
          <div
            ref={panelRef}
            className="site-search-panel w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-sky-500" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search classes, subjects, chapters, blog, tools..."
                className="site-search-input flex-1 bg-transparent text-sm outline-none"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
              {query.trim().length < 2 ? (
                <p className="px-3 py-6 text-center text-sm text-slate-400">
                  Type at least 2 characters to search. Try &quot;class 10 maths&quot;, &quot;essay&quot;, or a chapter name.
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-slate-400">
                  No results for &quot;{query}&quot;. Try a different keyword.
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((result, index) => {
                    const Icon = typeIcons[result.type];
                    return (
                      <li key={`${result.type}-${result.href}-${result.title}`}>
                        <button
                          type="button"
                          onClick={() => navigate(result.href)}
                          className={cn(
                            "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                            index === activeIndex
                              ? "bg-orange-50 text-orange-900"
                              : "text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50">
                            <Icon className="h-4 w-4 text-sky-500" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-sm font-medium">{result.title}</span>
                              <span className="shrink-0 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                                {searchTypeLabels[result.type]}
                              </span>
                            </span>
                            <span className="mt-0.5 line-clamp-1 text-xs text-slate-400">
                              {result.description}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-slate-200 px-4 py-2 text-[11px] text-slate-400">
              <span className="hidden sm:inline">↑↓ navigate · Enter open · Esc close · </span>
              Ctrl+K to open
            </div>
          </div>
        </div>
      )}
    </>
  );
}
