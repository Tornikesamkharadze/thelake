"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MasterplanSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className="w-full flex items-center justify-center overflow-hidden"
    >
      <motion.img
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        src="/akr.webp"
        alt="Masterplan"
        className="w-full aspect-video md:aspect-auto md:h-screen object-fill"
      />
    </section>
  );
}
