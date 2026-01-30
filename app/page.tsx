import { apiImageUrl, fetchUnifiedData, type Language, type UnifiedData } from "@/lib/unified-data";
import LanguageClientInit from "@/components/LanguageClientInit";
import {
  AboutSection,
  AboutServicesSection,
  BranchesSection,
  DoctorsSection,
  FloatingActions,
  HeroSection,
  HomeFooter,
  HomeHeader,
  ServicesSection,
  TestimonialsSection,
  WhyChooseSection,
} from "@/components/home";
import type { AvailableDoctor, BranchItem, DoctorItem, FeatureItem, ReviewItem } from "@/components/home/types";

export const revalidate = 300;

type HomePageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

function normalizeLanguage(value?: string): Language {
  return value === "ar" ? "ar" : "en";
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const language = normalizeLanguage(resolvedSearchParams?.lang);
  let data: UnifiedData;
  let englishData: UnifiedData | null = null;
  try {
    if (language === "en") {
      data = await fetchUnifiedData(language);
    } else {
      const [langData, enData] = await Promise.all([fetchUnifiedData(language), fetchUnifiedData("en")]);
      data = langData;
      englishData = enData;
    }
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
  const sectionOne = data.sectionOne as
    | {
        main_headline?: string;
        sub_headline?: string;
        doctor_count_text?: string;
        main_clinic_image?: string;
        talk_doctors_images?: string[];
        additional_clinic_images?: string[];
        available_doctors_images?: Array<{ image?: string; name?: string; short_description?: string }>;
      }
    | null;
  const sectionTwo = data.sectionTwo as { main_headline?: string; description?: string; main_clinic_image?: string } | null;
  const sectionThree = data.sectionThree as
    | { main_headline?: string; description?: string; services_images?: string[]; service_image_before?: string; service_image_after?: string }
    | null;
  const englishSectionThree = englishData?.sectionThree as
    | { service_image_before?: string; service_image_after?: string }
    | null;
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
  const englishSectionFive = englishData?.sectionFive as
    | { doctor_image?: string }
    | null;
  const sectionReviews = data.sectionReviews as
    | { reviews?: ReviewItem[]; content?: { reviews?: ReviewItem[] } }
    | null;
  const sectionBranches = data.sectionBranches as
    | { branches?: BranchItem[] }
    | null;
  const sectionDoctors = data.sectionDoctors as
    | {
        title?: string;
        description?: string;
        doctors?: DoctorItem[];
      }
    | null;
  const englishSectionDoctors = englishData?.sectionDoctors as
    | {
        doctors?: DoctorItem[];
      }
    | null;

  const phone = generalSettings?.store_phone ?? "201050800531";
  const email = generalSettings?.store_email ?? "info@vdentaleg.com";
  const instagramUrl = generalSettings?.instagram_url ?? "https://www.instagram.com/vdentalclinicseg/";
  const facebookUrl = generalSettings?.facebook_url ?? "https://www.facebook.com/vdentalclinicseg/";
  const storeDescription =
    generalSettings?.content?.store_description ??
    "Redefining dental care with precision, comfort, and lasting results.";

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text&context=AffMX3rNCA1vEu-H-lm7x_A9zM4lbftdB9t0FPI_jQqeYxvxY8z5bMf3ICMptUcZ1UPEJVwB6hFCKdwajA9SRQ0tnbvcVtWtZHZPXn6zVchyUtJkzKDQ7Y6_OAdolwevONVHydwkGheqlH92hYSgkwg2wQ&source&app=facebook`;

  const heroHeadline = sectionOne?.main_headline ?? "We give a vibe to every Smile Quickly";
  const heroSubHeadline = sectionOne?.sub_headline ?? "Your Dental health is our main concern";
  const doctorCountText = sectionOne?.doctor_count_text ?? "215";

  const talkDoctorsImages =
    sectionOne?.talk_doctors_images?.length
      ? sectionOne.talk_doctors_images.map((img) => apiImageUrl(img)).filter((img): img is string => Boolean(img))
      : [
          "/assets/images/50-50/WhatsApp Image 2025-07-15 at 19.44.11 (1).png",
          "/assets/images/50-50/WhatsApp Image 2025-07-15 at 19.44.11 (2).png",
          "/assets/images/50-50/WhatsApp Image 2025-07-15 at 19.44.11 (3).png",
          "/assets/images/50-50/WhatsApp Image 2025-07-15 at 19.44.11 (4).png",
        ];

  const additionalClinicImages =
    sectionOne?.additional_clinic_images?.length
      ? sectionOne.additional_clinic_images.map((img) => apiImageUrl(img)).filter((img): img is string => Boolean(img))
      : ["/images/hero-banner/img3.webp", "/assets/images/1/img6.webp", "/assets/images/1/img5.webp"];

  const mainClinicImage = apiImageUrl(sectionOne?.main_clinic_image) ?? "/assets/images/1/main.jpg";
  const availableDoctor = sectionOne?.available_doctors_images?.[0] as AvailableDoctor | undefined;
  const availableDoctorImage =
    apiImageUrl(availableDoctor?.image) ?? "/assets/images/50-50/WhatsApp Image 2025-07-15 at 19.44.11 (5).png";

  const servicesImages =
    sectionThree?.services_images?.length
      ? sectionThree.services_images.map((img) => apiImageUrl(img)).filter((img): img is string => Boolean(img))
      : ["/assets/images/4/img1.webp", "/assets/images/4/img2.webp", "/assets/images/4/img3.webp", "/assets/images/4/img4.webp"];

  const beforeImage =
    apiImageUrl(englishSectionThree?.service_image_before ?? sectionThree?.service_image_before) ?? "/assets/images/875-500";
  const afterImage =
    apiImageUrl(englishSectionThree?.service_image_after ?? sectionThree?.service_image_after) ?? "/assets/images/875-500";

  const reviewsData: ReviewItem[] =
    sectionReviews?.content?.reviews && Array.isArray(sectionReviews.content.reviews)
      ? sectionReviews.content.reviews
      : sectionReviews?.reviews ?? [];
  const reviewsList = reviewsData.length
    ? reviewsData
    : [
        {
          image: "/assets/images/200/8.png",
          rating: 5,
          rating_text: "Best Treatment",
          review_text:
            "Exceptional Care from a Truly Compassionate Team The team is so professional and friendly , The doctors are sharing decisions with the patients and looking for the patient benefits , The follow up for the appointments and all the instructions post procedures are so helpful and so professional The doctors are so specialized and so professional Highly recommended",
          reviewer_image: "/images/avatar/small/avatar3.webp",
          reviewer_name: "Mohammed Mahmoud",
        },
        {
          image: "/assets/images/200/9.png",
          rating: 5,
          rating_text: "Best Treatment",
          review_text:
            "I would like to thank all the staff at V Dental, for the general good treatment. I would like to thank especially the management, Mr. Abdel Hamid and Dr. Karim because I had a problem in the middle of the Eid holiday and Mr. Abdel Hamid, thank you, made an appointment for yesterday and Dr. Karim came from vacation and opened the center especially and did what was necessary, thank you. Honestly Thank you all",
          reviewer_image: "/images/avatar/small/avatar3.webp",
          reviewer_name: "bahaa makkawi",
        },
        {
          image: "/assets/images/200/WhatsApp Image 2025-07-16 at 00.03.25.png",
          rating: 5,
          rating_text: "Best Treatment",
          review_text:
            "The best dental in Egypt, they are so clean and professional. Unlike others, they actually respect your time and once you come in you don’t wait. They also follow up with you to make sure you are in good care. I definelty recommend them.",
          reviewer_image: "/images/avatar/small/avatar3.webp",
          reviewer_name: "Omar El Nashaar",
        },
      ];

  const branches =
    sectionBranches?.branches && Array.isArray(sectionBranches.branches) ? sectionBranches.branches : [];
  const branchesList = branches.length
    ? branches
    : [
        {
          iframe:
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13816.307432317535!2d31.4851926!3d30.0346528!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14582310a8ffcf49%3A0x6a808543544b2525!2sV%20Dental%20Clinics!5e0!3m2!1sar!2seg!4v1754518284670!5m2!1sar!2seg",
          working_hours: "sat-thu: 3:00pm-10:00pm\nfri: no working",
          address:
            "clinic 121, Abdullah ibn salamah, the fount mall, قسم أول القاهرة الجديدة، محافظة القاهرة‬ 11865",
        },
        {
          iframe:
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13812.842295149014!2d31.3685173!3d30.059498!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583ddb349a7dab%3A0xbc68f6c7b7cf7899!2sV%20Dental%20Clinics%20Nasr%20City!5e0!3m2!1sar!2seg!4v1754518156521!5m2!1sar!2seg",
          working_hours: "sat-thu: 3:00pm-10:00pm\nfri: no working",
          address: "Clinic 417, Medical Center, 3, Nasr City, Cairo Governorate 4450113",
        },
      ];

  const doctors =
    sectionDoctors?.doctors && Array.isArray(sectionDoctors.doctors) ? sectionDoctors.doctors : [];
  const englishDoctors =
    englishSectionDoctors?.doctors && Array.isArray(englishSectionDoctors.doctors) ? englishSectionDoctors.doctors : [];
  const doctorsSource = doctors.length ? doctors : englishDoctors;
  const doctorsList = doctorsSource.length
    ? doctorsSource.map((doctor, index) => {
        const englishDoctor = englishDoctors[index];
        return {
          ...doctor,
          small_image: englishDoctor?.small_image ?? doctor.small_image,
          image_main: englishDoctor?.image_main ?? doctor.image_main,
        };
      })
    : [
        {
          name: "Dr. Shimaa Safwat",
          short_description: "Medical Dermatologist",
          small_image: "/assets/images/120-120/WhatsApp Image 2025-07-15 at 19.44.11 (3).png",
          image_main: "/assets/images/1/doc1.png",
          instagram: instagramUrl,
          facebook: facebookUrl,
        },
        {
          name: "Dr. Amr Shaker",
          short_description: "Orthodontist",
          small_image: "/assets/images/120-120/WhatsApp Image 2025-07-15 at 19.44.11 (2).png",
          image_main: "/assets/images/1/doc2.png",
          instagram: instagramUrl,
          facebook: facebookUrl,
        },
        {
          name: "Dr. Riham Adel",
          short_description: "Endodontist",
          small_image: "/assets/images/120-120/WhatsApp Image 2025-07-15 at 19.44.11 (4).png",
          image_main: "/assets/images/1/doc3.png",
          instagram: instagramUrl,
          facebook: facebookUrl,
        },
        {
          name: "Dr. Dina Mostafa",
          short_description: "Paedodontist",
          small_image: "/assets/images/120-120/WhatsApp Image 2025-07-15 at 19.44.11 (5).png",
          image_main: "/assets/images/1/doc4.png",
          instagram: instagramUrl,
          facebook: facebookUrl,
        },
      ];
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

  const doctorImage =
    apiImageUrl(englishSectionFive?.doctor_image ?? sectionFive?.doctor_image) ?? "/assets/images/200/dr seif.png";
  const experienceYears = sectionFive?.experience_years ?? "20";

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
      <main className="page-content">
        <HeroSection
          heroHeadline={heroHeadline}
          heroSubHeadline={heroSubHeadline}
          doctorCountText={doctorCountText}
          talkDoctorsImages={talkDoctorsImages}
          whatsappUrl={whatsappUrl}
          phone={phone}
          mainClinicImage={mainClinicImage}
          additionalClinicImages={additionalClinicImages}
          availableDoctor={availableDoctor}
          availableDoctorImage={availableDoctorImage}
                    />
        <AboutSection
          mainHeadline={sectionTwo?.main_headline ?? "We Care About Your Dental Health"}
          description={
            sectionTwo?.description ??
            "We are dedicated to nurturing your oral well-being with unwavering commitment, cutting-edge expertise, and a gentle touch that makes every visit a positive experience."
          }
          mainClinicImage={apiImageUrl(sectionTwo?.main_clinic_image) ?? "/assets/images/2/5.jpeg"}
        />
        <DoctorsSection
          title={sectionDoctors?.title ?? "Highly Qualified Team"}
          description={
            sectionDoctors?.description ??
            "Rest assured, your oral health is in the hands of seasoned professionals passionate about excellence and your ultimate satisfaction."
          }
          doctors={doctorsList}
          phone={phone}
          instagramUrl={instagramUrl}
          facebookUrl={facebookUrl}
        />
        <ServicesSection
          mainHeadline={sectionThree?.main_headline ?? "The Best Quality Service You Can Get"}
          description={
            sectionThree?.description ??
            "Where cutting-edge technology meets compassionate care for results that speak for themselves."
          }
          servicesImages={servicesImages}
          beforeImage={beforeImage}
          afterImage={afterImage}
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
        <AboutServicesSection
          aboutServices={aboutServices}
          whatsappUrl={whatsappUrl}
          doctorImage={doctorImage}
          experienceYears={experienceYears}
        />
        <TestimonialsSection talkDoctorsImages={talkDoctorsImages} doctorCountText={doctorCountText} reviews={reviewsList} />
        <BranchesSection branches={branchesList} />
      </main>
      <HomeFooter storeDescription={storeDescription} instagramUrl={instagramUrl} facebookUrl={facebookUrl} />
      <FloatingActions phone={phone} />
    </div>
  );
}


