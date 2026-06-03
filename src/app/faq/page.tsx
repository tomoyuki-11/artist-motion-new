import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { FAQAccordion } from "./FAQAccordion";

export const metadata: Metadata = {
  title: "よくある質問",
};

export default function FAQ() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <header className="mb-8">
            <div className="accent-line bg-slate-400 mb-4 w-16" />
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 tracking-tight">
              よくある質問
            </h1>
            <p className="mt-3 text-slate-600 leading-relaxed">
              事業内容に関するよくあるご質問をまとめています。
            </p>
          </header>

          <FAQAccordion />

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium text-sm"
            >
              ← トップページへ
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
