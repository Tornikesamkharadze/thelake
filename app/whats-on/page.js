import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatsOn from "@/components/whats-on/WhatsOn";
import React from "react";

export const metadata = {
  title: "What's On - News & Events | The Lake by Placemakers",
  description:
    "Stay updated with the latest news, events, and happenings at The Lake community. From cultural gatherings and seasonal celebrations to exclusive resident events and community announcements at Lisi Lake.",
  keywords: [
    "The Lake news",
    "Lisi Lake events",
    "community events Tbilisi",
    "The Lake by Placemakers news",
    "upcoming events Lisi Lake",
    "lakeside events Georgia",
    "community announcements",
    "cultural events Tbilisi",
    "resident events",
    "The Lake happenings",
    "seasonal celebrations Lisi Lake",
    "exclusive events Georgia",
    "community updates Tbilisi",
    "The Lake activities",
    "lakeside community news",
  ],
  openGraph: {
    title: "What's On - Latest News & Events | The Lake by Placemakers",
    description:
      "Discover upcoming events, community news, and exclusive happenings at The Lake. Stay connected with your lakeside community.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What's On at The Lake - News & Events",
    description:
      "Latest updates, events, and community news from The Lake by Placemakers. Your source for everything happening at Lisi Lake.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/whats-on",
  },
};

const whatsOn = () => {
  return (
    <div>
      <Header />
      <Hero
        image="/hero-cover.webp"
        height="80vh"
        title="What’s on"
        highlightWords={["What’s on"]}
        uppercase={true}
      />
      <WhatsOn />
      <Footer />
    </div>
  );
};

export default whatsOn;
