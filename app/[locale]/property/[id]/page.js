import PropertyDetail from "@/components/PropertyDetail";
import { getPropertyByName, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiPropertyToFrontend } from "@/lib/adapters/property";
import { notFound } from "next/navigation";

/** SSR only — no SSG; avoids Strapi fetch during `next build`. */
export const dynamic = "force-dynamic";

export default async function PropertyPage({ params }) {
  const { id } = await params;
  const slug = (id || "").toUpperCase();

  const { data } = await getPropertyByName(slug);
  const raw = data?.[0];
  const property = raw ? mapStrapiPropertyToFrontend(raw, STRAPI_URL) : null;

  if (!property) {
    notFound();
  }

  return (
    <main>
      <PropertyDetail property={property} />
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const locales = ["en", "ka"];
    const { data } = await getProperties({ pagination: { pageSize: 100 } });
    const list = Array.isArray(data) ? data : [];
    const params = [];
    for (const locale of locales) {
      for (const raw of list) {
        const mapped = mapStrapiPropertyToFrontend(raw, STRAPI_URL);
        if (mapped?.houseNo) {
          params.push({ locale, id: (mapped.houseNo || "").toUpperCase() });
        }
      }
    }
    return params;
  } catch (e) {
    return [];
  }
}
