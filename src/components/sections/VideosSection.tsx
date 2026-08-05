"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE_VIDEOS } from "@/data/videos";

function primeVideoFirstFrame(video: HTMLVideoElement) {
  const targetTime = Math.min(
    0.05,
    Math.max(0.01, (video.duration || 1) * 0.001)
  );
  try {
    if (Number.isFinite(targetTime)) video.currentTime = targetTime;
  } catch {
    // iOS/Safari等でcurrentTimeの変更が拒否される場合があるので無視
  }
}

const ALL_LABEL = "ALL";
const CATEGORIES = [
  "ベースボールクラブ",
  "風舞流曲技太鼓",
  "器械体操教室",
  "フィットネスクラス",
];

const CATEGORY_ICONS: Record<
  string,
  { src: string; width: number; height: number }
> = {
  "ベースボールクラブ": { src: "/images/icons/baseball-icon.png", width: 246, height: 246 },
  "風舞流曲技太鼓": { src: "/images/icons/taiko-icon.png", width: 246, height: 268 },
  "器械体操教室": { src: "/images/icons/gymnastics-icon.png", width: 167, height: 268 },
  "フィットネスクラス": { src: "/images/icons/fitness-icon.png", width: 259, height: 206 },
};

export function VideosSection() {
  const labels = [ALL_LABEL, ...CATEGORIES];
  const [active, setActive] = useState(ALL_LABEL);

  const filtered = active === ALL_LABEL
    ? SITE_VIDEOS
    : SITE_VIDEOS.filter((v) => v.label === active);

  return (
    <section id="videos" className="bg-white text-slate-900 py-16 md:py-20">
      <div className="container max-w-6xl">
        <AnimatedSection
          animation="fade-up-lg"
          className="text-center mb-10 md:mb-14"
        >
          <SectionHeading
            eyebrow="Scene"
            label="現場の記録"
            accentClassName="bg-slate-800"
            description="活動の空気感をご覧ください"
          />
        </AnimatedSection>

        {SITE_VIDEOS.length === 0 ? (
          <p className="text-center text-slate-600">動画は準備中です。</p>
        ) : (
          <>
            {/* フィルタータブ */}
            <AnimatedSection animation="fade-up" className="mb-8">
              <div className="flex items-center gap-0 border-b border-slate-200">
                {labels.map((label) => {
                  const icon = CATEGORY_ICONS[label];
                  return (
                    <button
                      key={label}
                      onClick={() => setActive(label)}
                      aria-label={label}
                      title={label}
                      className={`flex h-11 items-center px-4 text-xs tracking-widest uppercase font-medium transition-all border-b-2 -mb-px ${
                        active === label
                          ? "border-slate-800 text-slate-800 opacity-100"
                          : "border-transparent text-slate-400 opacity-40 hover:opacity-70"
                      }`}
                    >
                      {icon ? (
                        <Image
                          src={icon.src}
                          alt={label}
                          width={icon.width}
                          height={icon.height}
                          className="h-6 w-auto"
                        />
                      ) : (
                        label
                      )}
                    </button>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* 現在のカテゴリ名(横スクロールしても固定) */}
            {active !== ALL_LABEL && (
              <p className="mb-3 text-xs font-medium tracking-wide text-slate-400">
                {active}
              </p>
            )}

            {/* 水平スクロールフィルム */}
            {filtered.length === 0 ? (
              <p className="text-sm text-slate-400 tracking-wide py-8">動画はありません</p>
            ) : (
            <div
              className="flex gap-4 overflow-x-auto pb-6"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filtered.map((v) => (
                <div
                  key={v.id}
                  className="flex-none w-[80vw] md:w-[45vw] lg:w-[38vw]"
                >
                  <div className="relative aspect-video bg-black">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => {
                        if (!v.poster) primeVideoFirstFrame(e.currentTarget);
                      }}
                      onSeeked={(e) => {
                        if (!v.poster) e.currentTarget.pause();
                      }}
                      poster={v.poster}
                    >
                      <source src={v.src} type="video/mp4" />
                      お使いのブラウザは動画再生に対応していません。
                    </video>
                  </div>
                  {v.title && (
                    <p className="mt-3 text-sm md:text-base font-semibold text-slate-800 leading-snug">
                      {v.title}
                    </p>
                  )}
                  {v.description && (
                    <p className="mt-1 text-xs md:text-sm text-slate-500 leading-relaxed">
                      {v.description}
                    </p>
                  )}
                  {v.date && (
                    <p className="mt-1 text-xs text-slate-400">{v.date}</p>
                  )}
                </div>
              ))}
            </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
