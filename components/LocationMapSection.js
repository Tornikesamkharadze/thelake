"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export default function LocationMapSection() {
  const t = useTranslations();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const distances = t.raw("findUs.distances");

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.6,
      },
    }),
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-x-hidden">
      {/* Google Maps Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="w-full max-w-[2500px] mx-auto"
      >
        <div className="relative w-full h-[calc(85vh-148px)] min-h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d11906.092585991995!2d44.731145373586095!3d41.752377321808375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDQ1JzA4LjQiTiA0NMKwNDMnNTMuOSJF!5e0!3m2!1sen!2sge!4v1765798200035!5m2!1sen!2sge"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("findUs.mapTitle")}
          />

          {/* Overlay — ყველა მოწყობილობაზე Google Maps-ს ხსნის */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=41.752377,44.731145"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
          />
        </div>
      </motion.div>

      {/* Distance Information */}
      <div className="w-full max-w-[2500px] mx-auto bg-white py-12 md:py-16 lg:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[28px] md:text-[36px] lg:text-[48px] font-bold text-black text-center mb-10 md:mb-16 lg:mb-12 tracking-wide tbc-bold"
          >
            {t("findUs.distanceTitle")}
          </motion.h2>

          {/* Distance List */}
          <div className="flex flex-col gap-6 md:gap-4 max-w-3xl mx-auto">
            {distances.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:gap-x-20 items-start"
              >
                <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left md:text-right whitespace-nowrap tbc-regular">
                  {item.time}
                </span>
                <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left tbc-regular">
                  {item.location}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
