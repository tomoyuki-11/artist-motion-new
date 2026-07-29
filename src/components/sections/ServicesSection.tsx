"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { SERVICES } from "@/data/services";
import Link from "next/link";

const SERVICE_IMAGES = [
  "/images/taiko/shinichi_shihan1.jpeg",
  "/images/baseball/baseball_swing.jpeg",
  "/images/taiso/taiso1.jpeg",
  "/images/fitness/image.jpg",
];

const SERVICE_CARDS = [
  {
    slug: "taiko" as const,
    title: "風舞流曲技太鼓",
    href: "/taiko",
    imageAlt: "風舞流曲技太鼓（和太鼓・太鼓）",
  },
  {
    slug: "baseball" as const,
    title: "ベースボールクラブ",
    href: "/baseball",
    imageAlt: "野球・ベースボールクラブ",
  },
  {
    slug: "taiso" as const,
    title: "器械体操教室",
    href: "/taiso",
    imageAlt: "器械体操教室",
  },
  {
    slug: "fitness" as const,
    title: "フィットネスクラス",
    href: "/fitness",
    imageAlt: "フィットネスクラス",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-indigo-50 text-slate-900 pt-20 md:pt-28 lg:pt-32"
    >
      <div className="container max-w-6xl">
        <AnimatedSection animation="fade-up-lg" className="mb-14 md:mb-20">
          <SectionHeading
            eyebrow="Service"
            label="事業内容"
            accentClassName="bg-slate-800"
            description="ARTIST MOTION〜アーティストモーション〜は、風舞流曲技太鼓・ベースボール・器械体操・フィットネスなど、心を豊かにする身体活動を提供しています。"
          />
        </AnimatedSection>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-0">
        {SERVICE_CARDS.map((card, index) => {
          const bgImage = SERVICE_IMAGES[index];
          return (
            <AnimatedSection
              key={card.href}
              animation="fade-up"
              delay={index * 80}
              className="group h-full min-h-0"
            >
              <Link
                href={card.href}
                className="block h-full min-h-[40vh] lg:min-h-[60vh]"
                aria-label={`${card.title} - ${card.imageAlt}の詳細を見る`}
              >
                <div
                  className="relative w-full h-full min-h-[40vh] lg:min-h-[60vh] overflow-hidden bg-slate-900"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.75) 30%, rgba(15,23,42,0.5) 60%, rgba(15,23,42,0.35) 100%)",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-left">
                    <div className="flex flex-col justify-end transition-all duration-300 ease-out">
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                        {card.title}
                      </h3>
                      {SERVICES[card.slug]?.bodyText && (
                        <p
                          data-nosnippet
                          className="text-xs md:text-sm text-white/80 line-clamp-2 mt-2 opacity-100 max-h-[5rem] overflow-hidden transition-all duration-300 ease-out lg:opacity-0 lg:max-h-0 lg:group-hover:opacity-100 lg:group-hover:max-h-[5rem]"
                        >
                          {SERVICES[card.slug].bodyText}
                        </p>
                      )}
                      <span className="text-sm text-white/90 font-medium inline-flex items-center gap-1 mt-1 opacity-100 max-h-[2rem] overflow-hidden transition-all duration-300 ease-out lg:opacity-0 lg:max-h-0 lg:group-hover:opacity-100 lg:group-hover:max-h-[2rem]">
                        開催概要
                        <span aria-hidden>&gt;</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
