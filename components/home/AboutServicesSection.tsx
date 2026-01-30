import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type AboutServicesSectionProps = {
  aboutServices: string[];
  whatsappUrl: string;
  doctorImage: string;
  experienceYears: string | number;
};

export default function AboutServicesSection({
  aboutServices,
  whatsappUrl,
  doctorImage,
  experienceYears,
}: AboutServicesSectionProps) {
  return (
    <section id="about-services" className="bg-white py-16">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="about-services-text flex flex-col justify-center text-center md:text-left">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#5E6F4C]" data-translate="section.best_dentist">
              Best Dentist
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-[#2F3C2B]" data-translate="section.about_services">
              About Services
            </h3>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[#6C7A65]">
              {aboutServices.map((service, index) => (
                <li key={`${service}-${index}`} className="about-services-list-item flex items-start gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#E8EFE1] text-xs text-[#5E6F4C]">✓</span>
                  {service}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#5E6F4C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#4E5E3F]">
              <a href={whatsappUrl}>
                <span data-translate="button.appointment">Appointment</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="relative">
            <img className="w-full rounded-3xl object-cover shadow-lg" src={doctorImage} alt="Doctor" />
            <div className="mt-4 rounded-2xl bg-white/90 px-4 py-3 text-[#2F3C2B] shadow-md md:absolute md:-left-6 md:bottom-6 md:mt-0">
              <div className="text-2xl font-semibold text-[#5E6F4C]">
                {experienceYears}+
              </div>
              <div className="text-sm font-semibold">
                Years <br />
                Experienced
              </div>
            </div>
            <div className="absolute -right-4 bottom-8 hidden rounded-2xl bg-white/90 px-4 py-4 text-[#2F3C2B] shadow-md md:block">
              <img className="mx-auto h-12 w-12" src="/svg/logo-gold.svg" alt="V Dental Clinics 2025" />
              <div className="mt-3 text-sm font-semibold">V Dental Clinics 2025</div>
              <p className="text-xs text-[#6C7A65]">Quality and Accreditation Institute</p>
              <a href="#" className="text-xs text-[#5E6F4C] underline">
                Best Dermatologists
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

