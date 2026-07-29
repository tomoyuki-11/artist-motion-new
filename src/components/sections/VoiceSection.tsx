"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { getTestimonialsForHome } from "@/data/testimonials";
import Link from "next/link";

export function VoiceSection() {
  return (
    <section
      id="voice"
      className="bg-indigo-50 text-slate-800 py-20 md:py-28"
    >
      <div className="container max-w-5xl">
        <AnimatedSection
          animation="fade-up-lg"
          className="text-center mb-12 md:mb-16"
        >
          <SectionHeading
            eyebrow="Voice"
            label="お客様の声"
            accentClassName="bg-slate-500"
            description="保護者・門下生・会員の皆様からいただいた声の一部をご紹介します。"
          />
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {getTestimonialsForHome(4).map((item, index) => (
            <AnimatedSection
              key={item.id}
              animation="fade-up"
              delay={index * 80}
              className="bg-white p-5 md:p-6 shadow-sm border border-slate-200/80"
            >
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                {item.categoryLabel}
              </p>
              <p className="text-slate-700 leading-relaxed">
                「{item.body}」
              </p>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center justify-center rounded-lg bg-slate-700 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            すべて見る
          </Link>
        </div>
      </div>
    </section>
  );
}
