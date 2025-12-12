"use client";

import Image from "next/image";

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
      id={id} // დაემატა id
      className="relative py-16 md:py-24"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div
            className={`w-full flex flex-col justify-center ${
              isImageRight ? "md:order-1" : "md:order-2"
            }`}
            style={{ maxWidth: "500px" }}
          >
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

          <div
            className={`w-full ${isImageRight ? "md:order-2" : "md:order-1"}`}
          >
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
