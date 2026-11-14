#!/usr/bin/env bash
# ==============================================================================
# TALKNEX UNIVERSAL PRODUCTION DEPLOYMENT SCRIPT
# Automated setup for Next.js, NestJS, PM2, Nginx & SSL on Ubuntu / Debian VPS
# ==============================================================================

set -eo pipefail

# Text Formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ------------------------------------------------------------------------------
# 1. CONFIGURATION & ADAPTABLE VARIABLES
# ------------------------------------------------------------------------------
# These variables can be overridden via environment variables or CLI flags
DOMAIN="${DOMAIN:-talknex.emperorsmartsolutions.com}"
APP_DIR="${APP_DIR:-/home/ubuntu/talknex}"
DEPLOY_USER="${DEPLOY_USER:-ubuntu}"
GIT_REPO="${GIT_REPO:-https://github.com/PARVINDAR77/Talknex.git}"
GIT_BRANCH="${GIT_BRANCH:-main}"

WEB_PORT="${WEB_PORT:-3000}"
API_PORT="${API_PORT:-4000}"
PM2_WEB_NAME="${PM2_WEB_NAME:-talknex-web}"
PM2_API_NAME="${PM2_API_NAME:-talknex-api}"

SETUP_SSL="${SETUP_SSL:-true}"
SSL_EMAIL="${SSL_EMAIL:-admin@${DOMAIN}}"

# Parse Command Line Arguments (if passed)
while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain)
      DOMAIN="$2"
      shift 2
      ;;
    --dir)
      APP_DIR="$2"
      shift 2
      ;;
    --user)
      DEPLOY_USER="$2"
      shift 2
      ;;
    --branch)
      GIT_BRANCH="$2"
      shift 2
      ;;
    --web-port)
      WEB_PORT="$2"
      shift 2
      ;;
    --api-port)
      API_PORT="$2"
      shift 2
      ;;
    --no-ssl)
      SETUP_SSL=false
      shift 1
      ;;
    --email)
      SSL_EMAIL="$2"
      shift 2
      ;;
    *)
      echo -e "${YELLOW}Unknown option: $1${NC}"
      shift 1
      ;;
  esac
done

echo -e "${CYAN}${BOLD}"
echo "=============================================================="
echo "          🚀 TALKNEX PRODUCTION DEPLOYMENT ENGINE            "
echo "=============================================================="
echo -e "${NC}"
echo -e "Target Domain : ${BOLD}${GREEN}${DOMAIN}${NC}"
echo -e "Install Path  : ${BOLD}${CYAN}${APP_DIR}${NC}"
echo -e "User Account  : ${BOLD}${DEPLOY_USER}${NC}"
echo -e "Git Branch    : ${BOLD}${GIT_BRANCH}${NC}"
echo -e "Ports         : Web -> ${WEB_PORT} | API -> ${API_PORT}"
echo -e "SSL Auto-Gen  : ${SETUP_SSL}"
echo "--------------------------------------------------------------"

# ------------------------------------------------------------------------------
# 2. PRIVILEGE & ENVIRONMENT CHECK
# ------------------------------------------------------------------------------
if [[ "$EUID" -ne 0 ]]; then
  echo -e "${RED}[ERROR] This deployment script must be run as root or with sudo.${NC}"
  echo -e "Please re-run: sudo ./deploy.sh"
  exit 1
fi

echo -e "\n${BOLD}[1/7] Checking & installing system prerequisites...${NC}"

apt-get update -y >/dev/null 2>&1 || true

# Install essential dependencies
PACKAGES_TO_INSTALL=()
for pkg in curl git nginx certbot python3-certbot-nginx build-essential; do
  if ! dpkg -s "$pkg" >/dev/null 2>&1; then
    PACKAGES_TO_INSTALL+=("$pkg")
  fi
done

if [ ${#PACKAGES_TO_INSTALL[@]} -gt 0 ]; then
  echo -e "  Installing missing packages: ${PACKAGES_TO_INSTALL[*]}..."
  apt-get install -y "${PACKAGES_TO_INSTALL[@]}" >/dev/null
fi

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
  echo -e "  Installing Node.js 20.x LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
  apt-get install -y nodejs >/dev/null 2>&1
fi

NODE_VERSION=$(node -v)
echo -e "  ${GREEN}✓${NC} Node.js detected: ${BOLD}${NODE_VERSION}${NC}"

# Check PM2
if ! command -v pm2 >/dev/null 2>&1; then
  echo -e "  Installing PM2 globally..."
  npm install -g pm2 >/dev/null 2>&1
fi
echo -e "  ${GREEN}✓${NC} PM2 process manager ready."

# Ensure deployment user exists
if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  echo -e "  Creating deployment user: ${DEPLOY_USER}..."
  useradd -m -s /bin/bash "$DEPLOY_USER"
fi

# ------------------------------------------------------------------------------
# 3. REPOSITORY SETUP & SYNC
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[2/7] Synchronizing application repository...${NC}"

if [ ! -d "$APP_DIR/.git" ]; then
  echo -e "  Cloning repository into ${APP_DIR}..."
  mkdir -p "$(dirname "$APP_DIR")"
  git clone -b "$GIT_BRANCH" "$GIT_REPO" "$APP_DIR"
else
  echo -e "  Pulling latest updates from ${GIT_BRANCH}..."
  cd "$APP_DIR"
  git fetch --all >/dev/null 2>&1
  git checkout "$GIT_BRANCH" >/dev/null 2>&1
  git pull origin "$GIT_BRANCH"
fi

cd "$APP_DIR"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

# ------------------------------------------------------------------------------
# 4. ENVIRONMENT FILES CONFIGURATION
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[3/7] Verifying environment configurations...${NC}"

# Setup Web .env if missing
if [ ! -f "apps/web/.env" ]; then
  if [ -f "apps/web/.env.example" ]; then
    cp apps/web/.env.example apps/web/.env
  else
    cat <<EOF > apps/web/.env
PORT=${WEB_PORT}
NEXT_PUBLIC_APP_URL=https://${DOMAIN}
NEXT_PUBLIC_API_URL=https://${DOMAIN}/api/v1
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_WHISPER_MODEL=whisper-large-v3-turbo
EOF
  fi
  echo -e "  ${YELLOW}!${NC} Created apps/web/.env template. Remember to add your GROQ_API_KEY."
fi

# Setup API .env if missing
if [ ! -f "apps/api/.env" ]; then
  if [ -f "apps/api/.env.example" ]; then
    cp apps/api/.env.example apps/api/.env
  else
    cat <<EOF > apps/api/.env
PORT=${API_PORT}
NODE_ENV=production
DATABASE_URL="file:./dev.db"
CORS_ORIGIN="https://${DOMAIN},http://localhost:${WEB_PORT}"
JWT_SECRET="$(openssl rand -hex 32 2>/dev/null || echo 'talknex_super_secret_jwt_key_2026')"
EOF
  fi
  echo -e "  ${YELLOW}!${NC} Created apps/api/.env template."
fi

# ------------------------------------------------------------------------------
# 5. MONOREPO BUILD
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[4/7] Installing dependencies & building monorepo...${NC}"

# Run install as deploy user
su - "$DEPLOY_USER" -c "cd '$APP_DIR' && npm install --silent"

# Generate Prisma Client
if [ -d "apps/api/prisma" ]; then
  echo -e "  Generating database client..."
  su - "$DEPLOY_USER" -c "cd '$APP_DIR' && npm --workspace=@talknex/api run prisma:generate" || true
fi

# Build Shared Monorepo Packages
echo -e "  Compiling shared monorepo packages..."
su - "$DEPLOY_USER" -c "cd '$APP_DIR' && npm run build:packages"

# Build Next.js Web
echo -e "  Compiling Next.js frontend & Voice AI engine..."
su - "$DEPLOY_USER" -c "cd '$APP_DIR' && npm --workspace=@talknex/web run build"

# Build NestJS API
echo -e "  Compiling NestJS backend API..."
su - "$DEPLOY_USER" -c "cd '$APP_DIR' && npm --workspace=@talknex/api run build"

echo -e "  ${GREEN}✓${NC} All workspace builds completed successfully."

# ------------------------------------------------------------------------------
# 6. PM2 PROCESS ORCHESTRATION
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[5/7] Starting application processes with PM2...${NC}"

# Start / Reload Web
su - "$DEPLOY_USER" -c "
cd '$APP_DIR'
if pm2 describe '$PM2_WEB_NAME' >/dev/null 2>&1; then
  echo '  Restarting ${PM2_WEB_NAME}...'
  pm2 restart '$PM2_WEB_NAME' --update-env
else
  echo '  Starting ${PM2_WEB_NAME} on port ${WEB_PORT}...'
  pm2 start npm --name '$PM2_WEB_NAME' -- run start:web -- -p ${WEB_PORT}
fi
"

# Start / Reload API
su - "$DEPLOY_USER" -c "
cd '$APP_DIR'
if pm2 describe '$PM2_API_NAME' >/dev/null 2>&1; then
  echo '  Restarting ${PM2_API_NAME}...'
  pm2 restart '$PM2_API_NAME' --update-env
else
  echo '  Starting ${PM2_API_NAME} on port ${API_PORT}...'
  PORT=${API_PORT} pm2 start apps/api/dist/main.js --name '$PM2_API_NAME'
fi
"

# Save PM2 state & configure system startup
su - "$DEPLOY_USER" -c "pm2 save >/dev/null 2>&1"
env PATH=$PATH:/usr/bin pm2 startup systemd -u "$DEPLOY_USER" --hp "/home/$DEPLOY_USER" >/dev/null 2>&1 || true

echo -e "  ${GREEN}✓${NC} PM2 services online."

# ------------------------------------------------------------------------------
# 7. NGINX REVERSE PROXY CONFIGURATION
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[6/7] Configuring Nginx reverse proxy for ${DOMAIN}...${NC}"

# Detect if Nginx uses sites-available (Ubuntu standard) or conf.d
NGINX_TARGET_CONF=""
if [ -d "/etc/nginx/sites-available" ]; then
  NGINX_TARGET_CONF="/etc/nginx/sites-available/${DOMAIN}.conf"
elif [ -d "/etc/nginx/conf.d" ]; then
  NGINX_TARGET_CONF="/etc/nginx/conf.d/${DOMAIN}.conf"
else
  mkdir -p /etc/nginx/conf.d
  NGINX_TARGET_CONF="/etc/nginx/conf.d/${DOMAIN}.conf"
fi

# Unique upstream name to prevent collisions with other sites
CLEAN_DOMAIN=$(echo "${DOMAIN}" | sed 's/[^a-zA-Z0-9_]/_/g')

cat <<EOF > "$NGINX_TARGET_CONF"
# ==============================================================================
# Nginx Configuration for ${DOMAIN}
# Auto-generated by TalkNex Deployment Engine
# ==============================================================================

upstream ${CLEAN_DOMAIN}_web_upstream {
    server 127.0.0.1:${WEB_PORT};
    keepalive 32;
}

upstream ${CLEAN_DOMAIN}_api_upstream {
    server 127.0.0.1:${API_PORT};
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    # Maximum upload size for Whisper voice audio clips
    client_max_body_size 35M;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # 1. NestJS Backend API Route
    location /api/v1/ {
        proxy_pass http://${CLEAN_DOMAIN}_api_upstream;
        proxy_http_version 1.1;

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 2. Next.js Voice Assistant AI Streaming Endpoints
    location /api/voice/ {
        proxy_pass http://${CLEAN_DOMAIN}_web_upstream;
        proxy_http_version 1.1;

        # WebSockets & Server-Sent Events (SSE) streaming support
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;

        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_buffering off;
        proxy_read_timeout 180s;
    }

    # 3. Next.js Web Frontend & Assets
    location / {
        proxy_pass http://${CLEAN_DOMAIN}_web_upstream;
        proxy_http_version 1.1;

        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;

        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable site if using sites-available
if [[ "$NGINX_TARGET_CONF" == *"/sites-available/"* ]]; then
  ln -sf "$NGINX_TARGET_CONF" "/etc/nginx/sites-enabled/${DOMAIN}.conf"
fi

# Test Nginx syntax
if nginx -t >/dev/null 2>&1; then
  systemctl reload nginx
  echo -e "  ${GREEN}✓${NC} Nginx configuration tested and reloaded successfully."
else
  echo -e "  ${RED}[ERROR] Nginx syntax test failed! Please check:${NC}"
  nginx -t
  exit 1
fi

# ------------------------------------------------------------------------------
# 8. SSL PROVISIONING (CERTBOT)
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[7/7] Checking SSL certificate status...${NC}"

if [ "$SETUP_SSL" = true ]; then
  # Check if SSL is already installed
  if grep -q "ssl_certificate" "$NGINX_TARGET_CONF" 2>/dev/null; then
    echo -e "  ${GREEN}✓${NC} SSL certificate is already configured in Nginx."
  else
    echo -e "  Requesting Let's Encrypt SSL certificate for ${DOMAIN}..."
    if certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$SSL_EMAIL" --redirect; then
      echo -e "  ${GREEN}✓${NC} SSL certificate successfully configured!"
    else
      echo -e "  ${YELLOW}! Certbot auto-generation skipped (DNS might still be propagating).${NC}"
      echo -e "  Once DNS points to this server IP, run:"
      echo -e "  ${CYAN}sudo certbot --nginx -d ${DOMAIN}${NC}"
    fi
  fi
else
  echo -e "  SSL configuration skipped (--no-ssl specified)."
fi

# ------------------------------------------------------------------------------
# COMPLETION REPORT
# ------------------------------------------------------------------------------
echo -e "\n${GREEN}${BOLD}=============================================================="
echo "          🎉 TALKNEX DEPLOYED & LIVE SUCCESSFULLY!            "
echo "=============================================================="
echo -e "${NC}"
echo -e "  • Website URL    : ${BOLD}${CYAN}https://${DOMAIN}${NC}"
echo -e "  • Web Port       : http://127.0.0.1:${WEB_PORT}"
echo -e "  • API Port       : http://127.0.0.1:${API_PORT}"
echo -e "  • Nginx Config   : ${NGINX_TARGET_CONF}"
echo -e "  • Deployment Dir : ${APP_DIR}"
echo ""
echo -e "${BOLD}Helpful Commands:${NC}"
echo -e "  • View Web Logs  : ${CYAN}pm2 logs ${PM2_WEB_NAME}${NC}"
echo -e "  • View API Logs  : ${CYAN}pm2 logs ${PM2_API_NAME}${NC}"
echo -e "  • PM2 Status     : ${CYAN}pm2 list${NC}"
echo -e "  • Reload App     : ${CYAN}pm2 reload all${NC}"
echo -e "  • Nginx Status   : ${CYAN}systemctl status nginx${NC}"
echo "=============================================================="

