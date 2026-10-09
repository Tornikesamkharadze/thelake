"use client";

import Image from "next/image";
import Link from "next/link";
import { isLocalhostImage } from "@/lib/imageUtils";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { renderContentBlock } from "@/components/shared/ContentBlocks";

/** Individual partner page — same rich-content rendering as NewsDetail, no date. */
const PartnerDetail = ({
  name,
  excerpt,
  blocks,
  heroImage,
  heroImageAlt,
  heroImageWidth,
  heroImageHeight,
  logo,
  backgroundColor = "#ffffff",
  contentBackgroundColor = "#f5f0e8",
  dateColor = "#999999",
  contentColor = "#000000",
}) => {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale || "ka";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Hero images are uploaded for the partners slider, so most aren't wide
  // banners — a near-square or portrait photo stretched to full width shows
  // only a strip of it. Those are shown whole over a blurred fill of themselves.
  const heroRatio =
    heroImageWidth && heroImageHeight ? heroImageWidth / heroImageHeight : null;
  const isBanner = !heroRatio || heroRatio >= 1.6;

  const heroTitle = logo?.src ? (
    <div className="relative w-56 h-24 md:w-72 md:h-28 max-w-full">
      <Image
        src={logo.src}
        alt={logo.alt || name}
        fill
        className="object-contain"
        unoptimized={isLocalhostImage(logo.src)}
      />
    </div>
  ) : (
    <span
      className="font-serif text-white text-center wrap-break-word max-w-full text-[clamp(1.5rem,10cqw,3.75rem)] leading-tight"
      style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.5)" }}
    >
      {name}
    </span>
  );

  const resolvedBlocks =
    blocks && blocks.length > 0
      ? blocks
      : [excerpt && { type: "text", content: excerpt }].filter(Boolean);

  return (
    <section style={{ backgroundColor }}>
      {heroImage && (
        <div className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
          {!isBanner && (
            <Image
              src={heroImage}
              alt=""
              aria-hidden
              fill
              className="object-cover scale-110 blur-2xl"
              sizes="100vw"
              unoptimized={isLocalhostImage(heroImage)}
            />
          )}
          <Image
            src={heroImage}
            alt={heroImageAlt || name}
            fill
            className={isBanner ? "object-cover object-top" : "object-contain"}
            sizes="100vw"
            priority
            unoptimized={isLocalhostImage(heroImage)}
          />
          <div className="absolute inset-0 bg-black/20" />
          {/* Title box matches the shown photo's own size (object-contain keeps
              it centered at its ratio), so the name never spills past the photo
              onto the blurred fill; font size scales with that box's width. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="@container h-full max-w-full flex items-center justify-center px-6"
              style={isBanner ? { width: "100%" } : { aspectRatio: heroRatio }}
            >
              {heroTitle}
            </div>
          </div>
        </div>
      )}

      <div
        ref={sectionRef}
        className="px-4 py-12 md:py-16"
        style={{ backgroundColor: contentBackgroundColor }}
      >
        <div className="max-w-350 mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center flex-wrap gap-x-2"
          >
            <Link
              href={`/${locale}/partners`}
              className="text-sm md:text-base hover:underline"
              style={{ color: dateColor }}
            >
              {t("partners.title")}
            </Link>
            <span className="text-sm md:text-base" style={{ color: dateColor }}>
              /
            </span>
            <h1
              className="text-sm md:text-base font-normal"
              style={{ color: dateColor }}
            >
              {name}
            </h1>
          </motion.div>

          {resolvedBlocks.map((block, index) =>
            renderContentBlock(block, index, { titleFallback: name, contentColor })
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Link href={`/${locale}/partners`}>
              <motion.button
                whileHover={{ x: -5 }}
                className="text-sm md:text-base px-6 py-3 border border-black hover:bg-[#c2b49b] cursor-pointer hover:text-white hover:border-[#c2b49b] transition-colors duration-300 text-black"
              >
                ← {t("partners.backToPartners")}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnerDetail;
