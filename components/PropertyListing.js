"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { properties } from "@/lib/dummyData";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";

const PropertyListing = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || "ka";

  // Filter states
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLandSize, setSelectedLandSize] = useState("All");

  // Get unique types and land sizes for filters - filter out empty/null values
  const propertyTypes = useMemo(() => {
    const types = [
      ...new Set(
        properties
          .map((p) => p.type)
          .filter((type) => type && type.trim() !== ""),
      ),
    ];
    return ["All", ...types.sort()];
  }, []);

  const landSizes = useMemo(() => {
    const sizes = [
      ...new Set(
        properties
          .map((p) => p.landSize)
          .filter((size) => size && size.trim() !== ""),
      ),
    ];
    return ["All", ...sizes.sort((a, b) => parseInt(a) - parseInt(b))];
  }, []);

  // Filter properties - exclude sold properties (isSold === true)
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // არ ვაჩვენოთ გაყიდული ნაკვეთები
      if (property.isSold === true) {
        return false;
      }

      const typeMatch =
        selectedType === "All" || property.type === selectedType;
      const landSizeMatch =
        selectedLandSize === "All" || property.landSize === selectedLandSize;
      return typeMatch && landSizeMatch;
    });
  }, [selectedType, selectedLandSize]);

  const handlePropertyClick = (property) => {
    // Save the current page info before navigating
    sessionStorage.setItem("propertyListingReferrer", "listing");
    sessionStorage.setItem("propertyListingUrl", window.location.pathname);

    router.push(`/${locale}/property/${property.houseNo}`);
  };

  const handleSearch = () => {
    console.log("Searching with filters:", { selectedType, selectedLandSize });
  };

  return (
    <>
      <style jsx global>{`
        /* Custom select styling */
        .custom-select {
          background-color: #c2b49b;
          border: none;
          border-bottom: 1px solid rgba(49, 38, 24, 0.3);
          border-radius: 0;
          padding: 10px 32px 10px 12px;
          font-size: 14px;
          color: #312618;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }

        .custom-select:hover {
          background-color: #ed5c3f;
          border-bottom-color: #312618;
          color: #f7ead7;
        }

        .custom-select:focus {
          outline: none;
          background-color: #ed5c3f;
          border-bottom: 2px solid #312618;
          color: #f7ead7;
        }

        /* Custom scrollbar for dropdown options */
        .custom-select option {
          background-color: #c2b49b;
          color: #312618;
          padding: 10px;
          font-weight: 500;
        }

        .custom-select option:hover {
          background-color: #ed5c3f;
          color: white;
        }

        .custom-select option:checked {
          background-color: #312618;
          color: #f7ead7;
        }

        /* Custom scrollbar */
        select::-webkit-scrollbar {
          width: 2px;
        }

        select::-webkit-scrollbar-track {
          background: rgba(194, 180, 155, 0.3);
        }

        select::-webkit-scrollbar-thumb {
          background: #ed5c3f;
          border-radius: 1px;
        }

        select::-webkit-scrollbar-thumb:hover {
          background: #d44d31;
        }

        /* Firefox scrollbar */
        select {
          scrollbar-width: thin;
          scrollbar-color: #ed5c3f rgba(194, 180, 155, 0.3);
        }

        /* Mobile select fix */
        @media (max-width: 1024px) {
          .custom-select {
            padding: 8px 32px 8px 10px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="bg-white overflow-hidden min-[1051px]:h-[calc(100vh-148px)]">
        <div className="flex flex-col lg:flex-row h-full relative">
          {/* Top Navigation Buttons - ჩანს მხოლოდ 1051px-დან ზემოთ */}
          <div className="hidden min-[1051px]:flex absolute top-6 right-8 z-20 gap-2">
            <button
              onClick={() => router.push(`/${locale}/choose-propertie`)}
              className="px-4 py-2 text-sm font-medium transition-all cursor-pointer bg-white border border-[#312618] text-[#000000] hover:bg-[#312618]/10"
            >
              {t("chooseProperty.visualSelection")}
            </button>
            <button className="px-4 py-2 text-sm font-medium transition-all cursor-pointer bg-[#312618] text-[#FFFFF] shadow-md">
              {t("chooseProperty.propertyListing")}
            </button>
          </div>

          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:flex lg:w-[345px] bg-[#C2B49B] flex-col">
            {/* Filter Header */}
            <div className="bg-[#F7EAD7] px-4 py-4">
              <h2 className="text-xl text-[#000000] font-contractica-regular uppercase tracking-wide text-center">
                {t("propertyListing.filter")}
              </h2>
            </div>

            {/* Filter Content */}
            <div className="px-6 py-8 flex-1 flex flex-col">
              {/* Type Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm text-[#312618] font-medium w-20">
                    {t("propertyListing.type")}
                  </label>
                  <div className="relative flex-1">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="custom-select w-full"
                      size="1"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type === "All" ? t("propertyListing.all") : type}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#312618] pointer-events-none"
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
                  </div>
                </div>
              </div>

              {/* Land Size Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm text-[#312618] font-medium w-20">
                    {t("propertyListing.landSize")}
                  </label>
                  <div className="relative flex-1">
                    <select
                      value={selectedLandSize}
                      onChange={(e) => setSelectedLandSize(e.target.value)}
                      className="custom-select w-full"
                      size="1"
                    >
                      {landSizes.map((size) => (
                        <option key={size} value={size}>
                          {size === "All"
                            ? t("propertyListing.all")
                            : `${size} ${t("propertyListing.m2")}`}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#312618] pointer-events-none"
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
            {/* Filter Mobile */}
            <div className="bg-[#C2B49B] p-4">
              <div className="bg-[#F7EAD7] px-4 py-3 mb-4">
                <h2 className="text-lg text-[#000000] font-contractica-regular uppercase tracking-wide text-center">
                  {t("propertyListing.filter")}
                </h2>
              </div>

              <div className="space-y-3">
                {/* Type Filter Mobile */}
                <div className="flex items-center gap-3">
                  <label className="text-sm text-[#312618] font-medium w-[70px]">
                    {t("propertyListing.type")}
                  </label>
                  <div className="relative flex-1">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="custom-select w-full"
                      size="1"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type === "All" ? t("propertyListing.all") : type}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#312618] pointer-events-none"
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
                  </div>
                </div>

                {/* Land Size Filter Mobile */}
                <div className="flex items-center gap-3">
                  <label className="text-sm text-[#312618] font-medium w-[70px]">
                    {t("propertyListing.landSize")}
                  </label>
                  <div className="relative flex-1">
                    <select
                      value={selectedLandSize}
                      onChange={(e) => setSelectedLandSize(e.target.value)}
                      className="custom-select w-full"
                      size="1"
                    >
                      {landSizes.map((size) => (
                        <option key={size} value={size}>
                          {size === "All"
                            ? t("propertyListing.all")
                            : `${size} ${t("propertyListing.m2")}`}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#312618] pointer-events-none"
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
                  </div>
                </div>

                {/* Search Button Mobile */}
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
                        {property.type} {property.houseNo}
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
                      {property.type} {property.houseNo}
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
