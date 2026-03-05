/**
 * Maps Strapi contact single type to frontend shape for contact and find-us pages.
 *
 * @param {object} contact - Strapi contact from getContact()
 * @param {string} strapiUrl - Base Strapi URL for absolute media URLs
 * @returns {object} { address, phone, email, googleMaps, distanceTitle, distanceBackgroundUrl, distanceItems: [{ time, location }], social?: {} }
 */
export function mapStrapiContactToFrontend(contact, strapiUrl = "") {
  if (!contact) return null;

  const base = (strapiUrl || "").replace(/\/$/, "");
  const mediaUrl = (media) => {
    if (!media) return null;
    const url = media.url ?? media.data?.attributes?.url;
    return url ? (url.startsWith("http") ? url : `${base}${url}`) : null;
  };

  const distanceItems = (contact.distanceItems || []).map((item) => ({
    time: item.itemTitle ?? "",
    location: item.itemDescription ?? "",
  }));

  return {
    address: contact.address ?? "",
    phone: contact.phone ?? "",
    email: contact.email ?? "",
    googleMaps: contact.googleMaps ?? "",
    distanceTitle: contact.distanceTitle ?? "",
    distanceBackgroundUrl: mediaUrl(contact.distanceBackground),
    distanceItems,
    social: {
      facebook: contact.facebook ?? "",
      instagram: contact.instagram ?? "",
      x: contact.x ?? "",
      youtube: contact.youtube ?? "",
    },
  };
}
