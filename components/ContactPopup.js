"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle, X } from "lucide-react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const handlePhoneCall = () => {
    window.location.href = "tel:15558702876";
  };

  const handleEmail = () => {
    window.location.href = "mailto:info@placemakers.ge";
  };

  const handleWhatsApp = () => {
    const phoneNumber = "15558702876";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile - open app directly
      window.location.href = `whatsapp://send?phone=${phoneNumber}`;
    } else {
      // Desktop - open web version directly
      window.open(
        `https://web.whatsapp.com/send?phone=${phoneNumber}`,
        "_blank",
      );
    }
  };

  const handleMessenger = () => {
    const pageId = "645219515337992";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile - open app directly
      window.location.href = `fb-messenger://user-thread/${pageId}`;
    } else {
      // Desktop - open web version directly
      window.open(`https://m.me/${pageId}`, "_blank");
    }
  };

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const contactOptions = [
    {
      icon: Phone,
      label: "Phone",
      color: "#ED5C3F",
      onClick: handlePhoneCall,
    },
    {
      icon: Mail,
      label: "Email",
      color: "#7C60D6",
      onClick: handleEmail,
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      color: "#45C755",
      onClick: handleWhatsApp,
    },
    {
      icon: FaFacebookMessenger,
      label: "Messenger",
      color: "#32AADF",
      onClick: handleMessenger,
    },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-15 right-6 z-50 w-14 h-14 bg-[#ed5c3f] rounded-full flex items-center justify-center shadow-xl cursor-pointer border-none focus:outline-none"
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        <motion.img
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          src={isOpen ? "/close.png" : "/open.png"}
          alt={isOpen ? "Close" : "Open"}
          width={28}
          height={28}
          className="object-contain"
        />
      </motion.button>

      {/* Contact Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-30 right-6 z-40"
          >
            <div className="bg-black/70 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden w-64 md:w-72">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.label}
                    variants={itemVariants}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={option.onClick}
                    className={`w-full flex items-center gap-4 px-5 py-4 transition-all duration-200 group cursor-pointer ${
                      index < contactOptions.length - 1
                        ? "border-b border-white/40"
                        : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: option.color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-white text-base font-medium">
                      {option.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
