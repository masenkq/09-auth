import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
    domains: ['ac.goit.global'], // Додайте домен для аватарів
  },
};

export default nextConfig;