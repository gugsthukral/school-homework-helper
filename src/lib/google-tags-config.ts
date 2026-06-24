import { adsenseConfig } from "@/lib/adsense-config";
import { analyticsConfig } from "@/lib/analytics-config";

export function googleTagsEnabled() {
  return adsenseConfig.enabled || analyticsConfig.enabled;
}
