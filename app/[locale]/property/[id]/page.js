import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
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
    <>
      <Header />
      <main>
        <PropertyDetail property={property} />
      </main>
      <Footer />
    </>
  );
}
