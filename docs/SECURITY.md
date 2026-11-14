# SECURITY.md — TalkNex Application & Infrastructure Security Strategy

## 1. Perimeter & Transport Security
- **Enforced HTTPS**: TLS 1.3 encryption across all communication.
- **Security Headers (Helmet)**:
  - `Content-Security-Policy`: Disallows unauthorized script injections.
  - `Strict-Transport-Security`: Enforces HSTS (max-age 31536000; includeSubDomains).
  - `X-Frame-Options`: DENY (clickjacking mitigation).
  - `X-Content-Type-Options`: nosniff.
  - `Referrer-Policy`: strict-origin-when-cross-origin.
- **Cross-Origin Resource Sharing (CORS)**: Strict origin whitelist matching `talknex.com`, `api.talknex.com`, and localhost in development.

## 2. Input Validation & Data Integrity
- **Global Validation Pipe**: NestJS `ValidationPipe` with `{ whitelist: true, forbidNonWhitelisted: true, transform: true }`.
- **SQL Injection Prevention**: 100% parameterized queries via Prisma ORM. No raw string interpolation.
- **Spam & Abuse Protection**:
  - Rate limiting per IP for contact and demo booking submissions (5 requests per 10 minutes).
  - Honeypot fields on public frontend forms.
  - Email format verification (RFC 5322 compliance check).

## 3. Secret Management & Principle of Least Privilege
- Zero hardcoded credentials in source control.
- Isolated `.env` templates for development, staging, and production.
- Database access restricted to necessary application permissions.

