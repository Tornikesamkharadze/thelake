"use client";

import Image from "next/image";
import { isLocalhostImage } from "@/lib/imageUtils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const PartnerCard = ({
  slug,
  image,
  title,
  excerpt,
  textBoxColor = "#e8dfd0",
  excerptColor = "#000000",
  linkColor = "#d4745a",
  locale,
  index,
}) => {
  const t = useTranslations();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/${locale}/partners/${slug}`} className="block group">
        <div className="relative flex items-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative w-full aspect-4/3 overflow-hidden ml-[10%]"
          >
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={isLocalhostImage(image)}
              />
            ) : (
              <div className="w-full h-full bg-[#C2B49B]" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] md:w-[45%] p-4 md:p-6 z-10"
            style={{ backgroundColor: textBoxColor }}
          >
            <h3
              className="text-base md:text-lg font-normal mb-2 uppercase tracking-wide line-clamp-4"
              style={{ color: linkColor }}
            >
              {title}
            </h3>

            <p
              className="text-xs md:text-sm leading-relaxed mb-3 line-clamp-3"
              style={{ color: excerptColor }}
            >
              {excerpt.substring(0, 150)}...
            </p>

            <motion.span
              whileHover={{ x: 5 }}
              className="text-xs md:text-sm font-normal inline-block"
              style={{ color: linkColor }}
            >
              {t("partners.readMore")}
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const PartnersGrid = ({
  partners = [],
  backgroundColor = "#ffffff",
  gridGap = "2rem",
}) => {
  const params = useParams();
  const locale = params.locale || "ka";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
          style={{ gap: gridGap }}
        >
          {partners.map((item, index) => (
            <PartnerCard
              key={item.slug || index}
              slug={item.slug}
              image={item.backgroundImage?.src || item.image?.src}
              title={item.name}
              excerpt={item.description}
              locale={locale}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersGrid;
