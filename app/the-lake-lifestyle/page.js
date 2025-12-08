// app/the-lake-lifestyle/page.js
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import TheLake from "@/components/the-lake-lifestyle/TheLake";
import React from "react";

export const metadata = {
  title: "The Lake Lifestyle - Life by Lisi Lake",
  description:
    "Experience life by Lisi Lake in Tbilisi's main recreation area. Clean air, open views, hiking trails, water ponds, and mountain biking minutes from the city. Contemporary art, fishing, sports, and top-rated schools nearby.",
  keywords: [
    "Lisi Lake",
    "Tbilisi lifestyle",
    "nature living",
    "hiking trails",
    "mountain biking",
    "Hippodrome",
    "contemporary art",
    "fishing",
    "sports activities",
    "private schools",
    "Tbilisi recreation",
    "outdoor living",
  ],
  openGraph: {
    title: "The Lake Lifestyle - Life by Lisi Lake in Tbilisi",
    description:
      "Live surrounded by nature with clean air, hiking trails, water ponds, and mountain bike tracks. Art exhibitions, fishing, sports, and quality education - all minutes from Tbilisi.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lake Lifestyle - Life by Lisi Lake",
    description:
      "Experience life by Lisi Lake: nature, sports, art, and quality education minutes from Tbilisi.",
    images: ["/og-image.png"],
  },
  /*   alternates: {
    canonical: "/the-lake-lifestyle",
  }, */
};

const theLakeLifeStyle = () => {
  return (
    <div>
      <Header />
      <TheLake />
      <Footer />
    </div>
  );
};

export default theLakeLifeStyle;
