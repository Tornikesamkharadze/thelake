"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";

export default function PropertyTypesSection() {
  const t = useTranslations("plot-types");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || "ka";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  // key-ები შეასწორე შენი dummyData-ს property.type მნიშვნელობების მიხედვით
  const propertyTypes = [
    { key: "Private House", label: t("private-houses") },
    { key: "Land Plot", label: t("land-plots") },
    { key: "Private Villa", label: t("private-villas") },
  ];

  const handleTypeClick = (typeKey) => {
    sessionStorage.setItem("propertyListingType", typeKey);
    router.push(`/${locale}/property-listing`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[60vh] md:h-[70vh] bg-black overflow-hidden"
    >
      {/* Background Image */}
      <motion.img
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src="/lake-background.webp"
        alt="Lake view"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black/20"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
          {propertyTypes.map((type, index) => (
            <motion.button
              key={type.key}
              custom={index}
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTypeClick(type.key)}
              className="bg-[#F7EAD7] text-black py-4 px-8 uppercase tracking-[0.3em] text-sm hover:opacity-90 transition-opacity w-full md:w-auto cursor-pointer shadow-lg"
            >
              {type.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
