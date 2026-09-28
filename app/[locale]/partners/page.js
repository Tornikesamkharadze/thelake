import Hero from "@/components/Hero";
import PartnersGrid from "@/components/partners/PartnersGrid";
import { getAlternateUrls } from "@/lib/metadata";
import { getPartnerProjects, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiPartnerProjectsToFrontend } from "@/lib/adapters/partnerProject";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  const description = isKa
    ? "გაეცანით The Lake by Placemakers-ის პარტნიორებსა და პროექტებს ლისის ტბის პირას."
    : "Meet the partners and projects behind The Lake by Placemakers at Lisi Lake.";

  return {
    title: isKa
      ? "პარტნიორები | The Lake by Placemakers"
      : "Partners | The Lake by Placemakers",
    description,
    openGraph: {
      title: isKa ? "პარტნიორები | The Lake by Placemakers" : "Partners | The Lake by Placemakers",
      description,
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    keywords: [
      "The Lake partners",
      "The Lake by Placemakers partners",
      "Lisi Lake projects",
      "Lisi Lake",
      "Tbilisi real estate partners",
    ],
    twitter: {
      card: "summary_large_image",
      title: isKa ? "პარტნიორები | The Lake by Placemakers" : "Partners | The Lake by Placemakers",
      description,
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/partners", locale),
  };
}

export const dynamic = "force-dynamic";

export default async function PartnersPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  let partners = [];
  try {
    const { data } = await getPartnerProjects({ locale, sort: ["order:asc"] });
    partners = mapStrapiPartnerProjectsToFrontend(data, STRAPI_URL);
  } catch {}

  const title = t("partners.title");

  return (
    <main>
      <Hero
        image="/lake-1.png"
        height="80vh"
        title={title}
        highlightWords={[title]}
        uppercase={true}
      />
      <PartnersGrid partners={partners} />
    </main>
  );
}
