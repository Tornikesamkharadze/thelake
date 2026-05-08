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
  /** { backgroundColor?, backgroundImage? } — when set, overrides bgColor for section background */
  sectionBackground,
  titleColor,
  descriptionColor,
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const sectionStyle = {};
  if (sectionBackground?.backgroundColor) {
    sectionStyle.backgroundColor = sectionBackground.backgroundColor;
  }
  if (sectionBackground?.backgroundImage) {
    sectionStyle.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${sectionBackground.backgroundImage})`;
    sectionStyle.backgroundSize = "cover";
    sectionStyle.backgroundPosition = "center";
  }
  const hasCustomSectionBg = Object.keys(sectionStyle).length > 0;

  const renderTitle = () => {
    if (!title) return null;

    const titleStyle = titleColor ? { color: titleColor } : undefined;

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
          style={{ ...titleStyle, whiteSpace: "pre-line" }}
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
        style={{ ...titleStyle, whiteSpace: "pre-line" }}
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

  const descStyle = descriptionColor ? { color: descriptionColor } : undefined;

  return (
    <section
      ref={sectionRef}
      className={`py-16 px-6 ${hasCustomSectionBg ? "" : bgColor} ${hasCustomSectionBg ? "" : textColor}`}
      style={hasCustomSectionBg ? sectionStyle : undefined}
    >
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
            style={descStyle}
          >
            {description}
          </motion.p>
        )}

        {buttonPosition === "bottom" && renderButtons()}
      </div>
    </section>
  );
}
