"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import TextImageSideSection from "@/components/TextImageSideSection";
import TextSection from "@/components/TextSection";
import { useLocale } from "next-intl";

const SECTION_STYLES = {
  textBoxColor: "#F7EAD7",
  titleSize: "25px",
  subtitleSize: "19px",
  descriptionSize: "19px",
  titleWeight: "400",
  subtitleWeight: "700",
  descriptionWeight: "400",
  titleTransform: "uppercase",
  subtitleTransform: "none",
  descriptionTransform: "none",
  titleColor: "#000000",
  subtitleColor: "#000000",
  descriptionColor: "#000000",
};

export default function PageContent({ page }) {
  const locale = useLocale();
  if (!page) return null;

  const { title, heroImageUrl, components } = page;
  const heroImage = heroImageUrl || "/hero-cover-op.webp";

  return (
    <>
      <Header />
      <main>
        <Hero
          image={heroImage}
          height="100vh"
          title={title}
          highlightWords={title ? [title] : []}
          uppercase={true}
        />

        {components?.map((block, index) => {
          if (block.type === "cta") {
            return (
              <TextSection
                key={index}
                title={block.title}
                description={block.description}
                highlightWords={[]}
                uppercase={true}
                bgColor="bg-[#C2B49B]"
                textColor="text-white"
                buttonPosition="middle"
                buttons={
                  block.buttonUrl
                    ? [
                        {
                          text: "Enquire",
                          link: block.buttonUrl.startsWith("http")
                            ? block.buttonUrl
                            : `/${locale}${block.buttonUrl}`,
                          bgColor: "bg-[#E85A4F]",
                          textColor: "text-black",
                        },
                      ]
                    : []
                }
              />
            );
          }

          if (block.type === "text-image" && block.imageUrl) {
            const sectionProps = {
              image: block.imageUrl,
              title: block.title,
              description: block.description,
              imagePosition: block.imagePosition || "right",
              backgroundColor: block.backgroundColor || "#F7EAD7",
              textBoxColor: block.backgroundColor || "#F7EAD7",
              ...SECTION_STYLES,
            };

            if (block.anchorId) {
              return (
                <section key={index} id={block.anchorId}>
                  <ImageTextSection {...sectionProps} />
                </section>
              );
            }
            return <ImageTextSection key={index} {...sectionProps} />;
          }

          if (block.type === "text-image" && !block.imageUrl) {
            const sideProps = {
              id: block.anchorId || `block-${index}`,
              image: "/hero-cover-op.webp",
              title: block.title,
              description: block.description,
              imagePosition: block.imagePosition || "right",
              backgroundColor: block.backgroundColor || "#F7EAD7",
              titleColor: "#000000",
              descriptionColor: "#000000",
            };
            return (
              <TextImageSideSection key={index} {...sideProps} />
            );
          }

          return null;
        })}
      </main>
      <Footer />
    </>
  );
}
