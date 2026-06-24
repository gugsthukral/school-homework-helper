const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const analyticsConfig = {
  enabled: measurementId.startsWith("G-"),
  measurementId,
} as const;
