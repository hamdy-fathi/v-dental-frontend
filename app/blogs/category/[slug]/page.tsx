import Link from "next/link";
import { FloatingActions, HomeFooter, HomeHeader } from "@/components/home";
import { fetchUnifiedData } from "@/lib/unified-data";

const BLOG_FILTER_URL = "http://92.113.31.86/api/v1/blog/filter";
const BLOG_ASSET_BASE_URL = "http://92.113.31.86";

type BlogContent = {
  title?: string;
  subTitle?: string;
  description?: string;
  shortDescription?: string;
  language_id?: number;
};

type BlogCategory = {
  id?: number;
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

function selectByLanguage<T extends { language_id?: number }>(content?: T[], languageId = 1) {
  if (!content || content.length === 0) return null;
  return content.find((item) => item.language_id === languageId) ?? content[0];
}

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(value = "", max = 160) {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}…`;
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

async function fetchBlogsByCategory(slug: string): Promise<BlogItem[]> {
  const response = await fetch(BLOG_FILTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categorySlug: slug, isPublished: true, length: 6, start: 0 }),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Blog filter API error: ${response.status}`);
  }

  const payload = await response.json();
  return payload?.data?.data ?? [];
}

export const revalidate = 300;

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let blogs: BlogItem[] = [];

  try {
    blogs = await fetchBlogsByCategory(slug);
  } catch (error) {
    blogs = [];
  }

  let generalSettings: { store_phone?: string; store_email?: string; facebook_url?: string; instagram_url?: string; content?: { store_description?: string } } | null;
  try {
    const unifiedData = await fetchUnifiedData("en");
    generalSettings = unifiedData.generalSettings as typeof generalSettings;
  } catch (error) {
    generalSettings = null;
  }

  const phone = generalSettings?.store_phone ?? "201050800531";
  const email = generalSettings?.store_email ?? "info@vdentaleg.com";
  const instagramUrl = generalSettings?.instagram_url ?? "https://www.instagram.com/vdentalclinicseg/";
  const facebookUrl = generalSettings?.facebook_url ?? "https://www.facebook.com/vdentalclinicseg/";
  const storeDescription =
    generalSettings?.content?.store_description ??
    "Redefining dental care with precision, comfort, and lasting results.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text&context=AffMX3rNCA1vEu-H-lm7x_A9zM4lbftdB9t0FPI_jQqeYxvxY8z5bMf3ICMptUcZ1UPEJVwB6hFCKdwajA9SRQ0tnbvcVtWtZHZPXn6zVchyUtJkzKDQ7Y6_OAdolwevONVHydwkGheqlH92hYSgkwg2wQ&source&app=facebook`;

  return (
    <div className="page-wraper bg-white">
      <HomeHeader phone={phone} email={email} instagramUrl={instagramUrl} facebookUrl={facebookUrl} whatsappUrl={whatsappUrl} />
      <main className="page-content pt-32">
        <section className="bg-[#5f724f] py-14">
          <div className="container text-center">
            <Link href="/blogs" className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              ← Back to blogs
            </Link>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">Category</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                {slug.replace(/-/g, " ")}
              </h1>
              <p className="mt-3 text-base text-white">Explore the latest articles in this category.</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.length === 0 ? (
                <div className="rounded-2xl border border-[#E5E7E0] bg-white p-6 text-center text-white md:col-span-2 lg:col-span-3">
                  No blogs are available for this category right now.
                </div>
              ) : (
                blogs.map((blog) => {
                  const content = selectByLanguage(blog.content, 1);
                  const title = content?.title ?? "Untitled blog";
                  const subtitle = content?.subTitle ?? "";
                  const descriptionSource = content?.shortDescription ?? content?.description ?? "";
                  const excerpt = truncate(stripHtml(descriptionSource), 170);
                  const imageUrl = buildBlogImageUrl(blog.thumb) ?? "/images/blog/grid/img1.webp";
                  const author = blog.createdBy
                    ? `${blog.createdBy.firstName ?? ""} ${blog.createdBy.lastName ?? ""}`.trim()
                    : "V Dental Clinics";
                  const dateLabel = formatDate(blog.createdAt);
                  const blogCategories =
                    blog.categories?.map((category) => selectByLanguage(category.content, 1)?.name).filter(Boolean) ?? [];

                  return (
                    <Link
                      key={blog.id ?? `${blog.slug}-${title}`}
                      href={blog.slug ? `/blogs/${blog.slug}` : "/blogs"}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E5E7E0] bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1"
                    >
                      <div className="relative h-96 w-full overflow-hidden bg-[#F3F4EF]">
                        <img src={imageUrl} alt={title} className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" />
                      </div>
                      <div className="flex h-full flex-col gap-4 p-6">
                        <div>
                          <h2 className="text-xl font-semibold text-[#2F3C2B] transition-colors group-hover:text-[#5f724f]">{title}</h2>
                          {subtitle && <p className="mt-2 text-sm text-[#6C7A65]">{subtitle}</p>}
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f724f]">
                          {blogCategories.length ? (
                            blogCategories.map((category) => (
                              <span key={`${blog.id}-${category}`} className="rounded-full bg-[#F6F4E5] px-3 py-1">
                                {category}
                              </span>
                            ))
                          ) : (
                            <span className="rounded-full bg-[#F6F4E5] px-3 py-1">Updates</span>
                          )}
                        </div>
                        <div className="mt-auto flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8A9882]">
                          <span>{dateLabel}</span>
                          <span>•</span>
                          <span>{author || "V Dental Clinics"}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>
      <HomeFooter storeDescription={storeDescription} instagramUrl={instagramUrl} facebookUrl={facebookUrl} />
      <FloatingActions phone={phone} />
    </div>
  );
}

