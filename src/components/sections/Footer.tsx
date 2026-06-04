"use client";

import { Instagram, MessageCircle, Youtube } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/artist.motion_fuburyu";
const LINE_URL = "https://line.me/R/ti/p/@548udakm";
const YOUTUBE_URL =
  "https://www.youtube.com/@%E9%A2%A8%E8%88%9E%E6%B5%81%E6%9B%B2%E6%8A%80%E5%A4%AA%E9%BC%93%E8%B0%B7%E5%8F%A3%E7%9C%9F";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 md:py-20">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-14">
          <div className="md:col-span-4">
            <h3 className="flex items-baseline gap-3 flex-wrap mb-3">
              <span className="text-white font-bold text-xl tracking-tight">
                ARTISTMOTION
              </span>
              <span className="text-white text-sm font-medium">
                アーティストモーション
              </span>
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              心を豊かにする
            </p>
          </div>
          <div className="md:col-span-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 text-slate-300">
              事業内容
            </h4>
            <ul className="space-y-3">
              {[
                "風舞流曲技太鼓",
                "ベースボールクラブ",
                "器械体操教室",
                "フィットネスクラス",
              ].map((label) => (
                <li key={label}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 text-slate-300">
              コンテンツ
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/news" className="hover:text-white transition-colors duration-200">
                  お知らせ
                </a>
              </li>
              <li>
                <a href="/#voice" className="hover:text-white transition-colors duration-200">
                  お客様の声
                </a>
              </li>
              <li>
                <a href="/#column" className="hover:text-white transition-colors duration-200">
                  子育てコラム
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors duration-200">
                  よくある質問
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 text-slate-300">
              お問い合わせ
            </h4>
            <p className="text-sm whitespace-nowrap">Email: fuburyukodokai@gmail.com</p>
            <p className="text-sm mt-1 whitespace-nowrap">Phone: 090-5464-6904</p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-orange-500 hover:bg-orange-100 transition-colors rounded-full"
                aria-label="Instagram"
              >
                <Instagram className="w-8 h-8 text-orange-500" />
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#06C755] hover:bg-[#BBF7D0] transition-colors rounded-full"
                aria-label="LINE"
              >
                <MessageCircle className="w-8 h-8 text-[#06C755]" />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#FF0000] hover:bg-[#FECACA] transition-colors rounded-full"
                aria-label="YouTube"
              >
                <Youtube className="w-8 h-8 text-[#FF0000]" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
          <p>&copy; 2026 ARTISTMOTION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
