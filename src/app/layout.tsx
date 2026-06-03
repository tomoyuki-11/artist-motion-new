import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://artist-motion.com"
  ),
  title: {
    default:
      "ARTIST MOTION - アーティストモーション - 風舞流曲技太鼓・ベースボール・器械体操・フィットネス",
    template: "%s | ARTIST MOTION",
  },
  description:
    "丹波市・三田市・神戸市北区を中心に活動するARTIST MOTION~アーティストモーション~は、風舞流曲技太鼓・ベースボール・器械体操・フィットネスなど、心を豊かにする身体活動を提供しています。お気軽にお問い合わせください。",
  keywords:
    "アーティストモーション,ARTIST MOTION,風舞流曲技太鼓,太鼓,和太鼓,太鼓 教室,曲技太鼓,野球,野球クラブ,野球 教室,ベースボール,ベースボールクラブ,器械体操,体操教室,フィットネス,フィットネスクラス,丹波市,丹波,三田市,三田,筋トレ,ダイエット",
  verification: {
    google: "mLepU07anh0inA8ExkB5u-RczWddcGSAg0vZIszVJsE",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "アーティストモーション",
    title: "ARTIST MOTION - アーティストモーション",
    description:
      "アーティストモーションは、風舞流曲技太鼓・体操・フィットネスなど、心を豊かにする身体活動。多様なプログラムで個人の可能性を引き出します。",
    images: [
      {
        url: "/images/logo.jpeg",
        alt: "ARTIST MOTION（アーティストモーション）ロゴ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTIST MOTION - アーティストモーション",
    description:
      "アーティストモーションは、風舞流曲技太鼓・体操・フィットネスなど、心を豊かにする身体活動。",
    images: ["/images/logo.jpeg"],
  },
  icons: {
    icon: "/images/logo.jpeg",
    apple: "/images/logo.jpeg",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "ARTIST MOTION",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://api.artist-motion.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
