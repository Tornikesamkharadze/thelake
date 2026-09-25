"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// How many times the real list is repeated in the track, so there's always
// a wide buffer of identical content to silently wrap within (see below).
const REPEAT_COUNT = 5;
// How long to stay paused after the pointer/finger leaves before auto-scroll resumes.
const RESUME_DELAY_MS = 4500;
// Auto-scroll takes a 1px step every N animation frames (~60fps) — a whole
// pixel, not a fraction: browsers round scrollLeft to the nearest integer,
// so sub-pixel increments (e.g. 0.4px) get rounded away to nothing every
// single frame and the track never visibly moves. Stepping less often
// instead of by less distance keeps it slow without ever losing the step.
const SCROLL_STEP_EVERY_N_FRAMES = 3;

/**
 * Showcase slider for partner projects — a full-bleed photo per card with a
 * hover-reveal panel (project name/link + description). Distinct, parallel
 * component to the older logo-row `Partnersslider` — that one is left as-is.
 *
 * Auto-scrolls continuously by driving `scrollLeft` directly (not a CSS
 * transform animation): a CSS transform running on top of a native
 * overflow-x-auto scroller *stacks* with the user's manual scroll position,
 * so aggressively swiping could push the combined offset past the edge of
 * the repeated content into blank space. Driving scrollLeft with
 * requestAnimationFrame instead means auto-scroll and touch-swipe are the
 * same single position — never two offsets added together — and a `scroll`
 * listener silently snaps scrollLeft back by one repeat-width whenever it
 * gets close to either edge of the repeated list, so it can never run out
 * of content no matter how far or how often you drag it.
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

    let paused = false;
    let rafId;
    let resumeTimer;
    let frame = 0;

    const singleCopyWidth = track.scrollWidth / REPEAT_COUNT;
    // Start in the middle copy so there's equal buffer to wrap in either direction.
    track.scrollLeft = singleCopyWidth * Math.floor(REPEAT_COUNT / 2);

    const step = () => {
      if (!paused) {
        frame++;
        if (frame % SCROLL_STEP_EVERY_N_FRAMES === 0) {
          track.scrollLeft += 1;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    // Keeps scrollLeft within the middle copies, regardless of whether the
    // change came from the rAF loop above or the user dragging/swiping.
    const wrapIfNeeded = () => {
      if (track.scrollLeft < singleCopyWidth) {
        track.scrollLeft += singleCopyWidth;
      } else if (track.scrollLeft > singleCopyWidth * (REPEAT_COUNT - 2)) {
        track.scrollLeft -= singleCopyWidth;
      }
    };

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, RESUME_DELAY_MS);
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", scheduleResume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", scheduleResume);
    track.addEventListener("touchcancel", scheduleResume);
    track.addEventListener("scroll", wrapIfNeeded, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", scheduleResume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", scheduleResume);
      track.removeEventListener("touchcancel", scheduleResume);
      track.removeEventListener("scroll", wrapIfNeeded);
    };
  }, []);

  if (!projects || projects.length === 0) return null;

  const repeatedProjects = Array(REPEAT_COUNT).fill(projects).flat();

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
        className="w-full overflow-x-auto no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex w-fit px-4 md:px-0" ref={trackRef}>
          {repeatedProjects.map((project, index) =>
            renderCard(project, `${project.id ?? project.name}-${index}`)
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PartnerProjectsSlider;
