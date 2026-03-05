/**
 * Maps a Strapi page document to a frontend-friendly shape with resolved media URLs.
 * Used by the single dynamic page that renders content from Strapi.
 *
 * @param {object} page - Strapi page (from API with populate: '*')
 * @param {string} strapiUrl - Base Strapi URL for absolute media URLs
 * @returns {object} { title, path, heroImageUrl, components }
 */
export function mapStrapiPageToFrontend(page, strapiUrl = '') {
  if (!page) return null;

  const base = (strapiUrl || '').replace(/\/$/, '');
  const mediaUrl = (media) => {
    if (!media) return null;
    const url = media.url ?? media.data?.attributes?.url;
    return url ? (url.startsWith('http') ? url : `${base}${url}`) : null;
  };

  const heroImageUrl = mediaUrl(page.heroImage);
  const components = (page.components || []).map((block) => {
    const type = block.__component || '';
    const common = {
      title: block.title ?? '',
      description: block.description ?? '',
      imagePosition: block.imagePosition ?? 'right',
      backgroundColor: block.backgroundColor ?? undefined,
      anchorId: block.anchorId ?? undefined,
    };
    if (type === 'content-blocks.cta') {
      return {
        type: 'cta',
        title: block.title ?? '',
        description: block.description ?? '',
        buttonUrl: block.buttonUrl ?? null,
        backgroundImageUrl: mediaUrl(block.backgroundImage),
      };
    }
    if (
      type === 'content-blocks.text-image-block' ||
      type === 'content-blocks.text-image-block-with-text-overlay' ||
      type === 'content-blocks.text-image-block-with-image-overlay'
    ) {
      return {
        type: 'text-image',
        ...common,
        imageUrl: mediaUrl(block.image),
      };
    }
    return { type: 'unknown', ...common };
  });

  return {
    title: page.title ?? '',
    path: page.path ?? '',
    heroImageUrl,
    components,
  };
}
