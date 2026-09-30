import { getAllNews, getPartnerProjects } from "@/lib/strapi";
import { PARTNERS_NOINDEX } from "@/lib/metadata";

export const revalidate = 3600;

export default async function sitemap() {
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
    ...(PARTNERS_NOINDEX ? [] : ["/partners"]),
    "/choose-propertie",
    "/property-listing",
    "/enquire",
    "/privacy-policy",
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

  // News articles (slug is shared between locales)
  try {
    const { data } = await getAllNews({ locale: "en" });
    (Array.isArray(data) ? data : [])
      .filter((item) => item.slug)
      .forEach((item) => {
        const page = `/whats-on/${item.slug}`;
        locales.forEach((locale) => {
          urls.push({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
            alternates: {
              languages: {
                ka: `${baseUrl}/ka${page}`,
                en: `${baseUrl}/en${page}`,
              },
            },
          });
        });
      });
  } catch {
    // Strapi unavailable — serve static pages only
  }

  // Partner projects (slug is shared between locales; only list locales that have a translation)
  if (!PARTNERS_NOINDEX) try {
    const params = { fields: ["slug", "updatedAt"], pagination: { pageSize: 100 } };
    const lists = await Promise.all(
      locales.map((locale) => getPartnerProjects({ ...params, locale }).catch(() => ({ data: [] })))
    );
    const partners = new Map();
    locales.forEach((locale, i) => {
      const list = lists[i]?.data;
      (Array.isArray(list) ? list : []).forEach((item) => {
        // Same fallback as the adapter: records without a slug are served under their documentId
        const slug = item.slug || item.documentId;
        if (!slug) return;
        const entry = partners.get(slug) || { locales: [], updatedAt: item.updatedAt };
        entry.locales.push(locale);
        if (item.updatedAt && (!entry.updatedAt || item.updatedAt > entry.updatedAt)) {
          entry.updatedAt = item.updatedAt;
        }
        partners.set(slug, entry);
      });
    });
    partners.forEach(({ locales: available, updatedAt }, slug) => {
      const page = `/partners/${slug}`;
      const languages = Object.fromEntries(available.map((l) => [l, `${baseUrl}/${l}${page}`]));
      available.forEach((locale) => {
        urls.push({
          url: `${baseUrl}/${locale}${page}`,
          lastModified: updatedAt ? new Date(updatedAt) : new Date(),
          alternates: { languages },
        });
      });
    });
  } catch {
    // Strapi unavailable — skip partner pages
  }

  return urls;
}
