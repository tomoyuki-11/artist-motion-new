import type { Metadata } from "next";
import { NewsListClient } from "./NewsListClient";

export const metadata: Metadata = {
  title: "お知らせ一覧",
  description:
    "アーティストモーション（丹波市・三田市・神戸市北区）からのお知らせ一覧。太鼓・野球・体操・フィットネス教室の最新情報をお届けします。",
  alternates: { canonical: "/news" },
  openGraph: {
    url: "/news",
    title: "お知らせ一覧 | ARTIST MOTION - アーティストモーション",
    description:
      "アーティストモーション（丹波市・三田市・神戸市北区）からのお知らせ一覧。太鼓・野球・体操・フィットネス教室の最新情報をお届けします。",
  },
};

export default function NewsPage() {
  return <NewsListClient />;
}
