"use client";

import Image from "next/image";

const TextImageSideSection = ({
  image,
  title,
  description, // string or array of strings
  imagePosition = "right", // 'left' or 'right'
  backgroundColor = "#e8dfd0",
  imageAlt = "",
  // ფერები
  titleColor = "#000000",
  descriptionColor = "#000000",
  // ფონტის ზომები - რესპონსიული
  titleSize = { mobile: "20px", tablet: "24px", desktop: "28px" },
  descriptionSize = { mobile: "14px", tablet: "16px", desktop: "18px" },
  // ფონტის სიმძიმე
  titleWeight = "400",
  descriptionWeight = "400",
  // ტექსტის ტრანსფორმაცია
  titleTransform = "uppercase",
  descriptionTransform = "none",
}) => {
  const isImageRight = imagePosition === "right";

  // თუ size string-ია, გადავიყვანოთ object-ად
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

  // CSS clamp() function for fluid typography
  const getResponsiveSize = (sizes) => {
    const mobile = parseFloat(sizes.mobile);
    const desktop = parseFloat(sizes.desktop);
    return `clamp(${sizes.mobile}, ${
      mobile + (desktop - mobile) * 0.5
    }px + 1vw, ${sizes.desktop})`;
  };

  // პარაგრაფების მასივი
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <section className="relative py-16 md:py-24" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${
            isImageRight ? "md:flex-row" : "md:flex-row-reverse"
          } gap-8 md:gap-12 lg:gap-16 items-center justify-center`}
        >
          {/* ტექსტის სექცია */}
          <div
            className="w-full md:w-1/2 flex flex-col justify-center"
            style={{ maxWidth: "500px" }}
          >
            {/* სათაური */}
            <h2
              className="mb-4 md:mb-6 tracking-wide"
              style={{
                color: titleColor,
                fontSize: getResponsiveSize(getTitleSize),
                fontWeight: titleWeight,
                textTransform: titleTransform,
              }}
            >
              {title}
            </h2>

            {/* აღწერა */}
            <div
              className="leading-relaxed space-y-4"
              style={{
                color: descriptionColor,
                fontSize: getResponsiveSize(getDescriptionSize),
                fontWeight: descriptionWeight,
                textTransform: descriptionTransform,
              }}
            >
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* სურათის სექცია */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextImageSideSection;
