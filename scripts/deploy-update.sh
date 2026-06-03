#!/bin/bash
# Rust API を EC2 に更新デプロイするスクリプト
# フロントエンド（Next.js）は Vercel が自動デプロイするため不要
# 使い方: EC2_HOST と KEY を設定して ./scripts/deploy-update.sh

set -e

# ========== ここをあなたの環境に合わせて変更 ==========
EC2_HOST=ec2-xx-xx-xx-xx.ap-northeast-1.compute.amazonaws.com
KEY=your-key.pem
USER=ubuntu
# =====================================================

echo "1. Rust API をビルド中..."
cd api && cargo build --release && cd ..

echo "2. EC2 にアップロード中..."
rsync -avz -e "ssh -i $KEY" \
  api/target/release/api \
  $USER@$EC2_HOST:~/artist-motion/api/

# api/.env を更新した場合だけコメントを外して使う
# rsync -avz -e "ssh -i $KEY" api/.env $USER@$EC2_HOST:~/artist-motion/api/

echo "3. EC2 上で API を再起動..."
ssh -i "$KEY" $USER@$EC2_HOST "pm2 restart api"

echo "完了しました。"
