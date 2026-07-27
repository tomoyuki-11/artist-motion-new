"use client";

import { ChevronDown } from "lucide-react";
import NextImage from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/images/IMG_6577.jpeg",
  "/images/baseball/baseball_swing.jpeg",
  "/images/taiso/taiso1.jpeg",
  "/images/fitness/image.jpg",
];

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fallback = setTimeout(() => {
      if (!cancelled) setHeroReady(true);
    }, 5000);
    const promises = HERO_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        })
    );
    Promise.all(promises).then(() => {
      if (!cancelled) {
        clearTimeout(fallback);
        setHeroReady(true);
      }
    });
    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20">
      <div className="absolute inset-0 w-full h-full bg-slate-900" />
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 45%, transparent 100%)",
        }}
      />

      {/* 4 Activity Images Grid */}
      <div
        className={`absolute inset-0 w-full h-full p-3 md:p-5 lg:p-6 ${
          heroReady ? "animate-hero-images-reveal" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 w-full h-full max-w-7xl mx-auto min-h-0">
          <div
            className="relative overflow-hidden rounded-xl md:rounded-2xl will-change-transform min-h-[40vh] md:min-h-0"
            style={{
              backgroundImage: "url(/images/IMG_6577.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "50% 30%",
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-transparent" />
          </div>
          <div
            className="relative overflow-hidden rounded-xl md:rounded-2xl will-change-transform min-h-[40vh] md:min-h-0"
            style={{
              backgroundImage: "url(/images/baseball/baseball_swing.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "50% 40%",
              transform: `translateY(${scrollY * 0.18}px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-slate-900/50 to-transparent" />
          </div>
          <div
            className="relative overflow-hidden rounded-xl md:rounded-2xl will-change-transform min-h-[40vh] md:min-h-0"
            style={{
              backgroundImage: "url(/images/taiso/taiso1.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "50% 30%",
              transform: `translateY(${scrollY * 0.22}px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/50 to-transparent" />
          </div>
          <div
            className="relative overflow-hidden rounded-xl md:rounded-2xl will-change-transform min-h-[40vh] md:min-h-0"
            style={{
              backgroundImage: "url(/images/fitness/image.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              transform: `translateY(${scrollY * 0.28}px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-slate-900/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Darkening scrim, syncs with the logo rising over the images */}
      <div
        className={`absolute inset-0 w-full h-full bg-slate-950 pointer-events-none z-[2] ${
          heroReady ? "animate-hero-scrim-reveal" : "opacity-0"
        }`}
      />

      {/* Logo rises up over the images before the wordmark appears */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-[3]">
        <div
          className={`relative w-[92vmin] h-[92vmin] max-w-4xl max-h-224 ${
            heroReady ? "animate-hero-logo-reveal" : "opacity-0"
          }`}
        >
          <NextImage
            src="/images/logo-mark-hires.png"
            alt=""
            fill
            priority
            sizes="92vmin"
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 w-full h-full p-3 md:p-5 lg:p-6 z-10 pointer-events-none">
        <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center space-y-4 md:space-y-6 px-4 md:px-8 pointer-events-auto">
            <div
              className={`flex justify-center ${heroReady ? "animate-hero-text-reveal" : "opacity-0"}`}
            >
              <div className="accent-line bg-white/90" />
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.95] text-white drop-shadow-2xl tracking-tighter">
              <span
                className={`block ${heroReady ? "animate-hero-text-reveal-delay-1" : "opacity-0"}`}
              >
                ARTIST
              </span>
              <span
                className={`block ${heroReady ? "animate-hero-text-reveal-delay-2" : "opacity-0"}`}
              >
                MOTION
              </span>
            </h1>

            <h2
              className={`text-base md:text-xl text-white/90 drop-shadow-lg tracking-widest font-light sr-only ${heroReady ? "animate-hero-text-reveal-delay-3" : "opacity-0"}`}
            >
              ~ アーティストモーション ~
            </h2>
            <p
              className={`text-base md:text-xl text-white/90 drop-shadow-lg tracking-widest font-light ${heroReady ? "animate-hero-text-reveal-delay-3" : "opacity-0"}`}
            >
              ~ アーティストモーション ~
            </p>

            <p
              className={`text-lg md:text-2xl font-light max-w-md mx-auto text-white drop-shadow-lg ${heroReady ? "animate-hero-text-reveal-delay-4" : "opacity-0"}`}
            >
              心を豊かにする
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto transition-opacity duration-700 delay-[4.2s] ${heroReady ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => {
          document.getElementById("services")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        <span
          className="absolute w-12 h-12 rounded-full border-2 border-white/40 left-1/2 top-1/2 animate-scroll-pulse"
          style={{ transform: "translate(-50%, -50%)" }}
          aria-hidden
        />
        <ChevronDown className="w-8 h-8 text-white/90 group-hover:text-white transition-colors animate-bounce" />
      </button>
    </section>
  );
}
