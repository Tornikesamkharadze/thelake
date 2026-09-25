// Inline formatting the CKEditor toolbar can actually produce inside a paragraph
// (bold, italic, link, Shift+Enter line breaks — nothing else is on the toolbar).
// Everything else — script tags, event-handler attributes, stray markup someone
// hand-edited into the field via the API directly — is stripped before the block
// is ever handed to dangerouslySetInnerHTML.
const ALLOWED_INLINE_TAGS = new Set(['a', 'strong', 'em', 'b', 'i', 'br']);

/**
 * Strips any tag not in ALLOWED_INLINE_TAGS (keeping its text content), and for
 * <a> tags keeps only a safe-scheme href plus target/rel — no other attributes
 * survive. Pure string manipulation, so it works identically on the server
 * (during SSR) and the client, unlike DOM-based sanitizers that need jsdom on
 * the server.
 */
function sanitizeInlineHtml(html) {
  if (!html) return '';
  return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^<>]*)?)\/?>/g, (match, tagName, attrs) => {
    const tag = tagName.toLowerCase();
    if (!ALLOWED_INLINE_TAGS.has(tag)) return '';
    if (match.startsWith('</')) return `</${tag}>`;
    if (tag === 'br') return '<br/>';
    if (tag === 'a') {
      const href = (attrs.match(/href\s*=\s*"([^"]*)"/i)?.[1] ?? '').trim();
      if (!/^(https?:|mailto:|tel:|\/|#)/i.test(href)) return '<a>';
      const target = attrs.match(/target\s*=\s*"([^"]*)"/i)?.[1];
      const rel = attrs.match(/rel\s*=\s*"([^"]*)"/i)?.[1];
      let out = `<a href="${href.replace(/"/g, '&quot;')}"`;
      if (target) out += ` target="${target.replace(/"/g, '&quot;')}"`;
      if (rel) out += ` rel="${rel.replace(/"/g, '&quot;')}"`;
      return out + '>';
    }
    return `<${tag}>`;
  });
}

/**
 * Parses CKEditor HTML content into content blocks — shared by News (NewsDetail)
 * and Partners (PartnerDetail), the two sections that render a full rich-text
 * article body. Uses a regex scan so it works whether blocks are on separate
 * lines or concatenated (admin editor).
 */
export function htmlToBlocks(html) {
  if (!html || typeof html !== 'string') return [];
  const blocks = [];

  // Extract all block-level segments in document order
  const segRe = /<figure\s[^>]*class="media"[\s\S]*?<\/figure>|<figure\s[^>]*class="image"[\s\S]*?<\/figure>|<figure\s[^>]*class="table"[\s\S]*?<\/figure>|<(h[234])>[\s\S]*?<\/\1>|<p>[\s\S]*?<\/p>/gi;
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

    // Table
    if (/class="table"/i.test(seg)) {
      const rows = [];
      const trRe = /<tr>([\s\S]*?)<\/tr>/gi;
      let trMatch;
      while ((trMatch = trRe.exec(seg))) {
        const cellRe = /<(t[dh])[^>]*>([\s\S]*?)<\/t[dh]>/gi;
        const cells = [];
        let isHeader = false;
        let cellMatch;
        while ((cellMatch = cellRe.exec(trMatch[1]))) {
          if (cellMatch[1].toLowerCase() === 'th') isHeader = true;
          const text = cellMatch[2]
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/gi, ' ')
            .replace(/&amp;/gi, '&')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>')
            .replace(/&quot;/gi, '"')
            .trim();
          cells.push(text);
        }
        if (cells.length) rows.push({ cells, isHeader });
      }
      if (rows.length) blocks.push({ type: 'table', rows });
      continue;
    }

    // Image (only from <figure class="image">, not from media iframes)
    if (/class="image"/i.test(seg)) {
      const imgMatch = seg.match(/<img[^>]+src="([^"]+)"/i);
      if (imgMatch) {
        blocks.push({ type: 'image', src: imgMatch[1], size: 'natural' });
        continue;
      }
    }

    // Heading — decode entities before checking for blank (CKEditor leaves
    // "<h2>&nbsp;</h2>" for an empty line left in heading mode; without
    // decoding, "&nbsp;" reads as non-empty text and creates an empty heading)
    const hMatch = seg.match(/^<(h[234])>([\s\S]*?)<\/h[234]>/i);
    if (hMatch) {
      const text = hMatch[2]
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .trim();
      if (text) blocks.push({ type: 'heading', level: hMatch[1], content: text });
      continue;
    }

    // Paragraph — keep the inner HTML (so inline links/bold/italic survive) rather
    // than stripping every tag; the renderer sanitizes it before display. Only used
    // to check whether the paragraph is actually blank (e.g. a lone "&nbsp;").
    const pMatch = seg.match(/^<p>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      const innerHtml = pMatch[1].trim();
      const plainCheck = innerHtml
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .trim();
      if (plainCheck) blocks.push({ type: 'text', content: sanitizeInlineHtml(innerHtml), isHtml: true });
    }
  }

  return blocks;
}

export function getYouTubeId(url) {
  if (!url) return null;
  return url.match(/(?:v=|youtu\.be\/|embed\/)([^&\n?#]+)/)?.[1] ?? null;
}
