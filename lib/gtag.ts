const CALL_CONVERSION_ID = "AW-11483906478/OPV9CMyi1sgbEK6D-uMq";

export function reportCallConversion() {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: CALL_CONVERSION_ID,
      value: 1.0,
      currency: "EGP",
    });
  }
}
