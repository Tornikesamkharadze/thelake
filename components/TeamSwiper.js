"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const TeamSwiper = ({
  // ტექსტები
  title = "TEAM",
  members = [],
  // ფერები
  backgroundColor = "#ffffff",
  titleColor = "#000000",
  cardBackgroundColor = "#F7EAD7",
  nameColor = "#312618",
  positionColor = "#312618",
  descriptionColor = "#312618",
  // ფონტის სიმძიმე
  titleWeight = "400",
  nameWeight = "400",
  positionWeight = "400",
  descriptionWeight = "400",
  // ტექსტის ტრანსფორმაცია
  titleTransform = "uppercase",
  nameTransform = "none",
  positionTransform = "none",
  descriptionTransform = "none",
  // Swiper settings
  autoplay = true,
  autoplayDelay = 3000,
  loop = true,
}) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section
      className="relative w-full py-8 md:py-5"
      style={{ backgroundColor }}
    >
      {/* სათაური */}
      {title && (
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 mb-4 md:mb-4">
          <h2
            className="text-center tracking-wide text-[28px] md:text-[36px] lg:text-[42px]"
            style={{
              color: titleColor,
              fontWeight: titleWeight,
              textTransform: titleTransform,
            }}
          >
            {title}
          </h2>
        </div>
      )}

      {/* Swiper - სრული სიგანე */}
      <div className="w-full relative">
        {/* Max width wrapper for large screens */}
        <div className="mx-auto" style={{ maxWidth: "2560px" }}>
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView="auto"
            centeredSlides={false}
            loop={loop}
            autoplay={
              autoplay
                ? {
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                  }
                : false
            }
            breakpoints={{
              640: {
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 24,
              },
              1024: {
                spaceBetween: 30,
              },
            }}
            className="team-swiper"
          >
            {members.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="group cursor-pointer">
                  {/* სურათი */}
                  <div className="relative w-full h-[290px] md:h-[365px] overflow-hidden mb-0">
                    <Image
                      src={member.image}
                      alt={member.name || "Team member"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 480px) 280px, (max-width: 768px) 320px, 430px"
                    />
                  </div>

                  {/* ინფორმაცია */}
                  <div
                    className="p-4 md:p-6"
                    style={{ backgroundColor: cardBackgroundColor }}
                  >
                    {/* სახელი და გვარი */}
                    {member.name && (
                      <h3
                        className="text-[18px] md:text-[20px] mb-1"
                        style={{
                          color: nameColor,
                          fontWeight: nameWeight,
                          textTransform: nameTransform,
                        }}
                      >
                        {member.name}
                      </h3>
                    )}

                    {/* პოზიცია */}
                    {member.position && (
                      <p
                        className="text-[14px] md:text-[15px] mb-2"
                        style={{
                          color: positionColor,
                          fontWeight: positionWeight,
                          textTransform: positionTransform,
                        }}
                      >
                        {member.position}
                      </p>
                    )}

                    {/* აღწერა */}
                    {member.description && (
                      <p
                        className="text-[13px] md:text-[14px] leading-relaxed"
                        style={{
                          color: descriptionColor,
                          fontWeight: descriptionWeight,
                          textTransform: descriptionTransform,
                        }}
                      >
                        {member.description}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - ქვემოთ */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "rgba(247, 234, 215, 0.95)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft
                size={28}
                strokeWidth={2}
                style={{ color: "#312618" }}
              />
            </button>

            <button
              onClick={() => swiperInstance?.slideNext()}
              className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "rgba(247, 234, 215, 0.95)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              aria-label="Next slide"
            >
              <ChevronRight
                size={28}
                strokeWidth={2}
                style={{ color: "#312618" }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSwiper;
