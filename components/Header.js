"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import { scroller } from "react-scroll";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("header");

  const locale = params.locale || "ka";

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const dropdownItems = [
    {
      title: t("dropdown.lifeInNature"),
      href: `/${locale}/the-lake-lifestyle`,
      scrollTo: "life-in-nature",
    },
    {
      title: t("dropdown.surroundings"),
      href: `/${locale}/the-lake-lifestyle`,
      scrollTo: "surroundings",
    },
    {
      title: t("dropdown.artEvents"),
      href: `/${locale}/the-lake-lifestyle`,
      scrollTo: "art-events",
    },
    {
      title: t("dropdown.fishing"),
      href: `/${locale}/the-lake-lifestyle`,
      scrollTo: "fishing",
    },
    {
      title: t("dropdown.sportActivities"),
      href: `/${locale}/the-lake-lifestyle`,
      scrollTo: "sport-activities",
    },
    {
      title: t("dropdown.education"),
      href: `/${locale}/the-lake-lifestyle`,
      scrollTo: "education",
    },
  ];

  const handleLifestyleClick = (e, item) => {
    e.preventDefault();

    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);

    if (pathname === `/${locale}/the-lake-lifestyle`) {
      setTimeout(() => {
        const isMobile = window.innerWidth < 1066;
        let headerHeight;

        if (isMobile) {
          const topHeader = document.querySelector("header > div:first-child");
          const mainHeader = document.querySelector(
            "header > div:nth-child(2)",
          );
          const topHeight = topHeader ? topHeader.offsetHeight : 44;
          const mainHeight = mainHeader ? mainHeader.offsetHeight : 104;
          headerHeight = topHeight + mainHeight;
        } else {
          const header = document.querySelector("header");
          headerHeight = header ? header.offsetHeight : 148;
        }

        scroller.scrollTo(item.scrollTo, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -headerHeight - 20,
        });
      }, 150);
    } else {
      sessionStorage.setItem("scrollTarget", item.scrollTo);
      router.push(item.href);
    }
  };

  const handleMobileLifestyleClick = () => {
    if (isDropdownOpen) {
      router.push(`/${locale}/the-lake-lifestyle`);
      setIsMobileMenuOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 z-50">
        {/* Top Header */}
        <div className="bg-[#ED5C3F] h-11 px-4 md:px-15 flex items-center justify-end">
          <nav className="hidden min-[1066px]:flex items-center gap-10 text-white text-[12px]">
            <Link
              href={`/${locale}/about`}
              className="hover:opacity-80 transition-opacity"
            >
              {t("nav.aboutUs")}
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="hover:opacity-80 transition-opacity"
            >
              {t("nav.gallery")}
            </Link>
            <Link
              href={`/${locale}/choose-propertie`}
              className="hover:opacity-80 transition-opacity"
            >
              {t("nav.interactiveMap")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="hover:opacity-80 transition-opacity"
            >
              {t("nav.contactUs")}
            </Link>
            <Link
              href={`/${locale}/find-us`}
              className="hover:opacity-80 transition-opacity"
            >
              {t("nav.findUs")}
            </Link>
            <LanguageSwitcher className="font-medium" />
          </nav>
        </div>

        {/* Main Header */}
        <div className="bg-[#C2B49B] h-26 px-4 md:px-8 flex items-center justify-between shadow-md">
          <Link
            href={`/${locale}`}
            className="shrink-0 relative block w-[177px] h-[60px]"
          >
            <Image
              src="/img/lake-logo.svg"
              alt="The Lake Logo"
              fill
              sizes="177px"
              className="object-contain"
              priority
            />
          </Link>

          <nav className="hidden min-[1066px]:flex items-center gap-4 xl:gap-6 flex-1 justify-center">
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                href={`/${locale}/the-lake-lifestyle`}
                className="text-black uppercase tracking-wide text-[12px] font-medium hover:text-[#ED5C3F] transition-colors flex items-center gap-1"
              >
                {t("nav.lakeLyfestyle")}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>

              {isDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 bg-[#C2B49B] shadow-lg overflow-hidden min-w-[220px]"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {dropdownItems.map((item, index) => (
                    <a
                      key={index}
                      href={`${item.href}#${item.scrollTo}`}
                      onClick={(e) => handleLifestyleClick(e, item)}
                      className="block px-6 py-3 text-black uppercase tracking-wide text-[12px] font-medium hover:text-[#ED5C3F] transition-colors border-b border-[#B5A88E] last:border-b-0 cursor-pointer"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={`/${locale}/lake-house`}
              className="text-black uppercase tracking-wide text-[12px] font-medium hover:text-[#ED5C3F] transition-colors"
            >
              {t("nav.lakehouse")}
            </Link>
            <Link
              href={`/${locale}/services-for-you`}
              className="text-black uppercase tracking-wide text-[12px] font-medium hover:text-[#ED5C3F] transition-colors"
            >
              {t("nav.servicesForYou")}
            </Link>
            <Link
              href={`/${locale}/bar-kitchen`}
              className="text-black uppercase tracking-wide text-[12px] font-medium hover:text-[#ED5C3F] transition-colors"
            >
              {t("nav.barKitchen")}
            </Link>
            <Link
              href={`/${locale}/spa-wellness`}
              className="text-black uppercase tracking-wide text-[12px] font-medium hover:text-[#ED5C3F] transition-colors"
            >
              {t("nav.spaWellness")}
            </Link>
            <Link
              href={`/${locale}/whats-on`}
              className="text-black uppercase tracking-wide text-[12px] font-medium hover:text-[#ED5C3F] transition-colors"
            >
              {t("nav.whatsOn")}
            </Link>
          </nav>

          <div className="hidden xl:flex items-center gap-3 shrink-0 ml-2">
            <Link href={`/${locale}/choose-propertie`}>
              <button className="bg-white text-black px-6 py-3 font-medium uppercase tracking-wide text-[12px] hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap cursor-pointer">
                {t("buttons.ownAHouse")}
              </button>
            </Link>
            <Link href={`/${locale}/enquire`}>
              <button className="bg-white text-black px-6 py-3 font-medium uppercase tracking-wide text-[12px] hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap cursor-pointer">
                {t("buttons.enquire")}
              </button>
            </Link>
          </div>

          <button
            className="min-[1066px]:hidden text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="min-[1066px]:hidden fixed inset-x-0 top-[148px] bottom-0 bg-[#C2B49B] border-t border-[#B5A88E] shadow-lg overflow-y-auto">
            <nav className="flex flex-col p-4">
              <div className="border-b border-[#B5A88E] pb-2 mb-2">
                <button
                  onClick={handleMobileLifestyleClick}
                  className="w-full text-left text-black uppercase tracking-wide font-medium py-3 flex items-center justify-between gap-2 hover:text-[#ED5C3F] transition-colors"
                >
                  <span className="flex-1">{t("nav.lakeLyfestyle")}</span>
                  <svg
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="pl-4 flex flex-col gap-2 mt-2">
                    {dropdownItems.map((item, index) => (
                      <a
                        key={index}
                        href={`${item.href}#${item.scrollTo}`}
                        onClick={(e) => handleLifestyleClick(e, item)}
                        className="text-black uppercase tracking-wide text-sm font-medium py-2 hover:text-[#ED5C3F] transition-colors border-b border-[#B5A88E] last:border-b-0 cursor-pointer"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href={`/${locale}/lake-house`}
                className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.lakehouse")}
              </Link>
              <Link
                href={`/${locale}/services-for-you`}
                className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.servicesForYou")}
              </Link>
              <Link
                href={`/${locale}/bar-kitchen`}
                className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.barKitchen")}
              </Link>
              <Link
                href={`/${locale}/spa-wellness`}
                className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.spaWellness")}
              </Link>
              <Link
                href={`/${locale}/whats-on`}
                className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.whatsOn")}
              </Link>

              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href={`/${locale}/property-listing`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <button className="w-full bg-white text-black px-6 py-3 font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-sm cursor-pointer">
                    {t("buttons.ownAHouse")}
                  </button>
                </Link>
                <Link
                  href={`/${locale}/enquire`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <button className="w-full bg-white text-black px-6 py-3 font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-sm cursor-pointer">
                    {t("buttons.enquire")}
                  </button>
                </Link>
              </div>

              {/* Mobile Menu Bottom Links */}
              <div className="min-[1066px]:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-[#B5A88E]">
                <Link
                  href={`/${locale}/about`}
                  className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.aboutUs")}
                </Link>
                <Link
                  href={`/${locale}/gallery`}
                  className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.gallery")}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.contactUs")}
                </Link>
                <Link
                  href={`/${locale}/find-us`}
                  className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.findUs")}
                </Link>
                <LanguageSwitcher className="py-2 text-sm text-left font-medium" />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Bottom Sticky Buttons - Show between 1066px and xl breakpoints */}
      <div className="hidden min-[1066px]:flex xl:hidden fixed bottom-0 left-0 right-0 bg-[#2C3E50] z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Link href={`/${locale}/choose-propertie`} className="flex-1">
          <button className="w-full bg-[#ed5c3f] text-white px-6 py-4 font-medium uppercase tracking-wide text-[12px] hover:bg-[#312618] transition-colors cursor-pointer">
            {t("buttons.ownAHouse")}
          </button>
        </Link>
        <Link href={`/${locale}/enquire`} className="flex-1">
          <button className="w-full bg-[#C2B49B] text-white px-6 py-4 font-medium uppercase tracking-wide text-[12px] hover:bg-[#2C3E50] transition-colors cursor-pointer">
            {t("buttons.enquire")}
          </button>
        </Link>
      </div>
    </>
  );
};

export default Header;
