"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { AvailableDoctor } from "./types";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  heroHeadline: string;
  heroSubHeadline: string;
  doctorCountText: string;
  talkDoctorsImages: string[];
  whatsappUrl: string;
  phone: string;
  mainClinicImage: string;
  additionalClinicImages: string[];
  availableDoctor?: AvailableDoctor | null;
  availableDoctorImage: string;
};

export default function HeroSection({
  heroHeadline,
  heroSubHeadline,
  doctorCountText,
  talkDoctorsImages,
  whatsappUrl,
  phone,
  mainClinicImage,
  additionalClinicImages,
  availableDoctor,
  availableDoctorImage,
}: HeroSectionProps) {
  const heroHasSmile = heroHeadline.includes("Smile");
  const heroParts = heroHasSmile ? heroHeadline.split("Smile") : [heroHeadline];
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subHeadlineRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = [headlineRef.current, subHeadlineRef.current, actionsRef.current].filter(Boolean);
    if (targets.length) {
      gsap.fromTo(
        targets,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12 }
      );
    }
  }, []);

  useEffect(() => {
    const target = parallaxRef.current;
    if (!target) return;

    const setY = gsap.quickSetter(target, "y", "px");
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const offset = Math.min(40, window.scrollY * 0.12);
        setY(-offset);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-[#F7F5EA] pt-32 pb-16">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 ref={headlineRef} className="text-4xl font-semibold leading-tight text-[#2F3C2B] sm:text-5xl">
              {heroHasSmile ? (
                <>
                  {heroParts[0]}
                  <span className="relative inline-flex items-end text-[#5E6F4C]">
                    Smile
                    <img
                      className="absolute -bottom-6 left-1/2 w-[180px] -translate-x-1/2"
                      src="/svg/hero-smile.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </span>
                  {heroParts[1]}
                </>
              ) : (
                heroHeadline
              )}
            </h1>
            <p ref={subHeadlineRef} className="mt-6 text-lg text-[#6C7A65]">
              {heroSubHeadline}
            </p>
            <div ref={actionsRef} className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center md:justify-start">
              <div className="rounded-2xl border border-[#E5E7E0] bg-[#5E6F4C] px-5 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5EA] text-[#5E6F4C]">
                    <span className="text-xs font-semibold">{doctorCountText}+</span>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-sm font-bold uppercase tracking-[0.2em] text-[#F7F5EA]"
                      data-translate="doctors.talk_to_over_count"
                      data-count={doctorCountText}
                    >
                      Talk to over {doctorCountText} doctor
                    </div>
                  </div>
                </div>
              </div>
              <Button
                asChild
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7E0] bg-[#5E6F4C] shadow-sm hover:bg-[#5E6F4C]/80 hover:text-white"
              >
                <a href={whatsappUrl}>
                  <img src="/svg/icon-arrow-up-right.svg" alt="" width="24" height="24" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div ref={parallaxRef} className="relative mx-auto max-w-lg">
              <img className="w-full rounded-[32px] object-cover" src={mainClinicImage} alt="v-Dental Clinic" />
              {additionalClinicImages.slice(0, 3).map((img, index) => {
                const positions = [
                  "left-0 top-10",
                  "right-0 top-24",
                  "left-10 bottom-4",
                ];
                return (
                  <div
                    key={`${img}-${index}`}
                    className={`absolute ${positions[index]} hidden md:block hero-float hero-float--${index + 1}`}
                  >
                    <img className="h-20 w-20 rounded-full object-cover shadow-lg" src={img ?? ""} alt="v-Dental Clinic" />
                  </div>
                );
              })}
           
          
            </div>
          </div>
        </div>
      </div>
    
      <img
        className="absolute top-16 left-1/2 hidden w-[70%] -translate-x-1/2 md:block bg-[#F7F5EA] "
        src="/svg/banner-shape.svg"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

