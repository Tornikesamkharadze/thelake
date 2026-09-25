import { htmlToBlocks, getYouTubeId } from './richContent';

export function mapStrapiNewsToFrontend(s, strapiUrl = '') {
  if (!s) return null;

  const base = strapiUrl.replace(/\/$/, '');
  const fixUrl = (url) => {
    if (!url) return null;
    if (/^https?:\/\/localhost(:\d+)?/.test(url)) return url.replace(/^https?:\/\/localhost(:\d+)?/, base);
    if (url.startsWith('/uploads/')) return `${base}${url}`;
    // bare filename with no path — assume it lives in Strapi uploads
    if (!url.startsWith('/') && !url.startsWith('http')) return `${base}/uploads/${url}`;
    return url;
  };
  const mediaUrl = (media) => {
    if (!media) return null;
    const url = media.url ?? media.data?.attributes?.url;
    return fixUrl(url);
  };

  const slug = s.slug || s.documentId || s.id;
  const slugStr = slug != null ? String(slug) : '';
  const heroUrl = mediaUrl(s.heroImage);
  const rawHtml = typeof s.content === 'string' ? s.content : (s.content?.body ?? '');

  // Parse HTML into proper blocks for NewsDetail; fix any localhost URLs in image srcs
  const blocks = htmlToBlocks(rawHtml).map((b) =>
    b.type === 'image' ? { ...b, src: fixUrl(b.src) } : b
  );

  // Thumbnail for the news card: heroImage > first image block > first youtube thumbnail
  const firstImgBlock = blocks.find((b) => b.type === 'image');
  const firstYtBlock = blocks.find((b) => b.type === 'youtube');
  const ytThumb = firstYtBlock
    ? (() => { const id = getYouTubeId(firstYtBlock.url); return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null; })()
    : null;
  const image = heroUrl || firstImgBlock?.src || ytThumb;

  const dateStr =
    s.publishDate != null
      ? new Date(s.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.')
      : '';

  return {
    slug: slugStr,
    image,
    title: s.title ?? '',
    date: dateStr,
    excerpt: s.snippet ?? '',
    blocks,
    contentBottom: rawHtml,
  };
}
