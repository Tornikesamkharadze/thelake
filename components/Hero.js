"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({
  image,
  video,
  title,
  subtitle,
  height = "60vh",
  uppercase = false,
  highlightWords = [],
  priority = false, // ← ახალი prop
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
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl font-light mb-4 leading-15"
          dangerouslySetInnerHTML={{ __html: formattedTitle }}
        />
      );
    }

    return (
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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
      {/* ვიდეო ან ფოტო */}
      {video ? (
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      ) : (
        // მთავარი ცვლილება
        <Image
          src={image}
          alt={title || "Hero"}
          fill
          priority={priority}
          quality={75}
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Overlay */}
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
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
                transition={{ duration: 0.8, delay: 0.6 }}
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
