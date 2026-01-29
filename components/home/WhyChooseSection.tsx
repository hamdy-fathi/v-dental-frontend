"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { FeatureItem } from "./types";
import { resolveImageUrl } from "./utils";

type WhyChooseSectionProps = {
  mainHeadline: string;
  mainDescription: string;
  features: FeatureItem[];
  rightSectionImage1: string;
  rightSectionImage2: string;
  rightSectionImage3: string;
  rightSectionImage4: string;
};

export default function WhyChooseSection({
  mainHeadline,
  mainDescription,
  features,
  rightSectionImage1,
  rightSectionImage2,
  rightSectionImage3,
  rightSectionImage4,
}: WhyChooseSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="why-choose" className="bg-[url('/images/background/bg4.webp')] bg-cover bg-center py-16 overflow-hidden">
      <div className="container">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-[1fr_auto]">
      <div className="w-full text-center lg:text-left">
            <h2 className="mx-auto max-w-xl text-3xl font-semibold text-[#2F3C2B] sm:text-4xl lg:m-0">{mainHeadline}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#6C7A65] lg:mx-0">{mainDescription}</p>
            <div className="mt-8 space-y-4">
              {features.map((feature, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={`${feature.title ?? "feature"}-${index}`}
                    className={`overflow-hidden rounded-3xl border ${isOpen ? "border-[#5E6F4C]" : "border-[#E5E7E0]"} bg-[#F6F4EC] shadow-sm`}
                  >
                    <Button
                      type="button"
                      className="flex w-full items-center justify-between rounded-3xl border border-transparent bg-[#5f724f] px-5 py-4 text-left text-lg font-semibold text-white transition-colors hover:border-[#5E6F4C] hover:bg-[#F6F4EC] hover:text-[#5f724f]"
                      onClick={() => setOpenIndex(index)}
                    >
                      {feature.title ?? ""}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#5E6F4C] shadow-sm">
                        {isOpen ? "−" : "+"}
                      </span>
                    </Button>
                    {isOpen && (
                      <div className="border-t border-white px-6 py-5">
                        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                          <div>
                            <p className="text-lg text-[#6C7A65]">{feature.description ?? ""}</p>
                          </div>
                          <img
                            className="h-20 w-20 rounded-xl object-contain"
                            src={resolveImageUrl(feature.image)}
                            alt="v-Dental Clinic"
                            width="200"
                            height="200"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative w-full max-w-xl md:mx-auto">
            <div className="grid gap-5">
              <div className="grid gap-5 grid-cols-2">
                <div className="overflow-hidden rounded-[28px] shadow-lg">
                  <img className="h-full w-full object-cover" src={rightSectionImage1} alt="v-Dental Clinic" />
                </div>
                <div className="overflow-hidden rounded-[28px] shadow-lg">
                  <img className="h-full w-full object-cover" src={rightSectionImage2} alt="v-Dental Clinic" />
                </div>
              </div>
              <div className="grid gap-5 grid-cols-2">
                <div className="overflow-hidden rounded-[28px] shadow-lg">
                  <img className="h-full w-full object-cover" src={rightSectionImage3} alt="v-Dental Clinic" />
                </div>
                <div className="overflow-hidden rounded-[28px] shadow-lg">
                  <img className="h-full w-full object-cover" src={rightSectionImage4} alt="v-Dental Clinic" />
                </div>
              </div>
            </div>
            <img className="absolute -left-10 -top-6 hidden w-28 md:block" src="/images/bg-circle.svg" alt="v-Dental Clinic" />
            <img className="absolute -bottom-6 -right-4 hidden w-20 md:block" src="/images/hero-banner/img4.webp" alt="v-Dental Clinic" />
          </div>
        </div>
      </div>
    </section>
  );
}


