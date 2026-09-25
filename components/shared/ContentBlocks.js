"use client";

import Image from "next/image";
import { isLocalhostImage } from "@/lib/imageUtils";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Rich-content block renderers shared by NewsDetail and PartnerDetail — both
 * render the same block shape produced by `lib/adapters/richContent.js`'s
 * `htmlToBlocks()`. Keeping these in one place means a fix to, say, table
 * styling benefits both sections instead of needing to be applied twice.
 *
 * BLOCKS — all block types:
 * { type: "text",    content: "..." }
 * { type: "heading", content: "სათაური", level: "h2"|"h3"|"h4", style: "default"|"underline"|"highlight", color: "#000" }
 * { type: "divider", style: "line"|"dots"|"space", color: "#d4745a" }
 * { type: "image",   src: "/img.jpg", size: "full"|"large"|"medium"|"small", caption: "..." }
 * { type: "youtube", url: "https://youtu.be/xxx", caption: "..." }
 * { type: "table",   rows: [{ cells: ["Georgian name", "ლისის ტბა"], isHeader: false }, ...] }
 */

// ─── YouTube Embed Block ───────────────────────────────────────────────────────
export const YouTubeBlock = ({ url, caption }) => {
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
export const ImageBlock = ({ src, alt, caption, size = "full" }) => {
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
          unoptimized={isLocalhostImage(src)}
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
          unoptimized={isLocalhostImage(src)}
        />
      </div>
      {caption && (
        <p className="text-xs text-gray-500 mt-2 italic">{caption}</p>
      )}
    </motion.div>
  );
};

// ─── Text Block ───────────────────────────────────────────────────────────────
export const TextBlock = ({ content, isHtml, contentColor, contentSize, linkColor = "#ED5C3F" }) => {
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

  // `content` for isHtml blocks is already sanitized by richContent.js's
  // sanitizeInlineHtml() at parse time (pure string logic, safe on the server
  // too — no jsdom needed for this narrow a whitelist). An excerpt/snippet
  // fallback (isHtml false) is a plain Strapi text field and renders as a
  // plain JSX child below, which React escapes automatically.

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="mb-8 md:mb-12"
    >
      {isHtml ? (
        <p
          className="leading-relaxed [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-[color:var(--link-color)]"
          style={{
            color: contentColor,
            fontSize: getResponsiveSize(contentSize),
            "--link-color": linkColor,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p
          className="leading-relaxed whitespace-pre-line"
          style={{
            color: contentColor,
            fontSize: getResponsiveSize(contentSize),
          }}
        >
          {content}
        </p>
      )}
    </motion.div>
  );
};

// ─── Table Block ──────────────────────────────────────────────────────────────
export const TableBlock = ({ rows, contentColor = "#000000" }) => {
  if (!rows || rows.length === 0) return null;
  const borderColor = `${contentColor}4d`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="my-8 md:my-10 overflow-x-auto flex justify-center"
    >
      <table
        className="border-collapse text-sm md:text-base"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <tbody>
          {rows.map(({ cells, isHeader }, i) => (
            <tr key={i} style={isHeader ? { backgroundColor: `${contentColor}14` } : undefined}>
              {cells.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 px-4 align-top ${isHeader || j === 0 ? "font-bold" : ""}`}
                  style={{ color: contentColor, border: `1px solid ${borderColor}` }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
export const HeadingBlock = ({
  content,
  isHtml,
  level = "h2",
  style = "default",
  color = "#000000",
  linkColor = "#ED5C3F",
}) => {
  const Tag = level;

  const sizeMap = {
    h2: "text-xl md:text-2xl lg:text-3xl",
    h3: "text-lg md:text-xl lg:text-2xl",
    h4: "text-base md:text-lg lg:text-xl",
  };

  const baseClass = `${sizeMap[level] || sizeMap.h2} font-normal uppercase tracking-wide ${
    isHtml ? "[&_a]:underline [&_a]:underline-offset-2 [&_a]:text-[color:var(--link-color)]" : ""
  }`;

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
          ? { borderColor: color, "--link-color": linkColor }
          : { "--link-color": linkColor }
      }
    >
      {isHtml ? (
        <Tag className={baseClass} style={{ color }} dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <Tag className={baseClass} style={{ color }}>
          {content}
        </Tag>
      )}
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
export const DividerBlock = ({ color = "#d4745a", style = "line" }) => {
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

/** Renders a single content block by type. Pass the block's own props plus shared styling. */
export function renderContentBlock(block, index, { titleFallback, contentColor, linkColor } = {}) {
  switch (block.type) {
    case "text":
      return (
        <TextBlock
          key={index}
          content={block.content}
          isHtml={block.isHtml}
          contentColor={contentColor}
          contentSize={{ mobile: "15px", tablet: "16px", desktop: "17px" }}
          linkColor={linkColor}
        />
      );
    case "heading":
      return (
        <HeadingBlock
          key={index}
          content={block.content}
          isHtml={block.isHtml}
          level={block.level}
          style={block.style}
          color={block.color || contentColor}
          linkColor={linkColor}
        />
      );
    case "divider":
      return (
        <DividerBlock key={index} style={block.style} color={block.color || "#d4745a"} />
      );
    case "image":
      return (
        <ImageBlock
          key={index}
          src={block.src}
          alt={block.alt || titleFallback}
          caption={block.caption}
          size={block.size}
        />
      );
    case "youtube":
      return <YouTubeBlock key={index} url={block.url} caption={block.caption} />;
    case "table":
      return <TableBlock key={index} rows={block.rows} contentColor={contentColor} />;
    default:
      return null;
  }
}
