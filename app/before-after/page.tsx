import { FloatingActions, HomeFooter, HomeHeader } from "@/components/home";
import LanguageClientInit from "@/components/LanguageClientInit";
import { fetchUnifiedData, type Language, type UnifiedData } from "@/lib/unified-data";

export const revalidate = 300;

type BeforeAfterPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

function normalizeLanguage(value?: string): Language {
  return value === "ar" ? "ar" : "en";
}

export default async function BeforeAfterPage({ searchParams }: BeforeAfterPageProps) {
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

  const phone = generalSettings?.store_phone ?? "201050800531";
  const email = generalSettings?.store_email ?? "info@vdentaleg.com";
  const instagramUrl = generalSettings?.instagram_url ?? "https://www.instagram.com/vdentalclinicseg/";
  const facebookUrl = generalSettings?.facebook_url ?? "https://www.facebook.com/vdentalclinicseg/";
  const tiktokUrl = "https://www.tiktok.com/@vdentalclinicseg?_r=1&_t=ZS-93Yyt6S1emT";
  const storeDescription =
    generalSettings?.content?.store_description ??
    "Redefining dental care with precision, comfort, and lasting results.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text&context=AffMX3rNCA1vEu-H-lm7x_A9zM4lbftdB9t0FPI_jQqeYxvxY8z5bMf3ICMptUcZ1UPEJVwB6hFCKdwajA9SRQ0tnbvcVtWtZHZPXn6zVchyUtJkzKDQ7Y6_OAdolwevONVHydwkGheqlH92hYSgkwg2wQ&source&app=facebook`;

  type BeforeAfterItem = { before?: string; after?: string; description?: string };
  const normalizeImageUrl = (value?: string | null) => {
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    return `https://www.vdentaleg.com/${value.replace(/^\/+/, "")}`;
  };

  let beforeAfterPairs: Array<{ before: string; after: string; description: string }> = [];
  try {
    const response = await fetch("https://www.vdentaleg.com/api/v1/before-after", { next: { revalidate } });
    const payload = (await response.json()) as { data?: BeforeAfterItem[] };
    beforeAfterPairs = (payload.data ?? []).map((item) => ({
      before: normalizeImageUrl(item.before),
      after: normalizeImageUrl(item.after),
      description: item.description ?? "",
    }));
  } catch (error) {
    beforeAfterPairs = [];
  }

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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white" data-translate="before_after.hero.tag">
              Before & After
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl" data-translate="before_after.hero.title">
              Before & After Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white" data-translate="before_after.hero.subtitle">
              Real transformations from our patients. See the difference our care makes.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              {beforeAfterPairs.map((pair, index) => (
                <div key={`${pair.before}-${pair.after}-${index}`} className="overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white shadow-sm">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img className="h-56 w-full object-cover sm:h-64" src={pair.before} alt="Before" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2F3C2B]">
                        Before
                      </span>
                    </div>
                    <div className="relative">
                      <img className="h-56 w-full object-cover sm:h-64" src={pair.after} alt="After" />
                      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2F3C2B]">
                        After
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-[#E5E7E0] px-4 py-3 text-sm text-[#2F3C2B]">
                    {pair.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <HomeFooter storeDescription={storeDescription} instagramUrl={instagramUrl} facebookUrl={facebookUrl} tiktokUrl={tiktokUrl} />
      <FloatingActions phone={phone} />
    </div>
  );
}

