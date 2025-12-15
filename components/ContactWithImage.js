"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

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
  // ფერები
  titleColor = "#000000",
  infoColor = "#000000",
  // ფონტის ზომები - რესპონსიული
  titleSize = { mobile: "24px", tablet: "28px", desktop: "32px" },
  infoSize = { mobile: "16px", tablet: "18px", desktop: "20px" },
  // ფონტის სიმძიმე
  titleWeight = "400",
  infoWeight = "400",
  // ტექსტის ტრანსფორმაცია
  titleTransform = "uppercase",
}) => {
  const isImageRight = imagePosition === "right";
  const textBoxRef = useRef(null);
  const [minImageHeight, setMinImageHeight] = useState(0);

  // ტექსტ-ბოქსის სიმაღლის გაზომვა
  useEffect(() => {
    const updateHeight = () => {
      if (textBoxRef.current && window.innerWidth >= 768) {
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

  // თუ size string-ია, გადავიყვანოთ object-ად
  const getTitleSize =
    typeof titleSize === "string"
      ? { mobile: titleSize, tablet: titleSize, desktop: titleSize }
      : titleSize;
  const getInfoSize =
    typeof infoSize === "string"
      ? { mobile: infoSize, tablet: infoSize, desktop: infoSize }
      : infoSize;

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
            isImageRight ? "md:justify-start" : "md:justify-end"
          }`}
        >
          {/* მთავარი კონტეინერი */}
          <div className="relative w-full" style={{ maxWidth: "750px" }}>
            {/* ტელე flex column, დესქტოპზე relative positioning */}
            <div className="flex flex-col md:block">
              {/* სურათის კონტეინერი */}
              <div className="relative w-full overflow-hidden">
                <div
                  className="relative w-full min-h-[350px] md:min-h-[500px]"
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
                  md:min-w-[699px]
                  md:max-w-[699px]
                  z-10
                `}
              >
                <div
                  className="p-8 md:p-10 lg:p-14 shadow-lg"
                  style={{ backgroundColor: textBoxColor }}
                >
                  {/* სათაური */}
                  <h2
                    className="mb-10 md:mb-12 lg:mb-16 text-center tracking-[0.3em]"
                    style={{
                      color: titleColor,
                      fontSize: getResponsiveSize(getTitleSize),
                      fontWeight: titleWeight,
                      textTransform: titleTransform,
                    }}
                  >
                    {title}
                  </h2>

                  {/* ინფორმაცია */}
                  <div className="space-y-8 md:space-y-10">
                    {/* ლოკაცია */}
                    {location && (
                      <address className="not-italic border-b border-gray-300 pb-8 md:pb-10">
                        <a
                          href={locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center block hover:opacity-70 transition-opacity"
                          style={{
                            color: infoColor,
                            fontSize: getResponsiveSize(getInfoSize),
                            fontWeight: infoWeight,
                          }}
                        >
                          {location}
                        </a>
                      </address>
                    )}

                    {/* ტელეფონი */}
                    {phone && (
                      <div className="text-center border-b border-gray-300 pb-8 md:pb-10">
                        <a
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="hover:opacity-70 transition-opacity"
                          style={{
                            color: infoColor,
                            fontSize: getResponsiveSize(getInfoSize),
                            fontWeight: infoWeight,
                          }}
                        >
                          {phone}
                        </a>
                      </div>
                    )}

                    {/* ელ-ფოსტა */}
                    {email && (
                      <div className="text-center">
                        <a
                          href={`mailto:${email}`}
                          className="hover:opacity-70 transition-opacity"
                          style={{
                            color: infoColor,
                            fontSize: getResponsiveSize(getInfoSize),
                            fontWeight: infoWeight,
                          }}
                        >
                          {email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactWithImage;
