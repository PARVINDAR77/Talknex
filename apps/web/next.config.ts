import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@talknex/shared', '@talknex/contracts', '@talknex/validation', '@talknex/config'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@talknex/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@talknex/contracts': path.resolve(__dirname, '../../packages/contracts/src'),
      '@talknex/validation': path.resolve(__dirname, '../../packages/validation/src'),
      '@talknex/config': path.resolve(__dirname, '../../packages/config/src')
    };
    return config;
  },
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

