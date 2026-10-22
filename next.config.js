const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self' https: http: 'unsafe-inline' 'unsafe-eval'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https: http:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:",
      "connect-src 'self' https: http: wss: ws:",
      ...(isDev ? [] : ["upgrade-insecure-requests"]),
    ].join("; "),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "sulphate-lend-demanding.ngrok-free.dev",
    "localhost:3000",
    "127.0.0.1:3000",
    "192.168.1.107:3000",
    "192.168.1.107",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
