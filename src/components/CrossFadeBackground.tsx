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
  const [maxRatio, setMaxRatio] = useState<number | null>(null);
  // 各画像の縦横比（height/width）を保持
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    let loaded = 0;
    let max = 0;
    const ratios: Record<string, number> = {};

    IMAGES.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        const ratio = img.naturalHeight / img.naturalWidth;
        ratios[src] = ratio;
        if (ratio > max) max = ratio;
        loaded++;
        if (loaded === IMAGES.length) {
          setMaxRatio(max);
          setImageRatios({ ...ratios });
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === IMAGES.length && max > 0) {
          setMaxRatio(max);
          setImageRatios({ ...ratios });
        }
      };
      img.src = src;
    });
  }, []);

  // maxRatioがセットされDOMが更新された後にイベントを発火
  useEffect(() => {
    if (maxRatio !== null) {
      window.dispatchEvent(new CustomEvent("crossfade-layout-ready"));
    }
  }, [maxRatio]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setFading(false);
        setCurrent((c) => (c + 1) % IMAGES.length);
        setNext((n) => (n + 1) % IMAGES.length);
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 縦長（h > w）→ object-cover（余白なし）、横長 → object-contain bg-white（余白あり）
  const fitClass = (src: string) => {
    const r = imageRatios[src];
    return r && r > 1
      ? "absolute inset-0 w-full h-full object-cover"
      : "absolute inset-0 w-full h-full object-contain bg-slate-200";
  };

  return (
    <div
      className="relative w-full"
      style={{ paddingTop: maxRatio !== null ? `${maxRatio * 100}%` : "75%" }}
    >
      <img src={IMAGES[current]} alt="" aria-hidden className={fitClass(IMAGES[current])} />
      <img
        src={IMAGES[next]}
        alt=""
        aria-hidden
        className={fitClass(IMAGES[next])}
        style={{
          opacity: fading ? 1 : 0,
          transition: fading ? "opacity 2s ease" : "none",
        }}
      />
    </div>
  );
}
