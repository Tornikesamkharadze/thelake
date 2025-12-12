"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { scroller } from "react-scroll";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const dropdownItems = [
    {
      title: "LIFE IN NATURE",
      href: "/the-lake-lifestyle",
      scrollTo: "life-in-nature",
    },
    {
      title: "SURROUNDINGS",
      href: "/the-lake-lifestyle",
      scrollTo: "surroundings",
    },
    {
      title: "ART EVENTS",
      href: "/the-lake-lifestyle",
      scrollTo: "art-events",
    },
    { title: "FISHING", href: "/the-lake-lifestyle", scrollTo: "fishing" },
    {
      title: "SPORT ACTIVITIES",
      href: "/the-lake-lifestyle",
      scrollTo: "sport-activities",
    },
    { title: "EDUCATION", href: "/the-lake-lifestyle", scrollTo: "education" },
  ];

  const handleLifestyleClick = (e, item) => {
    e.preventDefault();

    // ჯერ დავხუროთ mobile menu
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);

    if (pathname === "/the-lake-lifestyle") {
      // დაველოდოთ menu-ს დახურვას, მერე scroll
      setTimeout(() => {
        const isMobile = window.innerWidth < 1536;
        let headerHeight;

        if (isMobile) {
          // mobile-ზე ვიღებთ მხოლოდ visible header-ს (mobile menu გარეშე)
          const topHeader = document.querySelector("header > div:first-child");
          const mainHeader = document.querySelector(
            "header > div:nth-child(2)"
          );
          const topHeight = topHeader ? topHeader.offsetHeight : 44;
          const mainHeight = mainHeader ? mainHeader.offsetHeight : 104;
          headerHeight = topHeight + mainHeight;
        } else {
          // desktop-ზე სრული header
          const header = document.querySelector("header");
          headerHeight = header ? header.offsetHeight : 148;
        }

        console.log("📱 Calculated header height:", headerHeight);

        scroller.scrollTo(item.scrollTo, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -headerHeight - 20,
        });
      }, 150); // მეტი დაყოვნება mobile menu-ს დახურვისთვის
    } else {
      router.push(`${item.href}#${item.scrollTo}`);
    }
  };

  const handleMobileLifestyleClick = () => {
    if (isDropdownOpen) {
      router.push("/the-lake-lifestyle");
      setIsMobileMenuOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Header */}
      <div className="bg-[#ED5C3F] h-11 px-4 md:px-15 flex items-center justify-end">
        <nav className="hidden lg:flex items-center gap-10 text-white text-sm">
          <Link href="/about" className="hover:opacity-80 transition-opacity">
            About Us
          </Link>
          <Link href="/gallery" className="hover:opacity-80 transition-opacity">
            Gallery
          </Link>
          <Link href="/map" className="hover:opacity-80 transition-opacity">
            Interactive Map
          </Link>
          <Link href="/contact" className="hover:opacity-80 transition-opacity">
            Contact us
          </Link>
          <Link href="/find-us" className="hover:opacity-80 transition-opacity">
            Find us
          </Link>
          <Link
            href="/lang"
            className="hover:opacity-80 transition-opacity font-medium flex items-center gap-1"
          >
            <span className="hover:text-[#d3b473] transition-colors">ENG</span>
            <span>/</span>
            <span className="hover:text-[#d3b473] transition-colors">GEO</span>
          </Link>
        </nav>
      </div>

      {/* Main Header */}
      <div className="bg-[#C2B49B] h-26 px-4 md:px-8 flex items-center justify-between shadow-md">
        <div className="shrink-0">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="The Lake Logo"
              width={220}
              height={60}
              className="w-auto h-auto object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="hidden 2xl:flex items-center gap-6 flex-1 justify-center">
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href="/the-lake-lifestyle"
              className="text-black uppercase tracking-wide text-sm font-medium hover:text-[#ED5C3F] transition-colors flex items-center gap-1"
            >
              THE LAKE LIFESTYLE
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
                    className="block px-6 py-3 text-black uppercase tracking-wide text-sm font-medium hover:text-[#ED5C3F] transition-colors border-b border-[#B5A88E] last:border-b-0 cursor-pointer"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/snohetta"
            className="text-black uppercase tracking-wide text-sm font-medium hover:text-[#ED5C3F] transition-colors"
          >
            SNOHETTA
          </Link>
          <Link
            href="/services"
            className="text-black uppercase tracking-wide text-sm font-medium hover:text-[#ED5C3F] transition-colors"
          >
            SERVICES FOR YOU
          </Link>
          <Link
            href="/bar-kitchen"
            className="text-black uppercase tracking-wide text-sm font-medium hover:text-[#ED5C3F] transition-colors"
          >
            BAR & KITCHEN
          </Link>
          <Link
            href="/spa-wellness"
            className="text-black uppercase tracking-wide text-sm font-medium hover:text-[#ED5C3F] transition-colors"
          >
            SPA & WELLNESS
          </Link>
          <Link
            href="/whats-on"
            className="text-black uppercase tracking-wide text-sm font-medium hover:text-[#ED5C3F] transition-colors"
          >
            WHATS ON*
          </Link>
        </nav>

        <div className="hidden 2xl:flex items-center gap-4 shrink-0">
          <Link href="/own-a-house">
            <button className="bg-white text-black px-6 py-3 font-medium uppercase tracking-wide text-sm hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap cursor-pointer">
              OWN A HOUSE
            </button>
          </Link>
          <Link href="/enquire">
            <button className="bg-white text-black px-6 py-3 font-medium uppercase tracking-wide text-sm hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap cursor-pointer">
              ENQUIRE
            </button>
          </Link>
        </div>

        <button
          className="2xl:hidden text-black"
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
        <div className="2xl:hidden bg-[#C2B49B] border-t border-[#B5A88E] shadow-lg">
          <nav className="flex flex-col p-4">
            <div className="border-b border-[#B5A88E] pb-2 mb-2">
              <button
                onClick={handleMobileLifestyleClick}
                className="w-full text-left text-black uppercase tracking-wide font-medium py-3 flex items-center justify-between gap-2 hover:text-[#ED5C3F] transition-colors"
              >
                <span className="flex-1">THE LAKE LIFESTYLE</span>
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
              href="/snohetta"
              className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SNOHETTA
            </Link>
            <Link
              href="/services"
              className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SERVICES FOR YOU
            </Link>
            <Link
              href="/bar-kitchen"
              className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BAR & KITCHEN
            </Link>
            <Link
              href="/spa-wellness"
              className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SPA & WELLNESS
            </Link>
            <Link
              href="/whats-on"
              className="text-black uppercase tracking-wide font-medium py-3 border-b border-[#B5A88E] hover:text-[#ED5C3F] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              WHATS ON*
            </Link>

            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/own-a-house"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <button className="w-full bg-white text-black px-6 py-3 font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-sm cursor-pointer">
                  OWN A HOUSE
                </button>
              </Link>
              <Link href="/enquire" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-white text-black px-6 py-3 font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-sm cursor-pointer">
                  ENQUIRE
                </button>
              </Link>
            </div>

            <div className="lg:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-[#B5A88E]">
              <Link
                href="/about"
                className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/gallery"
                className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/map"
                className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Interactive Map
              </Link>
              <Link
                href="/contact"
                className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact us
              </Link>
              <Link
                href="/find-us"
                className="text-black py-2 text-sm hover:text-[#ED5C3F] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find us
              </Link>
              <button className="text-black py-2 text-sm text-left font-medium hover:text-[#ED5C3F] transition-colors">
                ENG/GEO
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
