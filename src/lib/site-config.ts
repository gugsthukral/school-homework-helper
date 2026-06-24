export const socialLinks = [
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

/** Navbar row height (logo + vertical padding). Sync with SiteLogo header variant. */
export const NAVBAR_HEIGHT = {
  base: 88, // 140px logo + py-2
  sm: 106, // 160px logo + py-3
  md: 116, // 180px logo + py-3
} as const;

/** Space below fixed header (top bar + navbar) so content is not covered */
export const SITE_HEADER_OFFSET_CLASS =
  "pt-[10.5rem] sm:pt-[11.75rem] md:pt-[12.5rem]";
