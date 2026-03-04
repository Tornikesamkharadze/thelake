"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TextImageSideSection from "@/components/TextImageSideSection";
import TextSection from "@/components/TextSection";
import { useTranslations } from "next-intl";

const ServicesForYou = () => {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main>
        <Hero
          video="/services-for-you-opt.mp4"
          height="100vh"
          title={t("services.hero.title")}
          highlightWords={[t("services.hero.highlight")]}
          uppercase={true}
        />
        <TextSection
          title={t("services.intro.title")}
          description={t("services.intro.description")}
          highlightWords={["THE LAKE"]}
          uppercase={true}
          bgColor="bg-[#F7EAD7]"
          buttonPosition="bottom"
          textColor="text-black"
        />
        <TextImageSideSection
          id="delivery"
          image="/delivery.webp"
          title={t("services.delivery.title")}
          description={t("services.delivery.description")}
          imagePosition="right"
          backgroundColor="#C2B49B"
          titleColor="#000000"
          descriptionColor="#000000"
        />
        <TextImageSideSection
          id="housekeeping"
          image="/housekeeping.webp"
          title={t("services.housekeeping.title")}
          description={t("services.housekeeping.description")}
          imagePosition="left"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
        <TextImageSideSection
          id="business-lounge"
          image="/business-lounge.webp"
          title={t("services.businessLounge.title")}
          description={t("services.businessLounge.description")}
          imagePosition="right"
          backgroundColor="#C2B49B"
          titleColor="#000000"
          descriptionColor="#000000"
        />
        <TextImageSideSection
          id="kids-zone"
          image="/kids-zone.webp"
          title={t("services.kidsZone.title")}
          description={t("services.kidsZone.description")}
          imagePosition="left"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
        <TextImageSideSection
          id="gardening"
          image="/gardening.webp"
          title={t("services.gardening.title")}
          description={t("services.gardening.description")}
          imagePosition="right"
          backgroundColor="#C2B49B"
          titleColor="#000000"
          descriptionColor="#000000"
        />
        <TextImageSideSection
          id="pet-service"
          image="/pet-service.webp"
          title={t("services.petService.title")}
          description={t("services.petService.description")}
          imagePosition="left"
          backgroundColor="#F7EAD7"
          titleColor="#000000"
          descriptionColor="#000000"
        />
      </main>
      <Footer />
    </>
  );
};

export default ServicesForYou;
