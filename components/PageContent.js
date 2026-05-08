"use client";

import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import ImageTextOverlaySection from "@/components/ImageTextOverlaySection";
import TextImageSideSection from "@/components/TextImageSideSection";
import TextSection from "@/components/TextSection";
import { useLocale } from "next-intl";
import { useEffect } from "react";

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

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (!target) return;
    sessionStorage.removeItem("scrollTarget");

    setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;

      const isMobile = window.innerWidth < 1066;
      let headerHeight;
      if (isMobile) {
        const topHeader = document.querySelector("header > div:first-child");
        const mainHeader = document.querySelector("header > div:nth-child(2)");
        headerHeight = (topHeader?.offsetHeight ?? 44) + (mainHeader?.offsetHeight ?? 104);
      } else {
        const header = document.querySelector("header");
        headerHeight = header?.offsetHeight ?? 148;
      }

      const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 300);
  }, []);

  if (!page) return null;

  const { title, heroImageUrl, heroVideoUrl, heroHeight, heroHighlightWords, components } = page;
  const heroImage = heroImageUrl || "/hero-cover-op.webp";
  const hasVideo = Boolean(heroVideoUrl);

  return (
    <main>
      <Hero
        image={heroImage}
        video={hasVideo ? heroVideoUrl : undefined}
        poster={hasVideo ? heroImage : undefined}
        height={heroHeight || "100vh"}
        title={title}
        highlightWords={heroHighlightWords || []}
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
                highlightWords={block.titleHighlightWords || []}
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

          if (block.type === "text-image") {
            const image = block.imageUrl || "/hero-cover-op.webp";
            const baseProps = {
              image,
              title: block.title,
              subtitle: block.subtitle || undefined,
              description: block.description,
              imagePosition: block.imagePosition || "right",
              backgroundColor: block.backgroundColor || "#F7EAD7",
              textBoxColor: block.textBoxColor || block.backgroundColor || "#F7EAD7",
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

            let inner;
            if (block.layout === "imageOverlay") {
              inner = <ImageTextOverlaySection {...baseProps} imageAlt={block.title} />;
            } else if (block.layout === "side") {
              inner = (
                <TextImageSideSection
                  id={block.anchorId || `block-${index}`}
                  image={image}
                  title={block.title}
                  description={block.description}
                  imagePosition={block.imagePosition || "right"}
                  backgroundColor={block.backgroundColor || "#F7EAD7"}
                  titleColor={block.titleColor || SECTION_STYLES.titleColor}
                  descriptionColor={block.descriptionColor || SECTION_STYLES.descriptionColor}
                  titleSize={SECTION_STYLES.titleSize}
                  descriptionSize={SECTION_STYLES.descriptionSize}
                  titleWeight={SECTION_STYLES.titleWeight}
                  descriptionWeight={SECTION_STYLES.descriptionWeight}
                  titleTransform={SECTION_STYLES.titleTransform}
                  descriptionTransform={SECTION_STYLES.descriptionTransform}
                />
              );
            } else {
              inner = <ImageTextSection {...baseProps} />;
            }

            if (block.anchorId && block.layout !== "side") {
              return (
                <section key={index} id={block.anchorId}>
                  {inner}
                </section>
              );
            }
            return <div key={index}>{inner}</div>;
          }

          return null;
      })}
    </main>
  );
}
