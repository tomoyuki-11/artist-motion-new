"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
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

const ALL_LABEL = "全て";
const CATEGORIES = [
  "ベースボールクラブ",
  "風舞流曲技太鼓",
  "器械体操教室",
  "フィットネスクラス",
];

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
          <div className="accent-line bg-slate-800 mb-6 mx-auto" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 text-slate-800 tracking-tight">
            Scene
          </h2>
          <p className="text-xs md:text-sm tracking-widest text-slate-400 font-medium mb-2">
            現場の記録
          </p>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-4">
            活動の空気感をご覧ください
          </p>
        </AnimatedSection>

        {SITE_VIDEOS.length === 0 ? (
          <p className="text-center text-slate-600">動画は準備中です。</p>
        ) : (
          <>
            {/* フィルタータブ */}
            <AnimatedSection animation="fade-up" className="mb-8">
              <div className="flex items-center gap-0 border-b border-slate-200">
                {labels.map((label) => (
                  <button
                    key={label}
                    onClick={() => setActive(label)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase font-medium transition-colors border-b-2 -mb-px ${
                      active === label
                        ? "border-slate-800 text-slate-800"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </AnimatedSection>

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
                      preload="auto"
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
