import type { MetadataRoute } from "next";
import { COLUMNS } from "@/data/columns";
import { fetchNews } from "@/lib/adminApi";

const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://artist-motion.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_BASE_URL}/news`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_BASE_URL}/column`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_BASE_URL}/testimonials`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_BASE_URL}/taiko`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_BASE_URL}/baseball`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_BASE_URL}/taiso`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_BASE_URL}/fitness`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const columnEntries: MetadataRoute.Sitemap = COLUMNS.map((c) => ({
    url: `${SITE_BASE_URL}/column/${c.slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const news = await fetchNews().catch(() => []);
  const newsEntries: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${SITE_BASE_URL}/news/${item.id}`,
    lastModified: new Date(item.created_at),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...columnEntries, ...newsEntries];
}
