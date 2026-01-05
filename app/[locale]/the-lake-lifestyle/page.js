"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TextImageSideSection from "@/components/TextImageSideSection";
import TextSection from "@/components/TextSection";
import React, { useEffect } from "react";
import { scroller, Element } from "react-scroll";

const theLakeLifeStyle = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const isMobile = window.innerWidth < 1536;
        let headerHeight;

        if (isMobile) {
          const topHeader = document.querySelector("header > div:first-child");
          const mainHeader = document.querySelector(
            "header > div:nth-child(2)"
          );
          const topHeight = topHeader ? topHeader.offsetHeight : 44;
          const mainHeight = mainHeader ? mainHeader.offsetHeight : 104; // აქ იყო შეცდომა
          headerHeight = topHeight + mainHeight;
        } else {
          const header = document.querySelector("header");
          headerHeight = header ? header.offsetHeight : 148;
        }

        console.log("📱 Initial scroll - header height:", headerHeight);

        scroller.scrollTo(id, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -headerHeight - 20,
        });
      }, 300);
    }
  }, []);

  return (
    <div>
      <Header />

      <Hero
        image="/lifestyle-hero-bg.webp"
        height="80vh"
        title="LIFESTYLE"
        highlightWords={["LIFESTYLE"]}
        uppercase={true}
      />

      <TextSection
        title="wellbeing at our core"
        description="A quiet, exclusive community with spacious villas (500–800 sq.m) and private houses (200–400 sq.m), created for people who appreciate comfort, beauty, and peace of mind."
        highlightWords={[""]}
        uppercase={true}
        bgColor="bg-[#C2B49B]"
        buttonPosition="middle"
        textColor="text-white"
        buttons={[
          {
            text: "ENQUIRE",
            link: "/contact",
            bgColor: "bg-[#E85A4F]",
            textColor: "text-black",
          },
        ]}
      />

      <Element name="life-in-nature">
        <TextImageSideSection
          id="life-in-nature"
          image="/lake-1.png"
          title="LIFE IN NATURE"
          description="Located in Tbilisi's main recreation area, embraced by mountain terrain and overlooking Lisi Lake. Here, every day begins with clean air, open views, and the quiet rhythm of nature, yet the city's energy is only minutes away."
          imagePosition="right"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
      </Element>

      <Element name="surroundings">
        <TextImageSideSection
          id="surroundings"
          image="/surroundings.webp"
          title="surroundings"
          description="Water ponds, scenic hiking trails, and mountain bike tracks weave through the landscape. all just minutes from the nearby Hippodrome, where you can rent horses and enjoy riding."
          imagePosition="left"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
      </Element>

      <Element name="art-events">
        <TextImageSideSection
          id="art-events"
          image="/art-events.webp"
          title="art events"
          description="A multifunctional space for contemporary art exhibitions and cultural events, hosting curated shows by leading Georgian and international artists."
          imagePosition="right"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
      </Element>

      <Element name="fishing">
        <TextImageSideSection
          id="fishing"
          image="/fishing.webp"
          title="fishing"
          description="Fishing equipment is available for residents who wish to enjoy quiet moments by the lake and discover unique local species."
          imagePosition="left"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
      </Element>

      <Element name="sport-activities">
        <TextImageSideSection
          id="sport-activities"
          image="/Sport-activities.webp"
          title="Sport activities"
          description="Here, nature becomes your playground. Ride a mountain bike through the hills, explore off-road trails, play padel, or follow the velo path around the lake."
          imagePosition="right"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
      </Element>

      <Element name="education">
        <TextImageSideSection
          id="education"
          image="/education.webp"
          title="education"
          description="Highly rated private schools and kindergartens are located within minutes, offering convenience for families."
          imagePosition="left"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
      </Element>

      <Footer />
    </div>
  );
};

export default theLakeLifeStyle;
