"use client";

import Image from "next/image";

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

  // CSS clamp() function for fluid typography - smooth responsive sizing
  const getResponsiveSize = (sizes) => {
    const mobile = parseFloat(sizes.mobile);
    const desktop = parseFloat(sizes.desktop);
    // clamp(min, preferred, max) - automatically scales between mobile and desktop
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
          {/* სურათის კონტეინერი - relative position ტექსტისთვის */}
          <div className="relative w-full" style={{ maxWidth: "750px" }}>
            {/* მობილზე 3:4 aspect ratio (უფრო მაღალი), დესქტოპზე 4:3 */}
            <div className="relative aspect-3/4 md:aspect-4/3 w-full overflow-hidden">
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 750px"
              />
            </div>

            {/* ტექსტ ბოქსი - absolute ფოტოს კონტეინერის მიმართ */}
            <div
              className={`absolute ${
                isImageRight
                  ? "left-4 md:left-auto md:right-0 md:translate-x-[80%]"
                  : "right-4 md:right-auto md:left-0 md:-translate-x-[80%]"
              } top-1/2 -translate-y-1/2 w-auto max-w-[calc(100%-2rem)] md:max-w-[600px]`}
            >
              <div
                className="p-4 md:p-8 lg:p-12"
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

                {/* ქვესათაური (თუ არსებობს) */}
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
    </section>
  );
};

export default ImageTextSection;
