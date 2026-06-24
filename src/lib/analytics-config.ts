export const DEFAULT_GA_MEASUREMENT_ID = "G-BRSQJZ50RX";

const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? DEFAULT_GA_MEASUREMENT_ID;

export const analyticsConfig = {
  enabled: measurementId.startsWith("G-"),
  measurementId,
} as const;
