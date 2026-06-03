"use client";

import { AnimatedSection } from "@/components/AnimatedSection";

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
            <img
              src="/images/koen_oshirase/poster.jpg"
              alt="第5回響の祭典"
              className="w-full h-auto shadow-lg"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-xl md:text-2xl font-bold text-white font-koen">
              観覧申し込みはコチラ！
            </p>
            <img
              src="/images/koen_oshirase/qr-apply.jpeg"
              alt="観覧申し込みQRコード"
              className="w-48 h-48 md:w-56 md:h-56 object-contain bg-white p-2 rounded-lg shadow-lg"
              loading="lazy"
              decoding="async"
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
