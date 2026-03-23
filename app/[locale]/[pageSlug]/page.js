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

/** SSR only — no SSG; avoids pre-rendering CMS pages at build time. */
export const dynamic = "force-dynamic";

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
