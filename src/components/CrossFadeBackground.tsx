"use client";

import { useState, useEffect } from "react";

const IMAGES = [
  "/images/cross_fade/91634_0.jpg",
  "/images/cross_fade/91635_0.jpg",
  "/images/cross_fade/91636_0.jpg",
  "/images/cross_fade/91637_0.jpg",
  "/images/cross_fade/91638_0.jpg",
  "/images/cross_fade/91639_0.jpg",
  "/images/cross_fade/91640_0.jpg",
  "/images/cross_fade/91641_0.jpg",
  "/images/cross_fade/91642_0.jpg",
  "/images/cross_fade/91643_0.jpg",
  "/images/cross_fade/91644_0.jpg",
  "/images/cross_fade/91645_0.jpg",
  "/images/cross_fade/91646_0.jpg",
  "/images/cross_fade/91647_0.jpg",
  "/images/cross_fade/91648_0.jpg",
  "/images/cross_fade/91649_0.jpg",
  "/images/cross_fade/91650_0.jpg",
  "/images/cross_fade/91652_0.jpg",
  "/images/cross_fade/91653_0.jpg",
  "/images/cross_fade/91654_0.jpg",
  "/images/cross_fade/91655_0.jpg",
  "/images/cross_fade/91656_0.jpg",
  "/images/cross_fade/91657_0.jpg",
  "/images/cross_fade/91658_0.jpg",
  "/images/cross_fade/91659_0.jpg",
  "/images/cross_fade/91660_0.jpg",
  "/images/cross_fade/91661_0.jpg",
  "/images/cross_fade/91662_0.jpg",
  "/images/cross_fade/91663_0.jpg",
  "/images/cross_fade/91664_0.jpg",
  "/images/cross_fade/91665_0.jpg",
  "/images/cross_fade/91666_0.jpg",
  "/images/cross_fade/91667_0.jpg",
  "/images/cross_fade/91668_0.jpg",
  "/images/cross_fade/91669_0.jpg",
  "/images/cross_fade/91670_0.jpg",
  "/images/cross_fade/91671_0.jpg",
  "/images/cross_fade/91672_0.jpg",
  "/images/cross_fade/91673_0.jpg",
];

export function CrossFadeBackground() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [fading, setFading] = useState(false);
  // 全画像の中で最も縦横比が高いもの（height/width）を記録
  const [maxRatio, setMaxRatio] = useState<number | null>(null);

  // マウント時に全画像の縦横比を測定して最大値を設定
  useEffect(() => {
    let loaded = 0;
    let max = 0;

    IMAGES.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        const ratio = img.naturalHeight / img.naturalWidth;
        if (ratio > max) max = ratio;
        loaded++;
        if (loaded === IMAGES.length) setMaxRatio(max);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === IMAGES.length && max > 0) setMaxRatio(max);
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setFading(false);
        setCurrent((c) => (c + 1) % IMAGES.length);
        setNext((n) => (n + 1) % IMAGES.length);
      }, 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    // padding-top % = ratio × 100% でレスポンシブな固定高さを実現
    <div
      className="relative w-full"
      style={{ paddingTop: maxRatio !== null ? `${maxRatio * 100}%` : "75%" }}
    >
      <img
        src={IMAGES[current]}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src={IMAGES[next]}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: fading ? 1 : 0,
          transition: fading ? "opacity 1.5s ease" : "none",
        }}
      />
    </div>
  );
}
