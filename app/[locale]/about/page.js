import Divider from "@/components/Divider";
import ImageTextSection from "@/components/ImageTextSection";
import ImageTextOverlaySection from "@/components/ImageTextOverlaySection";
import TextImageSideSection from "@/components/TextImageSideSection";
import PartnersSlider from "@/components/Partnersslider";
import TeamSwiper from "@/components/TeamSwiper";
import Timeline from "@/components/TimeLine";
import { getTranslations } from "next-intl/server";
import {
  getPageByPath,
  getTeamMembers,
  getTimelineItems,
  getPartners,
  STRAPI_URL,
} from "@/lib/strapi";
import { mapStrapiPageToFrontend } from "@/lib/adapters/page";

export const dynamic = "force-dynamic";

const BLOCK_STYLES = {
  titleSize: "25px",
  subtitleSize: "19px",
  descriptionSize: "19px",
  titleWeight: "400",
  subtitleWeight: "700",
  descriptionWeight: "400",
  titleTransform: "uppercase",
  subtitleTransform: "none",
  descriptionTransform: "none",
};

function renderPageBlock(block, index) {
  if (block.type !== "text-image") return null;

  const image = block.imageUrl || "/lake-1.png";
  const commonProps = {
    image,
    title: block.title,
    subtitle: block.subtitle || undefined,
    description: block.description,
    imagePosition: block.imagePosition || "left",
    backgroundColor: block.backgroundColor || "#F7EAD7",
    textBoxColor: block.textBoxColor || block.backgroundColor || "#F7EAD7",
    titleColor: block.titleColor || "#000000",
    subtitleColor: block.subtitleColor || "#000000",
    descriptionColor: block.descriptionColor || "#000000",
    ...BLOCK_STYLES,
  };

  if (block.layout === "imageOverlay") {
    return <ImageTextOverlaySection key={index} {...commonProps} imageAlt={block.title} />;
  }
  if (block.layout === "side") {
    return (
      <TextImageSideSection
        key={index}
        id={block.anchorId || `block-${index}`}
        image={image}
        title={block.title}
        description={block.description}
        imagePosition={block.imagePosition || "left"}
        backgroundColor={block.backgroundColor || "#F7EAD7"}
        titleColor={block.titleColor || "#000000"}
        descriptionColor={block.descriptionColor || "#000000"}
        titleSize={BLOCK_STYLES.titleSize}
        descriptionSize={BLOCK_STYLES.descriptionSize}
        titleWeight={BLOCK_STYLES.titleWeight}
        descriptionWeight={BLOCK_STYLES.descriptionWeight}
        titleTransform={BLOCK_STYLES.titleTransform}
        descriptionTransform={BLOCK_STYLES.descriptionTransform}
      />
    );
  }
  return <ImageTextSection key={index} {...commonProps} />;
}

function mediaUrl(media, base) {
  if (!media) return null;
  const url = media.url ?? media.data?.attributes?.url;
  return url ? (url.startsWith("http") ? url : `${base}${url}`) : null;
}

function mapStrapiTeamMembers(members, strapiUrl) {
  const base = (strapiUrl || "").replace(/\/$/, "");
  return (Array.isArray(members) ? members : []).map((m) => ({
    image: mediaUrl(m.image, base),
    name: m.name || "",
    position: m.position || "",
    description: m.description || "",
  }));
}

function mapStrapiPartnersToSlider(partners, strapiUrl) {
  const base = (strapiUrl || "").replace(/\/$/, "");
  return (Array.isArray(partners) ? partners : [])
    .map((p) => {
      const src = mediaUrl(p.image, base);
      if (!src) return null;
      return { src, alt: p.name ?? "Partner", url: p.url || null };
    })
    .filter(Boolean);
}

function formatTimelineDate(dateStr, locale = "en") {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const intlLocale = locale === "ka" ? "ka-GE" : "en-US";
  return d.toLocaleDateString(intlLocale, { month: "long", year: "numeric" });
}

export default async function About({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  // Fetch page components from Strapi Page content type
  let pageComponents = [];
  try {
    const res = await getPageByPath("/about", { locale });
    const raw = res?.data?.[0] ?? null;
    const page = raw ? mapStrapiPageToFrontend(raw, STRAPI_URL) : null;
    pageComponents = page?.components ?? [];
  } catch {}

  // Fetch team members, partners, and timeline items
  let teamMembers = [];
  let partners = [];
  let timelineData = t.raw("about.timeline");

  try {
    const { data } = await getTeamMembers({ locale, sort: "order:asc" });
    teamMembers = mapStrapiTeamMembers(Array.isArray(data) ? data : [], STRAPI_URL);
  } catch {}

  try {
    const { data } = await getPartners();
    partners = mapStrapiPartnersToSlider(Array.isArray(data) ? data : [], STRAPI_URL);
  } catch {}

  try {
    const { data } = await getTimelineItems({ locale });
    const items = Array.isArray(data) ? data : [];
    if (items.length > 0) {
      timelineData = items.map((item) => ({
        year: formatTimelineDate(item.date, locale),
        title: item.title || "",
        description: item.description || "",
      }));
    }
  } catch {}

  // Split page components: first → WHO ARE WE, rest → other blocks
  const firstBlock = pageComponents[0] ?? null;
  const restBlocks = pageComponents.slice(1);

  // Fallback rendering when no page component available
  const whoAreWeTitle = t("about.whoAreWe.title");
  const whoAreWeSubtitle = t("about.whoAreWe.subtitle");
  const whoAreWeDescription = t("about.whoAreWe.description");

  const aboutProjectTitle = t("about.aboutProject.title");
  const aboutProjectSubtitle = t("about.aboutProject.subtitle");
  const aboutProjectDescription = t("about.aboutProject.description");

  return (
    <main>
      {/* WHO ARE WE — first page component OR fallback */}
      {firstBlock ? (
        renderPageBlock(firstBlock, 0)
      ) : (
        <ImageTextSection
          image="/lake-1.png"
          priority={true}
          title={whoAreWeTitle}
          subtitle={whoAreWeSubtitle}
          description={whoAreWeDescription}
          imagePosition="left"
          titleColor="#000000"
          subtitleColor="#000000"
          descriptionColor="#000000"
          backgroundColor="#F7EAD7"
          textBoxColor="#F7EAD7"
          {...BLOCK_STYLES}
        />
      )}

      {/* TEAM — always after first section */}
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

      {/* ABOUT THE PROJECT — remaining page components OR fallback */}
      {restBlocks.length > 0 ? (
        restBlocks.map((block, i) => renderPageBlock(block, i + 1))
      ) : (
        <ImageTextSection
          image="/lake-1.png"
          priority={true}
          title={aboutProjectTitle}
          subtitle={aboutProjectSubtitle}
          description={aboutProjectDescription}
          imagePosition="left"
          titleColor="#000000"
          subtitleColor="#000000"
          descriptionColor="#000000"
          backgroundColor="#C2B49B"
          textBoxColor="#F7EAD7"
          {...BLOCK_STYLES}
        />
      )}

      {/* TIMELINE */}
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

      {/* PARTNERS */}
      <PartnersSlider partners={partners} />
    </main>
  );
}
