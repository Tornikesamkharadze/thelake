import PartnerDetail from "@/components/partners/PartnerDetail";
import { getAlternateUrls } from "@/lib/metadata";
import { getPartnerProjectBySlug, STRAPI_URL } from "@/lib/strapi";
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

  return {
    title: `${partner.name} - The Lake by Placemakers`,
    description:
      (partner.excerpt && partner.excerpt.substring(0, 160)) ||
      (isKa
        ? "გაეცანით The Lake by Placemakers-ის პარტნიორებსა და პროექტებს ლისის ტბის პირას."
        : "Meet the partners and projects behind The Lake by Placemakers at Lisi Lake."),
    openGraph: {
      title: `${partner.name} | The Lake by Placemakers`,
      description: partner.excerpt ? partner.excerpt.substring(0, 160) : undefined,
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: [partner.heroImage || "/og-image.png"],
    },
    alternates: getAlternateUrls(`/partners/${partner.slug}`, locale),
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
      />
    </main>
  );
}
