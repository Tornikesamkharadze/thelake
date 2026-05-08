/**
 * Maps Strapi gallery collection to frontend shape: { Interior: string[], Exterior: string[] }
 * Each item has image (media) and imageType (enum: "exterior" | "interior").
 *
 * @param {object[]} galleries - Strapi galleries array from getGalleries()
 * @param {string} strapiUrl - Base Strapi URL for absolute media URLs
 * @returns {{ Interior: string[], Exterior: string[] }}
 */
export function mapStrapiGalleriesToFrontend(galleries, strapiUrl = "") {
  const base = (strapiUrl || "").replace(/\/$/, "");
  const mediaUrl = (media) => {
    if (!media) return null;
    const url = media.url ?? media.data?.attributes?.url;
    return url ? (url.startsWith("http") ? url : `${base}${url}`) : null;
  };

  const Interior = [];
  const Exterior = [];

  const list = Array.isArray(galleries) ? galleries : [];
  for (const item of list) {
    const type = (item.imageType || "").toLowerCase();
    if (type !== "interior" && type !== "exterior") continue;
    const mediaList = Array.isArray(item.images) ? item.images : item.image ? [item.image] : [];
    for (const media of mediaList) {
      const url = mediaUrl(media);
      if (!url) continue;
      if (type === "interior") Interior.push(url);
      else Exterior.push(url);
    }
  }

  return { Interior, Exterior };
}
