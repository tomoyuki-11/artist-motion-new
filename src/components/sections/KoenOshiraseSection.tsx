"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/AnimatedSection";

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
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-white/95 font-koen">
            第5回　響きの祭典
            <br />
            〜その一打、舞うが如く、嵐の如し〜
          </h3>
          <CountdownBadge />
          <div className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto space-y-4">
            <p className="font-koen">
              令和8年9月20日（日）13時30分開演、丹波市山南町「やまなみホール」にて、第5回「響きの祭典」を開催いたします。
            </p>
            <p className="font-koen">
              毎年多くのお客様にご来場いただき、満席となる本公演。今年は新たに「鼓道会（こどうかい）」「鼓蝶会（こちょうかい）」「鼓粋会（こすいかい）」が加わり、さらに充実した舞台をお届けいたします。
            </p>
            <p className="font-koen">
              出演者一人ひとりが技術と感性を磨き上げ、力強さと繊細さを兼ね備えた和太鼓の響きをお楽しみいただけます。
            </p>
            <p className="font-koen">
              心を震わせる迫力の演奏と躍動感あふれるステージを、ぜひ会場でご体感ください。
            </p>
            <p className="font-koen">
              皆様のご来場を心よりお待ちしております。
            </p>
          </div>
          <div className="mt-8 md:mt-12 max-w-xl mx-auto">
            <Image
              src="/images/koen_oshirase/poster.jpg"
              alt="第5回響の祭典"
              width={1476}
              height={1072}
              sizes="(max-width: 576px) 100vw, 576px"
              className="w-full h-auto shadow-lg"
              loading="lazy"
            />
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-xl md:text-2xl font-bold text-white font-koen">
              観覧申し込みはコチラ！
            </p>
            <Image
              src="/images/koen_oshirase/qr-apply.jpeg"
              alt="観覧申し込みQRコード"
              width={224}
              height={224}
              className="w-48 h-48 md:w-56 md:h-56 object-contain bg-white p-2 rounded-lg shadow-lg"
              loading="lazy"
            />
            <p className="text-sm md:text-base text-white/80 font-koen max-w-md">
              ※尚コチラの事前申し込みは来場者数を見込むもので座席の確保ではございません。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
