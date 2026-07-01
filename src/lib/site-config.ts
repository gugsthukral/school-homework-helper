export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/schoolhomeworkhelper/",
    icon: "instagram" as const,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591263363969",
    icon: "facebook" as const,
  },
  {
    label: "X",
    href: "https://x.com/aischoolhub",
    icon: "x" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/school-homework-helper-undefined-b73542419/",
    icon: "linkedin" as const,
  },
] as const;

export const TOPBAR_HEIGHT = 60;

export { CANONICAL_SITE_ORIGIN, getSiteUrl } from "@/lib/site-url";

/** Navbar row height (logo + vertical padding). Sync with SiteLogo header variant. */
export const NAVBAR_HEIGHT = {
  base: 88, // 140px logo + py-2
  sm: 106, // 160px logo + py-3
  md: 116, // 180px logo + py-3
} as const;

/** Full-width content shell with responsive side padding (mockup layout). */
export const SITE_CONTAINER_CLASS =
  "mx-auto w-full max-w-[1680px] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16";

/** Space below fixed header (top bar + navbar) so content is not covered */
export const SITE_HEADER_OFFSET_CLASS =
  "pt-[148px] sm:pt-[166px] md:pt-[176px]";
