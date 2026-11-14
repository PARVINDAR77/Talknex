# ENVIRONMENT_VARIABLES.md — Environment Configuration Reference

## 1. Global & Shared Variables

| Variable | Description | Example (Development) |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `TZ` | Default application timezone | `Asia/Kolkata` |

## 2. API Backend (`apps/api/.env`)

| Variable | Description | Example (Development) |
| :--- | :--- | :--- |
| `PORT` | NestJS HTTP Port | `4000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://talknex_user:talknex_secret@localhost:5432/talknex_db?schema=public` |
| `REDIS_HOST` | Redis host address | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis auth password | `""` |
| `CORS_ORIGIN` | Allowed CORS origins (comma-separated) | `http://localhost:3000,https://talknex.com` |
| `RATE_LIMIT_TTL` | Sliding rate limit window (seconds) | `60` |
| `RATE_LIMIT_MAX` | Max requests per IP in window | `120` |
| `SMTP_HOST` | Email SMTP host | `smtp.mailtrap.io` |
| `SMTP_PORT` | Email SMTP port | `587` |
| `SMTP_USER` | Email SMTP username | `user` |
| `SMTP_PASSWORD` | Email SMTP password | `pass` |
| `EMAIL_FROM` | Sender email address | `no-reply@talknex.com` |
| `SALES_NOTIFICATION_EMAIL`| Internal sales intake email | `sales@talknex.com` |

## 3. Frontend Web (`apps/web/.env`)

| Variable | Description | Example (Development) |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL for NestJS backend | `http://localhost:4000` |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for metadata | `https://talknex.com` |
| `NEXT_PUBLIC_APP_URL` | Future customer app portal | `https://app.talknex.com` |
| `NEXT_PUBLIC_ANALYTICS_ID`| Optional Google Analytics ID | `G-XXXXXXXXXX` |

