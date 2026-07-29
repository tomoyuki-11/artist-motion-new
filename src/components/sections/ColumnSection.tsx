"use client";

import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { COLUMNS, type ColumnItem } from "@/data/columns";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const PREVIEW_COUNT = 3;

export function ColumnSection() {
  const [selectedColumn, setSelectedColumn] = useState<ColumnItem | null>(null);

  return (
    <section id="column" className="bg-white text-slate-800 py-20 md:py-28">
      <div className="container max-w-5xl">
        <AnimatedSection
          animation="fade-up-lg"
          className="text-center mb-12 md:mb-16"
        >
          <SectionHeading
            eyebrow="Column"
            label="子育てコラム"
            accentClassName="bg-slate-500"
            description="子育てに役立つ情報や日々の気づきをお届けします。"
          />
        </AnimatedSection>

        <ul className="list-none m-0 p-0 border-t border-slate-200">
          {COLUMNS.slice(0, PREVIEW_COUNT).map((col, index) => (
            <AnimatedSection
              key={col.url}
              animation="fade-up"
              delay={index * 60}
            >
              <li className="border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedColumn(col)}
                  className="w-full text-left py-4 md:py-5 px-2 flex items-center justify-between gap-4 hover:bg-indigo-100/50 transition-colors"
                >
                  <span className="text-base md:text-lg font-semibold text-slate-800">
                    {col.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              </li>
            </AnimatedSection>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/column"
            className="inline-flex items-center justify-center rounded-lg bg-orange-500 text-white px-6 py-3 text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            すべて見る
          </Link>
        </div>
      </div>

      <Dialog
        open={!!selectedColumn}
        onOpenChange={(open) => !open && setSelectedColumn(null)}
      >
        <DialogContent
          className="max-w-6xl w-[calc(100vw-2rem)] max-h-[95vh] h-[95vh] p-0 gap-0 flex flex-col overflow-hidden"
          showCloseButton={false}
        >
          {selectedColumn && (
            <>
              <div className="shrink-0 flex items-center gap-3 pl-4 pr-2 py-3 border-b border-slate-200 bg-slate-50">
                <h2 className="text-base font-bold text-slate-800 truncate min-w-0 flex-1">
                  {selectedColumn.title}
                </h2>
                <a
                  href={selectedColumn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800 shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                  新しいタブで開く
                </a>
                <DialogClose
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 shrink-0"
                  aria-label="閉じる"
                >
                  <X className="w-6 h-6" />
                </DialogClose>
              </div>
              <div className="flex-1 min-h-0 bg-slate-100">
                <iframe
                  title={selectedColumn.title}
                  src={`${selectedColumn.url}#navpanes=0&view=Fit`}
                  className="w-full h-full"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
