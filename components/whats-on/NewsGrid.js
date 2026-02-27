"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const getYouTubeId = (url) => {
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

const getYouTubeThumbnail = (blocks = []) => {
  const youtubeBlock = blocks.find((b) => b.type === "youtube");
  if (!youtubeBlock) return null;
  const videoId = getYouTubeId(youtubeBlock.url);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
};

const NewsCard = ({
  slug,
  image,
  blocks = [],
  title,
  date,
  excerpt,
  textBoxColor = "#e8dfd0",
  titleColor = "#000000",
  dateColor = "#999999",
  excerptColor = "#000000",
  linkColor = "#d4745a",
  locale,
  index,
}) => {
  const t = useTranslations();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayImage = image || getYouTubeThumbnail(blocks);

  if (!displayImage) return null;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/${locale}/whats-on/${slug}`} className="block group">
        <div className="relative flex items-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative w-full aspect-4/3 overflow-hidden ml-[10%]"
          >
            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] md:w-[45%] p-4 md:p-6 z-10"
            style={{ backgroundColor: textBoxColor }}
          >
            <h3
              className="text-base md:text-lg font-normal mb-2 uppercase tracking-wide line-clamp-4"
              style={{ color: titleColor }}
            >
              {title}
            </h3>

            <p className="text-xs mb-2" style={{ color: dateColor }}>
              {date}
            </p>

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
              {t("whatsOn.readMore")} →
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const NewsGrid = ({
  newsItems = [],
  backgroundColor = "#ffffff",
  gridGap = "2rem",
}) => {
  const params = useParams();
  const locale = params.locale || "ka";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const sortedNewsItems = [...newsItems].sort((a, b) => {
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.trim().split(".").map(Number);
      return new Date(year, month - 1, day);
    };
    return parseDate(b.date) - parseDate(a.date);
  });

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
          {sortedNewsItems.map((item, index) => (
            <NewsCard
              key={item.slug || index}
              slug={item.slug}
              image={item.image}
              blocks={item.blocks}
              title={item.title}
              date={item.date}
              excerpt={item.excerpt}
              textBoxColor={item.textBoxColor}
              titleColor={item.titleColor}
              dateColor={item.dateColor}
              excerptColor={item.excerptColor}
              linkColor={item.linkColor}
              locale={locale}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsGrid;