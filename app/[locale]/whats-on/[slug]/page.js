import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import NewsDetail from "@/components/whats-on/NewsDetail";
import { getAlternateUrls } from "@/lib/metadata";
import { getNewsById, getAllNews, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiNewsToFrontend } from "@/lib/adapters/news";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const isKa = locale === "ka";

  let news = null;
  try {
    const res = await getNewsById(slug);
    const raw = res?.data;
    news = raw ? mapStrapiNewsToFrontend(raw, STRAPI_URL) : null;
  } catch {
    news = null;
  }

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
    alternates: getAlternateUrls(`/whats-on/${slug}`),
  };
}

export default async function NewsPage({ params }) {
  const { slug, locale } = await params;

  let news = null;
  try {
    const res = await getNewsById(slug);
    const raw = res?.data;
    news = raw ? mapStrapiNewsToFrontend(raw, STRAPI_URL) : null;
  } catch {
    news = null;
  }

  if (!news) {
    notFound();
  }

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const locales = ["en", "ka"];
  const params = [];
  try {
    const { data } = await getAllNews({ locale: "en" });
    const list = Array.isArray(data) ? data : [];
    for (const locale of locales) {
      for (const raw of list) {
        const mapped = mapStrapiNewsToFrontend(raw, STRAPI_URL);
        if (mapped?.slug) params.push({ locale, slug: mapped.slug });
      }
    }
  } catch {
    // no static params if API unavailable
  }
  return params;
}
