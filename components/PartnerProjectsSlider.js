"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";

import "swiper/css";

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16"
      style={{ backgroundColor }}
    >
      {headline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center px-6 mb-8 md:mb-10 text-sm md:text-base leading-relaxed text-black"
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
          spaceBetween={0}
          slidesPerView={1.1}
          loop={projects.length > 2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id ?? index}>
              <div className="group relative h-[420px] md:h-[480px] overflow-hidden">
                {(project.backgroundImage?.src || project.image?.src) && (
                  <Image
                    src={project.backgroundImage?.src || project.image?.src}
                    alt={project.backgroundImage?.alt || project.name || "Partner project"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}

                <div className="absolute inset-0 bg-black/15" />

                {/* Default-state label: logo if set, otherwise the name as text */}
                <div className="absolute left-6 md:left-8 bottom-32 md:bottom-40 right-6">
                  {project.image?.src ? (
                    <div className="relative w-40 h-14 md:w-48 md:h-16">
                      <Image
                        src={project.image.src}
                        alt={project.image.alt || project.name || "Logo"}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  ) : (
                    <span
                      className="block font-serif text-white text-3xl md:text-4xl"
                      style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.5)" }}
                    >
                      {project.name}
                    </span>
                  )}
                </div>

                {/* Hover panel — always visible on mobile, reveals on hover from md up */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5 md:p-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
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
