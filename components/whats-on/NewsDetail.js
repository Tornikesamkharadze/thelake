"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";

// ─── YouTube Embed Block ───────────────────────────────────────────────────────
const YouTubeBlock = ({ url, caption }) => {
  const [playing, setPlaying] = useState(false);

  const getVideoId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const videoId = getVideoId(url);
  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className="w-full mb-8 md:mb-12">
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        {!playing ? (
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setPlaying(true)}
          >
            <Image
              src={thumbnailUrl}
              alt={caption || "Video thumbnail"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={caption || "YouTube video"}
          />
        )}
      </div>
      {caption && (
        <p className="text-xs text-gray-500 mt-2 italic">{caption}</p>
      )}
    </div>
  );
};

// ─── Image Block ──────────────────────────────────────────────────────────────
const ImageBlock = ({ src, alt, caption, size = "full" }) => {
  const sizeClasses = {
    full: "w-full",
    natural: "w-full max-w-[768px]",
    custom: "w-full max-w-[768px]",
    large: "w-full max-w-[900px]",
    medium: "w-full max-w-[600px]",
    small: "w-full max-w-[400px]",
  };

  // natural ზომისთვის fill გამოვრთოთ და სურათი თავისი height-ით გამოჩნდეს
  if (size === "natural") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className={`${sizeClasses.natural} mb-8 md:mb-12`}
      >
        <Image
          src={src}
          alt={alt || ""}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-top"
        />
        {caption && (
          <p className="text-xs text-gray-500 mt-2 italic">{caption}</p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className={`${sizeClasses[size] || sizeClasses.full} mb-8 md:mb-12`}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>
      {caption && (
        <p className="text-xs text-gray-500 mt-2 italic">{caption}</p>
      )}
    </motion.div>
  );
};

// ─── Text Block ───────────────────────────────────────────────────────────────
const TextBlock = ({ content, contentColor, contentSize }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="mb-8 md:mb-12"
    >
      <p
        className="leading-relaxed whitespace-pre-line"
        style={{
          color: contentColor,
          fontSize: getResponsiveSize(contentSize),
        }}
      >
        {content}
      </p>
    </motion.div>
  );
};

// ─── Heading Block ────────────────────────────────────────────────────────────
/**
 * level:  "h2" | "h3" | "h4"                      (default: "h2")
 * style:  "default" | "underline" | "highlight"    (default: "default")
 * color:  ნებისმიერი hex ფერი                       (default: contentColor)
 *
 * "default"   → ჩვეულებრივი სათაური
 * "underline" → ქვეხაზიანი სათაური
 * "highlight" → მარცხნივ ვერტიკალური ხაზით გამოყოფილი
 */
const HeadingBlock = ({
  content,
  level = "h2",
  style = "default",
  color = "#000000",
}) => {
  const Tag = level;

  const sizeMap = {
    h2: "text-xl md:text-2xl lg:text-3xl",
    h3: "text-lg md:text-xl lg:text-2xl",
    h4: "text-base md:text-lg lg:text-xl",
  };

  const baseClass = `${sizeMap[level] || sizeMap.h2} font-normal uppercase tracking-wide`;

  const wrapperMap = {
    default: "mb-4 mt-10",
    underline: "mb-6 mt-10 pb-3 border-b",
    highlight: "mb-6 mt-10 pl-4 border-l-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={wrapperMap[style] || wrapperMap.default}
      style={
        style === "underline" || style === "highlight"
          ? { borderColor: color }
          : {}
      }
    >
      <Tag className={baseClass} style={{ color }}>
        {content}
      </Tag>
    </motion.div>
  );
};

// ─── Divider Block ────────────────────────────────────────────────────────────
/**
 * style: "line" | "dots" | "space"
 *
 * "line"  → ჰორიზონტალური ხაზი
 * "dots"  → სამი წერტილი
 * "space" → ცარიელი სივრცე (მხოლოდ დაშორება)
 */
const DividerBlock = ({ color = "#d4745a", style = "line" }) => {
  if (style === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 my-10">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  }
  if (style === "space") {
    return <div className="my-10" />;
  }
  return <hr className="my-10 border-t" style={{ borderColor: color }} />;
};

// ─── Main NewsDetail Component ────────────────────────────────────────────────
/**
 * BLOCKS — ყველა ბლოკის ტიპი:
 *
 * { type: "text",    content: "..." }
 * { type: "heading", content: "სათაური", level: "h2"|"h3"|"h4", style: "default"|"underline"|"highlight", color: "#000" }
 * { type: "divider", style: "line"|"dots"|"space", color: "#d4745a" }
 * { type: "image",   src: "/img.jpg", size: "full"|"large"|"medium"|"small", caption: "..." }
 * { type: "youtube", url: "https://youtu.be/xxx", caption: "..." }
 */
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

  const resolvedBlocks =
    blocks ||
    [
      excerpt && { type: "text", content: excerpt },
      additionalImage && { type: "image", src: additionalImage, alt: title },
      contentBottom && { type: "text", content: contentBottom },
    ].filter(Boolean);

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "text":
        return (
          <TextBlock
            key={index}
            content={block.content}
            contentColor={contentColor}
            contentSize={contentSize}
          />
        );
      case "heading":
        return (
          <HeadingBlock
            key={index}
            content={block.content}
            level={block.level}
            style={block.style}
            color={block.color || contentColor}
          />
        );
      case "divider":
        return (
          <DividerBlock
            key={index}
            style={block.style}
            color={block.color || "#d4745a"}
          />
        );
      case "image":
        return (
          <ImageBlock
            key={index}
            src={block.src}
            alt={block.alt || title}
            caption={block.caption}
            size={block.size}
          />
        );
      case "youtube":
        return (
          <YouTubeBlock key={index} url={block.url} caption={block.caption} />
        );
      default:
        return null;
    }
  };

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

          {resolvedBlocks.map((block, index) => renderBlock(block, index))}

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
