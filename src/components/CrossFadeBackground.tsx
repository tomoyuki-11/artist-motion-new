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

  useEffect(() => {
    const interval = setInterval(() => {
      // 上レイヤー（次の画像）をフェードイン開始
      setFading(true);

      setTimeout(() => {
        // フェード完了：上レイヤーを transition なしで瞬時に非表示にしてから画像を差し替え
        setFading(false);
        setCurrent((c) => (c + 1) % IMAGES.length);
        setNext((n) => (n + 1) % IMAGES.length);
      }, 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 下レイヤー：常に表示、現在の画像 */}
      <img
        src={IMAGES[current]}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* 上レイヤー：フェードイン時のみトランジション、リセット時は即非表示 */}
      <img
        src={IMAGES[next]}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          opacity: fading ? 1 : 0,
          transition: fading ? "opacity 1.5s ease" : "none",
        }}
      />
    </div>
  );
}
