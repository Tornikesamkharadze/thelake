"use client";

import NewsGrid from "./NewsGrid";

const WhatsOn = ({ newsItems = [] }) => {
  return <NewsGrid newsItems={newsItems} backgroundColor="#ffffff" />;
};

export default WhatsOn;