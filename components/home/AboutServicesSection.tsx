"use client";

import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/TransitionLink";

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
  const searchParams = useSearchParams();
  const language = searchParams?.get("lang");

  const withLanguage = (href: string) => {
    if (!href.startsWith("/")) return href;
    if (!language) return href;
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}lang=${language}`;
  };

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
            <p className="mt-6 text-sm text-[#6C7A65]" data-translate="section.about_services.blog_text">
              To learn more about dental services and treatment options, please visit our blog.
            </p>
            <TransitionLink
              href={withLanguage("/blogs")}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#5E6F4C] hover:text-[#4E5E3F] transition-colors"
            >
              <span data-translate="section.about_services.visit_blog">Visit Blog</span>
              <ArrowRight className="h-4 w-4" />
            </TransitionLink>
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
            
          </div>
        </div>
      </div>
    </section>
  );
}

