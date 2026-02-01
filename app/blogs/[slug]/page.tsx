import Link from "next/link";
import { FloatingActions, HomeFooter, HomeHeader } from "@/components/home";
import LanguageClientInit from "@/components/LanguageClientInit";
import TransitionLink from "@/components/TransitionLink";
import { fetchUnifiedData, type Language } from "@/lib/unified-data";

const BLOG_DETAIL_URL = "http://92.113.31.86/api/v1/blog/by-slug";
const BLOG_ASSET_BASE_URL = "http://92.113.31.86";

type BlogContent = {
  title?: string;
  subTitle?: string;
  description?: string;
  shortDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  language_id?: number;
};

type BlogCategory = {
  id?: number;
  slug?: string;
  content?: Array<{ name?: string; description?: string; language_id?: number }>;
};

type BlogItem = {
  id?: number;
  slug?: string;
  thumb?: string | null;
  createdAt?: string;
  createdBy?: { firstName?: string; lastName?: string } | null;
  content?: BlogContent[];
  categories?: BlogCategory[];
};

type BlogDetailResponse = {
  blog?: BlogItem;
  relatedBlogs?: BlogItem[];
};

function selectByLanguage<T extends { language_id?: number }>(content?: T[], languageId = 1) {
  if (!content || content.length === 0) return null;
  return content.find((item) => item.language_id === languageId) ?? content[0];
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildBlogImageUrl(path?: string | null) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BLOG_ASSET_BASE_URL}${normalized}`;
}

async function fetchBlogDetail(slug: string): Promise<BlogDetailResponse | null> {
  const response = await fetch(`${BLOG_DETAIL_URL}/${slug}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return payload?.data?.data ?? null;
}

export const revalidate = 300;

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

function normalizeLanguage(value?: string): Language {
  return value === "ar" ? "ar" : "en";
}

function languageIdFor(lang: Language) {
  return lang === "ar" ? 2 : 1;
}

function withLanguage(href: string, lang: Language) {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}lang=${lang}`;
}

export default async function BlogDetailPage({ params, searchParams }: BlogDetailPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const language = normalizeLanguage(resolvedSearchParams?.lang);
  const languageId = languageIdFor(language);
  const blogData = await fetchBlogDetail(slug);
  const blog = blogData?.blog;
  const relatedBlogs = blogData?.relatedBlogs ?? [];

  let generalSettings: { store_phone?: string; store_email?: string; facebook_url?: string; instagram_url?: string; content?: { store_description?: string } } | null;
  try {
    const unifiedData = await fetchUnifiedData(language);
    generalSettings = unifiedData.generalSettings as typeof generalSettings;
  } catch (error) {
    generalSettings = null;
  }

  const phone = generalSettings?.store_phone ?? "201050800531";
  const email = generalSettings?.store_email ?? "info@vdentaleg.com";
  const instagramUrl = generalSettings?.instagram_url ?? "https://www.instagram.com/vdentalclinicseg/";
  const facebookUrl = generalSettings?.facebook_url ?? "https://www.facebook.com/vdentalclinicseg/";
  const tiktokUrl = "https://www.tiktok.com/@vdentalclinicseg?_r=1&_t=ZS-93Yyt6S1emT";
  const storeDescription =
    generalSettings?.content?.store_description ??
    "Redefining dental care with precision, comfort, and lasting results.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text&context=AffMX3rNCA1vEu-H-lm7x_A9zM4lbftdB9t0FPI_jQqeYxvxY8z5bMf3ICMptUcZ1UPEJVwB6hFCKdwajA9SRQ0tnbvcVtWtZHZPXn6zVchyUtJkzKDQ7Y6_OAdolwevONVHydwkGheqlH92hYSgkwg2wQ&source&app=facebook`;

  const content = selectByLanguage(blog?.content, languageId);
  const title = content?.title ?? "Blog";
  const subtitle = content?.subTitle ?? "";
  const description = content?.description ?? "";
  const cleanedDescription = description
    .replace(/<p>\s*(<br\s*\/?>|&nbsp;)\s*<\/p>/gi, "")
    .replace(/(<br\s*\/?>\s*){2,}/gi, "<br />");
  const imageUrl = buildBlogImageUrl(blog?.thumb) ?? "/images/blog/detail/img1.webp";
  const author = blog?.createdBy
    ? `${blog?.createdBy?.firstName ?? ""} ${blog?.createdBy?.lastName ?? ""}`.trim()
    : "V Dental Clinics";
  const dateLabel = formatDate(blog?.createdAt);
  const categories =
    blog?.categories
      ?.map((category) => ({
        name: selectByLanguage(category.content, languageId)?.name || category.slug,
        slug: category.slug ?? "",
      }))
      .filter((category) => Boolean(category.name)) ?? [];

  return (
    <div className="page-wraper bg-white">
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
        <section className="bg-[#5f724f] py-12">
          <div className="container">
            <TransitionLink href={withLanguage("/blogs", language)} className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <span data-translate="blogs.back">Back to blogs</span>
            </TransitionLink>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white" data-translate="blogs.detail.tag">
                  Blog
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
                {subtitle && <p className="mt-4 text-base text-white">{subtitle}</p>}
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white">
                  <span>{dateLabel}</span>
                </div>
                {categories.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f724f]">
                    {categories.map((category) => (
                      <TransitionLink
                        key={`${category.slug}-${category.name}`}
                        href={category.slug ? withLanguage(`/blogs/category/${category.slug}`, language) : withLanguage("/blogs", language)}
                        className="rounded-full bg-[#F6F4E5] px-3 py-1 transition-colors hover:bg-white"
                      >
                        {category.name}
                      </TransitionLink>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative h-64 overflow-hidden rounded-3xl border border-[#E5E7E0] bg-white shadow-sm sm:h-72">
                <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            {!blog ? (
              <div className="rounded-2xl border border-[#E5E7E0] bg-white p-6 text-center text-[#6C7A65]">
                <span data-translate="blogs.detail.missing">This blog could not be found.</span>
              </div>
            ) : (
              <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
                <article className="rounded-3xl border border-[#E5E7E0] bg-white p-6 text-[#2F3C2B] shadow-sm sm:p-10">
                  <div className="blog-content text-base leading-7 text-[#4B5A45]" dangerouslySetInnerHTML={{ __html: cleanedDescription }} />
                </article>

                <aside className="space-y-6">
                  <div className="rounded-3xl border border-[#E5E7E0] bg-[#F6F4E5] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f724f]" data-translate="blogs.sidebar.title">
                      Book an appointment
                    </p>
                    <p className="mt-3 text-sm text-[#6C7A65]" data-translate="blogs.sidebar.text">
                      Talk to our dental team and book your visit today.
                    </p>
                    <a
                      href={whatsappUrl}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-[#5f724f] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    >
                      <span data-translate="blogs.sidebar.cta">Book on WhatsApp</span>
                    </a>
                  </div>

                  {relatedBlogs.length > 0 && (
                    <div className="rounded-3xl border border-[#E5E7E0] bg-white p-6">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5f724f]" data-translate="blogs.related">
                        Related blogs
                      </h3>
                      <div className="mt-4 space-y-4">
                        {relatedBlogs.slice(0, 4).map((related) => {
                          const relatedContent = selectByLanguage(related.content, languageId);
                          const relatedTitle = relatedContent?.title ?? "Related blog";
                          const relatedImage = buildBlogImageUrl(related.thumb) ?? "/images/blog/small/img1.webp";
                          return (
                            <TransitionLink
                              key={related.id ?? related.slug ?? relatedTitle}
                              href={related.slug ? withLanguage(`/blogs/${related.slug}`, language) : withLanguage("/blogs", language)}
                              className="flex flex-col gap-3 rounded-2xl border border-transparent p-2 transition-colors hover:border-[#E5E7E0]"
                            >
                              <div className="h-40 w-full overflow-hidden rounded-2xl bg-[#F3F4EF]">
                                <img src={relatedImage} alt={relatedTitle} className="h-full w-full object-cover" loading="lazy" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[#2F3C2B]">{relatedTitle}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8A9882]">
                                  {formatDate(related.createdAt)}
                                </p>
                              </div>
                            </TransitionLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
      <HomeFooter storeDescription={storeDescription} instagramUrl={instagramUrl} facebookUrl={facebookUrl} tiktokUrl={tiktokUrl} />
      <FloatingActions phone={phone} />
    </div>
  );
}

