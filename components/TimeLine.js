"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Timeline = ({
  items = [],
  backgroundColor = "#e8dfd0",
  lineColor = "#ED5C3F",
  dotColor = "#ED5C3F",
  yearColor = "#000000",
  titleColor = "#000000",
  descriptionColor = "#000000",
  yearWeight = "400",
  titleWeight = "700",
  descriptionWeight = "400",
  yearTransform = "none",
  titleTransform = "none",
  descriptionTransform = "none",
  dotSize = "14px",
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.6,
      },
    }),
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: {
        delay: 0.5 + i * 0.2,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16"
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">

        {/* DESKTOP VERSION */}
        <div className="hidden md:block relative">
          {/* ხაზი */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute left-[2%] right-[2%] h-px origin-left"
            style={{ backgroundColor: lineColor, top: "94px" }}
          />

          <div className="relative flex justify-between px-[2%]">
            {items.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative flex flex-col items-center max-w-[250px] w-full"
              >
                {/* წელი — ფიქსირებული სიმაღლე */}
                <div
                  className="h-20 flex items-end pb-3 text-center font-serif italic text-[18px] md:text-[20px] lg:text-[24px]"
                  style={{
                    color: yearColor,
                    fontWeight: yearWeight,
                    textTransform: yearTransform,
                  }}
                >
                  {item.year}
                </div>

                {/* დოტი — ფიქსირებული სიმაღლე */}
                <div className="h-7 flex items-center justify-center">
                  <motion.div
                    custom={i}
                    variants={dotVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <span
                      className="block rounded-full"
                      style={{
                        height: dotSize,
                        width: dotSize,
                        backgroundColor: dotColor,
                        boxShadow: `0 0 0 2px ${dotColor}35`,
                      }}
                    />
                  </motion.div>
                </div>

                {/* ტექსტები */}
                <div className="pt-3 text-center space-y-2 px-2">
                  {item.title && (
                    <h3
                      className="leading-tight text-[13px] md:text-[14px] lg:text-[16px]"
                      style={{
                        color: titleColor,
                        fontWeight: titleWeight,
                        textTransform: titleTransform,
                      }}
                    >
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p
                      className="leading-relaxed text-[12px] md:text-[13px]"
                      style={{
                        color: descriptionColor,
                        fontWeight: descriptionWeight,
                        textTransform: descriptionTransform,
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className="block md:hidden overflow-hidden">
          <div className="relative max-w-full mx-auto px-2">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top"
              style={{ backgroundColor: lineColor }}
            />
            <div className="space-y-8">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative flex items-center justify-center gap-4"
                >
                  {/* მარცხენა - წელი */}
                  <div className="w-[calc(50%-8px)] shrink-0 text-right pr-4">
                    <span
                      className="font-serif italic leading-none inline-block text-[16px] md:text-[20px]"
                      style={{
                        color: yearColor,
                        fontWeight: yearWeight,
                        textTransform: yearTransform,
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* დოტი */}
                  <motion.div
                    custom={i}
                    variants={dotVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <span
                      className="block rounded-full"
                      style={{
                        height: dotSize,
                        width: dotSize,
                        backgroundColor: dotColor,
                        boxShadow: `0 0 0 2px ${dotColor}35`,
                      }}
                    />
                  </motion.div>

                  {/* მარჯვენა - ტექსტები */}
                  <div className="w-[calc(50%-8px)] shrink-0 pl-4 space-y-1">
                    {item.title && (
                      <h3
                        className="leading-snug text-[14px] md:text-[16px]"
                        style={{
                          color: titleColor,
                          fontWeight: titleWeight,
                          textTransform: titleTransform,
                        }}
                      >
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p
                        className="leading-snug text-[13px] md:text-[14px]"
                        style={{
                          color: descriptionColor,
                          fontWeight: descriptionWeight,
                          textTransform: descriptionTransform,
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;