import type { Metadata } from "next";
import { Cairo, Poppins } from "next/font/google";
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
      <head />
      <body id="bg">
        <ViewTransitions>{children}</ViewTransitions>
      </body>
    </html>
  );
}

