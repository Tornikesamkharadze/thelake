import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatsOn from "@/components/whats-on/WhatsOn";
import { getAlternateUrls } from "@/lib/metadata";
import React from "react";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "ღონისძიებები - სიახლეები და ღონისძიებები | The Lake by Placemakers"
      : "What's On - News & Events | The Lake by Placemakers",
    description: isKa
      ? "იყავით განახლებული უახლესი სიახლეებითა და მოсобытიებით The Lake-ის თემში. კულტურული შეხვედრებიდან სეზონურ დღესასწაულებამდე, ექსკლუზიური მაცხოვრებელთა ღონისძიებებიდან საზოგადოების განცხადებებამდე ლისის ტბაზე."
      : "Stay updated with the latest news, events, and happenings at The Lake community. From cultural gatherings and seasonal celebrations to exclusive resident events and community announcements at Lisi Lake.",
    openGraph: {
      title: isKa
        ? "რა ხდება - უახლესი სიახლეები და ღონისძიებები | The Lake by Placemakers"
        : "What's On - Latest News & Events | The Lake by Placemakers",
      description: isKa
        ? "აღმოაჩინეთ მომავალი ღონისძიებები, თემის სიახლეები და ექსკლუზიური მოვლენები The Lake-ში. დარჩით კავშირში თქვენს ტბის პირის თემთან."
        : "Discover upcoming events, community news, and exclusive happenings at The Lake. Stay connected with your lakeside community.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
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
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "რა ხდება The Lake-ში - სიახლეები და ღონისძიებები"
        : "What's On at The Lake - News & Events",
      description: isKa
        ? "უახლესი განახლებები, ღონისძიებები და თემის სიახლეები The Lake by Placemakers-იდან. თქვენი წყარო ყველაფრის შესახებ რაც ხდება ლისის ტბაზე."
        : "Latest updates, events, and community news from The Lake by Placemakers. Your source for everything happening at Lisi Lake.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/whats-on"),
  };
}

const WhatsOnPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero
          video="/whatson-opt.mp4"
          height="80vh"
          title="What's on"
          highlightWords={["What's on"]}
          uppercase={true}
        />
        <WhatsOn />
      </main>
      <Footer />
    </>
  );
};

export default WhatsOnPage;
