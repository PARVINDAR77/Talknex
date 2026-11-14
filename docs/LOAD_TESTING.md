# LOAD_TESTING.md — Load Testing Methodology & Benchmark Plan

## 1. Concurrency Benchmarking Objectives
To test and verify the TalkNex marketing platform and backend API services under high concurrency, validating sustained throughput of 1,000 simultaneous visitors without service degradation, memory leaks, or unhandled errors.

## 2. Load Generator: Grafana k6
The load simulation script is maintained at `apps/api/test/load-test.k6.js`. It runs realistic, weighted user journeys:
1. **Public Browsing (80% traffic weight)**:
   - `GET /api/v1/pages/home`
   - `GET /api/v1/navigation`
   - `GET /api/v1/pricing/plans`
   - `GET /api/v1/faqs`
   - `GET /api/v1/blog`
2. **Global Search Operations (15% traffic weight)**:
   - `GET /api/v1/search?q=real%20estate`
   - `GET /api/v1/search?q=outbound`
3. **Form Submissions & Transactions (5% traffic weight)**:
   - `POST /api/v1/contact` (Contact enquiries with anti-spam honeypot and validation)
   - `POST /api/v1/demo-bookings` (Demo scheduling)
   - `POST /api/v1/newsletter/subscribe`

## 3. Load Ramp-up Stages
```javascript
export const options = {
  stages: [
    { duration: '1m', target: 100 },   // Warmup to 100 VUs
    { duration: '2m', target: 250 },   // Normal operational load
    { duration: '2m', target: 500 },   // High traffic surge
    { duration: '3m', target: 1000 },  // Peak marketing launch concurrency
    { duration: '5m', target: 1000 },  // Sustained peak load
    { duration: '2m', target: 0 },     // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'],  // 95% of requests under 300ms
    http_req_failed: ['rate<0.01'],    // Under 1% error rate
  },
};
```

## 4. Execution Command
To run the benchmark suite against a staging or production instance:
```bash
k6 run apps/api/test/load-test.k6.js
```
Or override the base URL via environment variable:
```bash
k6 run -e BASE_URL=https://api.talknex.com apps/api/test/load-test.k6.js
```

## 5. Key Performance Indicators (KPIs) & Target SLA
- **System Error Rate**: < 0.1% (target 0.00%)
- **p95 Latency (Cached Pages & Navigation)**: < 120ms
- **p95 Latency (Search Queries)**: < 180ms
- **p95 Latency (Form Submissions)**: < 350ms
- **Redis Cache Hit Ratio**: > 90%
- **Memory Growth Slope**: 0% after initial warmup (no memory leaks)
