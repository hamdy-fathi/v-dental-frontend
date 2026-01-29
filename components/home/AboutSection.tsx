type AboutSectionProps = {
  mainHeadline: string;
  description: string;
  mainClinicImage: string;
};

export default function AboutSection({ mainHeadline, description, mainClinicImage }: AboutSectionProps) {
  return (
    <section id="about" className="bg-[url('/images/background/bg4.webp')] bg-cover bg-center py-16">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative flex justify-center">
            <img className="w-full max-w-[340px] rounded-3xl object-cover shadow-lg" src={mainClinicImage} alt="V-Dental Clinic" />
            <img className="absolute -right-6 top-8 hidden h-20 w-20 rounded-full object-cover shadow-md md:block" src="/images/hero-banner/img4.webp" alt="v-Dental Clinic" />
            <img className="absolute -left-2 -bottom-2 hidden w-64 md:block" src="/svg/about-curve.svg" alt="" aria-hidden="true" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-[#2F3C2B] sm:text-4xl">{mainHeadline}</h2>
            <p className="mt-4 text-base text-[#6C7A65]">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

