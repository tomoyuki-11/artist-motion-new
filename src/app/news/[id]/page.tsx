import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { fetchNews, fetchNewsComments } from "@/lib/adminApi";
import { NewsCommentsClient } from "./NewsCommentsClient";

const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://artist-motion.com";

export const dynamic = "force-dynamic";

async function getNewsItem(id: string) {
  const news = await fetchNews().catch(() => []);
  return news.find((item) => item.id === id) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getNewsItem(id);
  if (!item) return {};

  const description = item.body.slice(0, 120);
  const pageUrl = `${SITE_BASE_URL}/news/${id}`;

  return {
    title: item.title,
    description,
    alternates: { canonical: `/news/${id}` },
    openGraph: {
      type: "article",
      url: pageUrl,
      title: `${item.title} | ARTIST MOTION - アーティストモーション`,
      description,
      ...(item.image_url && { images: [{ url: item.image_url, alt: item.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | ARTIST MOTION - アーティストモーション`,
      description,
      ...(item.image_url && { images: [item.image_url] }),
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getNewsItem(id);
  if (!item) notFound();

  const comments = await fetchNewsComments(id).catch(() => []);
  const pageUrl = `${SITE_BASE_URL}/news/${id}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.created_at,
    dateModified: item.created_at,
    url: pageUrl,
    ...(item.image_url && { image: [item.image_url] }),
    publisher: {
      "@type": "Organization",
      name: "アーティストモーション",
      alternateName: "ARTIST MOTION",
      url: SITE_BASE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            お知らせ一覧へ
          </Link>

          <article>
            <p className="text-sm text-slate-500 mb-2">
              {new Date(item.created_at).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              {item.title}
            </h1>
            {item.image_url && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-slate-100 border border-slate-200">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
              {item.body}
            </p>

            <NewsCommentsClient newsId={item.id} initialComments={comments} />
          </article>
        </div>
      </section>
    </div>
  );
}
