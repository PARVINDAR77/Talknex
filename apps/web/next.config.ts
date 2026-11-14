import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@talknex/shared', '@talknex/contracts', '@talknex/validation', '@talknex/config'],
  images: {
    domains: ['localhost', 'talknex.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

export default nextConfig;

