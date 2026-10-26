"use client";

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const scrollTo = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    };

    // APIロード・画像ロードによるレイアウトシフトに対応するため複数回スクロール
    const timers = [
      setTimeout(scrollTo, 100),
      setTimeout(scrollTo, 500),
      setTimeout(scrollTo, 1200),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return null;
}
