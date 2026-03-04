"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import { useTranslations } from "next-intl";

const Snohetta = () => {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main>
        <Hero
          video="/lake-house-opt.mp4"
          height="100vh"
          title={t("snohetta.hero.title")}
          highlightWords={[t("snohetta.hero.title")]}
          uppercase={true}
        />

        <ImageTextSection
          image="/aerealtest.webp"
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
          image="/lobby.webp"
          title={t("snohetta.nordicChoice.title")}
          subtitle=""
          description={t("snohetta.nordicChoice.description")}
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

        <ImageTextSection
          image="/terrace.webp"
          title={t("snohetta.facilities.title")}
          subtitle=""
          description={t("snohetta.facilities.description")}
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
          image="/patio.webp"
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
      </main>
      <Footer />
    </>
  );
};

export default Snohetta;
