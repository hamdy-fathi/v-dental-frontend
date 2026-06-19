import type { Metadata } from "next";
import { Cairo, Poppins } from "next/font/google";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "V Dental Clinics",
    template: "%s | V Dental Clinics",
  },
  description:
    "V Dental Clinic provides comprehensive dental care services including preventive dentistry, cosmetic treatments, dental implants, and emergency care. Book your appointment today for professional dental services with experienced dentists committed to your oral health and beautiful smile.",
  keywords: [
    "V Dental Clinic",
    "dentist",
    "dental care",
    "teeth cleaning",
    "dental implants",
    "cosmetic dentistry",
    "oral health",
    "family dentist",
    "dental checkup",
    "teeth whitening",
    "root canal",
    "dental hygienist",
    "emergency dentist",
    "preventive dental care",
  ],
  metadataBase: new URL("https://www.vdentaleg.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "V Dental Clinic - Professional Dental Care Services",
    description:
      "Experience exceptional dental care at V Dental Clinic. We offer comprehensive dental services including cleanings, cosmetic dentistry, implants, and emergency care. Schedule your appointment today for quality dental treatment.",
    images: ["https://www.vdentaleg.com/images/v-dental-clinic-social.jpg"],
    type: "website",
  },
  icons: {
    icon: "/assets/ico/logo.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme-color="skin-2" className={`${poppins.variable} ${cairo.variable}`}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11483906478" strategy="afterInteractive" />
        <Script id="google-ads-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-11483906478');
          `}
        </Script>
        <Script id="google-ads-call-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callbackFired = false;
              var callback = function () {
                callbackFired = true;
                if (typeof(url) != 'undefined') {
                  if (url.indexOf('tel:') === 0) {
                    var link = document.createElement('a');
                    link.href = url;
                    link.click();
                  } else {
                    window.location = url;
                  }
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-11483906478/OPV9CMyi1sgbEK6D-uMq',
                'value': 1.0,
                'currency': 'EGP',
                'event_callback': callback
              });
              setTimeout(function () {
                if (!callbackFired && typeof(url) != 'undefined') {
                  if (url.indexOf('tel:') === 0) {
                    var link = document.createElement('a');
                    link.href = url;
                    link.click();
                  } else {
                    window.location = url;
                  }
                }
              }, 1000);
              return false;
            }
            window.gtag_report_conversion = gtag_report_conversion;
          `}
        </Script>
      </head>
      <body id="bg">
        <ViewTransitions>{children}</ViewTransitions>
      </body>
    </html>
  );
}

