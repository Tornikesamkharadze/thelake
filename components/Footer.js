"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import ContactPopup from "./ContactPopup";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export function Footer({ footerData = null, contactData = null }) {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("footer");
  const locale = params.locale || "ka";

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const phone = contactData?.phone || "+995 511 55 33 33";
  const email = contactData?.email || "info@placemakers.ge";
  const address = t("address");
  const facebookUrl =
    contactData?.facebook || "https://www.facebook.com/thelake.ge/";
  const instagramUrl =
    contactData?.instagram || "https://www.instagram.com/thelake_tba/";
  const youtubeUrl =
    contactData?.youtube || "https://www.youtube.com/@TheLakeByPlacemakers";

  const navItems = footerData?.footerMenuItems?.length
    ? footerData.footerMenuItems.map((item) => ({
        name: item.name,
        url: `/${locale}${item.url}`,
        hiddenOnMobile: false,
      }))
    : [
        { name: t("nav.aboutUs"), url: `/${locale}/about` },
        { name: t("nav.gallery"), url: `/${locale}/gallery` },
        {
          name: t("nav.interactiveMap"),
          url: `/${locale}/choose-propertie`,
          hiddenOnMobile: true,
        },
        { name: t("nav.contactUs"), url: `/${locale}/contact` },
        { name: t("nav.findUs"), url: `/${locale}/find-us` },
      ];

  return (
    <footer
      className={`${
        isHomePage
          ? "bg-[#F7EAD7] text-[#1A1A1A]"
          : "bg-[#312618] text-[#F7EAD7]"
      } py-16 px-6`}
    >
      <ContactPopup />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Logo Section */}
        <div className="flex flex-col md:items-start">
          <Image
            src={isHomePage ? "/img/footer-logo.png" : "/footer-dark-logo.webp"}
            alt="The Lake by Placemakers"
            loading="eager"
            width={340}
            height={120}
            className="w-auto h-auto"
          />
          <a
            href="https://frontnback.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base hover:text-[#d3b473] transition-colors mt-11 inline-block"
          >
            {t("developedBy")}
          </a>
        </div>

        {/* Explore Section */}
        <div>
          <h3 className="text-lg font-normal mb-6 tracking-wide">
            {t("explore")}
          </h3>
          <nav className="flex flex-col">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className={`text-base hover:text-[#ED5C3F] transition-opacity${item.hiddenOnMobile ? " hidden min-[1066px]:block" : ""}`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher className="text-base mt-2" />
          </nav>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-normal mb-6 tracking-wide">
            {t("contact")}
          </h3>
          <div className="flex flex-col mb-6">
            <p className="text-base">{address}</p>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="text-base hover:text-[#ED5C3F] transition-opacity"
            >
              {email}
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-3">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full ${
                isHomePage ? "bg-[#1A1A1A]" : "bg-[#F7EAD7]"
              } flex items-center justify-center hover:opacity-80 transition-opacity`}
              aria-label="Facebook"
            >
              <Facebook
                className={`w-5 h-5 ${
                  isHomePage ? "text-[#E8DCC8]" : "text-[#312618]"
                }`}
                fill="currentColor"
              />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full ${
                isHomePage ? "bg-[#1A1A1A]" : "bg-[#F7EAD7]"
              } flex items-center justify-center hover:opacity-80 transition-opacity`}
              aria-label="Instagram"
            >
              <Instagram
                className={`w-5 h-5 ${
                  isHomePage ? "text-[#E8DCC8]" : "text-[#312618]"
                }`}
              />
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full ${
                isHomePage ? "bg-[#1A1A1A]" : "bg-[#F7EAD7]"
              } flex items-center justify-center hover:opacity-80 transition-opacity`}
              aria-label="YouTube"
            >
              <Youtube
                className={`w-5 h-5 ${
                  isHomePage ? "text-[#E8DCC8]" : "text-[#312618]"
                }`}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
