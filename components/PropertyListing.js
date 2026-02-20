"use client";

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { properties } from "@/lib/dummyData";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";

const PropertyListing = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || "ka";

  const typeTranslationMap = {
    "Private Villa": t("propertyListing.typeVilla"),
    "Private House": t("propertyListing.typeHouse"),
    "Land Plot": t("propertyListing.typeLand"),
  };

  // Filter states
  const [selectedType, setSelectedType] = useState(() => {
    if (typeof window !== "undefined") {
      const savedType = sessionStorage.getItem("propertyListingType");
      if (savedType) {
        sessionStorage.removeItem("propertyListingType");
        return savedType;
      }
    }
    return "All";
  });
  const [selectedLandSize, setSelectedLandSize] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRefs = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (
          openDropdown &&
          dropdownRefs.current[openDropdown] &&
          !dropdownRefs.current[openDropdown].contains(event.target)
        ) {
          setOpenDropdown(null);
        }
      }, 0);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  // Get unique types and land sizes for filters
  const propertyTypes = useMemo(() => {
    const types = [
      ...new Set(
        properties
          .map((p) => p.type?.trim())
          .filter((type) => type && type !== ""),
      ),
    ];
    return ["All", ...types.sort()];
  }, []);

  const landSizes = useMemo(() => {
    const sizes = [
      ...new Set(
        properties
          .map((p) => p.landSize?.trim())
          .filter((size) => size && size !== ""),
      ),
    ];
    return ["All", ...sizes.sort((a, b) => parseInt(a) - parseInt(b))];
  }, []);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (property.isSold === true) return false;

      const propertyType = property.type?.trim() || "";
      const propertyLandSize = property.landSize?.trim() || "";

      const typeMatch = selectedType === "All" || propertyType === selectedType;
      const landSizeMatch =
        selectedLandSize === "All" || propertyLandSize === selectedLandSize;

      return typeMatch && landSizeMatch;
    });
  }, [selectedType, selectedLandSize]);

  const handlePropertyClick = (property) => {
    sessionStorage.setItem("propertyListingReferrer", "listing");
    sessionStorage.setItem("propertyListingUrl", window.location.pathname);
    router.push(`/${locale}/property/${property.houseNo}`);
  };

  const handleSearch = () => {
    setOpenDropdown(null);
  };

  const handleTypeChange = useCallback((value) => {
    setSelectedType(value);
    setOpenDropdown(null);
  }, []);

  const handleLandSizeChange = useCallback((value) => {
    setSelectedLandSize(value);
    setOpenDropdown(null);
  }, []);

  const toggleDropdown = useCallback((name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  }, []);

  // Custom Select Component
  const CustomSelect = ({ name, value, options, onChange }) => {
    const isOpen = openDropdown === name;

    const getDisplayValue = () => {
      if (value === "All") {
        return t("propertyListing.all");
      }
      if (name === "landSize" && value !== "All") {
        return `${value} ${t("propertyListing.m2")}`;
      }
      return typeTranslationMap[value] || value;
    };

    const handleOptionClick = (option) => {
      onChange(option);
    };

    return (
      <div
        ref={(el) => (dropdownRefs.current[name] = el)}
        className="relative w-full"
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown(name);
          }}
          className="w-full px-3 py-2.5 bg-[#C2B49B] text-[#312618] font-medium cursor-pointer border-b border-[rgba(49,38,24,0.3)] transition-all duration-300 flex items-center justify-between hover:bg-[#ED5C3F] hover:text-[#F7EAD7] hover:border-[#312618] focus:outline-none focus:bg-[#ED5C3F] focus:text-[#F7EAD7]"
        >
          <span className="text-sm">{getDisplayValue()}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#C2B49B] border border-[rgba(49,38,24,0.3)] overflow-hidden z-50 max-h-[300px] overflow-y-auto shadow-lg custom-dropdown">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOptionClick(option);
                }}
                className={`w-full text-left px-3 py-2.5 text-sm text-[#312618] font-medium cursor-pointer transition-all duration-200 hover:bg-[#ED5C3F] hover:text-white ${
                  value === option ? "bg-[#312618] text-[#F7EAD7]" : ""
                }`}
              >
                {option === "All"
                  ? t("propertyListing.all")
                  : typeTranslationMap[option] || option}
                {name === "landSize" &&
                  option !== "All" &&
                  ` ${t("propertyListing.m2")}`}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        .custom-dropdown::-webkit-scrollbar {
          width: 4px;
        }

        .custom-dropdown::-webkit-scrollbar-track {
          background: rgba(194, 180, 155, 0.3);
        }

        .custom-dropdown::-webkit-scrollbar-thumb {
          background: #ed5c3f;
          border-radius: 2px;
        }

        .custom-dropdown::-webkit-scrollbar-thumb:hover {
          background: #d44d31;
        }

        .custom-dropdown {
          scrollbar-width: thin;
          scrollbar-color: #ed5c3f rgba(194, 180, 155, 0.3);
        }
      `}</style>

      <div className="bg-white overflow-hidden min-[1051px]:h-[calc(100vh-148px)]">
        <div className="flex flex-col lg:flex-row h-full relative">
          {/* Top Navigation Buttons */}
          <div className="hidden min-[1051px]:flex absolute top-6 right-8 z-20 gap-2">
            <button
              onClick={() => router.push(`/${locale}/choose-propertie`)}
              className="px-4 py-2 text-sm font-medium transition-all cursor-pointer bg-[#F7EAD7] border border-[#312618] text-[#312618] hover:bg-[#C2B49B]"
            >
              {t("chooseProperty.visualSelection")}
            </button>
            <button className="px-4 py-2 text-sm font-medium transition-all cursor-pointer bg-[#312618] text-[#F7EAD7] shadow-md">
              {t("chooseProperty.propertyListing")}
            </button>
          </div>

          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:flex lg:w-[345px] bg-[#C2B49B] flex-col">
            <div className="bg-[#F7EAD7] px-4 py-4">
              <h2 className="text-xl text-[#000000] font-contractica-regular uppercase tracking-wide text-center">
                {t("propertyListing.filter")}
              </h2>
            </div>

            <div className="px-6 py-8 flex-1 flex flex-col">
              {/* Type Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm text-[#312618] font-medium w-20 shrink-0">
                    {t("propertyListing.type")}
                  </label>
                  <div className="flex-1">
                    <CustomSelect
                      name="type"
                      value={selectedType}
                      options={propertyTypes}
                      onChange={handleTypeChange}
                    />
                  </div>
                </div>
              </div>

              {/* Land Size Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm text-[#312618] font-medium w-20 shrink-0">
                    {t("propertyListing.landSize")}
                  </label>
                  <div className="flex-1">
                    <CustomSelect
                      name="landSize"
                      value={selectedLandSize}
                      options={landSizes}
                      onChange={handleLandSizeChange}
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-auto flex justify-center">
                <button
                  onClick={handleSearch}
                  className="w-full max-w-[200px] bg-[#312618] hover:bg-[#2D1810] text-[#F7EAD7] font-medium py-3 px-6 transition-colors cursor-pointer"
                >
                  {t("propertyListing.search")}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden w-full flex flex-col h-full">
            <div className="bg-[#C2B49B] p-4">
              <div className="bg-[#F7EAD7] px-4 py-3 mb-4">
                <h2 className="text-lg text-[#000000] font-contractica-regular uppercase tracking-wide text-center">
                  {t("propertyListing.filter")}
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-[#312618] font-medium w-[70px] shrink-0">
                    {t("propertyListing.type")}
                  </label>
                  <div className="flex-1">
                    <CustomSelect
                      name="type"
                      value={selectedType}
                      options={propertyTypes}
                      onChange={handleTypeChange}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm text-[#312618] font-medium w-[70px] shrink-0">
                    {t("propertyListing.landSize")}
                  </label>
                  <div className="flex-1">
                    <CustomSelect
                      name="landSize"
                      value={selectedLandSize}
                      options={landSizes}
                      onChange={handleLandSizeChange}
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleSearch}
                    className="w-full max-w-[200px] bg-[#312618] hover:bg-[#2D1810] text-[#F7EAD7] font-medium py-2 px-6 transition-colors cursor-pointer text-sm"
                  >
                    {t("propertyListing.search")}
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid Mobile */}
            <div
              className="flex-1 bg-white p-4 overflow-y-auto scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="grid grid-cols-1 gap-6">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => handlePropertyClick(property)}
                    className="bg-[#F7EAD7] cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-full aspect-4/3 bg-[#B5A28C]">
                      <Image
                        src={property.twoDImg || "/listing-default.webp"}
                        alt={`${property.type} ${property.houseNo}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        {typeTranslationMap[property.type?.trim()] ||
                          property.type?.trim()}{" "}
                        {property.houseNo}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        {property.landSize && (
                          <p>
                            {t("propertyListing.land")}: {property.landSize}{" "}
                            {t("propertyListing.m2")}
                          </p>
                        )}
                        {property.sakadastroKodi && (
                          <p
                            className="truncate"
                            title={property.sakadastroKodi}
                          >
                            {t("propertyListing.code")}:{" "}
                            {property.sakadastroKodi}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16">
                  <svg
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-gray-600 text-center">
                    {t("propertyListing.noProperties")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Properties Grid - Desktop */}
          <div
            className="hidden lg:block flex-1 bg-white p-8 overflow-y-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-[1051px]:mt-10">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => handlePropertyClick(property)}
                  className="bg-[#F7EAD7] cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full aspect-4/3 bg-[#B5A28C]">
                    <Image
                      src={property.twoDImg || "/listing-default.webp"}
                      alt={`${property.type} ${property.houseNo}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      {typeTranslationMap[property.type?.trim()] ||
                        property.type?.trim()}{" "}
                      {property.houseNo}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      {property.landSize && (
                        <p>
                          {t("propertyListing.land")}: {property.landSize}{" "}
                          {t("propertyListing.m2")}
                        </p>
                      )}
                      {property.sakadastroKodi && (
                        <p className="truncate" title={property.sakadastroKodi}>
                          {t("propertyListing.code")}: {property.sakadastroKodi}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-gray-600 text-center">
                  {t("propertyListing.noProperties")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListing;
