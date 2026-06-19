declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => false;
    gtag_report_whatsapp_conversion?: (url?: string) => false;
  }
}

export {};
