"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { InstagramIcon, YouTubeIcon } from "@/components/icons/BrandIcons";
import { useEffect, useRef, useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/artist.motion_fuburyu";
const INSTAGRAM_REVERSE_URL = "https://www.instagram.com/artist.motion_reverse";
const YOUTUBE_URL =
  "https://www.youtube.com/@%E9%A2%A8%E8%88%9E%E6%B5%81%E6%9B%B2%E6%8A%80%E5%A4%AA%E9%BC%93%E8%B0%B7%E5%8F%A3%E7%9C%9F";

const INSTAGRAM_FEATURED_POST_SHORTCODES: string[] = [
  "DbP8jPaDwT-",
  "DafaJkbD_4e",
];

const YOUTUBE_LATEST_VIDEO_IDS: string[] = ["tnWP32WZqBc", "bMB-8V6ii4Q"];

export function ProfileSection() {
  const [instagramEmbedLoading, setInstagramEmbedLoading] = useState<
    Record<string, boolean>
  >({});
  const [instagramEmbedTimedOut, setInstagramEmbedTimedOut] = useState<
    Record<string, boolean>
  >({});
  const [instagramInView, setInstagramInView] = useState<
    Record<string, boolean>
  >({});
  const instagramRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [youtubeEmbedLoading, setYoutubeEmbedLoading] = useState<
    Record<string, boolean>
  >({});

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
    <section className="bg-white text-slate-900 py-20 md:py-28 lg:py-32">
      <div className="container max-w-6xl">
        {/* 代表紹介：ページ中央に配置 */}
        <AnimatedSection animation="fade-up-lg" className="mb-16 md:mb-20">
          <div
            className="relative rounded-2xl aspect-square w-full max-w-xl mx-auto"
            style={{
              backgroundImage: "url('/images/profile-bg.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 px-6 py-8 md:px-8 md:py-10 flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-wide">
                  代表　谷口真一
                </p>
                <p
                  className="text-xl md:text-2xl text-slate-700 pb-4"
                  style={{ fontFamily: "'Yuji Boku', serif" }}
                >
                  風舞流曲技太鼓　二代目師範　風谷鼓道
                </p>
              </div>
              <p className="text-sm md:text-base text-slate-700 leading-loose">
                お子様から大人の方と関わらせていただき、「心を豊かにする」を事業理念に2020年に開業しました。
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-loose">
                現在、丹波市、三田市、神戸市北区を中心に活動しております。
                <br />
                詳しい活動内容はインスタグラム、YouTubeまで遊びに来てください！
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Instagram ＋ YouTube */}
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
                        ref={(el) => {
                          instagramRefs.current[shortcode] = el;
                        }}
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
                              setInstagramEmbedLoading((p) => ({
                                ...p,
                                [shortcode]: false,
                              }))
                            }
                            onError={() =>
                              setInstagramEmbedLoading((p) => ({
                                ...p,
                                [shortcode]: false,
                              }))
                            }
                          />
                        )}
                      </div>
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
                    <InstagramIcon className="w-5 h-5 text-orange-500" />
                    インスタグラム【公式】を見る
                  </a>
                  <a
                    href={INSTAGRAM_REVERSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-orange-100 hover:text-orange-500 transition-colors"
                  >
                    <InstagramIcon className="w-5 h-5 text-orange-500" />
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
                            setYoutubeEmbedLoading((p) => ({
                              ...p,
                              [videoId]: false,
                            }))
                          }
                          onError={() =>
                            setYoutubeEmbedLoading((p) => ({
                              ...p,
                              [videoId]: false,
                            }))
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
                    <YouTubeIcon className="w-5 h-5 text-[#FF0000]" />
                    風舞流曲技太鼓のYouTubeを見る
                  </a>
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
