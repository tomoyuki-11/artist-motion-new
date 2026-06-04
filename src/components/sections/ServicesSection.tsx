"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SERVICES } from "@/data/services";
import { Instagram, Youtube, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/artist.motion_fuburyu";
const INSTAGRAM_REVERSE_URL = "https://www.instagram.com/artist.motion_reverse";
const LINE_URL = "https://line.me/R/ti/p/@548udakm";
const YOUTUBE_URL =
  "https://www.youtube.com/@%E9%A2%A8%E8%88%9E%E6%B5%81%E6%9B%B2%E6%8A%80%E5%A4%AA%E9%BC%93%E8%B0%B7%E5%8F%A3%E7%9C%9F";

const INSTAGRAM_FEATURED_POST_SHORTCODES: string[] = [
  "DYuAmEWj_H0",
  "DYj4XqXD09B",
];

const YOUTUBE_LATEST_VIDEO_IDS: string[] = [
  "rJLQLoUghSA",
  "4t6s5xG1zfg",
];

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
    href: "/services/taiko",
    imageAlt: "風舞流曲技太鼓（和太鼓・太鼓）",
  },
  {
    slug: "baseball" as const,
    title: "ベースボールクラブ",
    href: "/services/baseball",
    imageAlt: "野球・ベースボールクラブ",
  },
  {
    slug: "taiso" as const,
    title: "器械体操教室",
    href: "/services/taiso",
    imageAlt: "器械体操教室",
  },
  {
    slug: "fitness" as const,
    title: "フィットネスクラス",
    href: "/services/fitness",
    imageAlt: "フィットネスクラス",
  },
] as const;

export function ServicesSection() {
  const [instagramEmbedLoading, setInstagramEmbedLoading] = useState<Record<string, boolean>>({});
  const [instagramEmbedTimedOut, setInstagramEmbedTimedOut] = useState<Record<string, boolean>>({});
  const [instagramInView, setInstagramInView] = useState<Record<string, boolean>>({});
  const instagramRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [youtubeEmbedLoading, setYoutubeEmbedLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const nextYoutube: Record<string, boolean> = {};
    for (const id of YOUTUBE_LATEST_VIDEO_IDS) nextYoutube[id] = true;
    setYoutubeEmbedLoading(nextYoutube);

    if (!("IntersectionObserver" in window)) {
      const fallback: Record<string, boolean> = {};
      for (const sc of INSTAGRAM_FEATURED_POST_SHORTCODES) fallback[sc] = true;
      setInstagramInView(fallback);
      return;
    }
    const observers: IntersectionObserver[] = [];
    for (const sc of INSTAGRAM_FEATURED_POST_SHORTCODES) {
      const el = instagramRefs.current[sc];
      if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setInstagramInView((p) => ({ ...p, [sc]: true }));
            setInstagramEmbedLoading((p) => ({ ...p, [sc]: true }));
            obs.disconnect();
            const t = setTimeout(() => {
              setInstagramEmbedTimedOut((p) => ({ ...p, [sc]: true }));
              setInstagramEmbedLoading((p) => ({ ...p, [sc]: false }));
            }, 8000);
            return () => clearTimeout(t);
          }
        },
        { rootMargin: "200px" }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      id="services"
      className="bg-white text-slate-900 py-20 md:py-28 lg:py-32"
    >
      <div className="container max-w-6xl">
        <AnimatedSection
          animation="fade-up-lg"
          className="mb-14 md:mb-20 text-center"
        >
          <div className="accent-line bg-slate-800 mb-6 mx-auto" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 tracking-tight">
            事業内容
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto">
            ARTIST
            MOTION〜アーティストモーション〜は、風舞流曲技太鼓・ベースボール・器械体操・フィットネスなど、心を豊かにする身体活動を提供しています。
          </p>
        </AnimatedSection>
      </div>

      {/* 画面いっぱい4枚並び */}
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

      <div className="container max-w-6xl">
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-[1.1fr,1.4fr] gap-10 lg:gap-14 items-start">
          {/* 左：代表紹介・事業理念 */}
          <AnimatedSection animation="fade-up-lg" className="max-w-3xl">
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
              <p className="text-lg md:text-xl">
                <strong>代表　谷口真一</strong>
                <br />
                風舞流曲技太鼓　二代目師範　風谷鼓道
              </p>
              <p>
                お子様から大人の方と関わらせていただき、「心を豊かにする」を事業理念に2020年に開業しました。
              </p>
              <p>
                現在、丹波市、三田市、神戸市北区を中心に活動しております。
                <br />
                詳しい活動内容はインスタグラム、YouTubeまで遊びに来てください！
              </p>
            </div>
          </AnimatedSection>

          {/* 右：Instagram ＋ YouTube */}
          <div className="space-y-8">
            {INSTAGRAM_FEATURED_POST_SHORTCODES.length > 0 && (
              <div className="w-full">
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  インスタグラム【公式】の投稿
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  {INSTAGRAM_FEATURED_POST_SHORTCODES.map((shortcode) => (
                    <div key={shortcode}>
                      <div
                        ref={(el) => { instagramRefs.current[shortcode] = el; }}
                        className="relative aspect-square min-h-[260px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm"
                      >
                        {instagramEmbedLoading[shortcode] && (
                          <div
                            className="absolute inset-0 grid place-items-center bg-slate-100"
                            aria-label="Instagramを読み込み中"
                          >
                            <div className="w-10 h-10 rounded-full border-4 border-slate-300 border-t-slate-700 animate-spin" />
                          </div>
                        )}
                        {instagramInView[shortcode] && (
                          <iframe
                            src={`https://www.instagram.com/p/${shortcode}/embed/`}
                            title={`Instagram post ${shortcode}`}
                            className="w-full h-full border-0"
                            allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            onLoad={() =>
                              setInstagramEmbedLoading((p) => ({ ...p, [shortcode]: false }))
                            }
                            onError={() =>
                              setInstagramEmbedLoading((p) => ({ ...p, [shortcode]: false }))
                            }
                          />
                        )}
                      </div>
                      {instagramEmbedTimedOut[shortcode] && (
                        <p className="mt-2 text-xs text-slate-500">
                          埋め込みが表示されない場合があります。下のボタンからご覧ください。
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-orange-100 hover:text-orange-500 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-orange-500" />
                    インスタグラム【公式】を見る
                  </a>
                  <a
                    href={INSTAGRAM_REVERSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-orange-100 hover:text-orange-500 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-orange-500" />
                    インスタグラム【現場の裏側】を見る
                  </a>
                </div>
              </div>
            )}

            {YOUTUBE_LATEST_VIDEO_IDS.length > 0 && (
              <div className="w-full">
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  風舞流曲技太鼓のYouTubeの動画
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  {YOUTUBE_LATEST_VIDEO_IDS.map((videoId) => (
                    <div key={videoId}>
                      <div className="relative aspect-video min-h-[200px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[300px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm">
                        {youtubeEmbedLoading[videoId] && (
                          <div
                            className="absolute inset-0 grid place-items-center bg-slate-100"
                            aria-label="YouTubeを読み込み中"
                          >
                            <div className="w-10 h-10 rounded-full border-4 border-slate-300 border-t-slate-700 animate-spin" />
                          </div>
                        )}
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                          title="YouTube video"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          onLoad={() =>
                            setYoutubeEmbedLoading((p) => ({ ...p, [videoId]: false }))
                          }
                          onError={() =>
                            setYoutubeEmbedLoading((p) => ({ ...p, [videoId]: false }))
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-[#FECACA] transition-colors"
                  >
                    <Youtube className="w-5 h-5 text-[#FF0000]" />
                    風舞流曲技太鼓のYouTubeを見る
                  </a>
                </div>
              </div>
            )}

            {(INSTAGRAM_FEATURED_POST_SHORTCODES.length === 0 ||
              YOUTUBE_LATEST_VIDEO_IDS.length === 0) && (
              <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-3">
                {INSTAGRAM_FEATURED_POST_SHORTCODES.length === 0 && (
                  <>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-orange-100 hover:text-orange-500 transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-orange-500" />
                      インスタグラム【公式】を見る
                    </a>
                    <a
                      href={INSTAGRAM_REVERSE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-orange-100 hover:text-orange-500 transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-orange-500" />
                      インスタグラム【現場の裏側】を見る
                    </a>
                  </>
                )}
                {YOUTUBE_LATEST_VIDEO_IDS.length === 0 && (
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-[#FECACA] transition-colors"
                  >
                    <Youtube className="w-5 h-5 text-[#FF0000]" />
                    風舞流曲技太鼓のYouTubeを見る
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <AnimatedSection animation="fade-up-lg" className="max-w-3xl mx-auto mt-16">
          <div className="flex justify-center">
            <AnimatedSection animation="fade-up-lg" delay={450}>
              <Link
                href="/column"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-300 focus-visible:ring-offset-slate-50"
              >
                <BookOpen className="w-5 h-5" />
                <span>子育てコラムを見る</span>
              </Link>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
