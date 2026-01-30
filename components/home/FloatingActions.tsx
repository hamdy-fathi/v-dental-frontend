"use client";

import { ArrowUp, MessageCircle, Phone } from "lucide-react";
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

      <Button
        asChild
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#25D366]/80"
      >
        <a href={`https://api.whatsapp.com/send?phone=${phone}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <MessageCircle className="h-5 w-5" />
        </a>
      </Button>
    </>
  );
}

