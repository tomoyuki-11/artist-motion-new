import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { COLUMNS, getColumnBySlug } from "@/data/columns";

const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://artist-motion.com";

export function generateStaticParams() {
  return COLUMNS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const column = getColumnBySlug(slug);
  if (!column) return {};

  const pageUrl = `${SITE_BASE_URL}/column/${slug}`;

  return {
    title: column.title,
    description: column.excerpt,
    alternates: { canonical: `/column/${slug}` },
    openGraph: {
      type: "article",
      url: pageUrl,
      title: `${column.title} | ARTIST MOTION - アーティストモーション`,
      description: column.excerpt,
    },
    twitter: {
      card: "summary",
      title: `${column.title} | ARTIST MOTION - アーティストモーション`,
      description: column.excerpt,
    },
  };
}

export default async function ColumnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const column = getColumnBySlug(slug);
  if (!column) notFound();

  const pageUrl = `${SITE_BASE_URL}/column/${slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: column.title,
    description: column.excerpt,
    url: pageUrl,
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
            href="/column"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            子育てコラム一覧へ
          </Link>

          <article>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              {column.title}
            </h1>

            <div className="space-y-5">
              {column.paragraphs.map((p, i) => (
                <p key={i} className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200">
              <a
                href={column.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-800"
              >
                <ExternalLink className="w-4 h-4" />
                PDFで読む
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
