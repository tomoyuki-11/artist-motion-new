import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { KoenOshiraseSection } from "@/components/sections/KoenOshiraseSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { VideosSection } from "@/components/sections/VideosSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { VoiceSection } from "@/components/sections/VoiceSection";
import { ColumnSection } from "@/components/sections/ColumnSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { VisitCounter } from "@/components/VisitCounter";
import { HashScroll } from "@/components/HashScroll";

export const metadata: Metadata = {
  title:
    "ARTIST MOTION - アーティストモーション - 風舞流曲技太鼓・ベースボール・器械体操・フィットネス",
  description:
    "丹波市・三田市・神戸市北区を中心に活動するARTIST MOTION~アーティストモーション~は、風舞流曲技太鼓・ベースボール・器械体操・フィットネスなど、心を豊かにする身体活動を提供しています。お気軽にお問い合わせください。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "ARTIST MOTION - アーティストモーション",
    description:
      "丹波市・三田市・神戸市北区を中心に活動するARTIST MOTION~アーティストモーション~は、風舞流曲技太鼓・ベースボール・器械体操・フィットネスなど、心を豊かにする身体活動を提供しています。お気軽にお問い合わせください。",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "SportsActivityLocation"],
      "@id": "https://artist-motion.com/#business",
      name: "アーティストモーション",
      alternateName: "ARTIST MOTION",
      description:
        "丹波市・三田市・神戸市北区を中心に活動するスポーツ・文化教室。風舞流曲技太鼓・ベースボール（野球）・器械体操・フィットネスを提供しています。",
      url: "https://artist-motion.com",
      telephone: "090-5464-6904",
      email: "fuburyukodokai@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressRegion: "兵庫県",
        addressLocality: "丹波市",
        addressCountry: "JP",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 35.1735,
        longitude: 135.0329,
      },
      areaServed: [
        { "@type": "City", name: "丹波市" },
        { "@type": "City", name: "三田市" },
        { "@type": "City", name: "神戸市北区" },
      ],
      knowsAbout: [
        "和太鼓",
        "太鼓",
        "曲技太鼓",
        "ベースボール",
        "野球",
        "野球教室",
        "器械体操",
        "体操教室",
        "フィットネス",
        "子どもの習い事",
        "丹波市 スポーツ",
      ],
      sameAs: [
        "https://www.instagram.com/artist.motion_fuburyu",
        "https://line.me/R/ti/p/@548udakm",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "アーティストモーション 事業内容",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "風舞流曲技太鼓教室",
              description:
                "丹波市・三田市・神戸市北区で開催。日本の伝統芸能・和太鼓を楽しく学べる教室です。",
              url: "https://artist-motion.com/taiko",
              areaServed: ["丹波市", "三田市", "神戸市北区"],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "ベースボールクラブ（野球教室）",
              description:
                "丹波市を中心に活動する野球・ベースボール教室。子どもから大人まで参加できます。",
              url: "https://artist-motion.com/baseball",
              areaServed: ["丹波市"],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "器械体操教室",
              description:
                "丹波市・神戸市北区で開催。逆立ち・でんぐり返しなど器械体操を楽しく学べます。",
              url: "https://artist-motion.com/taiso",
              areaServed: ["丹波市", "神戸市北区"],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "フィットネスクラス",
              description:
                "筋トレ・ダイエット・体力づくりに特化したフィットネスクラス。",
              url: "https://artist-motion.com/fitness",
              areaServed: ["丹波市"],
            },
          },
        ],
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <VisitCounter />
      <HashScroll />
      <Navbar />
      <HeroSection />
      <KoenOshiraseSection />
      <NewsSection />
      <VideosSection />
      <ServicesSection />
      <ProfileSection />
      <VoiceSection />
      <ColumnSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
