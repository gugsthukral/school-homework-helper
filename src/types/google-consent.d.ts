type GoogleConsentStatus = "granted" | "denied";

interface TcfPurposeConsents {
  [purposeId: string]: boolean;
}

interface TcfVendorConsents {
  [vendorId: string]: boolean;
}

interface TcfTcData {
  gdprApplies?: boolean;
  eventStatus?: string;
  purpose?: {
    consents?: TcfPurposeConsents;
    legitimateInterests?: TcfPurposeConsents;
  };
  vendor?: {
    consents?: TcfVendorConsents;
    legitimateInterests?: TcfVendorConsents;
  };
}

type TcfApiCallback = (tcData: TcfTcData, success: boolean) => void;

interface GoogleFc {
  callbackQueue: Array<Record<string, () => void> | (() => void)>;
  showRevocationMessage: () => void;
}

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __tcfapi?: (
    command: string,
    version: number,
    callback: TcfApiCallback,
    parameter?: number
  ) => void;
  googlefc?: GoogleFc;
}
