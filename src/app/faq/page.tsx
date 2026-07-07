import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { FAQAccordion } from "./FAQAccordion";
import { FAQ_CATEGORIES } from "@/data/faq";

const FAQ_DESCRIPTION =
  "風舞流曲技太鼓（和太鼓教室）・器械体操教室・ベースボールクラブ・フィットネスクラスに関するよくあるご質問をまとめています。入門の年齢や指導内容、出演依頼などについてご不明な点はこちらをご確認ください。";

export const metadata: Metadata = {
  title: "よくある質問",
  description: FAQ_DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    url: "/faq",
    title: "よくある質問 | ARTIST MOTION - アーティストモーション",
    description: FAQ_DESCRIPTION,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "よくある質問 | ARTIST MOTION - アーティストモーション",
    description: FAQ_DESCRIPTION,
  },
};

export default function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <header className="mb-8">
            <div className="accent-line bg-slate-400 mb-4 w-16" />
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 tracking-tight">
              よくある質問
            </h1>
            <p className="mt-3 text-slate-600 leading-relaxed">
              事業内容に関するよくあるご質問をまとめています。
            </p>
          </header>

          <FAQAccordion />

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium text-sm"
            >
              ← トップページへ
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
