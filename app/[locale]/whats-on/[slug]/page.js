import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import NewsDetail from "@/components/whats-on/NewsDetail";
import { getNewsData } from "@/lib/newsData";
import { notFound } from "next/navigation";
import { getAlternateUrls } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const isKa = locale === "ka";
  const newsData = getNewsData(locale);
  const news = newsData.find((item) => item.slug === slug);

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
      news.excerpt.substring(0, 160) ||
      (isKa
        ? "წაიკითხეთ უახლესი სიახლეები და განახლებები The Lake-ის თემიდან ლისის ტბაზე, თბილისი."
        : "Read the latest news and updates from The Lake community at Lisi Lake, Tbilisi."),
    openGraph: {
      title: `${news.title} | The Lake by Placemakers`,
      description: news.excerpt.substring(0, 160),
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
      description: news.excerpt.substring(0, 160),
      images: [news.image || "/og-image.png"],
    },
    alternates: getAlternateUrls(`/whats-on/${slug}`),
  };
}

export default async function NewsPage({ params }) {
  const { slug, locale } = await params;
  const newsData = getNewsData(locale);
  const news = newsData.find((item) => item.slug === slug);

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
        />
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const locales = ["en", "ka"];
  const params = [];

  locales.forEach((locale) => {
    const newsData = getNewsData(locale);
    newsData.forEach((item) => {
      params.push({ locale, slug: item.slug });
    });
  });

  return params;
}
