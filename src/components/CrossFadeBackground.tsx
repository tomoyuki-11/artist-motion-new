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
  const [bottom, setBottom] = useState(0);
  const [top, setTop] = useState(1);
  const [topVisible, setTopVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTopVisible(true);
      setTimeout(() => {
        setBottom((prev) => (prev + 1) % IMAGES.length);
        setTop((prev) => (prev + 1) % IMAGES.length);
        setTopVisible(false);
      }, 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${IMAGES[bottom]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${IMAGES[top]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: topVisible ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      />
    </div>
  );
}
