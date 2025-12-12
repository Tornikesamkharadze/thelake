"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function PartnersSlider() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleMouseEnter = () => {
      track.style.animationPlayState = "paused";
    };

    const handleMouseLeave = () => {
      track.style.animationPlayState = "running";
    };

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const partners = [
    { src: "/img/partners/snoh.webp", alt: "snoh logo" },
    { src: "/img/partners/tbc.webp", alt: "tbc logo" },
    { src: "/img/partners/samrt.webp", alt: "samrt logo" },
    { src: "/img/partners/salt.webp", alt: "salt logo" },
  ];

  // დუბლირება უწყვეტი ანიმაციისთვის (5-ჯერ)
  const repeatedPartners = Array(5).fill(partners).flat();

  return (
    <section
      className="relative h-[200px] overflow-hidden"
      id="contact-partners-section"
    >
      <div className="absolute inset-0">
        <Image
          src="/lake-transformed.webp"
          alt="Lake background"
          fill
          className="object-cover object-center w-auto h-auto"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative h-full flex items-center pt-20 pb-20">
        <div className="w-full overflow-hidden">
          <div
            className="flex animate-scroll w-fit hover:animation-paused"
            ref={trackRef}
          >
            {repeatedPartners.map((partner, index) => (
              <div
                key={index}
                className="text-white max-w-[300px] px-[60px] max-md:px-[30px] max-[480px]:px-5 whitespace-nowrap flex items-center justify-center shrink-0 transition-colors duration-300 hover:text-[#d3b473]"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={200}
                  height={80}
                  className="object-contain w-auto h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
