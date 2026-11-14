# TalkNex Super Admin — Deployment & Hosting Guide

## 1. Domain Configuration
The TalkNex platform operates on four production hostnames:
- `admin.talknex.com`: Super Admin Platform
- `talknex.com`: Public Marketing Website
- `app.talknex.com`: Customer Self-Serve Console
- `api.talknex.com`: Core REST API & Webhook Ingestion

---

## 2. Environment Variables
Ensure the following variables are configured in production:

```env
# Core Server Configuration
PORT=4000
NODE_ENV=production
DATABASE_URL="postgresql://talknex_user:talknex_secret@db.internal:5432/talknex_db?schema=public"

# Redis Cache & Queues
REDIS_HOST=redis.internal
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_auth_token

# Administrative Security
ADMIN_API_KEY=talknex_super_admin_secret_2026
JWT_SECRET=super_secret_jwt_signing_key_production

# CORS Origins
CORS_ORIGIN=https://talknex.com,https://admin.talknex.com,https://app.talknex.com
```

---

## 3. Reverse Proxy Configuration (Nginx / Cloudflare)

```nginx
# Super Admin Virtual Host
server {
    server_name admin.talknex.com;
    listen 443 ssl http2;

    location / {
        proxy_pass http://127.0.0.1:3000/admin/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

