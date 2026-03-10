export default function sitemap() {
  const baseUrl = "https://thelake.ge";
  const locales = ["ka", "en"];

  const pages = [
    "",
    "/about",
    "/gallery",
    "/contact",
    "/find-us",
    "/the-lake-lifestyle",
    "/lake-house",
    "/services-for-you",
    "/bar-kitchen",
    "/spa-wellness",
    "/whats-on",
    "/choose-propertie",
    "/property-listing",
    "/enquire",
  ];

  const urls = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            ka: `${baseUrl}/ka${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    });
  });

  return urls;
}
