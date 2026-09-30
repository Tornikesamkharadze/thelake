import PartnerDetail from "@/components/partners/PartnerDetail";
import { getAlternateUrls } from "@/lib/metadata";
import { getPartnerProjectBySlug, getPartnerProjects, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiPartnerProjectToDetail } from "@/lib/adapters/partnerProject";
import { notFound, permanentRedirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function loadPartner(slug, locale) {
  try {
    const res = await getPartnerProjectBySlug(slug, { locale });
    return res?.data ? mapStrapiPartnerProjectToDetail(res.data, STRAPI_URL) : null;
  } catch {
    return null;
  }
}

/**
 * hreflang must only point at pages that return 200 — drop the other language
 * when this partner has no translation for it (that URL would 404).
 */
async function partnerAlternates(slug, locale) {
  const alternates = getAlternateUrls(`/partners/${slug}`, locale);
  const other = locale === "ka" ? "en" : "ka";
  try {
    // Records without a slug are served under their documentId (see adapter)
    for (const field of ["slug", "documentId"]) {
      const { data } = await getPartnerProjects({
        locale: other,
        fields: ["slug"],
        filters: { [field]: { $eq: slug } },
        pagination: { pageSize: 1 },
      });
      if (Array.isArray(data) && data[0]) return alternates;
    }
  } catch {
    return alternates;
  }
  delete alternates.languages[other];
  if (other === "en") delete alternates.languages["x-default"];
  return alternates;
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const isKa = locale === "ka";

  const partner = await loadPartner(slug, locale);

  if (!partner) {
    return {
      title: isKa
        ? "პარტნიორი ვერ მოიძებნა - The Lake by Placemakers"
        : "Partner Not Found - The Lake by Placemakers",
    };
  }

  const description = partner.excerpt ? partner.excerpt.substring(0, 160) : undefined;
  const image = partner.heroImage || "/og-image.png";

  return {
    title: `${partner.name} - The Lake by Placemakers`,
    description:
      (partner.excerpt && partner.excerpt.substring(0, 160)) ||
      (isKa
        ? "გაეცანით The Lake by Placemakers-ის პარტნიორებსა და პროექტებს ლისის ტბის პირას."
        : "Meet the partners and projects behind The Lake by Placemakers at Lisi Lake."),
    openGraph: {
      title: `${partner.name} | The Lake by Placemakers`,
      description,
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: [image],
    },
    keywords: [
      partner.name,
      "The Lake partners",
      "The Lake by Placemakers",
      "Lisi Lake",
      "Lisi Lake projects",
    ],
    twitter: {
      card: "summary_large_image",
      title: partner.name,
      description,
      images: [image],
    },
    alternates: await partnerAlternates(partner.slug, locale),
  };
}

export default async function PartnerPage({ params }) {
  const { slug, locale } = await params;

  const partner = await loadPartner(slug, locale);

  if (!partner) {
    notFound();
  }

  // Old documentId links → canonical readable slug URL
  if (partner.slug && partner.slug !== slug) {
    permanentRedirect(`/${locale}/partners/${partner.slug}`);
  }

  return (
    <main>
      <PartnerDetail
        name={partner.name}
        excerpt={partner.excerpt}
        blocks={partner.blocks}
        heroImage={partner.heroImage}
        heroImageAlt={partner.heroImageAlt}
        logo={partner.logo}
      />
    </main>
  );
}
