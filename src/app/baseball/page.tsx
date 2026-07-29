import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { SERVICES } from "@/data/services";

const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://artist-motion.com";
const SLUG = "baseball";
const service = SERVICES[SLUG];

const THEME = {
  bar: "bg-slate-700",
  ring: "ring-slate-300 shadow-slate-900/5",
  overlay: "from-slate-900/30",
  border: "border-slate-200",
  bg: "bg-slate-50",
  bgLight: "border-slate-100",
  icon: "text-slate-600",
} as const;

export const metadata: Metadata = {
  title: service.title,
  description: service.metaDescription,
  keywords: service.keywords,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "article",
    url: `/${SLUG}`,
    title: `${service.title} | ARTIST MOTION - アーティストモーション`,
    description: service.metaDescription,
    images: [
      { url: `${SITE_BASE_URL}${service.image}`, alt: service.imageAlt },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `${service.title} | ARTIST MOTION - アーティストモーション`,
    description: service.metaDescription,
    images: [`${SITE_BASE_URL}${service.image}`],
  },
};

export default function BaseballPage() {
  const pageUrl = `${SITE_BASE_URL}/${SLUG}`;
  const imageUrl = `${SITE_BASE_URL}${service.image}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: pageUrl,
    image: imageUrl,
    areaServed: { "@type": "City", name: "丹波市" },
    serviceLocation: {
      "@type": "Place",
      name: "丹波市立山南中学校",
      address: {
        "@type": "PostalAddress",
        addressLocality: "丹波市",
        addressRegion: "兵庫県",
        addressCountry: "JP",
      },
    },
    provider: {
      "@type": "Organization",
      name: "アーティストモーション",
      alternateName: "ARTIST MOTION",
      url: SITE_BASE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navbar />
      <main className="container max-w-4xl mx-auto pt-28 pb-20 px-4">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          事業内容一覧へ
        </Link>

        <article>
          <div
            className={`aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 mb-10 relative ring-2 shadow-lg ${THEME.ring}`}
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${THEME.overlay} to-transparent pointer-events-none`}
            />
          </div>
          <div className="mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <span
                className={`w-1.5 h-10 ${THEME.bar} rounded-full shrink-0`}
                aria-hidden
              />
              {service.title}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-10">
            {service.bodyText}
          </p>

          <section
            className={`mb-10 rounded-2xl p-6 border ${THEME.bg} ${THEME.bgLight}`}
          >
            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
              このクラスの特徴
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-slate-700 text-white text-xs flex items-center justify-center shrink-0 font-bold">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 rounded-2xl border border-slate-300 bg-white p-6">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-3">
              こんな方におすすめ
            </h2>
            <p className="text-slate-700 leading-relaxed">{service.appeal}</p>
          </section>

          <section className={`mt-12 pt-10 border-t ${THEME.border}`}>
            <h2
              className={`text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 text-slate-800 ${THEME.bg} -mx-4 px-4 py-3 rounded-xl border ${THEME.bgLight}`}
            >
              <Calendar className={`w-6 h-6 shrink-0 ${THEME.icon}`} />
              開催概要
            </h2>
            <dl
              className={`space-y-3 ${THEME.bg}/70 rounded-2xl p-6 border ${THEME.bgLight}`}
            >
              <div className="flex gap-4">
                <dt className={`font-semibold w-20 shrink-0 ${THEME.icon}`}>
                  曜日
                </dt>
                <dd className="text-slate-800 font-medium">
                  {service.schedule?.dayOfWeek || "—"}
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className={`font-semibold w-20 shrink-0 ${THEME.icon}`}>
                  場所
                </dt>
                <dd className="text-slate-800 font-medium whitespace-pre-line">
                  {(service.schedule?.venueName || "—").replace(/、/g, "\n")}
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className={`font-semibold w-20 shrink-0 ${THEME.icon}`}>
                  時間
                </dt>
                <dd className="text-slate-800 font-medium">
                  {service.schedule?.time || "—"}
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className={`font-semibold w-20 shrink-0 ${THEME.icon}`}>
                  対象
                </dt>
                <dd className="text-slate-800 font-medium">
                  {service.schedule?.target || "—"}
                </dd>
              </div>
            </dl>
          </section>

          <section className={`mt-12 pt-10 border-t ${THEME.border}`}>
            <h2
              className={`text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 text-slate-800 ${THEME.bg} -mx-4 px-4 py-3 rounded-xl border ${THEME.bgLight}`}
            >
              <MapPin className={`w-6 h-6 shrink-0 ${THEME.icon}`} />
              場所の詳細
            </h2>
            <p className="mb-4 text-slate-600 text-base font-medium">
              丹波市立山南中学校
            </p>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6530.76269051374!2d135.02994289977903!3d35.07220337196108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600009e60978c7c9%3A0xf10559d21b1e55fb!2z5Li55rOi5biC56uL5bGx5Y2X5Lit5a2m5qCh!5e0!3m2!1sja!2sjp!4v1773465328355!5m2!1sja!2sjp"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="丹波市立山南中学校の地図"
              />
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
