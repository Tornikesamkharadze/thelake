"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChoosePropertie from "@/components/choose-propertie/ChoosePropertie";
import TextImageSideSection from "@/components/TextImageSideSection";
import TextSection from "@/components/TextSection";
import { useTranslations } from "next-intl";

const ServicesForYou = () => {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main>
        <ChoosePropertie />
      </main>
      <Footer />
    </>
  );
};

export default ServicesForYou;
