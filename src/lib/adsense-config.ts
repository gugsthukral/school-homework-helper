const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
const defaultSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "";

export const adsenseConfig = {
  enabled: clientId.startsWith("ca-pub-"),
  clientId,
  slots: {
    horizontal:
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL ?? defaultSlot,
    inArticle:
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE ?? defaultSlot,
    sidebar:
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? defaultSlot,
  },
} as const;

export type AdPlacement = keyof typeof adsenseConfig.slots;

export function getPublisherId() {
  return clientId.replace(/^ca-pub-/, "pub-");
}
