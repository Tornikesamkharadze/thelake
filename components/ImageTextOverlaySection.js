"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Full-bleed image with title/description overlaid (gradient).
 * Strapi: content-blocks.text-image-block-with-image-overlay
 */
export default function ImageTextOverlaySection({
  image,
  title,
  subtitle,
  description,
  imagePosition = "right",
  titleColor = "#ffffff",
  subtitleColor = "#ffffff",
  descriptionColor = "#f5f5f5",
  imageAlt = "",
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const textAlign = imagePosition === "left" ? "text-left" : "text-right";
  const flexJustify = imagePosition === "left" ? "justify-start" : "justify-end";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[55vh] md:min-h-[65vh] overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt || title || ""}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20"
          aria-hidden
        />
      </div>

      <div
        className={`relative z-10 min-h-[55vh] md:min-h-[65vh] flex items-end md:items-center px-6 py-16 md:py-24 ${flexJustify}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className={`max-w-xl md:max-w-2xl ${textAlign}`}
        >
          {title && (
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-wide mb-4"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <h3
              className="text-lg md:text-xl font-semibold mb-3"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </h3>
          )}
          {description && (
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: descriptionColor }}
            >
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
