"use client";

import { Navbar } from "@/components/Navbar";
import { fetchNews } from "@/lib/adminApi";
import type { NewsItem } from "@/lib/adminApi";
import { useEffect, useState } from "react";
import Link from "next/link";

export function NewsListClient() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsImageLoading, setNewsImageLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchNews()
      .then((items) => {
        setNews(items);
        items
          .filter((item) => item.image_url)
          .forEach((item) => {
            const img = new Image();
            img.src = item.image_url!;
          });
      })
      .catch(() => setNews([]));
  }, []);

  useEffect(() => {
    setNewsImageLoading((prev) => {
      const next = { ...prev };
      for (const item of news) {
        if (!item.image_url) continue;
        const key = String(item.id);
        if (next[key] === undefined) next[key] = true;
      }
      return next;
    });
  }, [news]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <div className="accent-line bg-slate-400 mb-4 w-16" />
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 tracking-tight">
              お知らせ一覧
            </h1>
          </div>

          {news.length === 0 ? (
            <p className="text-lg text-slate-600 leading-relaxed">
              お知らせはありません
            </p>
          ) : (
            <ul className="list-none m-0 p-0 space-y-0 border-t border-slate-200">
              {news.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-slate-200 py-4 md:py-5"
                >
                  <Link
                    href={`/news/${item.id}`}
                    className="w-full text-left hover:bg-slate-100/60 transition-colors rounded-none flex gap-4 items-start -mx-2 px-2 py-1"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-500 mb-1">
                        {new Date(item.created_at).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <h2 className="text-base md:text-lg font-semibold text-slate-800 mb-1">
                        {item.title}
                      </h2>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed line-clamp-2">
                        {item.body}
                      </p>
                    </div>
                    {item.image_url && (
                      <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                        {newsImageLoading[String(item.id)] && (
                          <div
                            className="absolute inset-0 grid place-items-center rounded-lg border border-slate-200 bg-slate-100"
                            aria-label="画像を読み込み中"
                          >
                            <div className="w-6 h-6 rounded-full border-2 border-slate-300 border-t-slate-600 animate-spin" />
                          </div>
                        )}
                        <img
                          src={item.image_url}
                          alt=""
                          loading="lazy"
                          onLoad={() =>
                            setNewsImageLoading((prev) => ({
                              ...prev,
                              [String(item.id)]: false,
                            }))
                          }
                          onError={() =>
                            setNewsImageLoading((prev) => ({
                              ...prev,
                              [String(item.id)]: false,
                            }))
                          }
                          className={`w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover border border-slate-200 ${
                            newsImageLoading[String(item.id)] ? "opacity-0" : "opacity-100"
                          }`}
                        />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <Link
              href="/#news"
              className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium text-sm"
            >
              ← トップページのお知らせへ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
