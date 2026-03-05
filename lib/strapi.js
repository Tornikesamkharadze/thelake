/**
 * Strapi API fetch helpers for Next.js frontend.
 *
 * Set NEXT_PUBLIC_STRAPI_URL in .env.local (e.g. http://localhost:1338).
 */

const STRAPI_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_STRAPI_URL) ||
  (typeof process !== 'undefined' && process.env?.REACT_APP_STRAPI_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STRAPI_URL) ||
  'http://localhost:1338';

const API_URL = `${STRAPI_URL}/api`;

/**
 * Encode nested object as Strapi 5 bracket notation (filters[field][$eq]=value).
 * Strapi 5 expects filters as object/array, not a JSON string.
 */
function encodeBracketParams(prefix, obj) {
  const pairs = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}[${k}]` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      pairs.push(...encodeBracketParams(key, v));
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        pairs.push(`${encodeURIComponent(key + '[' + i + ']')}=${encodeURIComponent(String(item))}`);
      });
    } else {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
    }
  }
  return pairs;
}

/**
 * @param {string} path - API path without leading slash (e.g. 'pages', 'global')
 * @param {{ populate?: string | object, filters?: object, sort?: string | string[], pagination?: object, locale?: string }} [params]
 * @returns {Promise<{ data: any, meta?: object }>}
 */
async function request(path, params = {}) {
  const searchParams = new URLSearchParams();
  if (params.populate !== undefined) {
    searchParams.set('populate', typeof params.populate === 'string' ? params.populate : JSON.stringify(params.populate));
  }
  if (params.filters && typeof params.filters === 'object') {
    encodeBracketParams('filters', params.filters).forEach((pair) => {
      const i = pair.indexOf('=');
      const key = decodeURIComponent(pair.slice(0, i));
      const value = decodeURIComponent(pair.slice(i + 1));
      searchParams.append(key, value);
    });
  }
  if (params.sort) {
    const sort = Array.isArray(params.sort) ? params.sort.join(',') : params.sort;
    searchParams.set('sort', sort);
  }
  if (params.pagination && typeof params.pagination === 'object') {
    encodeBracketParams('pagination', params.pagination).forEach((pair) => {
      const i = pair.indexOf('=');
      const key = decodeURIComponent(pair.slice(0, i));
      const value = decodeURIComponent(pair.slice(i + 1));
      searchParams.append(key, value);
    });
  }
  if (params.locale) searchParams.set('locale', params.locale);
  if (params.fields) searchParams.set('fields', Array.isArray(params.fields) ? params.fields.join(',') : params.fields);

  const url = `${API_URL}/${path}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`);
  return res.json();
}

// ——— Single types (one document each) ———

/** @returns {Promise<{ data: object }>} */
export async function getAbout(params = {}) {
  return request('about', { populate: '*', ...params });
}

/** @returns {Promise<{ data: object | null }>} Single type; 404 when no document for locale returns { data: null }. */
export async function getContact(params = {}) {
  try {
    return await request('contact', { populate: '*', ...params });
  } catch (err) {
    if (err.message?.includes('404')) {
      return { data: null };
    }
    throw err;
  }
}

/** @returns {Promise<{ data: object }>} */
export async function getFooter(params = {}) {
  return request('footer', { populate: '*', ...params });
}

/** @returns {Promise<{ data: object }>} */
export async function getGlobal(params = {}) {
  return request('global', { populate: '*', ...params });
}

/** @returns {Promise<{ data: object }>} */
export async function getHeader(params = {}) {
  return request('header', { populate: '*', ...params });
}

/** @returns {Promise<{ data: object }>} */
export async function getTerritory(params = {}) {
  return request('territory', { populate: '*', ...params });
}

// ——— Collection types (lists + by id) ———

// Try 'gallery' first (Strapi API folder name); fallback to 'galleries' (pluralName)
/** @returns {Promise<{ data: object[], meta?: object }>} */
export async function getGalleries(params = {}) {
  try {
    return await request('galleries', { populate: '*', ...params });
  } catch (err) {
    if (!err.message?.includes('404')) throw err;
    return request('galleries', { populate: '*', ...params });
  }
}

/** @param {string} id - Document id
 *  @returns {Promise<{ data: object }>} */
export async function getGalleryById(id, params = {}) {
  try {
    return await request(`gallery/${id}`, { populate: '*', ...params });
  } catch (err) {
    if (!err.message?.includes('404')) throw err;
    return request(`galleries/${id}`, { populate: '*', ...params });
  }
}

// Try 'news-items' first (schema pluralName); fallback to 'news' if 404
async function requestNews(path, params = {}) {
  try {
    return await request(path, params);
  } catch (err) {
    if (!err.message?.includes('404')) throw err;
    if (path.startsWith('news-items')) {
      const alt = path.replace('news-items', 'news');
      return request(alt, params);
    }
    throw err;
  }
}

/** @returns {Promise<{ data: object[], meta?: object }>} */
export async function getNews(params = {}) {
  try {
    const merged = {
      populate: '*',
      ...params,
      pagination: params.pagination ?? { pageSize: 100 },
    };
    return await requestNews('news-items', merged);
  } catch (err) {
    if (err.message?.includes('404')) return { data: [] };
    throw err;
  }
}

/** Fetches all news items for the given locale (all pages). */
export async function getAllNews(params = {}) {
  const locale = params.locale;
  const baseParams = { populate: '*', locale, sort: ['publishDate:desc'] };
  const pageSize = 100;
  const first = await getNews({ ...baseParams, pagination: { page: 1, pageSize } });
  const data = Array.isArray(first.data) ? [...first.data] : [];
  const meta = first.meta;
  const pageCount = meta?.pagination?.pageCount ?? 1;
  for (let page = 2; page <= pageCount; page++) {
    const next = await getNews({ ...baseParams, pagination: { page, pageSize } });
    if (Array.isArray(next.data)) data.push(...next.data);
  }
  return { data, meta: { ...meta, pagination: { ...meta?.pagination, total: data.length } } };
}

/** @param {string} id - Document id (Strapi v5: documentId) or numeric id for fallback
 *  @returns {Promise<{ data: object }>} */
export async function getNewsById(id, params = {}) {
  try {
    return await requestNews(`news-items/${id}`, { populate: '*', ...params });
  } catch (err) {
    if (!err.message?.includes('404')) throw err;
    // Strapi v5 uses documentId in URLs; if id is numeric, find by id from list
    const numericId = typeof id === 'string' && /^\d+$/.test(id) ? Number(id) : null;
    if (numericId == null) throw err;
    const { data: list } = await getAllNews({ populate: '*', ...params });
    const doc = Array.isArray(list) ? list.find((d) => d.id === numericId || d.documentId === id) : null;
    if (doc) return { data: doc };
    throw err;
  }
}

/** @returns {Promise<{ data: object[], meta?: object }>} */
export async function getPages(params = {}) {
  return request('pages', { populate: '*', ...params });
}

/** @param {string} id
 *  @returns {Promise<{ data: object }>} */
export async function getPageById(id, params = {}) {
  return request(`pages/${id}`, { populate: '*', ...params });
}

/** Get one page by path (e.g. '/about'). Pass filters: { path: '/about' }
 *  @returns {Promise<{ data: object[] }>} */
export async function getPageByPath(path, params = {}) {
  return request('pages', { populate: '*', filters: { path }, ...params });
}

/** @returns {Promise<{ data: object[], meta?: object }>} */
export async function getPartners(params = {}) {
  return request('partners', { populate: '*', ...params });
}

/** @param {string} id
 *  @returns {Promise<{ data: object }>} */
export async function getPartnerById(id, params = {}) {
  return request(`partners/${id}`, { populate: '*', ...params });
}

/** @returns {Promise<{ data: object[], meta?: object }>} */
export async function getProperties(params = {}) {
  try {
    return await request('properties', { populate: '*', ...params });
  } catch (err) {
    if (!err.message?.includes('404')) throw err;
    try {
      return await request('property', { populate: '*', ...params });
    } catch {
      return { data: [] };
    }
  }
}

/** @param {string} id - Strapi document id
 *  @returns {Promise<{ data: object }>} */
export async function getPropertyById(id, params = {}) {
  return request(`properties/${id}`, { populate: '*', ...params });
}

/** Get property by code for URL like /properties/D1, /properties/C2 (propertyCode)
 *  @param {string} code - e.g. 'D1', 'C2'
 *  @returns {Promise<{ data: object[] }>} - use data[0] for the property or undefined if not found */
export async function getPropertyByCode(code, params = {}) {
  try {
    return await request('properties', { populate: '*', filters: { propertyCode: { $eq: code } }, ...params });
  } catch (err) {
    if (err.message?.includes('404')) {
      try {
        return await request('property', { populate: '*', filters: { propertyCode: { $eq: code } }, ...params });
      } catch {
        return { data: [] };
      }
    }
    throw err;
  }
}

/** Get property by name (propertyName, exact match)
 *  @param {string} name
 *  @returns {Promise<{ data: object[] }>} */
export async function getPropertyByName(name, params = {}) {
  return request('properties', { populate: '*', filters: { propertyName: { $eq: name } }, ...params });
}

/** Search properties by code or name (code: exact, name: contains, case-insensitive).
 *  @param {string} query - e.g. 'D1' or 'Villa'
 *  @returns {Promise<{ data: object[] }>} */
export async function getPropertiesSearch(query, params = {}) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return getProperties(params);
  }
  const q = query.trim();
  try {
    return await request('properties', {
      populate: '*',
      filters: {
        $or: [
          { propertyCode: { $eq: q } },
          { propertyName: { $containsi: q } },
        ],
      },
      ...params,
    });
  } catch (err) {
    if (err.message?.includes('404')) return { data: [] };
    throw err;
  }
}

/** @returns {Promise<{ data: object[], meta?: object }>} */
export async function getTeamMembers(params = {}) {
  return request('team-members', { populate: '*', ...params });
}

/** @param {string} id
 *  @returns {Promise<{ data: object }>} */
export async function getTeamMemberById(id, params = {}) {
  return request(`team-members/${id}`, { populate: '*', ...params });
}

export { STRAPI_URL, API_URL, request };
