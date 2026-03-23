import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

/**
 * Allow next/image to proxy Strapi uploads. Without a matching pattern, the
 * optimizer returns 400: "url" parameter is not allowed.
 * Uses the same base URL as the app (see lib/strapi.js).
 */
function strapiUploadRemotePatterns() {
  const raw =
    (typeof process !== "undefined" &&
      (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL)) ||
    "";
  if (!raw) return [];
  try {
    const u = new URL(raw.replace(/\/$/, ""));
    const common = {
      hostname: u.hostname,
      pathname: "/uploads/**",
      ...(u.port ? { port: u.port } : {}),
    };
    // Both protocols: media URLs may use http or https regardless of env string
    return [
      { protocol: "http", ...common },
      { protocol: "https", ...common },
    ];
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    qualities: [75, 95],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      ...strapiUploadRemotePatterns(),
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "youtu.be",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
        port: "1338",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
        port: "13385",
      },
      {
        protocol: "https",
        hostname: "thelake.ge",
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/storage/:path*",
        destination: "/api/storage/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
