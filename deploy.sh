#!/usr/bin/env bash
# ==============================================================================
# TALKNEX SIMPLIFIED DOCKER DEPLOYMENT
# ==============================================================================
set -e

APP_DIR="${APP_DIR:-/home/ubuntu/talknex}"
DOMAIN="${DOMAIN:-talknex.emperorsmartsolutions.com}"

echo ">>> [1/3] Updating repository..."
cd "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" >/dev/null 2>&1 || true
git pull origin main

echo ">>> [2/3] Building & Starting Docker Containers..."
docker compose down || true
docker compose up -d --build

echo ">>> [3/3] Checking Nginx..."
if [ -f "/etc/nginx/sites-available/$DOMAIN" ]; then
  ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/"
fi
nginx -t && systemctl reload nginx

echo "=================================================="
echo " TalkNex is LIVE with Docker on $DOMAIN"
echo "=================================================="
docker compose ps
