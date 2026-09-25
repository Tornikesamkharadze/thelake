"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { renderContentBlock } from "@/components/shared/ContentBlocks";

// ─── Main NewsDetail Component ────────────────────────────────────────────────
const NewsDetail = ({
  title,
  date,
  heroImage,
  excerpt,
  additionalImage,
  contentBottom,
  blocks,
  backgroundColor = "#ffffff",
  contentBackgroundColor = "#f5f0e8",
  titleColor = "#000000",
  dateColor = "#999999",
  contentColor = "#000000",
  titleSize = { mobile: "24px", tablet: "32px", desktop: "40px" },
}) => {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale || "ka";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Used only by the commented-out hero block below; kept so re-enabling it needs no rewiring.
  const getResponsiveSize = (sizes) => {
    const sizeObj =
      typeof sizes === "string"
        ? { mobile: sizes, tablet: sizes, desktop: sizes }
        : sizes;
    const mobile = parseFloat(sizeObj.mobile);
    const desktop = parseFloat(sizeObj.desktop);
    return `clamp(${sizeObj.mobile}, ${
      mobile + (desktop - mobile) * 0.5
    }px + 1vw, ${sizeObj.desktop})`;
  };

  const resolvedBlocks =
    (blocks && blocks.length > 0)
      ? blocks
      : [excerpt && { type: "text", content: excerpt }].filter(Boolean);

  return (
    <section style={{ backgroundColor }}>
      {/*  {heroImage && (
        <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              unoptimized={isLocalhostImage(heroImage)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white font-normal uppercase tracking-wide text-center px-4"
              style={{
                fontSize: getResponsiveSize(titleSize),
                textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
              }}
            >
              {title}
            </motion.h1>
          </motion.div>
        </div>
      )} */}

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
            className="mb-8"
          >
            <p className="text-sm md:text-base" style={{ color: dateColor }}>
              <Link href={`/${locale}/whats-on`} className="hover:underline">
                {t("whatsOn.news")}
              </Link>
            </p>
            <h1
              className="mt-2 text-sm md:text-base font-normal"
              style={{ color: dateColor }}
            >
              {title}
            </h1>
            {date && (
              <p
                className="text-xs md:text-sm mt-2"
                style={{ color: dateColor }}
              >
                {date}
              </p>
            )}
          </motion.div>

          {resolvedBlocks.map((block, index) =>
            renderContentBlock(block, index, { titleFallback: title, contentColor })
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Link href={`/${locale}/whats-on`}>
              <motion.button
                whileHover={{ x: -5 }}
                className="text-sm md:text-base px-6 py-3 border border-black hover:bg-[#c2b49b] cursor-pointer hover:text-white hover:border-[#c2b49b] transition-colors duration-300 text-black"
              >
                ← {t("whatsOn.backToNews")}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
