import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 100 },   // Warmup to 100 VUs
    { duration: '1m', target: 250 },    // Ramp to 250 VUs
    { duration: '1m', target: 500 },    // Ramp to 500 VUs
    { duration: '2m', target: 1000 },   // Peak target: 1,000 Concurrent VUs
    { duration: '2m', target: 1000 },   // Sustained 1,000 VUs load
    { duration: '30s', target: 0 }      // Cooldown
  ],
  thresholds: {
    http_req_duration: ['p(95)<250'],   // 95% of requests must complete below 250ms
    errors: ['rate<0.01']               // Error rate must be less than 1%
  }
};

const BASE_URL = __ENV.API_URL || 'http://localhost:4000/api/v1';

export default function () {
  const rand = Math.random();

  if (rand < 0.40) {
    // 40% Traffic: Homepage & Dynamic Pricing Plans (Cached)
    const res = http.get(`${BASE_URL}/pricing/plans`);
    const success = check(res, {
      'status is 200': (r) => r.status === 200,
      'has 4 plans': (r) => JSON.parse(r.body).data.length >= 4
    });
    errorRate.add(!success);
  } else if (rand < 0.70) {
    // 30% Traffic: Use Cases & FAQs (Cached)
    const res = http.get(`${BASE_URL}/use-cases`);
    const success = check(res, {
      'status is 200': (r) => r.status === 200
    });
    errorRate.add(!success);
  } else if (rand < 0.85) {
    // 15% Traffic: Blog Articles & Navigation
    const res = http.get(`${BASE_URL}/blog`);
    const success = check(res, {
      'status is 200': (r) => r.status === 200
    });
    errorRate.add(!success);
  } else if (rand < 0.95) {
    // 10% Traffic: Search Queries
    const res = http.get(`${BASE_URL}/search?q=real%20estate`);
    const success = check(res, {
      'status is 200': (r) => r.status === 200
    });
    errorRate.add(!success);
  } else {
    // 5% Traffic: Lead Form Intake (Transactional write)
    const payload = JSON.stringify({
      name: `K6 User ${__VU}`,
      email: `test_lead_${__VU}_${__ITER}@loadtest.in`,
      phone: '+91 98200 99999',
      company: 'K6 Enterprise',
      industry: 'Real Estate',
      message: 'Automated load test contact submission enquiry.',
      consent: true
    });
    const params = {
      headers: { 'Content-Type': 'application/json' }
    };
    const res = http.post(`${BASE_URL}/contact`, payload, params);
    const success = check(res, {
      'status is 201': (r) => r.status === 201
    });
    errorRate.add(!success);
  }

  sleep(1);
}

