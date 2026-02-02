"use client";

import { ArrowUp, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type FloatingActionsProps = {
  phone: string;
};

export default function FloatingActions({ phone }: FloatingActionsProps) {
  return (
    <>
      <Button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#5E6F4C] shadow-lg hover:bg-[#F3F4EF]"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-14 w-14" />
      </Button>

      <Button asChild className="fixed bottom-20 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#5E6F4C] text-white shadow-lg hover:bg-[#5E6F4C]/80">
        <a href={`tel:+${phone}`} aria-label="Call V Dental">
          <Phone className="h-5 w-5" />
        </a>
      </Button>

      <a
        href={`https://api.whatsapp.com/send?phone=${phone}`}
        className="whatsapp-fixed"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg
          viewBox="0 0 448 512"
          className="whatsapp-icon"
          aria-hidden="true"
          focusable="false"
          style={{ display: "block", margin: "0 auto" }}
        >
          <path
            fill="currentColor"
            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 222-99.6 222-222 0-59.3-25.2-115-65.1-157zm-157 341.6c-33.2 0-66.2-8.9-95.4-25.7l-6.9-4.1-69.8 18.3 18.6-68.2-4.5-7.1c-18.9-30-28.9-64.7-28.9-100.2 0-103.2 83.9-187.1 187.1-187.1 49.9 0 96.7 19.5 132.1 54.9 35.4 35.4 54.9 82.2 54.9 132.1 0 103.2-83.9 187.1-187.1 187.1zm101.7-138.2c-5.6-2.8-33.2-16.4-38.3-18.3-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.3-17.6 22.1-3.2 3.7-6.5 4.2-12.1 1.4-32.8-16.4-54.2-29.1-75.9-65.9-5.7-9.8 5.7-9.1 16.4-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.1-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.7 57.4 2.8 3.7 39.1 59.8 94.8 83.9 13.2 5.7 23.5 9.1 31.5 11.6 13.2 4.2 25.2 3.6 34.7 2.2 10.6-1.6 33.2-13.6 37.9-26.8 4.7-13.2 4.7-24.5 3.2-26.8-1.3-2.5-5-3.9-10.6-6.7z"
          />
        </svg>
      </a>
    </>
  );
}

