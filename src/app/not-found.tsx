import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist on School Homework Helper.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-white">404</h1>
      <p className="mt-4 max-w-md text-sky-200">This page could not be found.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-2.5 font-semibold text-white"
      >
        Back to Home
      </Link>
    </main>
  );
}
