import type { AvailableDoctor } from "./types";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  heroHeadline: string;
  heroSubHeadline: string;
  doctorCountText: string;
  talkDoctorsImages: string[];
  whatsappUrl: string;
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
  mainClinicImage,
  additionalClinicImages,
  availableDoctor,
  availableDoctorImage,
}: HeroSectionProps) {
  const heroHasSmile = heroHeadline.includes("Smile");
  const heroParts = heroHasSmile ? heroHeadline.split("Smile") : [heroHeadline];

  return (
    <section id="home" className="relative overflow-hidden bg-white pt-32 pb-16">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-semibold leading-tight text-[#2F3C2B] sm:text-5xl">
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
            <p className="mt-6 text-lg text-[#6C7A65]">{heroSubHeadline}</p>
            <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center md:justify-start">
              <div className="rounded-2xl border border-[#E5E7E0] bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center">
                  {talkDoctorsImages.map((img, index) => (
                    <img
                      key={`${img}-${index}`}
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      src={img ?? ""}
                      alt="v-Dental Clinic"
                      style={{ marginLeft: index > 0 ? "-8px" : "0", zIndex: talkDoctorsImages.length - index }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-sm text-[#5E6F4C]" data-translate="doctors.talk_to_over_count" data-count={doctorCountText}>
                  Talk to over {doctorCountText} doctor
                </div>
              </div>
              <Button
                asChild
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7E0] bg-white shadow-sm hover:bg-[#F3F4EF]"
              >
                <a href={whatsappUrl}>
                  <img src="/svg/icon-arrow-up-right.svg" alt="" width="24" height="24" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto max-w-lg">
              <img className="w-full rounded-[32px] object-cover" src={mainClinicImage} alt="v-Dental Clinic" />
              {additionalClinicImages.slice(0, 3).map((img, index) => {
                const positions = [
                  "left-0 top-10",
                  "right-0 top-24",
                  "left-10 bottom-4",
                ];
                return (
                  <div key={`${img}-${index}`} className={`absolute ${positions[index]} hidden md:block`}>
                    <img className="h-20 w-20 rounded-full object-cover shadow-lg" src={img ?? ""} alt="v-Dental Clinic" />
                  </div>
                );
              })}
              <div className="mt-6 w-full max-w-sm rounded-2xl border border-[#E5E7E0] bg-white p-4 shadow-lg md:absolute md:-bottom-6 md:right-6 md:mt-0 md:w-64">
                <div className="mb-3">
                  <h5 className="text-sm font-semibold text-[#2F3C2B]" data-translate="doctors.available">
                    Available Doctors
                  </h5>
                  <span className="text-xs text-[#6C7A65]" data-translate="doctors.select">
                    Select Doctor
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img className="h-10 w-10 rounded-full object-cover" src={availableDoctorImage} alt={availableDoctor?.name ?? "V-Dental Clinic"} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#2F3C2B]">{availableDoctor?.name ?? "Dr. Dina Mostafa"}</div>
                    <div className="text-xs text-[#6C7A65]">{availableDoctor?.short_description ?? "Paedodontist"}</div>
                  </div>
                  <input className="h-4 w-4 accent-[#5E6F4C]" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-[#5E6F4C] text-sm font-semibold text-white hover:bg-[#4E5E3F]"
                  >
                    <a href={whatsappUrl} className="inline-flex h-9 items-center justify-center px-6">
                      <span data-translate="button.book_appointment">Book appointment</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="absolute left-0 top-10 hidden w-48 md:block" src="/images/hero-banner/img2.webp" alt="v-Dental Clinic" />
      <img className="absolute right-0 bottom-10 hidden w-48 md:block" src="/images/hero-banner/img4.webp" alt="v-Dental Clinic" />
      <img className="absolute top-16 left-1/2 hidden w-[70%] -translate-x-1/2 md:block" src="/svg/banner-shape.svg" alt="" aria-hidden="true" />
    </section>
  );
}

