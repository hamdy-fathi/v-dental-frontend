type AboutSectionProps = {
  mainHeadline: string;
  description: string;
  mainClinicImage: string;
};

export default function AboutSection({ mainHeadline, description, mainClinicImage }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="py-16 bg-white"
     
    >
      <div className="container ">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative flex justify-center">
            <img className="w-full max-w-[340px] rounded-3xl object-cover shadow-lg" src={mainClinicImage} alt="V-Dental Clinic" />
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

