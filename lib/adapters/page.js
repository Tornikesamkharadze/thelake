/**
 * Maps a Strapi page document to a frontend-friendly shape with resolved media URLs.
 * Used by the single dynamic page that renders content from Strapi.
 *
 * @param {object} page - Strapi page (from API with populate: '*')
 * @param {string} strapiUrl - Base Strapi URL for absolute media URLs
 * @returns {object} { title, path, heroImageUrl, heroVideoUrl, components }
 */
export function mapStrapiPageToFrontend(page, strapiUrl = '') {
  if (!page) return null;

  const base = (strapiUrl || '').replace(/\/$/, '');
  const mediaUrl = (media) => {
    if (!media) return null;
    const url =
      media.url ??
      media.data?.attributes?.url ??
      media.data?.url;
    return url ? (url.startsWith('http') ? url : `${base}${url}`) : null;
  };

  const heroImageUrl = mediaUrl(page.heroImage);
  const heroVideoUrl = mediaUrl(page.heroVideo);

  const textImageCommon = (block) => ({
    title: block.title ?? '',
    subtitle: block.subtitle ?? '',
    description: block.description ?? '',
    imagePosition: block.imagePosition ?? 'right',
    backgroundColor: block.backgroundColor ?? undefined,
    anchorId: block.anchorId ?? undefined,
    titleColor: block.titleColor ?? undefined,
    subtitleColor: block.subtitleColor ?? undefined,
    descriptionColor: block.descriptionColor ?? undefined,
  });

  const components = (page.components || []).map((block) => {
    const type = block.__component || '';

    if (type === 'content-blocks.cta') {
      return {
        type: 'cta',
        title: block.title ?? '',
        description: block.description ?? '',
        buttonUrl: block.buttonUrl ?? null,
        buttonLabel: block.buttonLabel ?? '',
        buttonPosition: block.buttonPosition ?? 'middle',
        backgroundColor: block.backgroundColor ?? undefined,
        titleColor: block.titleColor ?? undefined,
        descriptionColor: block.descriptionColor ?? undefined,
        backgroundImageUrl: mediaUrl(block.backgroundImage),
      };
    }

    if (type === 'content-blocks.text-image-block-with-image-overlay') {
      return {
        type: 'text-image',
        layout: 'imageOverlay',
        ...textImageCommon(block),
        imageUrl: mediaUrl(block.image),
      };
    }

    if (
      type === 'content-blocks.text-image-block' ||
      type === 'content-blocks.text-image-block-with-text-overlay'
    ) {
      return {
        type: 'text-image',
        layout: 'overlap',
        ...textImageCommon(block),
        imageUrl: mediaUrl(block.image),
      };
    }

    return {
      type: 'unknown',
      ...textImageCommon(block),
      imageUrl: mediaUrl(block.image),
    };
  });

  return {
    title: page.title ?? '',
    path: page.path ?? '',
    heroImageUrl,
    heroVideoUrl,
    components,
  };
}
