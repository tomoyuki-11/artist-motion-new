"use client";

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

export function VideosSection() {
  return (
    <section id="videos" className="bg-white text-slate-900 py-16 md:py-20">
      <div className="container max-w-6xl">
        <AnimatedSection
          animation="fade-up-lg"
          className="text-center mb-10 md:mb-14"
        >
          <div className="accent-line bg-slate-800 mb-6 mx-auto" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 tracking-tight">
            現場の雰囲気
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            レッスンや活動の「空気感」が伝わる動画をまとめています。
          </p>
        </AnimatedSection>

        {SITE_VIDEOS.length === 0 ? (
          <p className="text-center text-slate-600">動画は準備中です。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SITE_VIDEOS.map((v) => (
              <AnimatedSection
                key={v.id}
                animation="fade-up"
                className="text-left"
              >
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-3 py-1 text-xs md:text-sm font-semibold shadow-sm">
                    {v.label}
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
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
                </div>
                {v.title && (
                  <p className="mt-3 text-center text-base md:text-lg font-semibold text-slate-800">
                    {v.title}
                  </p>
                )}
                {v.description && (
                  <p className="mt-2 text-center text-sm md:text-base text-slate-600 leading-relaxed">
                    {v.description}
                  </p>
                )}
                {v.date && (
                  <p className="mt-1 text-center text-xs md:text-sm text-slate-500">
                    {v.date}
                  </p>
                )}
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
