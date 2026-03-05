/**
 * Whether the URL is a localhost/private host so next/image should skip optimization
 * (avoids "resolved to private ip" when Next.js fetches the image server-side).
 * @param {string} src - Image URL
 * @returns {boolean}
 */
export function isLocalhostImage(src) {
  if (typeof src !== 'string') return false;
  try {
    const u = new URL(src);
    const h = u.hostname.toLowerCase();
    return h === 'localhost' || h === '127.0.0.1' || h === '[::1]';
  } catch {
    return false;
  }
}
