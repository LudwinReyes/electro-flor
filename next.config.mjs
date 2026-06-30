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
};

export default nextConfig;
