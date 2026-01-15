'use client';

import NewsGrid from './NewsGrid';
import { useTranslations } from 'next-intl';

const WhatsOn = () => {
  const t = useTranslations();
  const newsData = t.raw('newsData');

  return <NewsGrid newsItems={newsData} backgroundColor="#ffffff" />;
};

export default WhatsOn;