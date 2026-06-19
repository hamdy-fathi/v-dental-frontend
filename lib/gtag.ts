function openTrackedUrl(url: string) {
  if (url.startsWith("tel:")) {
    const link = document.createElement("a");
    link.href = url;
    link.click();
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

export function reportCallConversion(telUrl: string): false {
  if (typeof window.gtag_report_conversion === "function") {
    return window.gtag_report_conversion(telUrl);
  }

  openTrackedUrl(telUrl);
  return false;
}

export function reportWhatsappConversion(url: string): false {
  if (typeof window.gtag_report_whatsapp_conversion === "function") {
    return window.gtag_report_whatsapp_conversion(url);
  }

  openTrackedUrl(url);
  return false;
}
