#!/bin/bash
# EC2 への初回セットアップスクリプト（初回のみ実行）
# Rust API を EC2 にセットアップする
# 使い方: EC2_HOST と KEY を設定して ./scripts/deploy-api-first.sh

set -e

# ========== ここをあなたの環境に合わせて変更 ==========
EC2_HOST=ec2-xx-xx-xx-xx.ap-northeast-1.compute.amazonaws.com
KEY=your-key.pem
USER=ubuntu
# =====================================================

echo "1. Rust API をビルド中..."
cd api && cargo build --release && cd ..

echo "2. EC2 上にディレクトリ作成..."
ssh -i "$KEY" $USER@$EC2_HOST "mkdir -p ~/artist-motion/api"

echo "3. API バイナリと設定ファイルをアップロード..."
rsync -avz -e "ssh -i $KEY" \
  api/target/release/api \
  api/.env \
  $USER@$EC2_HOST:~/artist-motion/api/

echo "4. EC2 上で API を PM2 で起動..."
ssh -i "$KEY" $USER@$EC2_HOST "cd ~/artist-motion/api && pm2 start ./api --name api && pm2 save"

echo "完了しました。"
echo "次回以降の更新は deploy-update.sh を使ってください。"
