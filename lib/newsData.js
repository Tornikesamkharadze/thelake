/**
 * News data from Strapi (replaces static newsData.en/ka).
 * For server components, prefer getNews() + mapStrapiNewsToFrontend from @/lib/strapi and @/lib/adapters/news.
 */

import { getAllNews, STRAPI_URL } from "./strapi";
import { mapStrapiNewsToFrontend } from "./adapters/news";

/**
 * Fetches all news from Strapi for the given locale.
 * @param {string} locale - "ka" or "en"
 * @returns {Promise<Array<{ slug, image, title, date, excerpt, additionalImage, contentBottom, blocks? }>>}
 */
export async function getNewsData(locale) {
  const strapiLocale = locale === "ka" ? "ka-GE" : "en";
  const { data } = await getAllNews({ locale: strapiLocale });
  const list = Array.isArray(data) ? data : [];
  return list.map((raw) => mapStrapiNewsToFrontend(raw, STRAPI_URL)).filter(Boolean);
}
