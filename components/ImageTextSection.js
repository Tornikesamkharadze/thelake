"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

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
  // ფერები
  titleColor = "#000000",
  subtitleColor = "#000000",
  descriptionColor = "#000000",
  // ფონტის ზომები - რესპონსიული (mobile / tablet / desktop)
  titleSize = { mobile: "18px", tablet: "22px", desktop: "25px" },
  subtitleSize = { mobile: "14px", tablet: "16px", desktop: "19px" },
  descriptionSize = { mobile: "13px", tablet: "16px", desktop: "19px" },
  // ფონტის სიმძიმე
  titleWeight = "400",
  subtitleWeight = "700",
  descriptionWeight = "400",
  // ტექსტის ტრანსფორმაცია
  titleTransform = "uppercase",
  subtitleTransform = "none",
  descriptionTransform = "none",
}) => {
  const isImageRight = imagePosition === "right";
  const textBoxRef = useRef(null);
  const [minImageHeight, setMinImageHeight] = useState(0);

  // ტექსტ-ბოქსის სიმაღლის გაზომვა
  useEffect(() => {
    const updateHeight = () => {
      if (textBoxRef.current && window.innerWidth >= 768) {
        // დესქტოპზე
        const textBoxHeight = textBoxRef.current.offsetHeight;
        // ფოტო უნდა იყოს ტექსტ-ბოქსზე 20% მეტი მინიმუმ, მაგრამ არანაკლებ 500px
        setMinImageHeight(Math.max(textBoxHeight * 1.2, 500));
      } else {
        setMinImageHeight(0);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    // დაყოვნებით კიდევ ერთხელ, რომ ფონტები ჩაიტვირთოს
    setTimeout(updateHeight, 100);

    return () => window.removeEventListener("resize", updateHeight);
  }, [title, subtitle, description]);

  // თუ titleSize string-ია, გადავიყვანოთ object-ად
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

  // CSS clamp() function for fluid typography
  const getResponsiveSize = (sizes) => {
    const mobile = parseFloat(sizes.mobile);
    const desktop = parseFloat(sizes.desktop);
    return `clamp(${sizes.mobile}, ${
      mobile + (desktop - mobile) * 0.5
    }px + 1vw, ${sizes.desktop})`;
  };

  return (
    <section className="relative py-16 md:py-24" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <div
          className={`flex ${
            centerSingle
              ? "md:justify-center"
              : isImageRight
              ? "md:justify-start"
              : "md:justify-end"
          }`}
        >
          {/* მთავარი კონტეინერი */}
          <div className="relative w-full" style={{ maxWidth: "750px" }}>
            {/* ტელე flex column, დესქტოპზე relative positioning */}
            <div className="flex flex-col md:block">
              {/* სურათის კონტეინერი */}
              <div className="relative w-full overflow-hidden">
                {/* ტელეზე 350px, დესქტოპზე 500px ან დინამიური */}
                <div
                  className="relative w-full min-h-[350px] md:min-h-[500px]"
                  style={{
                    minHeight:
                      minImageHeight > 0 ? `${minImageHeight}px` : undefined,
                  }}
                >
                  <Image
                    src={image}
                    alt={imageAlt || title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 750px"
                  />
                </div>
              </div>

              {/* ტექსტ ბოქსი */}
              <div
                ref={textBoxRef}
                className={`
                  relative 
                  -mt-12 mx-4 
                  md:absolute
                  md:mt-0 md:mx-0
                  ${
                    isImageRight
                      ? "md:right-0 md:translate-x-[80%]"
                      : "md:left-0 md:-translate-x-[80%]"
                  }
                  md:top-1/2 md:-translate-y-1/2
                  w-auto 
                  md:max-w-[600px]
                  z-10
                `}
              >
                <div
                  className="p-6 md:p-8 lg:p-12 shadow-lg"
                  style={{ backgroundColor: textBoxColor }}
                >
                  {/* სათაური */}
                  <h2
                    className="mb-3 md:mb-4 lg:mb-6 tracking-wide"
                    style={{
                      color: titleColor,
                      fontSize: getResponsiveSize(getTitleSize),
                      fontWeight: titleWeight,
                      textTransform: titleTransform,
                    }}
                  >
                    {title}
                  </h2>

                  {/* ქვესათაური */}
                  {subtitle && (
                    <h3
                      className="mb-3 md:mb-4 lg:mb-6"
                      style={{
                        color: subtitleColor,
                        fontSize: getResponsiveSize(getSubtitleSize),
                        fontWeight: subtitleWeight,
                        textTransform: subtitleTransform,
                      }}
                    >
                      {subtitle}
                    </h3>
                  )}

                  {/* აღწერა */}
                  <p
                    className="leading-relaxed"
                    style={{
                      color: descriptionColor,
                      fontSize: getResponsiveSize(getDescriptionSize),
                      fontWeight: descriptionWeight,
                      textTransform: descriptionTransform,
                    }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;
