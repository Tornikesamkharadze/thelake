"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";

import "swiper/css";

// Repeat the real entries so Swiper always has comfortably more slides than
// fit on screen — with only a handful of real partners, loop+autoplay would
// otherwise stall/glitch (not enough slides to wrap around smoothly).
const LOOP_REPEATS = 6;

/**
 * Showcase slider for partner projects — a full-bleed photo per card with a
 * hover-reveal panel (project name/link + description). Distinct, parallel
 * component to the older logo-row `Partnersslider` — that one is left as-is.
 *
 * Desktop: infinite auto-scroll, pauses on hover, hover reveals the panel.
 * Mobile: panel always visible, native touch-swipe, next card peeks ~10%.
 */
const PartnerProjectsSlider = ({
  headline = "",
  projects = [],
  backgroundColor = "#C2B49B",
  hoverBackgroundColor = "#F7EAD7",
  linkColor = "#ED5C3F",
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (!projects || projects.length === 0) return null;

  const slides = Array(LOOP_REPEATS).fill(projects).flat();

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-20"
      style={{ backgroundColor }}
    >
      {headline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center px-6 mb-12 md:mb-16 text-sm md:text-base leading-relaxed text-black"
        >
          {headline}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={16}
          loop
          speed={5000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: { spaceBetween: 24 },
            1024: { spaceBetween: 30 },
          }}
        >
          {slides.map((project, index) => (
            <SwiperSlide
              key={`${project.id ?? project.name}-${index}`}
              className="!w-[85vw] sm:!w-[400px] md:!w-[475px] !h-auto"
            >
              {/* Outer wrapper is NOT clipped — lets the hover panel spill below the photo */}
              <div className="group relative w-full pb-6 md:pb-8">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "475 / 357" }}
                >
                  {(project.backgroundImage?.src || project.image?.src) && (
                    <Image
                      src={project.backgroundImage?.src || project.image?.src}
                      alt={project.backgroundImage?.alt || project.name || "Partner project"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 400px, 475px"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/20" />

                  {/* Default-state label: logo if set, otherwise the name as text — centered in the whole photo */}
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    {project.image?.src ? (
                      <div className="relative w-48 h-20 md:w-56 md:h-24">
                        <Image
                          src={project.image.src}
                          alt={project.image.alt || project.name || "Logo"}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span
                        className="block font-serif text-white text-3xl md:text-4xl text-center"
                        style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.5)" }}
                      >
                        {project.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover panel — anchored to the photo's bottom edge but NOT clipped by it, so
                    it overlaps the lower photo and continues past it, like ImageTextOverlaySection.
                    Always visible on mobile, slides up over the image on hover from md up. */}
                <div
                  className="absolute inset-x-4 md:inset-x-6 bottom-0 p-5 md:p-6 translate-y-0 opacity-100 md:translate-y-[calc(100%-2rem)] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out"
                  style={{ backgroundColor: hoverBackgroundColor }}
                >
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 uppercase underline underline-offset-4 font-medium mb-2"
                      style={{ color: linkColor }}
                    >
                      {project.name}
                      <Image src="/Icon-arr.svg" alt="" width={14} height={14} />
                    </a>
                  ) : (
                    project.name && (
                      <p
                        className="uppercase underline underline-offset-4 font-medium mb-2"
                        style={{ color: linkColor }}
                      >
                        {project.name}
                      </p>
                    )
                  )}
                  {project.description && (
                    <p className="text-sm text-black/80 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default PartnerProjectsSlider;
