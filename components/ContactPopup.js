"use client";

import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const handlePhoneCall = () => {
    window.location.href = "tel:+995511553333";
  };

  const handleEmail = () => {
    window.location.href = "mailto:info@placemakers.ge";
  };

  const handleWhatsApp = () => {
    const phoneNumber = "+995511553333";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${phoneNumber}`;
      setTimeout(() => {
        window.location.href = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
      }, 2000);
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${phoneNumber}`,
        "_blank"
      );
    }
  };

  const handleMessenger = () => {
    window.open(
      "https://www.facebook.com/messages/t/645219515337992",
      "_blank"
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110 focus:outline-none cursor-pointer bg-transparent border-none p-0"
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        <img
          src={isOpen ? "/close.png" : "/open.png"}
          alt={isOpen ? "Close" : "Open"}
          width={50}
          height={50}
          className="object-contain drop-shadow-lg"
        />
      </button>

      {/* Contact Popup */}
      <div
        className={`fixed bottom-24 right-6 z-40 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white/20 backdrop-blur-lg border-2 border-white shadow-2xl overflow-hidden w-64 md:w-72">
          {/* Phone Option */}
          <button
            onClick={handlePhoneCall}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/10 transition-all duration-200 group border-b border-white/40 cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#ED5C3F" }}
            >
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-base font-medium">Phone</span>
          </button>

          {/* Email Option */}
          <button
            onClick={handleEmail}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/10 transition-all duration-200 group border-b border-white/40 cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#7C60D6" }}
            >
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-base font-medium">Email</span>
          </button>

          {/* WhatsApp Option */}
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/10 transition-all duration-200 group border-b border-white/40 cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#45C755" }}
            >
              <FaWhatsapp className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-base font-medium">WhatsApp</span>
          </button>

          {/* Messenger Option */}
          <button
            onClick={handleMessenger}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/10 transition-all duration-200 group cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#32AADF" }}
            >
              <FaFacebookMessenger className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-base font-medium">Messenger</span>
          </button>
        </div>
      </div>
    </>
  );
}
