// "use client"; // ← 次回公演時にカウントダウンを復元する際は有効化してください

// import { useState, useEffect } from "react"; // ← CountdownBadge で使用
import { AnimatedSection } from "@/components/AnimatedSection";

/* ↓ 次回公演時に復元してください（"use client" と useState/useEffect のインポートも戻すこと）
function CountdownBadge() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const eventDate = new Date("2026-09-20T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diff = Math.ceil(
        (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      setDaysLeft(diff);
    };

    calc();

    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();
    const timeout = setTimeout(calc, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  if (daysLeft === null || daysLeft < 0) return null;
  if (daysLeft === 0) {
    return (
      <div className="inline-block bg-white/90 text-slate-900 px-6 py-3 rounded-full font-bold text-xl font-koen mt-6">
        本日開演！
      </div>
    );
  }

  return (
    <div className="mt-6 mb-8 flex flex-col items-center gap-1">
      <p className="text-white/80 text-sm font-koen">開演まで</p>
      <div className="flex items-end gap-2">
        <span className="text-6xl md:text-7xl font-bold text-white leading-none font-koen">
          {daysLeft}
        </span>
        <span className="text-2xl text-white/90 pb-1 font-koen">日</span>
      </div>
    </div>
  );
}
*/

export function KoenOshiraseSection() {
  return (
    <section className="koen-parallax-section relative w-full py-16 md:py-24">
      <div className="absolute inset-0 w-full h-full bg-slate-900/70" />

      <div className="relative z-10 container max-w-5xl">
        <AnimatedSection animation="fade-up-lg" className="text-center">
          <div className="accent-line bg-white/90 mb-6 mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white tracking-tight font-koen">
            公演のお知らせ
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-koen">
            次回公演が決定次第、こちらにてお知らせいたします。
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
