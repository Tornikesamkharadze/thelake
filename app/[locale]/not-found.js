"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const waves = [
      { amplitude: 30, frequency: 0.02, speed: 0.03, offset: 0, opacity: 0.15 },
      {
        amplitude: 40,
        frequency: 0.015,
        speed: 0.02,
        offset: 50,
        opacity: 0.12,
      },
      {
        amplitude: 25,
        frequency: 0.025,
        speed: 0.025,
        offset: 100,
        opacity: 0.1,
      },
      {
        amplitude: 35,
        frequency: 0.018,
        speed: 0.028,
        offset: 150,
        opacity: 0.08,
      },
    ];

    const drawWave = (wave, time) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height * 0.5 +
          wave.offset +
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
          Math.sin(x * wave.frequency * 1.5 + time * wave.speed * 0.8) *
            (wave.amplitude * 0.5);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `rgba(139, 160, 180, ${wave.opacity})`);
      gradient.addColorStop(1, `rgba(100, 120, 140, ${wave.opacity * 1.5})`);

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waves.forEach((wave) => drawWave(wave, time));
      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#d4c4b0] via-[#c9b89d] to-[#b8a88f]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.h1
            className="text-[180px] md:text-[250px] font-light text-white/20 leading-none tracking-wider"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 40px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            404
          </motion.h1>

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{
                width: [0, 600],
                height: [0, 600],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 space-y-4 max-w-md"
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#4a4a4a] tracking-wide font-contractica-caps">
            {t("title")}
          </h2>
          <p
            className="text-lg md:text-xl text-[#6a6a6a] font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("description") }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link href={`/${locale}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 cursor-pointer bg-white/90 hover:bg-white text-[#4a4a4a] font-light tracking-wider transition-all duration-300 backdrop-blur-sm border border-white/50 shadow-lg font-contractica-caps "
            >
              {t("returnHome")}
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-16"
        >
          <p className="text-sm text-black tracking-[0.3em] uppercase">
            {t("branding")}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#b8a88f]/50 to-transparent pointer-events-none" />
    </div>
  );
}
