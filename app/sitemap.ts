import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import portfolioData from "@/data/portfolio.json";

const BASE_URL = "https://navyayy.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyUrls: MetadataRoute.Sitemap = portfolioData.caseStudies.items.map(
    (cs) => ({
      url: `${BASE_URL}/case-study/${cs.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...caseStudyUrls,
    ...blogUrls,
  ];
}
