"use client";

import { useState } from "react";
import { FAQ_CATEGORIES } from "@/data/faq";

type FAQItemProps = {
  question: string;
  answer: string;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left"
      >
        <p className="text-sm font-semibold text-orange-600 mb-1">Q.</p>
        <p className="font-semibold text-slate-800">{question}</p>
      </button>
      {open && (
        <div className="mt-3 text-slate-700 leading-relaxed">
          <p className="text-sm font-semibold text-sky-600 mb-1">A.</p>
          <div>{answer}</div>
        </div>
      )}
    </div>
  );
}

export function FAQAccordion() {
  return (
    <div className="space-y-10">
      {FAQ_CATEGORIES.map((category) => (
        <section
          key={category.title}
          className="bg-white/80 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
            {category.title}
          </h2>
          <div className="space-y-6">
            {category.items.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
