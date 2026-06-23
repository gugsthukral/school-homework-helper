import { AdUnit } from "@/components/ads/ad-unit";
import {
  adsenseConfig,
  type AdPlacement,
} from "@/lib/adsense-config";

type AdBannerProps = {
  placement?: AdPlacement;
  className?: string;
};

export function AdBanner({ placement = "horizontal", className }: AdBannerProps) {
  const slot = adsenseConfig.slots[placement];

  if (!adsenseConfig.enabled || !slot) return null;

  return (
    <AdUnit
      slot={slot}
      format="auto"
      className={className}
      minHeight={placement === "sidebar" ? 250 : 90}
    />
  );
}
