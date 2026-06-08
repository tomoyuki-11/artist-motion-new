import type { Metadata } from "next";
import { ColumnClient } from "./ColumnClient";

export const metadata: Metadata = {
  title: "子育てコラム",
  description:
    "アーティストモーションが発信する子育てコラム。子育てに役立つ情報や運動・習い事に関する日々の気づきをお届けします。",
  alternates: { canonical: "/column" },
  openGraph: {
    url: "/column",
    title: "子育てコラム | ARTIST MOTION - アーティストモーション",
    description:
      "アーティストモーションが発信する子育てコラム。子育てに役立つ情報や運動・習い事に関する日々の気づきをお届けします。",
  },
};

export default function ColumnPage() {
  return <ColumnClient />;
}
