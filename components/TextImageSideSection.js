"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const TextImageSideSection = ({
  id,
  image,
  title,
  description,
  imagePosition = "right",
  backgroundColor = "#e8dfd0",
  imageAlt = "",
  titleColor = "#000000",
  descriptionColor = "#000000",
  titleSize = { mobile: "20px", tablet: "24px", desktop: "28px" },
  descriptionSize = { mobile: "14px", tablet: "16px", desktop: "18px" },
  titleWeight = "400",
  descriptionWeight = "400",
  titleTransform = "uppercase",
  descriptionTransform = "none",
}) => {
  const isImageRight = imagePosition === "right";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getTitleSize =
    typeof titleSize === "string"
      ? { mobile: titleSize, tablet: titleSize, desktop: titleSize }
      : titleSize;
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

  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : (isImageRight ? -50 : 50) }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`w-full flex flex-col justify-center ${
              isImageRight ? "md:order-1" : "md:order-2"
            }`}
            style={{ maxWidth: "500px" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 md:mb-6 tracking-wide"
              style={{
                color: titleColor,
                fontSize: getResponsiveSize(getTitleSize),
                fontWeight: titleWeight,
                textTransform: titleTransform,
              }}
            >
              {title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="leading-relaxed space-y-4"
              style={{
                color: descriptionColor,
                fontSize: getResponsiveSize(getDescriptionSize),
                fontWeight: descriptionWeight,
                textTransform: descriptionTransform,
              }}
            >
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : (isImageRight ? 50 : -50) }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-full ${isImageRight ? "md:order-2" : "md:order-1"}`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-4/3 w-full overflow-hidden"
            >
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TextImageSideSection;