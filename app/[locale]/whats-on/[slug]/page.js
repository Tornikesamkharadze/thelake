import NewsDetail from "@/components/whats-on/NewsDetail";
import { getAlternateUrls } from "@/lib/metadata";
import { getNewsBySlug, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiNewsToFrontend } from "@/lib/adapters/news";
import { notFound, permanentRedirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function loadNews(slug, locale) {
  try {
    const res = await getNewsBySlug(slug, { locale });
    return res?.data ? mapStrapiNewsToFrontend(res.data, STRAPI_URL) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const isKa = locale === "ka";

  const news = await loadNews(slug, locale);

  if (!news) {
    return {
      title: isKa
        ? "სიახლე ვერ მოიძებნა - The Lake by Placemakers"
        : "News Not Found - The Lake by Placemakers",
    };
  }

  return {
    title: `${news.title} - The Lake by Placemakers`,
    description:
      (news.excerpt && news.excerpt.substring(0, 160)) ||
      (isKa
        ? "წაიკითხეთ უახლესი სიახლეები და განახლებები The Lake-ის თემიდან ლისის ტბაზე, თბილისი."
        : "Read the latest news and updates from The Lake community at Lisi Lake, Tbilisi."),
    openGraph: {
      title: `${news.title} | The Lake by Placemakers`,
      description: news.excerpt ? news.excerpt.substring(0, 160) : undefined,
      type: "article",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: [news.image || "/og-image.png"],
      article: {
        publishedTime: news.date,
      },
    },
    keywords: [
      news.title,
      "The Lake news",
      "Lisi Lake",
      "The Lake by Placemakers",
      "community news Tbilisi",
      "lakeside community Georgia",
    ],
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.excerpt ? news.excerpt.substring(0, 160) : undefined,
      images: [news.image || "/og-image.png"],
    },
    alternates: getAlternateUrls(`/whats-on/${news.slug}`, locale),
  };
}

export default async function NewsPage({ params }) {
  const { slug, locale } = await params;

  const news = await loadNews(slug, locale);

  if (!news) {
    notFound();
  }

  // Old documentId links → canonical readable slug URL
  if (news.slug && news.slug !== slug) {
    permanentRedirect(`/${locale}/whats-on/${news.slug}`);
  }

  return (
    <main>
      <NewsDetail
        title={news.title}
        date={news.date}
        heroImage={news.image}
        blocks={news.blocks}
        excerpt={news.excerpt}
        additionalImage={news.additionalImage}
        contentBottom={news.contentBottom}
      />
    </main>
  );
}
