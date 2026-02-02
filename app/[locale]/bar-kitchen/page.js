"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import { useTranslations } from "next-intl";

const BarKitchen = () => {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main>
        <Hero
          image="/bar-and-kitchen-bg.webp"
          height="100vh"
          title={t("barKitchen.hero.title")}
          highlightWords={[t("barKitchen.hero.title")]}
          uppercase={true}
        />

        <ImageTextSection
          image="/bakery.webp"
          title={t("barKitchen.bakery.title")}
          subtitle=""
          description={t("barKitchen.bakery.description")}
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
          image="/bar.webp"
          title={t("barKitchen.bar.title")}
          subtitle=""
          description={t("barKitchen.bar.description")}
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
          image="/restaurant.webp"
          title={t("barKitchen.restaurant.title")}
          subtitle=""
          description={t("barKitchen.restaurant.description")}
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
      </main>
      <Footer />
    </>
  );
};

export default BarKitchen;
