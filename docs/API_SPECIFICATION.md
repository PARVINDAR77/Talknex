# API_SPECIFICATION.md — TalkNex RESTful API Design Standards

## 1. Protocol & URL Structure

- Base URL: `/api/v1/`
- Payload format: `application/json`
- Character encoding: `UTF-8`
- Authentication for public endpoints: Anonymous, rate-limited by Client IP / Token.
- Authentication for internal administrative endpoints: Bearer JWT.

## 2. Standardized Envelope Responses

### Success Response Format:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Resource retrieved successfully",
  "data": { ... },
  "meta": {
    "requestId": "req_a1b2c3d4",
    "timestamp": "2026-11-13T10:40:00.000Z",
    "cached": true
  }
}
```

### Paginated List Response Format:
```json
{
  "success": true,
  "statusCode": 200,
  "data": [ ... ],
  "pagination": {
    "total": 120,
    "page": 1,
    "limit": 10,
    "totalPages": 12,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "meta": {
    "requestId": "req_a1b2c3d4",
    "timestamp": "2026-11-13T10:40:00.000Z"
  }
}
```

### Error Response Format:
```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "constraints": ["email must be a valid email address"]
    }
  ],
  "meta": {
    "requestId": "req_a1b2c3d4",
    "timestamp": "2026-11-13T10:40:00.000Z"
  }
}
```

## 3. Rate Limiting Strategy

- Content Endpoints (Read-only): 120 requests/minute per IP.
- Lead Submission & Demo Booking: 5 submissions per 10 minutes per IP.
- Newsletter Subscription: 5 requests per 10 minutes per IP.
- Search API: 30 requests/minute per IP.

