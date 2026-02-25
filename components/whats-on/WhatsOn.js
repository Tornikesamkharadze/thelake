"use client";

import { useParams } from "next/navigation";
import { getNewsData } from "@/lib/newsData";
import NewsGrid from "./NewsGrid";

const WhatsOn = () => {
  const params = useParams();
  const locale = params.locale || "ka";
  const newsData = getNewsData(locale);

  return <NewsGrid newsItems={newsData} backgroundColor="#ffffff" />;
};

export default WhatsOn;