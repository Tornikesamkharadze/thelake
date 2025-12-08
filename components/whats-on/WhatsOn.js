'use client';

import NewsGrid from './NewsGrid';
import { newsData } from './newsData';

const WhatsOn = () => {
  return <NewsGrid newsItems={newsData} backgroundColor="#ffffff" />;
};

export default WhatsOn;