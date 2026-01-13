"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Divider({
  text = "",
  bgColor = "bg-[#E8DCC8]",
  textColor = "text-black",
  uppercase = true,
}) {
  const dividerRef = useRef(null);
  const isInView = useInView(dividerRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={dividerRef}
      className={`${bgColor} w-full h-20 flex items-center justify-center px-6 overflow-hidden`}
    >
      <div className="border-t py-3 text-center w-full relative">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 border-t origin-center"
        />
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-base text-[22px] md:text-[25px] tracking-[0.4em] ${textColor} ${
            uppercase ? "uppercase" : ""
          } relative z-10`}
        >
          {text}
        </motion.h3>
      </div>
    </div>
  );
}