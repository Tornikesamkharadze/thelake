"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/**
 * Showcase slider for partner projects — a full-bleed photo per card with a
 * hover-reveal panel (project name/link + description). Distinct, parallel
 * component to the older logo-row `Partnersslider` — that one is left as-is.
 *
 * Auto-scrolls continuously via a `.partner-scroll` CSS animation (own,
 * slower timing than the old Partnersslider's `.animate-scroll`), paused
 * while the pointer/finger is on the track and resumed on release. The
 * track is also a native overflow-x-auto scroller, so touch-swipe still
 * works on top of the animation — a CSS transform and native scroll offset
 * are independent, so they don't fight each other.
 */
const PartnerProjectsSlider = ({
  headline = "",
  projects = [],
  backgroundColor = "#C2B49B",
  hoverBackgroundColor = "#F7EAD7",
  linkColor = "#ED5C3F",
}) => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const pause = () => {
      track.style.animationPlayState = "paused";
    };
    const resume = () => {
      track.style.animationPlayState = "running";
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume);
    track.addEventListener("touchcancel", resume);

    return () => {
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
      track.removeEventListener("touchcancel", resume);
    };
  }, []);

  if (!projects || projects.length === 0) return null;

  const repeatedProjects = Array(5).fill(projects).flat();

  const renderCard = (project, key) => {
    // Only the photo and the name link navigate — the description text
    // in the hover panel must stay non-clickable.
    const LinkTag = project.url ? "a" : "div";
    const linkProps = project.url
      ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <div
        key={key}
        className="group relative shrink-0 w-[85vw] sm:w-100 md:w-118.75 mr-4 md:mr-6 pb-6 md:pb-8"
      >
        <LinkTag
          {...linkProps}
          className="relative block w-full overflow-hidden"
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
        </LinkTag>

        {/* Hover panel — anchored to the photo's bottom edge but NOT clipped by it, so
            it overlaps the lower photo and continues past it, like ImageTextOverlaySection.
            Always visible on mobile, slides up over the image on hover from md up. Only the
            name links out; the description is plain text. */}
        <div
          className="absolute inset-x-4 md:inset-x-6 bottom-0 p-5 md:p-6 translate-y-0 opacity-100 md:translate-y-[calc(100%-2rem)] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out"
          style={{ backgroundColor: hoverBackgroundColor }}
        >
          {project.name && (
            <LinkTag
              {...linkProps}
              className="inline-flex items-center gap-2 uppercase underline underline-offset-4 font-medium mb-2"
              style={{ color: linkColor }}
            >
              {project.name}
              {project.url && (
                <Image src="/Icon-arr.svg" alt="" width={14} height={14} />
              )}
            </LinkTag>
          )}
          {project.description && (
            <p className="text-sm text-black/80 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-20 overflow-hidden"
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
        className="w-full overflow-x-auto pb-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex partner-scroll w-fit px-4 md:px-0" ref={trackRef}>
          {repeatedProjects.map((project, index) =>
            renderCard(project, `${project.id ?? project.name}-${index}`)
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PartnerProjectsSlider;
