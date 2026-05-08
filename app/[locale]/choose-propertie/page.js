import ChoosePropertie from "@/components/choose-propertie/ChoosePropertie";
import { getProperties, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiPropertyToFrontend } from "@/lib/adapters/property";

export const dynamic = "force-dynamic";

export default async function ChoosePropertiePage() {
  // Fetch all properties for the map (Strapi default pageSize is 25; map needs every plot)
  const { data } = await getProperties({ pagination: { pageSize: 100 } });
  const list = Array.isArray(data) ? data : [];
  const properties = list.map((raw) => mapStrapiPropertyToFrontend(raw, STRAPI_URL)).filter(Boolean);

  return (
    <main>
      <ChoosePropertie properties={properties} />
    </main>
  );
}
