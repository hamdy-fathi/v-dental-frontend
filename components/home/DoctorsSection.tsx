"use client";

import { useEffect, useMemo, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Facebook, Instagram } from "lucide-react";
import type { DoctorItem } from "./types";
import { resolveImageUrl } from "./utils";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type DoctorsSectionProps = {
  title: string;
  description: string;
  doctors: DoctorItem[];
  instagramUrl: string;
  facebookUrl: string;
};

export default function DoctorsSection({
  title,
  description,
  doctors,
  instagramUrl,
  facebookUrl,
}: DoctorsSectionProps) {
  const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const total = doctors.length || 1;

  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => setCurrent(mainApi.selectedScrollSnap());
    mainApi.on("select", onSelect);
    onSelect();
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi]);

  const autoplay = useMemo(() => Autoplay({ delay: 4500, stopOnInteraction: true }), []);

  return (
    <section id="doctors" className="bg-[url('/images/background/bg2.webp')] bg-right-top bg-no-repeat bg-cover py-16" style={{ direction: "ltr" }}>
      <div className="container">
        <div className="flex flex-wrap items-start justify-center gap-8 text-center md:justify-between md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-[#2F3C2B] sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base text-[#6C7A65]">{description}</p>
          </div>
        </div>

        <div className="mt-10">
          <Carousel
            setApi={setMainApi}
            opts={{ align: "start", loop: true, containScroll: "trimSnaps" }}
            plugins={[autoplay]}
          >
          <CarouselContent>
              {doctors.map((doctor, index) => (
              <CarouselItem className="basis-full px-3 md:basis-1/2 xl:basis-1/3" key={`${doctor.name ?? "doctor"}-${index}`}>
                  <div className="group h-full rounded-3xl border border-[#E5E7E0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative overflow-hidden rounded-2xl bg-[#F7F5EA] p-5">
                      <img
                        className="mx-auto h-64 w-full object-cover object-top"
                        src={resolveImageUrl(doctor.image_main)}
                        alt={doctor.name ?? "v-Dental Clinic"}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs text-[#5E6F4C]">
                        <img className="h-6 w-6 rounded-full object-cover" src={resolveImageUrl(doctor.small_image)} alt={doctor.name ?? "v-Dental Clinic"} />
                        Available
                      </div>
                    </div>
                    <div className="mt-5">
                      <h3 className="text-lg font-semibold text-[#2F3C2B]">{doctor.name ?? "Doctor"}</h3>
                      <p className="mt-1 text-sm text-[#C9A26A]">{doctor.short_description ?? ""}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-[#EEEDE6] pt-4 text-[#6C7A65]">
                      <div className="flex items-center gap-3">
                        <a href={doctor.instagram ?? instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                          <Instagram className="h-4 w-4" />
                        </a>
                        <a href={doctor.facebook ?? facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
                          <Facebook className="h-4 w-4" />
                        </a>
                      </div>
                      <span className="text-xs text-[#5E6F4C]">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <CarouselPrevious className="static h-10 w-10 rounded-full border border-[#E5E7E0] bg-white text-[#5E6F4C] hover:bg-[#F3F4EF]" />
                <CarouselNext className="static h-10 w-10 rounded-full border border-[#E5E7E0] bg-white text-[#5E6F4C] hover:bg-[#F3F4EF]" />
              </div>
              <div className="text-sm text-[#5E6F4C]">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

