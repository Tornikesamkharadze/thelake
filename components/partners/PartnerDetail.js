"use client";

import Link from "next/link";
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

  const resolvedBlocks =
    blocks && blocks.length > 0
      ? blocks
      : [excerpt && { type: "text", content: excerpt }].filter(Boolean);

  return (
    <section style={{ backgroundColor }}>
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
              <Link href={`/${locale}/partners`} className="hover:underline">
                {t("partners.title")}
              </Link>
            </p>
            <h1
              className="mt-2 text-sm md:text-base font-normal"
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
