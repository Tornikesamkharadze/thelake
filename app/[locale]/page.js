import StayInTouchWithContact from "@/components/StayInTouchWithContact";
import Divider from "@/components/Divider";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";
import MasterplanSection from "@/components/MasterplanSection";
import PartnersSlider from "@/components/Partnersslider";
import PropertyTypesSection from "@/components/PropertyTypesSection";
import TextSection from "@/components/TextSection";
import { getTranslations } from "next-intl/server";
import { getContact, getPageByPath, getPartners, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiPageToFrontend } from "@/lib/adapters/page";

export const dynamic = "force-dynamic";

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  // Homepage content from Strapi (Page with path "/")
  let homePage = null;
  try {
    const res = await getPageByPath("/", { locale });
    const raw = res?.data?.[0] ?? null;
    if (raw) homePage = mapStrapiPageToFrontend(raw, STRAPI_URL);
  } catch {}

  const heroTitle = homePage?.title || t("hero.title");
  const heroHighlightWords = homePage?.heroHighlightWords?.length
    ? homePage.heroHighlightWords
    : t.raw("hero.highlightWords");

  const welcomeBlock = homePage?.components?.find((c) => c.type === "cta") ?? null;
  const whyOwnBlock = homePage?.components?.find((c) => c.type === "text-image") ?? null;

  const enquireUrl = welcomeBlock?.buttonUrl
    ? welcomeBlock.buttonUrl.startsWith("http")
      ? welcomeBlock.buttonUrl
      : `/${locale}${welcomeBlock.buttonUrl.startsWith("/") ? welcomeBlock.buttonUrl : `/${welcomeBlock.buttonUrl}`}`
    : `/${locale}/contact`;

  let contactData = null;
  try {
    const { data } = await getContact({ locale });
    contactData = data ?? null;
  } catch {}

  let partners = [];
  try {
    const { data } = await getPartners();
    const base = (STRAPI_URL || "").replace(/\/$/, "");
    partners = (Array.isArray(data) ? data : [])
      .map((p) => {
        const url = p.image?.url ?? p.image?.data?.attributes?.url;
        if (!url) return null;
        const src = url.startsWith("http") ? url : `${base}${url}`;
        return { src, alt: p.name ?? "Partner", url: p.url || null };
      })
      .filter(Boolean);
  } catch {}

  return (
    <>
      <main>
        <div className="flex flex-col">
          <div className="order-2 md:order-1">
            <Hero
              video="/opt_withoutLogo.mp4"
              poster="/videocover.webp"
              height="100vh"
              title={heroTitle}
              highlightWords={heroHighlightWords}
              uppercase={true}
            />
          </div>

          <div className="order-1 md:order-2">
            <TextSection
              title={welcomeBlock?.title || t("welcome.title")}
              description={welcomeBlock?.description || t("welcome.description")}
              highlightWords={welcomeBlock?.titleHighlightWords?.length ? welcomeBlock.titleHighlightWords : ["THE LAKE"]}
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
                  text: welcomeBlock?.buttonLabel || t("welcome.enquire"),
                  link: enquireUrl,
                  bgColor: "bg-[#E85A4F]",
                  textColor: "text-black",
                },
              ]}
            />
          </div>
        </div>

        <ImageTextSection
          image={whyOwnBlock?.imageUrl || "/lake-1.png"}
          title={whyOwnBlock?.title || t("whyOwn.title")}
          subtitle={whyOwnBlock?.subtitle || t("whyOwn.subtitle")}
          description={whyOwnBlock?.description || t("whyOwn.description")}
          imagePosition={whyOwnBlock?.imagePosition || "left"}
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
          address={contactData?.address}
          phone={contactData?.phone}
          email={contactData?.email}
          website={contactData?.website}
        />
        <PartnersSlider partners={partners} />
      </main>
    </>
  );
}