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
      name: p.name ?? '',
      description: p.description ?? '',
      url: p.url || null,
      order: p.order ?? 0,
      image: mediaToFrontend(p.image, base, p.name),
      backgroundImage: mediaToFrontend(p.backgroundImage, base, p.name),
    }))
    .sort((a, b) => a.order - b.order);
}
