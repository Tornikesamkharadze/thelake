import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import NewsDetail from '@/components/whats-on/NewsDetail';
import { newsData } from '@/components/whats-on/newsData';
import { notFound } from 'next/navigation';

export default async function NewsPage({ params }) {
  const { slug } = await params;
  
  const news = newsData.find(item => item.slug === slug);
  
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
        excerpt={news.excerpt} // სრული ტექსტი
        additionalImage={news.additionalImage}
        contentBottom={news.contentBottom} // string
      />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return newsData.map(item => ({
    slug: item.slug
  }));
}