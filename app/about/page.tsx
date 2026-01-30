import { AboutSection, AboutServicesSection, FloatingActions, HomeFooter, HomeHeader, WhyChooseSection } from "@/components/home";
import LanguageClientInit from "@/components/LanguageClientInit";
import { apiImageUrl, fetchUnifiedData, type Language, type UnifiedData } from "@/lib/unified-data";
import type { FeatureItem } from "@/components/home/types";

export const revalidate = 300;

type AboutPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

function normalizeLanguage(value?: string): Language {
  return value === "ar" ? "ar" : "en";
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const resolvedSearchParams = await searchParams;
  const language = normalizeLanguage(resolvedSearchParams?.lang);
  let data: UnifiedData;
  try {
    data = await fetchUnifiedData(language);
  } catch (error) {
    data = {
      generalSettings: null,
      sectionOne: null,
      sectionTwo: null,
      sectionThree: null,
      sectionFour: null,
      sectionFive: null,
      sectionReviews: null,
      sectionBranches: null,
      sectionDoctors: null,
    };
  }

  const generalSettings = data.generalSettings as
    | { store_phone?: string; store_email?: string; facebook_url?: string; instagram_url?: string; content?: { store_description?: string } }
    | null;
  const sectionTwo = data.sectionTwo as { main_headline?: string; description?: string; main_clinic_image?: string } | null;
  const sectionFour = data.sectionFour as
    | {
        main_headline?: string;
        main_description?: string;
        features?: Array<{ title?: string; description?: string; image?: string }>;
        right_section_image_1?: string;
        right_section_image_2?: string;
        right_section_image_3?: string;
        right_section_image_4?: string;
      }
    | null;
  const sectionFive = data.sectionFive as
    | { doctor_image?: string; about_services?: string[]; experience_years?: string | number }
    | null;

  const phone = generalSettings?.store_phone ?? "201050800531";
  const email = generalSettings?.store_email ?? "info@vdentaleg.com";
  const instagramUrl = generalSettings?.instagram_url ?? "https://www.instagram.com/vdentalclinicseg/";
  const facebookUrl = generalSettings?.facebook_url ?? "https://www.facebook.com/vdentalclinicseg/";
  const storeDescription =
    generalSettings?.content?.store_description ??
    "Redefining dental care with precision, comfort, and lasting results.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text&context=AffMX3rNCA1vEu-H-lm7x_A9zM4lbftdB9t0FPI_jQqeYxvxY8z5bMf3ICMptUcZ1UPEJVwB6hFCKdwajA9SRQ0tnbvcVtWtZHZPXn6zVchyUtJkzKDQ7Y6_OAdolwevONVHydwkGheqlH92hYSgkwg2wQ&source&app=facebook`;

  const mainClinicImage = apiImageUrl(sectionTwo?.main_clinic_image) ?? "/assets/images/2/5.jpeg";
  const doctorImage = apiImageUrl(sectionFive?.doctor_image) ?? "/assets/images/200/dr seif.png";
  const experienceYears = sectionFive?.experience_years ?? "20";
  const aboutServices =
    sectionFive?.about_services && sectionFive.about_services.length
      ? sectionFive.about_services
      : ["Teeth Whitening", "Root Canal", "Dental Implants", "Orthodontics", "Pediatric Dentistry", "Cosmetic Dentistry"];

  const features = (sectionFour?.features ?? []) as FeatureItem[];
  const featuresList = features.length
    ? features
    : [
        {
          title: "Uncompromised Hygiene Standards",
          description:
            "Your health and safety are our top priority. We adhere to the most stringent sterilization protocols and maintain a pristine environment, ensuring every visit is worry-free and secure.",
          image: "/assets/images/5/476836356_122204218334233586_716855594761193000_n (1).jpg",
        },
        {
          title: "Cutting-Edge Dental Technology",
          description:
            "We invest in the latest advancements to provide precise diagnoses, efficient treatments, and superior results. Experience dentistry that is faster, more comfortable, and highly effective",
          image: "/assets/images/200/6.png",
        },
        {
          title: "Patient-Centered Satisfaction",
          description:
            "Your comfort, understanding, and complete satisfaction drive everything we do. From personalized treatment plans to gentle care, we ensure your dental journey is positive and rewarding.",
          image: "/assets/images/200/7.png",
        },
      ];

  const rightSectionImage1 = apiImageUrl(sectionFour?.right_section_image_1) ?? "/assets/images/5/9.jpeg";
  const rightSectionImage2 = apiImageUrl(sectionFour?.right_section_image_2) ?? "/assets/images/200/5.png";
  const rightSectionImage3 = apiImageUrl(sectionFour?.right_section_image_3) ?? "/assets/images/200/1.png";
  const rightSectionImage4 = apiImageUrl(sectionFour?.right_section_image_4) ?? "/assets/images/5/11.jpeg";

  return (
    <div className="page-wraper">
      <LanguageClientInit language={language} />
      <HomeHeader
        phone={phone}
        email={email}
        instagramUrl={instagramUrl}
        facebookUrl={facebookUrl}
        whatsappUrl={whatsappUrl}
        language={language}
      />
      <main className="page-content pt-32">
        <section className="bg-[#5f724f] py-14">
          <div className="container text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white" data-translate="about.hero.tag">
              About
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl" data-translate="about.hero.title">
              About V Dental Clinics
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white" data-translate="about.hero.subtitle">
              Experience modern dentistry focused on precision, comfort, and long-lasting results.
            </p>
          </div>
        </section>

        <AboutSection
          mainHeadline={sectionTwo?.main_headline ?? "We Care About Your Dental Health"}
          description={
            sectionTwo?.description ??
            "We are dedicated to nurturing your oral well-being with unwavering commitment, cutting-edge expertise, and a gentle touch that makes every visit a positive experience."
          }
          mainClinicImage={mainClinicImage}
        />

        <WhyChooseSection
          mainHeadline={sectionFour?.main_headline ?? "Why Choose V Dental Clinics"}
          mainDescription={
            sectionFour?.main_description ??
            "Because your oral health is intrinsically linked to your overall vitality, and we are committed to enhancing both."
          }
          features={featuresList}
          rightSectionImage1={rightSectionImage1}
          rightSectionImage2={rightSectionImage2}
          rightSectionImage3={rightSectionImage3}
          rightSectionImage4={rightSectionImage4}
        />

        <AboutServicesSection aboutServices={aboutServices} whatsappUrl={whatsappUrl} doctorImage={doctorImage} experienceYears={experienceYears} />
      </main>
      <HomeFooter storeDescription={storeDescription} instagramUrl={instagramUrl} facebookUrl={facebookUrl} />
      <FloatingActions phone={phone} />
    </div>
  );
}

