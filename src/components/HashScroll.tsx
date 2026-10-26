"use client";

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    // すでにクロスフェードの計測が完了していれば即スクロール（ソフトナビゲーション対応）
    const w = window as Window & { __crossfadeReady?: boolean };
    if (w.__crossfadeReady) {
      scroll();
      return;
    }

    // 初回ロード時：計測完了イベントを待つ（最大2秒でフォールバック）
    const fallbackTimer = setTimeout(scroll, 4000);

    const onReady = () => {
      clearTimeout(fallbackTimer);
      scroll();
    };

    window.addEventListener("crossfade-layout-ready", onReady, { once: true });

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("crossfade-layout-ready", onReady);
    };
  }, []);

  return null;
}
