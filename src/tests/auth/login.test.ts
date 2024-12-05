import http from 'k6/http';
import { check, sleep } from 'k6';

// K6 options
export const options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '5m', target: 10 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must be below 500ms
  },
};

// Test execution
export default function () {
  const url = 'https://test-api.example.com';
  const res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1); // Simulate user idle time
}
