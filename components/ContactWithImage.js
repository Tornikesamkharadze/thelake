"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const ContactWithImage = ({
  image,
  title = "CONTACT",
  location = "Lisi Lake, Tbilisi, Georgia",
  phone = "+995 511 55 33 33",
  email = "info@placemakers.ge",
  locationUrl = "https://maps.app.goo.gl/LQaNV2GhVjdXhmJ88",
  imagePosition = "right",
  backgroundColor = "#C2B49B",
  textBoxColor = "#F7EAD7",
  imageAlt = "Contact Image",
  titleColor = "#000000",
  infoColor = "#000000",
  titleSize = { mobile: "24px", tablet: "28px", desktop: "32px" },
  infoSize = { mobile: "16px", tablet: "18px", desktop: "20px" },
  titleWeight = "400",
  infoWeight = "400",
  titleTransform = "uppercase",
}) => {
  const isImageRight = imagePosition === "right";
  const textBoxRef = useRef(null);
  const sectionRef = useRef(null);
  const [minImageHeight, setMinImageHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1400);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (textBoxRef.current && window.innerWidth >= 1400) {
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
  }, [title, location, phone, email]);

  const getTitleSize =
    typeof titleSize === "string"
      ? { mobile: titleSize, tablet: titleSize, desktop: titleSize }
      : titleSize;
  const getInfoSize =
    typeof infoSize === "string"
      ? { mobile: infoSize, tablet: infoSize, desktop: infoSize }
      : infoSize;

  const getResponsiveSize = (sizes) => {
    const mobile = parseFloat(sizes.mobile);
    const desktop = parseFloat(sizes.desktop);
    return `clamp(${sizes.mobile}, ${
      mobile + (desktop - mobile) * 0.5
    }px + 1vw, ${sizes.desktop})`;
  };

  const contactItems = [
    { content: location, href: locationUrl, external: true },
    {
      content: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      external: false,
    },
    { content: email, href: `mailto:${email}`, external: false },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 min-[1400px]:py-24 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex ${
            isImageRight
              ? "min-[1400px]:justify-start justify-center"
              : "min-[1400px]:justify-end justify-center"
          }`}
        >
          <div className="relative w-full" style={{ maxWidth: "750px" }}>
            <div className="flex flex-col min-[1400px]:block">
              {/* სურათის კონტეინერი */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="relative w-full overflow-hidden"
              >
                <div
                  className="relative w-full min-h-[350px] min-[1400px]:min-h-[500px]"
                  style={{
                    minHeight:
                      minImageHeight > 0 ? `${minImageHeight}px` : undefined,
                  }}
                >
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1400px) 100vw, 750px"
                  />
                </div>
              </motion.div>

              {/* ტექსტ ბოქსი */}
              <motion.div
                ref={textBoxRef}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`
                  relative 
                  -mt-12 mx-4 
                  min-[1400px]:absolute
                  min-[1400px]:mt-0 min-[1400px]:mx-0
                  ${
                    isImageRight
                      ? "min-[1400px]:right-0 min-[1400px]:translate-x-[60%]"
                      : "min-[1400px]:left-0 min-[1400px]:-translate-x-[60%]"
                  }
                  min-[1400px]:top-1/2 min-[1400px]:-translate-y-1/2
                  w-auto 
                  min-[1400px]:min-w-[699px]
                  min-[1400px]:max-w-[699px]
                  z-10
                `}
              >
                <div
                  className="p-8 min-[1400px]:p-10 lg:p-14 shadow-lg"
                  style={{ backgroundColor: textBoxColor }}
                >
                  {/* სათაური */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-10 min-[1400px]:mb-12 lg:mb-16 text-center tracking-[0.3em]"
                    style={{
                      color: titleColor,
                      fontSize: getResponsiveSize(getTitleSize),
                      fontWeight: titleWeight,
                      textTransform: titleTransform,
                    }}
                  >
                    {title}
                  </motion.h2>

                  {/* ინფორმაცია */}
                  <div className="space-y-8 min-[1400px]:space-y-10">
                    {contactItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className={
                          index < contactItems.length - 1
                            ? "border-b border-gray-300 pb-8 min-[1400px]:pb-10"
                            : ""
                        }
                      >
                        {index === 0 ? (
                          <address className="not-italic">
                            <motion.a
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={
                                item.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              whileHover={{ scale: 1.02 }}
                              className="text-center block hover:opacity-70 transition-opacity"
                              style={{
                                color: infoColor,
                                fontSize: getResponsiveSize(getInfoSize),
                                fontWeight: infoWeight,
                              }}
                            >
                              {item.content}
                            </motion.a>
                          </address>
                        ) : (
                          <div className="text-center">
                            <motion.a
                              href={item.href}
                              whileHover={{ scale: 1.02 }}
                              className="hover:opacity-70 transition-opacity"
                              style={{
                                color: infoColor,
                                fontSize: getResponsiveSize(getInfoSize),
                                fontWeight: infoWeight,
                              }}
                            >
                              {item.content}
                            </motion.a>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactWithImage;