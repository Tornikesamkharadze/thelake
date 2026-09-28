import { htmlToBlocks } from './richContent';

function mediaToFrontend(media, base, fallbackAlt) {
  if (!media) return null;
  const url = media.url ?? media.data?.attributes?.url;
  if (!url) return null;
  const src = url.startsWith('http') ? url : `${base}${url}`;
  const alt = media.alternativeText ?? media.data?.attributes?.alternativeText ?? fallbackAlt ?? '';
  return { src, alt };
}

/** Maps Strapi `partner-project` records to PartnerProjectsSlider's expected shape, sorted by `order`. */
export function mapStrapiPartnerProjectsToFrontend(data, strapiUrl = '') {
  const base = (strapiUrl || '').replace(/\/$/, '');
  const list = Array.isArray(data) ? data : [];

  return list
    .map((p) => ({
      id: p.id ?? p.documentId,
      slug: String(p.slug || p.documentId || p.id || ''),
      name: p.name ?? '',
      description: p.description ?? '',
      order: p.order ?? 0,
      image: mediaToFrontend(p.image, base, p.name),
      backgroundImage: mediaToFrontend(p.backgroundImage, base, p.name),
    }))
    .sort((a, b) => a.order - b.order);
}

/** Maps a single Strapi `partner-project` record to the /partners/[slug] detail page's shape. */
export function mapStrapiPartnerProjectToDetail(p, strapiUrl = '') {
  if (!p) return null;

  const base = (strapiUrl || '').replace(/\/$/, '');
  const fixUrl = (url) => {
    if (!url) return null;
    if (/^https?:\/\/localhost(:\d+)?/.test(url)) return url.replace(/^https?:\/\/localhost(:\d+)?/, base);
    if (url.startsWith('/uploads/')) return `${base}${url}`;
    if (!url.startsWith('/') && !url.startsWith('http')) return `${base}/uploads/${url}`;
    return url;
  };

  const slug = p.slug || p.documentId || p.id;
  const slugStr = slug != null ? String(slug) : '';
  const heroImage = mediaToFrontend(p.backgroundImage, base, p.name);
  const logo = mediaToFrontend(p.image, base, p.name);
  const rawHtml = typeof p.content === 'string' ? p.content : (p.content?.body ?? '');

  const blocks = htmlToBlocks(rawHtml).map((b) =>
    b.type === 'image' ? { ...b, src: fixUrl(b.src) } : b
  );

  return {
    slug: slugStr,
    name: p.name ?? '',
    excerpt: p.description ?? '',
    heroImage: heroImage?.src ?? null,
    heroImageAlt: heroImage?.alt ?? '',
    logo,
    blocks,
  };
}
