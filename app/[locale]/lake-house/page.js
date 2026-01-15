"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import { useTranslations } from "next-intl";

const Snohetta = () => {
  const t = useTranslations();

  return (
    <div>
      <Header />
      <Hero
        image="/hero-cover.webp"
        height="100vh"
        title={t("snohetta.hero.title")}
        highlightWords={[t("snohetta.hero.title")]}
        uppercase={true}
      />

      <ImageTextSection
        image="/lake-1.png"
        title={t("snohetta.lakeHouse.title")}
        subtitle=""
        description={t("snohetta.lakeHouse.description")}
        imagePosition="left"
        titleColor="#000000"
        subtitleColor="#000000"
        descriptionColor="#000000"
        backgroundColor="#F7EAD7"
        textBoxColor="#F7EAD7"
        titleSize="25px"
        subtitleSize="19px"
        descriptionSize="19px"
        titleWeight="400"
        subtitleWeight="700"
        descriptionWeight="400"
        titleTransform="uppercase"
        subtitleTransform="none"
        descriptionTransform="none"
      />
      <ImageTextSection
        image="/lake-1.png"
        title={t("snohetta.studio.title")}
        subtitle=""
        description={t("snohetta.studio.description")}
        imagePosition="right"
        titleColor="#000000"
        subtitleColor="#000000"
        descriptionColor="#000000"
        backgroundColor="#F7EAD7"
        textBoxColor="#F7EAD7"
        titleSize="25px"
        subtitleSize="19px"
        descriptionSize="19px"
        titleWeight="400"
        subtitleWeight="700"
        descriptionWeight="400"
        titleTransform="uppercase"
        subtitleTransform="none"
        descriptionTransform="none"
      />

      <Footer />
    </div>
  );
};

export default Snohetta;