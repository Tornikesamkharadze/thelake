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
// Mobile auto-scroll speed, time-based so it's the same on 60/90/120Hz screens.
const MOBILE_SCROLL_PX_PER_SECOND = 35;
// A drag shorter than this still counts as a tap (lets the card link open).
const TAP_MAX_MOVE_PX = 6;

/**
 * Showcase slider for partner projects — a full-bleed photo per card with a
 * hover-reveal panel (project name/link + description). Distinct, parallel
 * component to the older logo-row `Partnersslider` — that one is left as-is.
 *
 * Desktop (md+, untouched): the `.partner-scroll` CSS transform animation on
 * an overflow-hidden track — pause on mouseenter, resume immediately on
 * mouseleave, same as it's always been.
 *
 * Mobile: a *separate* track driven by one offset in requestAnimationFrame and
 * rendered with translate3d (GPU, sub-pixel smooth — stepping `scrollLeft`
 * whole pixels looked jumpy). Auto-scroll and the finger's drag both move that
 * same offset, which wraps by one repeat-width so it never runs out of
 * content. `touch-action: pan-y` keeps vertical page scrolling native.
 * Touching pauses the auto-scroll; lifting the finger resumes it after
 * TOUCH_RESUME_DELAY_MS.
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

  // Mobile — one offset shared by auto-scroll and touch-drag, rendered with translate3d.
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    let singleCopyWidth = track.scrollWidth / REPEAT_COUNT;
    let offset = singleCopyWidth;
    let paused = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartOffset = 0;
    let moved = false;
    let lastTime = 0;
    let rafId;
    let resumeTimer;

    const wrap = (value) =>
      singleCopyWidth > 0 ? (((value % singleCopyWidth) + singleCopyWidth) % singleCopyWidth) + singleCopyWidth : value;
    const render = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const step = (time) => {
      const dt = lastTime ? Math.min(time - lastTime, 100) : 0;
      lastTime = time;
      if (!paused && !dragging) {
        offset = wrap(offset + (MOBILE_SCROLL_PX_PER_SECOND * dt) / 1000);
        render();
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    const resumeAfterDelay = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, TOUCH_RESUME_DELAY_MS);
    };

    const onTouchStart = (e) => {
      const t = e.touches[0];
      dragging = true;
      paused = true;
      moved = false;
      clearTimeout(resumeTimer);
      dragStartX = t.clientX;
      dragStartY = t.clientY;
      dragStartOffset = offset;
    };
    const onTouchMove = (e) => {
      if (!dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - dragStartX;
      if (!moved && Math.abs(dx) < TAP_MAX_MOVE_PX && Math.abs(t.clientY - dragStartY) < TAP_MAX_MOVE_PX) return;
      moved = true;
      offset = wrap(dragStartOffset - dx);
      render();
    };
    const onTouchEnd = () => {
      dragging = false;
      resumeAfterDelay();
    };
    // A real drag must not also open the card link under the finger
    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const onResize = () => {
      const ratio = singleCopyWidth > 0 ? (offset - singleCopyWidth) / singleCopyWidth : 0;
      singleCopyWidth = track.scrollWidth / REPEAT_COUNT;
      offset = wrap(ratio * singleCopyWidth);
      render();
    };

    render();
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);
    track.addEventListener("touchcancel", onTouchEnd);
    track.addEventListener("click", onClickCapture, true);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("resize", onResize);
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

        {/* Mobile — touch-drag and auto-scroll share one transform offset */}
        <div className="md:hidden w-full overflow-hidden">
          <div
            className="flex w-fit will-change-transform"
            style={{ touchAction: "pan-y" }}
            ref={mobileTrackRef}
          >
            {repeatedProjects.map((project, index) =>
              renderCard(project, `mobile-${project.id ?? project.name}-${index}`)
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PartnerProjectsSlider;
