"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";

// How many times the real list is repeated in each track.
const REPEAT_COUNT = 5;
// How long to stay paused after a finger/mouse interaction ends before auto-scroll resumes.
const TOUCH_RESUME_DELAY_MS = 3500;
// A 1px step every N frames (~60fps) — a whole pixel, not a fraction:
// browsers round scrollLeft to the nearest integer, so sub-pixel increments
// get rounded away to nothing every frame and the track never visibly moves.
const MOBILE_SCROLL_STEP_EVERY_N_FRAMES = 3;

/**
 * Showcase slider for partner projects — a full-bleed photo per card with a
 * hover-reveal panel (project name/link + description). Distinct, parallel
 * component to the older logo-row `Partnersslider` — that one is left as-is.
 *
 * Desktop (md+, untouched): the `.partner-scroll` CSS transform animation on
 * an overflow-hidden track — pause on mouseenter, resume immediately on
 * mouseleave, same as it's always been.
 *
 * Mobile: a *separate* track, because a running CSS transform and native
 * touch-scroll on the same element stack (two independent offsets added
 * together) — drag far/often enough and the combined position runs past the
 * edge of the finite repeated content into blank space. Instead, mobile
 * drives `scrollLeft` directly with requestAnimationFrame: auto-scroll and
 * the finger's drag are the same single position, never two offsets stacked,
 * and a `scroll` listener snaps it back by one repeat-width whenever it
 * nears either edge so it can never run out of content. Touching pauses the
 * auto-scroll; lifting the finger resumes it after TOUCH_RESUME_DELAY_MS.
 */
const PartnerProjectsSlider = ({
  headline = "",
  projects = [],
  backgroundColor = "#C2B49B",
  hoverBackgroundColor = "#F7EAD7",
  linkColor = "#ED5C3F",
}) => {
  const desktopTrackRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const routeParams = useParams();
  const locale = routeParams.locale || "ka";
  const partnersHref = `/${locale}/partners`;

  // Desktop — untouched CSS animation pause/resume.
  useEffect(() => {
    const track = desktopTrackRef.current;
    if (!track) return;

    const pause = () => {
      track.style.animationPlayState = "paused";
    };
    const resume = () => {
      track.style.animationPlayState = "running";
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Mobile — scrollLeft-driven auto-scroll that coexists with real touch-drag.
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    let paused = false;
    let rafId;
    let resumeTimer;
    let frame = 0;

    const singleCopyWidth = track.scrollWidth / REPEAT_COUNT;
    track.scrollLeft = singleCopyWidth * Math.floor(REPEAT_COUNT / 2);

    const wrapIfNeeded = () => {
      if (track.scrollLeft < singleCopyWidth) {
        track.scrollLeft += singleCopyWidth;
      } else if (track.scrollLeft > singleCopyWidth * (REPEAT_COUNT - 2)) {
        track.scrollLeft -= singleCopyWidth;
      }
    };

    const step = () => {
      if (!paused) {
        frame++;
        if (frame % MOBILE_SCROLL_STEP_EVERY_N_FRAMES === 0) {
          track.scrollLeft += 1;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const resumeAfterDelay = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, TOUCH_RESUME_DELAY_MS);
    };

    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resumeAfterDelay);
    track.addEventListener("touchcancel", resumeAfterDelay);
    track.addEventListener("scroll", wrapIfNeeded, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resumeAfterDelay);
      track.removeEventListener("touchcancel", resumeAfterDelay);
      track.removeEventListener("scroll", wrapIfNeeded);
    };
  }, []);

  if (!projects || projects.length === 0) return null;

  const repeatedProjects = Array(REPEAT_COUNT).fill(projects).flat();

  const renderCard = (project, key) => {
    // Every card links to the internal /partners listing, regardless of which
    // partner it is (confirmed with the user — not to that partner's own page
    // or their external url). Only the photo and the name link navigate — the
    // description text in the hover panel must stay non-clickable.
    return (
      <div
        key={key}
        className="group relative shrink-0 w-[85vw] sm:w-100 md:w-118.75 mr-4 md:mr-6 pb-6 md:pb-8"
      >
        <Link
          href={partnersHref}
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

          {/* Default-state label: logo if set, otherwise the name as text — centered in the
              whole photo on desktop (panel is hidden until hover there), but shifted up on
              mobile so it clears the always-visible panel instead of hiding behind it. */}
          <div className="absolute inset-x-0 top-0 bottom-25 md:inset-0 flex items-center justify-center px-6">
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
        </Link>

        {/* Hover panel — anchored to the photo's bottom edge but NOT clipped by it, so
            it overlaps the lower photo and continues past it, like ImageTextOverlaySection.
            Always visible on mobile, slides up over the image on hover from md up. Only the
            name links out; the description is plain text. */}
        <div
          className="absolute inset-x-4 md:inset-x-6 bottom-0 p-5 md:p-6 translate-y-0 opacity-100 md:translate-y-[calc(100%-2rem)] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out"
          style={{ backgroundColor: hoverBackgroundColor }}
        >
          {project.name && (
            <Link
              href={partnersHref}
              className="inline-flex items-center gap-2 uppercase underline underline-offset-4 font-medium mb-2"
              style={{ color: linkColor }}
            >
              {project.name}
              <Image src="/Icon-arr.svg" alt="" width={14} height={14} />
            </Link>
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
      >
        {/* Desktop — untouched CSS marquee */}
        <div className="hidden md:block w-full overflow-hidden">
          <div className="flex partner-scroll w-fit" ref={desktopTrackRef}>
            {repeatedProjects.map((project, index) =>
              renderCard(project, `desktop-${project.id ?? project.name}-${index}`)
            )}
          </div>
        </div>

        {/* Mobile — real touch-drag, auto-scroll runs in parallel */}
        <div
          className="flex md:hidden overflow-x-auto no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
          ref={mobileTrackRef}
        >
          {repeatedProjects.map((project, index) =>
            renderCard(project, `mobile-${project.id ?? project.name}-${index}`)
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PartnerProjectsSlider;
