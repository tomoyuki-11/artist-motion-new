# ARTIST MOTION プロジェクト

## 概要
兵庫県丹波市を拠点とするスポーツ・文化教室「ARTIST MOTION（アーティストモーション）」のWebサイト。
風舞流曲技太鼓・ベースボールクラブ・器械体操教室・フィットネスクラスの4事業を展開。

## 技術スタック
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vercelでデプロイ

## 重要なルール

### SEO
- あなたはSEO対策のプロです
- 構造化データ（JSON-LD）はSchema.orgの仕様に厳密に従うこと
- `Review`型を使う場合は必ず`reviewRating`を含めること（ないと Search Console エラーになる）
- 各ページに適切なcanonicalタグを設定すること

### 画像・動画
- 画像・動画を追加する際は必ずffmpegで圧縮・最適化してください
- 動画圧縮設定: `ffmpeg -c:v libx264 -crf 28 -preset slow -movflags +faststart`
- 日本語ファイル名はASCIIに変換してから使用すること（サーバーエラーの原因になる）

### ビジネスルール
- 料金・月謝はサイトに掲載しない（クライアント方針）

### 開発
- ファイルを追加したら必ず `git add` してコミット・プッシュすること（忘れると本番に反映されない）
- iOS Safari対応: `aspect-ratio` CSSは使わず明示的なwidth/heightを指定すること
- 自動再生動画は `AutoplayVideo` コンポーネント（`src/components/AutoplayVideo.tsx`）を使うこと
