import { MetadataRoute } from "next";

const BASE_URL = "https://www.vdentaleg.com";

const BLOG_API_URL = "https://www.vdentaleg.com/api/v1/blog/front";
const CATEGORY_API_URL = "https://www.vdentaleg.com/api/v1/category/parent";

type BlogItem = {
  id?: number;
  slug?: string;
  updatedAt?: string;
  createdAt?: string;
};

type CategoryItem = {
  id?: number;
  slug?: string;
  categoryType?: string;
};

async function fetchAllBlogs(): Promise<BlogItem[]> {
  try {
    const response = await fetch(BLOG_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: {
          page: 1,
          limit: 1000, // Fetch a large number to get all blogs
          isPagination: "true",
          filters: { isPublished: true },
        },
      }),
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return payload?.data?.data ?? [];
  } catch (error) {
    return [];
  }
}

async function fetchAllCategories(): Promise<CategoryItem[]> {
  try {
    const response = await fetch(CATEGORY_API_URL, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return payload?.data?.data ?? [];
  } catch (error) {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, categories] = await Promise.all([fetchAllBlogs(), fetchAllCategories()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/before-after`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs
    .filter((blog) => blog.slug)
    .map((blog) => ({
      url: `${BASE_URL}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : blog.createdAt ? new Date(blog.createdAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((category) => category.slug && category.categoryType === "blog")
    .map((category) => ({
      url: `${BASE_URL}/blogs/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  // Add language variants for main pages
  const languageVariants: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}?lang=en`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}?lang=ar`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about?lang=en`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about?lang=ar`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/before-after?lang=en`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/before-after?lang=ar`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blogs?lang=en`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs?lang=ar`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes, ...languageVariants];
}

