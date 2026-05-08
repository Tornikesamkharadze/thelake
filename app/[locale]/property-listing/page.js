import PropertyListing from "@/components/PropertyListing";
import { getProperties, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiPropertyToFrontend } from "@/lib/adapters/property";
import React from "react";

export const dynamic = "force-dynamic";

export default async function PropertyListingPage() {
  const { data } = await getProperties({ pagination: { pageSize: 100 } });
  const list = Array.isArray(data) ? data : [];
  const properties = list.map((raw) => mapStrapiPropertyToFrontend(raw, STRAPI_URL)).filter(Boolean);

  return (
    <main>
      <PropertyListing properties={properties} />
    </main>
  );
}
