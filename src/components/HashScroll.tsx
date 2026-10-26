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

    // クロスフェードセクションがある場合は高さ計測完了を待ってからスクロール
    // ない場合は2000ms後にフォールバック
    const fallbackTimer = setTimeout(scroll, 2000);

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
