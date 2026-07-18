const ownerName = process.env.EDITORIAL_OWNER_NAME?.trim() || null;
const ownerCredentials = process.env.EDITORIAL_OWNER_CREDENTIALS?.trim() || null;

export const editorialIdentity = {
  publisher: "School Homework Helper",
  ownerName,
  ownerCredentials,
  contactEmail: "hello@schoolhomeworkhelper.com",
} as const;

export const REVIEW_STATUS_LABELS = {
  draft: "Draft — not approved for indexing",
  "editorial-review": "Editorial review pending",
  reviewed: "Reviewed for publication",
} as const;
