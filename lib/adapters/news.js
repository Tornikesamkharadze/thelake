/**
 * Maps a Strapi news document to the frontend news item shape used by
 * WhatsOn / NewsGrid and NewsDetail.
 *
 * @param {object} s - Strapi news (from API, possibly with populated heroImage)
 * @param {string} strapiUrl - Base Strapi URL for absolute media URLs
 * @returns {object} Frontend news shape: { slug, image, title, date, excerpt, additionalImage, contentBottom }
 */
export function mapStrapiNewsToFrontend(s, strapiUrl = '') {
  if (!s) return null;

  const base = strapiUrl.replace(/\/$/, '');
  const mediaUrl = (media) => {
    if (!media) return null;
    const url = media.url ?? media.data?.attributes?.url;
    return url ? (url.startsWith('http') ? url : `${base}${url}`) : null;
  };

  // Strapi v5 uses documentId for single-document REST (GET /api/news-items/:documentId); use it for URL slug
  const slug = s.documentId ?? s.slug ?? s.id;
  const slugStr = slug != null ? String(slug) : '';
  const heroUrl = mediaUrl(s.heroImage);
  const dateStr =
    s.publishDate != null
      ? new Date(s.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.')
      : '';

  return {
    slug: slugStr,
    image: heroUrl,
    title: s.title ?? '',
    date: dateStr,
    excerpt: s.snippet ?? '',
    additionalImage: heroUrl,
    contentBottom: typeof s.content === 'string' ? s.content : (s.content?.body ?? ''),
  };
}
