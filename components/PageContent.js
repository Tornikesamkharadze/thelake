"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import ImageTextOverlaySection from "@/components/ImageTextOverlaySection";
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

const DEFAULT_CTA_BG = "#C2B49B";
const DEFAULT_CTA_TITLE = "#ffffff";
const DEFAULT_CTA_DESC = "#ffffff";

export default function PageContent({ page }) {
  const locale = useLocale();
  if (!page) return null;

  const { title, heroImageUrl, heroVideoUrl, components } = page;
  const heroImage = heroImageUrl || "/hero-cover-op.webp";
  const hasVideo = Boolean(heroVideoUrl);

  return (
    <>
      <Header />
      <main>
        <Hero
          image={heroImage}
          video={hasVideo ? heroVideoUrl : undefined}
          poster={hasVideo ? heroImage : undefined}
          height="100vh"
          title={title}
          highlightWords={[]}
          uppercase={true}
        />

        {components?.map((block, index) => {
          if (block.type === "cta") {
            const url = (block.buttonUrl || "").trim();
            const pos = block.buttonPosition || "middle";
            const showButton = Boolean(url) && pos !== "none";
            const label = (block.buttonLabel || "").trim() || "Enquire";

            let sectionBackground = {};
            const bg = (block.backgroundColor || "").trim();
            if (bg) {
              sectionBackground = { backgroundColor: bg };
            } else if (block.backgroundImageUrl) {
              sectionBackground = { backgroundImage: block.backgroundImageUrl };
            } else {
              sectionBackground = { backgroundColor: DEFAULT_CTA_BG };
            }

            const titleColor = (block.titleColor || "").trim() || DEFAULT_CTA_TITLE;
            const descriptionColor =
              (block.descriptionColor || "").trim() || DEFAULT_CTA_DESC;

            return (
              <TextSection
                key={index}
                title={block.title}
                description={block.description}
                highlightWords={[]}
                uppercase={true}
                sectionBackground={sectionBackground}
                titleColor={titleColor}
                descriptionColor={descriptionColor}
                buttonPosition={pos}
                buttons={
                  showButton
                    ? [
                        {
                          text: label,
                          link: url.startsWith("http")
                            ? url
                            : `/${locale}${url.startsWith("/") ? url : `/${url}`}`,
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
            const baseProps = {
              image: block.imageUrl,
              title: block.title,
              subtitle: block.subtitle || undefined,
              description: block.description,
              imagePosition: block.imagePosition || "right",
              backgroundColor: block.backgroundColor || "#F7EAD7",
              textBoxColor: block.backgroundColor || "#F7EAD7",
              titleColor: block.titleColor || SECTION_STYLES.titleColor,
              subtitleColor: block.subtitleColor || SECTION_STYLES.subtitleColor,
              descriptionColor:
                block.descriptionColor || SECTION_STYLES.descriptionColor,
              titleSize: SECTION_STYLES.titleSize,
              subtitleSize: SECTION_STYLES.subtitleSize,
              descriptionSize: SECTION_STYLES.descriptionSize,
              titleWeight: SECTION_STYLES.titleWeight,
              subtitleWeight: SECTION_STYLES.subtitleWeight,
              descriptionWeight: SECTION_STYLES.descriptionWeight,
              titleTransform: SECTION_STYLES.titleTransform,
              subtitleTransform: SECTION_STYLES.subtitleTransform,
              descriptionTransform: SECTION_STYLES.descriptionTransform,
            };

            if (block.layout === "imageOverlay") {
              const overlay = (
                <ImageTextOverlaySection
                  {...baseProps}
                  imageAlt={block.title}
                />
              );
              if (block.anchorId) {
                return (
                  <section key={index} id={block.anchorId}>
                    {overlay}
                  </section>
                );
              }
              return <div key={index}>{overlay}</div>;
            }

            if (block.anchorId) {
              return (
                <section key={index} id={block.anchorId}>
                  <ImageTextSection {...baseProps} />
                </section>
              );
            }
            return <ImageTextSection key={index} {...baseProps} />;
          }

          if (block.type === "text-image" && !block.imageUrl) {
            const sideProps = {
              id: block.anchorId || `block-${index}`,
              image: "/hero-cover-op.webp",
              title: block.title,
              description: block.description,
              imagePosition: block.imagePosition || "right",
              backgroundColor: block.backgroundColor || "#F7EAD7",
              titleColor: block.titleColor || "#000000",
              descriptionColor: block.descriptionColor || "#000000",
            };
            return <TextImageSideSection key={index} {...sideProps} />;
          }

          return null;
        })}
      </main>
      <Footer />
    </>
  );
}
