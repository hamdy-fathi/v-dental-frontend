export function reportCallConversion(telUrl: string) {
  if (typeof window.gtag_report_conversion === "function") {
    window.gtag_report_conversion(telUrl);
    return;
  }

  window.location.href = telUrl;
}
