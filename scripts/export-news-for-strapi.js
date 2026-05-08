/**
 * Exports news from lib/newsData.en.js and lib/newsData.ka.js to JSON
 * for the Strapi seed script. Run from frontend/thelake: node scripts/export-news-for-strapi.js
 *
 * Usage: node scripts/export-news-for-strapi.js [output-path]
 * Default output: ../../thelake/data/seed-news-from-frontend.json
 */

const fs = require('fs');
const path = require('path');

// Load ESM modules by reading and evaluating (Node without type:module)
function loadJsArray(filePath, exportName) {
  const fullPath = path.resolve(__dirname, filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const match = content.match(new RegExp(`export const ${exportName} = \\[([\\s\\S]*)\\]\\s*;`, 'm'));
  if (!match) throw new Error(`Could not find ${exportName} in ${filePath}`);
  const arrayStr = '[' + match[1] + ']';
  return new Function('return ' + arrayStr)();
}

function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const cleaned = dateStr.trim().replace(/z$/i, '');
  const parts = cleaned.split(/[.\s/]/).filter(Boolean);
  if (parts.length < 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10) || new Date().getFullYear();
  const d = new Date(year, month, day);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

function blocksToContent(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return '';
  const parts = blocks.map((b) => {
    if (b.type === 'text' && b.content) return `<p>${b.content}</p>`;
    if (b.type === 'heading' && b.content) return `<${b.level || 'h2'}>${b.content}</${b.level || 'h2'}>`;
    if (b.type === 'youtube' && b.url) return `<figure class="media"><oembed url="${b.url}"></oembed></figure>`;
    if (b.type === 'image' && b.src) return `<figure class="image"><img src="${b.src}"/></figure>`;
    return '';
  });
  return parts.filter(Boolean).join('\n');
}

function imagePathToFilename(image) {
  if (!image || typeof image !== 'string') return null;
  const m = image.match(/\/([^/]+)$/);
  return m ? m[1] : (image || null);
}

function mapToStrapiShape(item) {
  return {
    title: item.title || '',
    publishDate: parseDate(item.date),
    snippet: item.excerpt || '',
    content: blocksToContent(item.blocks) || item.excerpt || '',
    heroImage: imagePathToFilename(item.image),
  };
}

const enPath = '../lib/newsData.en.js';
const kaPath = '../lib/newsData.ka.js';

const newsDataEn = loadJsArray(enPath, 'newsDataEn');
const newsDataKa = loadJsArray(kaPath, 'newsDataKa');

const payload = {
  en: newsDataEn.map(mapToStrapiShape),
  ka: newsDataKa.map(mapToStrapiShape),
};

const outPath = process.argv[2] || path.join(__dirname, '../../../thelake/data/seed-news-from-frontend.json');
const outDir = path.dirname(outPath);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');
console.log('Wrote', outPath, '(', payload.en.length, 'en,', payload.ka.length, 'ka )');
process.exit(0);
