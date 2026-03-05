import { notFound } from "next/navigation";
import { getPageByPath, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiPageToFrontend } from "@/lib/adapters/page";
import PageContent from "@/components/PageContent";

export const PAGE_SLUGS = [
  "bar-kitchen",
  "lake-house",
  "services-for-you",
  "spa-wellness",
  "the-lake-lifestyle",
];

export async function generateStaticParams() {
  const locales = ["en", "ka"];
  const params = [];
  for (const locale of locales) {
    for (const pageSlug of PAGE_SLUGS) {
      params.push({ locale, pageSlug });
    }
  }
  return params;
}

export default async function StrapiPage({ params }) {
  const { locale, pageSlug } = await params;
  if (!PAGE_SLUGS.includes(pageSlug)) notFound();

  const path = `/${pageSlug}`;
  let res;
  try {
    res = await getPageByPath(path, { locale, populate: "*" });
  } catch {
    notFound();
  }

  const raw = res?.data?.[0] ?? null;
  const page = raw
    ? mapStrapiPageToFrontend(raw, process.env.NEXT_PUBLIC_STRAPI_URL || STRAPI_URL)
    : null;

  if (!page) notFound();

  return <PageContent page={page} />;
}
