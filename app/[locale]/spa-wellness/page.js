"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import { useTranslations } from "next-intl";

const SpaWellness = () => {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main>
        <Hero
          image="/spa-wellness-bg.webp"
          height="100vh"
          title={t("spaWellness.hero.title")}
          highlightWords={[t("spaWellness.hero.title")]}
          uppercase={true}
        />

        <ImageTextSection
          image="/spa.webp"
          title={t("spaWellness.spa.title")}
          subtitle=""
          description={t("spaWellness.spa.description")}
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
          image="/pool.webp"
          title={t("spaWellness.pool.title")}
          subtitle=""
          description={t("spaWellness.pool.description")}
          imagePosition="right"
          titleColor="#000000"
          subtitleColor="#000000"
          descriptionColor="#000000"
          backgroundColor="#F7EAD7"
          textBoxColor="#C2B49B"
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
          image="/gym.webp"
          title={t("spaWellness.gym.title")}
          subtitle=""
          description={t("spaWellness.gym.description")}
          imagePosition="left"
          titleColor="#000000"
          subtitleColor="#000000"
          descriptionColor="#000000"
          backgroundColor="#F7EAD7"
          textBoxColor="#C2B49B"
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
          image="/yoga.webp"
          title={t("spaWellness.yoga.title")}
          subtitle=""
          description={t("spaWellness.yoga.description")}
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

export default SpaWellness;
