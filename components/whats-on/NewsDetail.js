"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const NewsDetail = ({
  title,
  date,
  heroImage,
  excerpt,
  additionalImage,
  contentBottom,
  backgroundColor = "#ffffff",
  contentBackgroundColor = "#f5f0e8",
  titleColor = "#000000",
  dateColor = "#999999",
  contentColor = "#000000",
  titleSize = { mobile: "24px", tablet: "32px", desktop: "40px" },
  contentSize = { mobile: "15px", tablet: "16px", desktop: "17px" },
}) => {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale || "ka";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  return (
    <section style={{ backgroundColor }}>
      {heroImage && (
        <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
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
      )}

      <div
        ref={sectionRef}
        className="px-4 py-12 md:py-16"
        style={{ backgroundColor: contentBackgroundColor }}
      >
        <div className="max-w-[1400px] mx-auto">
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
              {" / "}
              {title}
            </p>
            {date && (
              <p
                className="text-xs md:text-sm mt-2"
                style={{ color: dateColor }}
              >
                {date}
              </p>
            )}
          </motion.div>

          {excerpt && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 md:mb-12"
            >
              <p
                className="leading-relaxed"
                style={{
                  color: contentColor,
                  fontSize: getResponsiveSize(contentSize),
                }}
              >
                {excerpt}
              </p>
            </motion.div>
          )}

          {additionalImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-[600px] aspect-4/3 mb-8 md:mb-12 overflow-hidden"
            >
              <Image
                src={additionalImage}
                alt={`${title} additional`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </motion.div>
          )}

          {contentBottom && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p
                className="leading-relaxed"
                style={{
                  color: contentColor,
                  fontSize: getResponsiveSize(contentSize),
                }}
              >
                {contentBottom}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
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
