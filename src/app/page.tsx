import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { KoenOshiraseSection } from "@/components/sections/KoenOshiraseSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { VideosSection } from "@/components/sections/VideosSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
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
  "@type": "SportsActivityLocation",
  name: "アーティストモーション",
  alternateName: "ARTIST MOTION",
  url: "https://artist-motion.com",
  telephone: "090-5464-6904",
  email: "fuburyukodokai@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "兵庫県",
    addressLocality: "丹波市",
    addressCountry: "JP",
  },
  areaServed: [
    { "@type": "City", name: "丹波市" },
    { "@type": "City", name: "三田市" },
    { "@type": "City", name: "神戸市北区" },
  ],
  sameAs: [
    "https://www.instagram.com/artist.motion_fuburyu",
    "https://line.me/R/ti/p/@548udakm",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "アーティストモーション 事業内容",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "風舞流曲技太鼓" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ベースボールクラブ（野球）", areaServed: "丹波市" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "器械体操教室" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "フィットネスクラス" } },
    ],
  },
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
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
