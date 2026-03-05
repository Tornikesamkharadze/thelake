/**
 * Maps a Strapi property document to the frontend property shape used by
 * PropertyDetail, PropertyListing, and ChoosePropertie.
 *
 * @param {object} s - Strapi property (from API, possibly with populated media)
 * @param {string} strapiUrl - Base Strapi URL (e.g. STRAPI_URL) for absolute media URLs
 * @returns {object} Frontend property shape
 */
export function mapStrapiPropertyToFrontend(s, strapiUrl = '') {
  if (!s) return null;

  const base = strapiUrl.replace(/\/$/, '');
  const mediaUrl = (media) => {
    if (!media) return null;
    const url = media.url ?? media.data?.attributes?.url;
    return url ? (url.startsWith('http') ? url : `${base}${url}`) : null;
  };

  const landSize = s.propertySize ?? s.propertyTotalLandArea;
  const landSizeStr = landSize != null && landSize !== '' ? String(landSize) : '';

  return {
    id: s.id ?? s.documentId,
    houseNo: s.propertyName ?? s.propertyCode ?? '',
    type: s.propertyType ?? '',
    sakadastroKodi: s.propertyCadastralNumberSector ?? s.propertyCode ?? '',
    landSize: landSizeStr,
    buildingSpace: s.propertyTotalHouseArea != null ? String(s.propertyTotalHouseArea) : '',
    coords: s.propertySVGPath ?? '',
    twoDImg: mediaUrl(s.propertySmallImage),
    view: s.propertyView ?? '',
    sector: s.propertySector ?? '',
    totalHouseArea: s.propertyTotalHouseArea != null ? String(s.propertyTotalHouseArea) : '',
    firstFloor: s.propertyFirstFloor != null ? String(s.propertyFirstFloor) : '',
    secondFloor: s.propertySecondFloor != null ? String(s.propertySecondFloor) : '',
    terraceArea: s.propertySpace != null ? String(s.propertySpace) : '',
    terraceFirstFloor: '',
    terraceSecondFloor: '',
    ceilingHeights: s.propertyCeilingHeights ?? '',
    entranceHall: s.propertyEntranceHall != null ? String(s.propertyEntranceHall) : '',
    mainAreas: s.propertyMainAreas ?? '',
    bedrooms: s.propertyBedrooms ?? '',
    isSold: false,
  };
}
