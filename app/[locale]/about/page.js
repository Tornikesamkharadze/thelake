"use client";

import Divider from "@/components/Divider";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import ImageTextSection from "@/components/ImageTextSection";
import PartnersSlider from "@/components/Partnersslider";
import TeamSwiper from "@/components/TeamSwiper";
import Timeline from "@/components/TimeLine";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations();

  const timelineData = t.raw("about.timeline");
  const teamMembers = t.raw("about.team");

  return (
    <>
      <Header />
      <main>
        <ImageTextSection
          image="/lake-1.png"
          priority={true}
          title={t("about.whoAreWe.title")}
          subtitle={t("about.whoAreWe.subtitle")}
          description={t("about.whoAreWe.description")}
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
        <TeamSwiper
          title={t("about.teamTitle")}
          members={teamMembers}
          backgroundColor="#ffffff"
          titleColor="#000000"
          cardBackgroundColor="#F7EAD7"
          nameColor="#312618"
          positionColor="#312618"
          descriptionColor="#312618"
          titleWeight="400"
          nameWeight="400"
          positionWeight="400"
          descriptionWeight="400"
          titleTransform="uppercase"
          nameTransform="none"
          positionTransform="none"
          descriptionTransform="none"
          autoplay={false}
          autoplayDelay={3000}
          loop={true}
        />

        <ImageTextSection
          image="/lake-1.png"
          priority={true}
          title={t("about.aboutProject.title")}
          subtitle={t("about.aboutProject.subtitle")}
          description={t("about.aboutProject.description")}
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
          text={t("about.timelineTitle")}
          uppercase={true}
          bgColor="bg-[#ED5C3F]"
          textColor="text-white"
        />

        <Timeline
          items={timelineData}
          backgroundColor="#e8dfd0"
          lineColor="#ED5C3F"
          dotColor="#ED5C3F"
          yearColor="#000000"
          titleColor="#000000"
          descriptionColor="#000000"
          yearWeight="400"
          titleWeight="700"
          descriptionWeight="400"
          yearTransform="none"
          titleTransform="none"
          descriptionTransform="none"
          dotSize="14px"
        />
        <PartnersSlider />
      </main>
      <Footer />
    </>
  );
};

export default About;
