/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Mapeo automático de variables antiguas de Vite a Next.js para compatibilidad en Netlify
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.VITE_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.VITE_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.VITE_SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_TOKEN: process.env.VITE_SANITY_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'loganelectricperu.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.jp',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com https://ssl.google-analytics.com https://www.google-analytics.com https://tagmanager.google.com https://www.googleadservices.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://tagmanager.google.com; img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://loganelectricperu.com https://placehold.jp https://www.googletagmanager.com https://ssl.gstatic.com https://www.google-analytics.com https://www.google.com; font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com; connect-src 'self' https://*.sanity.io https://api.whatsapp.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com; frame-src 'self' https://*.google.com https://share.google https://www.googletagmanager.com; worker-src blob:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
