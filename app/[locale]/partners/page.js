import PartnersGrid from "@/components/partners/PartnersGrid";
import { getAlternateUrls } from "@/lib/metadata";
import { getPartnerProjects, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiPartnerProjectsToFrontend } from "@/lib/adapters/partnerProject";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "პარტნიორები | The Lake by Placemakers"
      : "Partners | The Lake by Placemakers",
    description: isKa
      ? "გაეცანით The Lake by Placemakers-ის პარტნიორებსა და პროექტებს ლისის ტბის პირას."
      : "Meet the partners and projects behind The Lake by Placemakers at Lisi Lake.",
    openGraph: {
      title: isKa ? "პარტნიორები | The Lake by Placemakers" : "Partners | The Lake by Placemakers",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/partners", locale),
  };
}

export const dynamic = "force-dynamic";

export default async function PartnersPage({ params }) {
  const { locale } = await params;

  let partners = [];
  try {
    const { data } = await getPartnerProjects({ locale, sort: ["order:asc"] });
    partners = mapStrapiPartnerProjectsToFrontend(data, STRAPI_URL);
  } catch {}

  return (
    <main>
      <PartnersGrid partners={partners} />
    </main>
  );
}
