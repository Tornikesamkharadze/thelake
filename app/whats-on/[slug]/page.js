import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import NewsDetail from "@/components/whats-on/NewsDetail";
import { newsData } from "@/components/whats-on/newsData";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const news = newsData.find((item) => item.slug === slug);

  if (!news) {
    return {
      title: "News Not Found - The Lake by Placemakers",
    };
  }

  return {
    title: `${news.title} - The Lake by Placemakers`,
    description:
      news.excerpt.substring(0, 160) ||
      "Read the latest news and updates from The Lake community at Lisi Lake, Tbilisi.",
    keywords: [
      news.title,
      "The Lake news",
      "Lisi Lake",
      "The Lake by Placemakers",
      "community news Tbilisi",
      "lakeside community Georgia",
    ],
    openGraph: {
      title: `${news.title} | The Lake by Placemakers`,
      description: news.excerpt.substring(0, 160),
      type: "article",
      locale: "en_US",
      siteName: "The Lake",
      images: [news.image || "/og-image.png"],
      article: {
        publishedTime: news.date,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.excerpt.substring(0, 160),
      images: [news.image || "/og-image.png"],
    },
    alternates: {
      canonical: `/whats-on/${slug}`,
    },
  };
}

export default async function NewsPage({ params }) {
  const { slug } = await params;

  const news = newsData.find((item) => item.slug === slug);

  if (!news) {
    notFound();
  }

  return (
    <div>
      <Header />
      <NewsDetail
        title={news.title}
        date={news.date}
        heroImage={news.image}
        excerpt={news.excerpt}
        additionalImage={news.additionalImage}
        contentBottom={news.contentBottom}
      />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return newsData.map((item) => ({
    slug: item.slug,
  }));
}
