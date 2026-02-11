"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TextSection({
  title,
  description,
  buttons = [],
  buttonPosition = "bottom",
  highlightWords = [],
  uppercase = false,
  bgColor = "bg-[#E8DCC8]",
  textColor = "text-black",
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const renderTitle = () => {
    if (!title) return null;

    if (highlightWords.length > 0) {
      let formattedTitle = title;

      highlightWords.forEach((word) => {
        const regex = new RegExp(`(${word})`, "gi");
        formattedTitle = formattedTitle.replace(
          regex,
          '<strong class="font-bold">$1</strong>',
        );
      });

      return (
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`text-4xl font-light mb-6 ${uppercase ? "uppercase" : ""}`}
          dangerouslySetInnerHTML={{ __html: formattedTitle }}
        />
      );
    }

    return (
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={`text-4xl font-light mb-6 ${uppercase ? "uppercase" : ""}`}
      >
        {title}
      </motion.h2>
    );
  };

  const renderButtons = () => {
    if (buttons.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex gap-4 justify-center flex-wrap mb-8"
      >
        {buttons.map((button, index) => (
          <motion.a
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={button.link || "#"}
            {...(button.download ? { download: button.download } : {})}
            className={`
              px-8 py-3 uppercase text-sm font-medium transition-all
              ${button.bgColor || "bg-transparent"}
              ${button.textColor || "text-black"}
              ${button.border || ""}
              hover:opacity-80
            `}
          >
            {button.text}
          </motion.a>
        ))}
      </motion.div>
    );
  };

  return (
    <section ref={sectionRef} className={`${bgColor} ${textColor} py-16 px-6`}>
      <div className="max-w-4xl mx-auto text-center">
        {buttonPosition === "top" && renderButtons()}

        {renderTitle()}

        {buttonPosition === "middle" && renderButtons()}

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}

        {buttonPosition === "bottom" && renderButtons()}
      </div>
    </section>
  );
}
