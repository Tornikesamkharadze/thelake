import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import ContactPopup from "./ContactPopup";

export function Footer() {
  return (
    <footer className="bg-[#F7EAD7] text-[#1A1A1A] py-16 px-6">
      <ContactPopup />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Logo Section */}
        <div className="flex md:justify-start">
          <Image
            src="/img/footer-logo.png"
            alt="The Lake by Placemakers"
            loading="eager"
            width={340}
            height={120}
            className="w-auto h-auto "
          />
        </div>

        {/* Explore Section */}
        <div>
          <h3 className="text-lg font-normal mb-6 tracking-wide">EXPLORE</h3>
          <nav className="flex flex-col">
            <Link
              href="/about"
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              About us
            </Link>
            <Link
              href="/gallery"
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              Gallery
            </Link>
            <Link
              href="/interactive-map"
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              Interactive map
            </Link>
            <Link
              href="/contact"
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              Contact us
            </Link>
            <Link
              href="/find-us"
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              Find us
            </Link>
            <Link
              href="/lang"
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              ENG/GEO
            </Link>
          </nav>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-normal mb-6 tracking-wide">CONTACT</h3>
          <div className="flex flex-col mb-6">
            <p className="text-base">Lisi Lake, Tbilisi, Georgia</p>
            <a
              href="tel:+995511553333"
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              +995 511 55 33 33
            </a>
            <a
              href="mailto:info@placemakers.ge"
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              info@placemakers.ge
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook
                className="w-5 h-5 text-[#E8DCC8]"
                fill="currentColor"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-[#E8DCC8]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-4 h-4 text-[#E8DCC8]"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-[#E8DCC8]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
