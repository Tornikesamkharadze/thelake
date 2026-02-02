"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TextImageSideSection from "@/components/TextImageSideSection";
import TextSection from "@/components/TextSection";
import React, { useEffect } from "react";
import { scroller, Element } from "react-scroll";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";

const theLakeLifeStyle = () => {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale || "ka";

  useEffect(() => {
    // ჯერ ვამოწმებთ sessionStorage-ს
    const scrollTarget = sessionStorage.getItem("scrollTarget");

    if (scrollTarget) {
      sessionStorage.removeItem("scrollTarget"); // წავშალოთ გამოყენების შემდეგ

      setTimeout(() => {
        const isMobile = window.innerWidth < 1536;
        let headerHeight;

        if (isMobile) {
          const topHeader = document.querySelector("header > div:first-child");
          const mainHeader = document.querySelector(
            "header > div:nth-child(2)",
          );
          const topHeight = topHeader ? topHeader.offsetHeight : 44;
          const mainHeight = mainHeader ? mainHeader.offsetHeight : 104;
          headerHeight = topHeight + mainHeight;
        } else {
          const header = document.querySelector("header");
          headerHeight = header ? header.offsetHeight : 148;
        }

        scroller.scrollTo(scrollTarget, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -headerHeight - 20,
        });
      }, 300);
    }

    // თუ URL-ში hash არის (ძველი ლინკების support-ისთვის)
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const isMobile = window.innerWidth < 1536;
        let headerHeight;

        if (isMobile) {
          const topHeader = document.querySelector("header > div:first-child");
          const mainHeader = document.querySelector(
            "header > div:nth-child(2)",
          );
          const topHeight = topHeader ? topHeader.offsetHeight : 44;
          const mainHeight = mainHeader ? mainHeader.offsetHeight : 104;
          headerHeight = topHeight + mainHeight;
        } else {
          const header = document.querySelector("header");
          headerHeight = header ? header.offsetHeight : 148;
        }

        scroller.scrollTo(id, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -headerHeight - 20,
        });

        // წავშალოთ hash URL-დან
        window.history.replaceState(null, "", `/${locale}/the-lake-lifestyle`);
      }, 300);
    }
  }, [locale]);

  return (
    <>
      <Header />
      <main>
        <Hero
          image="/lifestyle-hero-bg.webp"
          height="80vh"
          title={t("lifestyle.title")}
          highlightWords={[t("lifestyle.title")]}
          uppercase={true}
        />

        <TextSection
          title={t("lifestyle.wellbeing.title")}
          description={t("lifestyle.wellbeing.description")}
          highlightWords={[""]}
          uppercase={true}
          bgColor="bg-[#C2B49B]"
          buttonPosition="middle"
          textColor="text-white"
          buttons={[
            {
              text: t("welcome.enquire"),
              link: `/${locale}/contact`,
              bgColor: "bg-[#E85A4F]",
              textColor: "text-black",
            },
          ]}
        />

        <Element name="life-in-nature">
          <TextImageSideSection
            id="life-in-nature"
            image="/lake-1.png"
            title={t("lifestyle.lifeInNature.title")}
            description={t("lifestyle.lifeInNature.description")}
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
            title={t("lifestyle.surroundings.title")}
            description={t("lifestyle.surroundings.description")}
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
            title={t("lifestyle.artEvents.title")}
            description={t("lifestyle.artEvents.description")}
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
            title={t("lifestyle.fishing.title")}
            description={t("lifestyle.fishing.description")}
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
            title={t("lifestyle.sportActivities.title")}
            description={t("lifestyle.sportActivities.description")}
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
            title={t("lifestyle.education.title")}
            description={t("lifestyle.education.description")}
            imagePosition="left"
            backgroundColor="#F7EAD7"
            titleColor="#000000"
            descriptionColor="#000000"
          />
        </Element>
      </main>
      <Footer />
    </>
  );
};

export default theLakeLifeStyle;
