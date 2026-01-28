"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

const TeamSwiper = ({
  title = "TEAM",
  members = [],
  backgroundColor = "#ffffff",
  titleColor = "#000000",
  cardBackgroundColor = "#F7EAD7",
  nameColor = "#312618",
  positionColor = "#312618",
  descriptionColor = "#312618",
  titleWeight = "400",
  nameWeight = "400",
  positionWeight = "400",
  descriptionWeight = "400",
  titleTransform = "uppercase",
  nameTransform = "none",
  positionTransform = "none",
  descriptionTransform = "none",
  autoplay = true,
  autoplayDelay = 3000,
  loop = true,
}) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 md:py-5"
      style={{ backgroundColor }}
    >
      {/* სათაური */}
      {title && (
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 mb-4 md:mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center tracking-wide text-[28px] md:text-[36px] lg:text-[42px]"
            style={{
              color: titleColor,
              fontWeight: titleWeight,
              textTransform: titleTransform,
            }}
          >
            {title}
          </motion.h2>
        </div>
      )}

      {/* Swiper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full relative"
      >
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
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group cursor-pointer"
                >
                  {/* სურათი */}
                  <div className="relative w-full h-[290px] md:h-[365px] overflow-hidden mb-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={member.image}
                        alt={member.name || "Team member"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 480px) 280px, (max-width: 768px) 320px, 430px"
                      />
                    </motion.div>
                  </div>

                  {/* ინფორმაცია */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="p-4 md:p-6"
                    style={{ backgroundColor: cardBackgroundColor }}
                  >
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
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => swiperInstance?.slidePrev()}
              className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 cursor-pointer"
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
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => swiperInstance?.slideNext()}
              className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 cursor-pointer"
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
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSwiper;
