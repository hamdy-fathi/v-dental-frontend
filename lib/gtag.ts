export function reportCallConversion(telUrl: string): false {
  if (typeof window.gtag_report_conversion === "function") {
    return window.gtag_report_conversion(telUrl);
  }

  const link = document.createElement("a");
  link.href = telUrl;
  link.click();
  return false;
}
