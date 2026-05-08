/**
 * Parses CKEditor HTML content into NewsDetail blocks.
 * Uses regex scan so it works whether blocks are on separate lines or concatenated (admin editor).
 */
function htmlToBlocks(html) {
  if (!html || typeof html !== 'string') return [];
  const blocks = [];

  // Extract all block-level segments in document order
  const segRe = /<figure\s[^>]*class="media"[\s\S]*?<\/figure>|<figure\s[^>]*class="image"[\s\S]*?<\/figure>|<(h[234])>[\s\S]*?<\/\1>|<p>[\s\S]*?<\/p>/gi;
  const segments = html.match(segRe) || [];

  for (const seg of segments) {
    // YouTube — handle both seeded format (<oembed url="...">) and CKEditor admin format (data-oembed-url="...")
    const ytUrl =
      seg.match(/<oembed\s+url="([^"]+)"/i)?.[1] ||
      seg.match(/data-oembed-url="([^"]+)"/i)?.[1];
    if (ytUrl) {
      const vidId = getYouTubeId(ytUrl);
      if (vidId) {
        blocks.push({ type: 'youtube', url: ytUrl });
        continue;
      }
    }

    // Image (only from <figure class="image">, not from media iframes)
    if (/class="image"/i.test(seg)) {
      const imgMatch = seg.match(/<img[^>]+src="([^"]+)"/i);
      if (imgMatch) {
        blocks.push({ type: 'image', src: imgMatch[1], size: 'natural' });
        continue;
      }
    }

    // Heading
    const hMatch = seg.match(/^<(h[234])>([\s\S]*?)<\/h[234]>/i);
    if (hMatch) {
      const text = hMatch[2].replace(/<[^>]+>/g, '').trim();
      if (text) blocks.push({ type: 'heading', level: hMatch[1], content: text });
      continue;
    }

    // Paragraph — decode HTML entities and skip blank (&nbsp;) paragraphs
    const pMatch = seg.match(/^<p>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      const text = pMatch[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .trim();
      if (text) blocks.push({ type: 'text', content: text });
    }
  }

  return blocks;
}

function getYouTubeId(url) {
  if (!url) return null;
  return url.match(/(?:v=|youtu\.be\/|embed\/)([^&\n?#]+)/)?.[1] ?? null;
}

export function mapStrapiNewsToFrontend(s, strapiUrl = '') {
  if (!s) return null;

  const base = strapiUrl.replace(/\/$/, '');
  const mediaUrl = (media) => {
    if (!media) return null;
    const url = media.url ?? media.data?.attributes?.url;
    if (!url) return null;
    if (url.startsWith('/')) return `${base}${url}`;
    if (/^https?:\/\/localhost(:\d+)?/.test(url)) return url.replace(/^https?:\/\/localhost(:\d+)?/, base);
    return url;
  };

  const slug = s.documentId ?? s.slug ?? s.id;
  const slugStr = slug != null ? String(slug) : '';
  const heroUrl = mediaUrl(s.heroImage);
  const rawHtml = typeof s.content === 'string' ? s.content : (s.content?.body ?? '');

  // Parse HTML into proper blocks for NewsDetail
  const blocks = htmlToBlocks(rawHtml);

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
