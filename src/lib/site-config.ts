export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: "instagram" as const,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: "facebook" as const,
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: "x" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: "linkedin" as const,
  },
];

export const TOPBAR_HEIGHT = 60;

/** Navbar content height (logo row + vertical padding) per breakpoint */
export const NAVBAR_HEIGHT = {
  base: 60, // h-10 + py-2
  sm: 80, // h-12 + py-3
  md: 88, // h-16 + py-3
} as const;

/** Space below fixed header so page content is not covered */
export const SITE_HEADER_OFFSET_CLASS =
  "pt-[calc(60px+3.75rem+0.75rem)] sm:pt-[calc(60px+5rem+0.75rem)] md:pt-[calc(60px+5.5rem+1rem)]";
