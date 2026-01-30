export function getBaseUrl() {
  // Production
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Vercel auto-detection
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Local development
  return "http://localhost:3000";
}

export function getCanonicalUrl(path) {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path}`;
}

export function getAlternateUrls(basePath) {
  const baseUrl = getBaseUrl();
  return {
    canonical: `${baseUrl}${basePath}`,
    languages: {
      en: `${baseUrl}/en${basePath}`,
      ka: `${baseUrl}/ka${basePath}`,
    },
  };
}
