/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
