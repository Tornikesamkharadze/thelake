"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({
  image,
  video,
  /** Optional poster while video loads (e.g. hero still from CMS) */
  poster,
  title,
  subtitle,
  height = "60vh",
  uppercase = false,
  highlightWords = [],
}) {
  const renderTitle = () => {
    if (!title) return null;

    if (highlightWords.length > 0) {
      let formattedTitle = title;

      highlightWords.forEach((word) => {
        const regex = new RegExp(`(${word})`, "gi");
        formattedTitle = formattedTitle.replace(
          regex,
          '<strong class="font-bold">$1</strong>',
        );
      });

      return (
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-light mb-4 leading-15"
          dangerouslySetInnerHTML={{ __html: formattedTitle }}
        />
      );
    }

    return (
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl font-normal mb-4"
      >
        {title}
      </motion.h1>
    );
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `calc(${height} - 148px)` }}
    >
      {video ? (
        <div className="w-full h-full">
          <video
            src={video}
            poster={poster || undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <Image
          src={image}
          alt={title || "Hero"}
          fill
          priority={true}
          quality={75}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
          className="object-cover"
        />
      )}

      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center z-10"
        >
          <div
            className={`text-center text-white px-4 ${
              uppercase ? "uppercase" : ""
            }`}
          >
            {renderTitle()}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl font-normal"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
