"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const ImageTextSection = ({
  image,
  title,
  subtitle,
  description,
  imagePosition = "right",
  backgroundColor = "#e8dfd0",
  textBoxColor = "#d4c4b0",
  imageAlt = "",
  centerSingle = false,
  priority = false,
  titleColor = "#000000",
  subtitleColor = "#000000",
  descriptionColor = "#000000",
  titleSize = { mobile: "18px", tablet: "22px", desktop: "25px" },
  subtitleSize = { mobile: "14px", tablet: "16px", desktop: "19px" },
  descriptionSize = { mobile: "13px", tablet: "16px", desktop: "19px" },
  titleWeight = "400",
  subtitleWeight = "700",
  descriptionWeight = "400",
  titleTransform = "uppercase",
  subtitleTransform = "none",
  descriptionTransform = "none",
}) => {
  const isImageRight = imagePosition === "right";
  const textBoxRef = useRef(null);
  const sectionRef = useRef(null);
  const [minImageHeight, setMinImageHeight] = useState(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const updateHeight = () => {
      if (textBoxRef.current && window.innerWidth >= 1280) {
        const textBoxHeight = textBoxRef.current.offsetHeight;
        setMinImageHeight(Math.max(textBoxHeight * 1.2, 500));
      } else {
        setMinImageHeight(0);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    setTimeout(updateHeight, 100);

    return () => window.removeEventListener("resize", updateHeight);
  }, [title, subtitle, description]);

  const getTitleSize =
    typeof titleSize === "string"
      ? { mobile: titleSize, tablet: titleSize, desktop: titleSize }
      : titleSize;
  const getSubtitleSize =
    typeof subtitleSize === "string"
      ? { mobile: subtitleSize, tablet: subtitleSize, desktop: subtitleSize }
      : subtitleSize;
  const getDescriptionSize =
    typeof descriptionSize === "string"
      ? {
          mobile: descriptionSize,
          tablet: descriptionSize,
          desktop: descriptionSize,
        }
      : descriptionSize;

  const getResponsiveSize = (sizes) => {
    const mobile = parseFloat(sizes.mobile);
    const desktop = parseFloat(sizes.desktop);
    return `clamp(${sizes.mobile}, ${
      mobile + (desktop - mobile) * 0.5
    }px + 1vw, ${sizes.desktop})`;
  };

  // Mobile detection for safer animations
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 xl:py-24 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex ${
            centerSingle
              ? "justify-center"
              : isImageRight
                ? "xl:justify-start justify-center"
                : "xl:justify-end justify-center"
          }`}
        >
          <div className="relative w-full" style={{ maxWidth: "750px" }}>
            <div className="flex flex-col xl:block">
              {/* სურათის კონტეინერი */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: isMobile ? 0 : isImageRight ? 50 : -50,
                }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative w-full overflow-hidden"
              >
                <div
                  className="relative w-full min-h-[350px] xl:min-h-[500px]"
                  style={{
                    minHeight:
                      minImageHeight > 0 ? `${minImageHeight}px` : undefined,
                  }}
                >
                  <Image
                    src={image}
                    alt={imageAlt || title}
                    fill
                    priority={priority}
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1920px"
                  />
                </div>
              </motion.div>

              {/* ტექსტ ბოქსი */}
              <motion.div
                ref={textBoxRef}
                initial={{
                  opacity: 0,
                  x: isMobile ? 0 : isImageRight ? -50 : 50,
                }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`
                  relative 
                  -mt-12 mx-4 
                  xl:absolute
                  xl:mt-0 xl:mx-0
                  ${
                    isImageRight
                      ? "xl:right-0 xl:translate-x-[80%]"
                      : "xl:left-0 xl:-translate-x-[80%]"
                  }
                  xl:top-1/2 xl:-translate-y-1/2
                  w-auto 
                  xl:max-w-[600px]
                  z-10
                `}
              >
                <div
                  className="p-6 xl:p-8 lg:p-12 shadow-lg"
                  style={{ backgroundColor: textBoxColor }}
                >
                  {/* სათაური */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-3 xl:mb-4 lg:mb-6 tracking-wide"
                    style={{
                      color: titleColor,
                      fontSize: getResponsiveSize(getTitleSize),
                      fontWeight: titleWeight,
                      textTransform: titleTransform,
                    }}
                  >
                    {title}
                  </motion.h2>

                  {/* ქვესათაური */}
                  {subtitle && (
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mb-3 xl:mb-4 lg:mb-6"
                      style={{
                        color: subtitleColor,
                        fontSize: getResponsiveSize(getSubtitleSize),
                        fontWeight: subtitleWeight,
                        textTransform: subtitleTransform,
                      }}
                    >
                      {subtitle}
                    </motion.h3>
                  )}

                  {/* აღწერა */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="leading-relaxed"
                    style={{
                      color: descriptionColor,
                      fontSize: getResponsiveSize(getDescriptionSize),
                      fontWeight: descriptionWeight,
                      textTransform: descriptionTransform,
                    }}
                  >
                    {description}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;
