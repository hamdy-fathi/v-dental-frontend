"use client";

import { useEffect, useState } from "react";

type ServicesSectionProps = {
  mainHeadline: string;
  description: string;
  servicesImages: string[];
  beforeImage: string;
  afterImage: string;
};

export default function ServicesSection({
  mainHeadline,
  description,
  servicesImages,
  beforeImage,
  afterImage,
}: ServicesSectionProps) {
  const [split, setSplit] = useState(50);

  useEffect(() => {
    setSplit(50);
  }, []);

  return (
    <section id="services" className="bg-[url('/images/background/bg3.webp')] bg-cover bg-center py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center md:mx-0 md:text-left">
          <h2 className="text-3xl font-semibold text-[#2F3C2B] sm:text-4xl">{mainHeadline}</h2>
          <p className="mt-4 text-base text-[#6C7A65]">{description}</p>
        </div>
        <div className="mt-10 p-0 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {servicesImages.map((img, index) => (
            <div key={`${img}-${index}`} className="rounded-2xl bg-white p-4 shadow-sm">
              <img className="h-40 w-full rounded-xl object-cover" src={img ?? ""} alt="v-Dental Clinic" />
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-6">
        <div
          dir="ltr"
          className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-[#5f724f] bg-[#5f724f] shadow-lg"
        >
          <div className="relative h-[220px] w-full overflow-hidden rounded-3xl sm:h-[280px]">
            <img className="absolute inset-0 h-full w-full object-cover" src={beforeImage} alt="Before" />
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={afterImage}
              alt="After"
              style={{ clipPath: `inset(0 0 0 ${split}%)` }}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2F3C2B]">
              Before
            </span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2F3C2B]">
              After
            </span>
            <div className="absolute inset-y-0" style={{ left: `calc(${split}% - 1px)` }}>
              <div className="h-full w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
              <div className="absolute -left-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white text-[10px] font-semibold text-[#2F3C2B] shadow">
                ↔
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={split}
              onChange={(event) => setSplit(Number(event.target.value))}
              aria-label="Before and after comparison slider"
              className="absolute inset-0 h-full w-full cursor-col-resize opacity-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

