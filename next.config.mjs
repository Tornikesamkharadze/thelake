import createNextIntlPlugin from 'next-intl/plugin';

// ✅ სწორი path - i18n/request.js
const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'youtu.be',
        pathname: '/**',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: '/api/storage/:path*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);