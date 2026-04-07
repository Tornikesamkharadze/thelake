"use client";

import StayInTouchWithContact from "@/components/StayInTouchWithContact";
import Divider from "@/components/Divider";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import MasterplanSection from "@/components/MasterplanSection";
import PartnersSlider from "@/components/Partnersslider";
import PropertyTypesSection from "@/components/PropertyTypesSection";
import TextSection from "@/components/TextSection";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";

export default function Home() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale || "ka";

  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col">
          <div className="order-2 md:order-1">
            <Hero
              video="/opt_withoutLogo.mp4"
              poster="/videocover.webp"
              height="100vh"
              title={t("hero.title")}
              highlightWords={t.raw("hero.highlightWords")}
              uppercase={true}
            />
          </div>

          <div className="order-1 md:order-2">
            <TextSection
              title={t("welcome.title")}
              description={t("welcome.description")}
              highlightWords={["THE LAKE"]}
              uppercase={true}
              bgColor="bg-[#F7EAD7]"
              buttonPosition="bottom"
              textColor="text-black"
              buttons={[
                {
                  text: t("welcome.downloadBrochure"),
                  link: "/brochure.pdf",
                  download: "The-Lake-Brochure.pdf",
                  bgColor: "bg-transparent",
                  textColor: "text-black",
                  border: "border border-black",
                },
                {
                  text: t("welcome.enquire"),
                  link: `/${locale}/contact`,
                  bgColor: "bg-[#E85A4F]",
                  textColor: "text-black",
                },
              ]}
            />
          </div>
        </div>

        <ImageTextSection
          image="/lake-1.png"
          title={t("whyOwn.title")}
          subtitle={t("whyOwn.subtitle")}
          description={t("whyOwn.description")}
          imagePosition="left"
          titleColor="#000000"
          subtitleColor="#000000"
          descriptionColor="#000000"
          backgroundColor="#C2B49B"
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

        <Divider
          text={t("divider.masterplan")}
          uppercase={true}
          bgColor="bg-[#F7EAD7]"
          textColor="text-black"
        />

        <MasterplanSection />
        <PropertyTypesSection />
        <StayInTouchWithContact
          showAddressBox={true}
          backgroundColor="#d3b473"
          addressBoxBg="#F7EAD7"
        />
        <PartnersSlider />
      </main>
      <Footer />
    </>
  );
}
