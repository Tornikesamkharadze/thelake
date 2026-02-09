"use client";

import React, { useState } from "react";
import Image from "next/image";
import { properties } from "@/lib/dummyData";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";

const ChoosePropertie = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || "ka";

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [activeView, setActiveView] = useState("Visual");

  // Helper function to check if value exists and is not empty
  const hasValue = (value) => {
    return value && value.trim() !== "";
  };

  const handlePolygonHover = (property, event) => {
    setSelectedProperty(property);
    setHoveredProperty(property);
  };

  const handlePolygonLeave = () => {
    setHoveredProperty(null);
  };

  const handlePolygonClick = (property) => {
    // Save the current page info before navigating
    sessionStorage.setItem("propertyListingReferrer", "visual");
    sessionStorage.setItem("propertyListingUrl", window.location.pathname);

    router.push(`/${locale}/property/${property.houseNo}`);
  };

  return (
    <div className="h-[calc(100vh-148px)] bg-white overflow-hidden">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row h-full">
        {activeView === "Visual" ? (
          <>
            {/* Property Info Card - Left Side */}
            <div className="lg:w-[400px] w-full bg-[#C2B49B] flex flex-col h-full lg:h-auto overflow-y-auto">
              {selectedProperty ? (
                <>
                  {/* Title */}
                  <div className="bg-[#F7EAD7] px-6 py-6">
                    <h1 className="text-2xl font-light text-[#000000] font-contractica-regular uppercase tracking-wide text-center">
                      {selectedProperty.type} - {selectedProperty.houseNo}
                    </h1>
                  </div>

                  {/* Property Details */}
                  <div className="px-6 py-4 space-y-0">
                    {/* Code - only show if exists */}
                    {hasValue(selectedProperty.sakadastroKodi) && (
                      <div className="py-4 border-b border-gray-800/20">
                        <div className="flex justify-between items-start">
                          <span className="text-sm text-gray-700">
                            {t("chooseProperty.code")}
                          </span>
                          <span className="text-sm font-medium text-gray-900 text-right">
                            {selectedProperty.sakadastroKodi}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Land Size - only show if exists */}
                    {hasValue(selectedProperty.landSize) && (
                      <div className="py-4 border-b border-gray-800/20">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">
                            {t("chooseProperty.landSize")}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedProperty.landSize} m2
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Building Space - only show if exists */}
                    {hasValue(selectedProperty.buildingSpace) && (
                      <div className="py-4 border-b border-gray-800/20">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">
                            {t("chooseProperty.buildingSpace")}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedProperty.buildingSpace}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Status - always show */}
                    <div className="py-4 border-b border-gray-800/20">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          {t("chooseProperty.status")}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            selectedProperty.isSold
                              ? "text-[#ED5C3F]"
                              : "text-gray-900"
                          }`}
                        >
                          {selectedProperty.isSold
                            ? t("chooseProperty.sold")
                            : t("chooseProperty.available")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Property 2D Image */}
                  <div className="mt-auto px-6 pb-6">
                    {selectedProperty.twoDImg ? (
                      <div className="relative w-full aspect-4/3">
                        <Image
                          src={selectedProperty.twoDImg}
                          alt={`Property ${selectedProperty.houseNo}`}
                          fill
                          className="object-contain"
                          quality={95}
                          sizes="(max-width: 1024px) 100vw, 400px"
                          priority={false}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center bg-[#B5A28C] border-2 border-dashed border-gray-600 text-gray-700 text-sm">
                        {t("chooseProperty.no2DPlan")}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Instructions when no property selected */
                <div className="flex items-center justify-center h-full px-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto mb-6">
                      <svg
                        className="w-full h-full text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-light text-gray-800 font-contractica-regular">
                      {t("chooseProperty.instructionTitle")}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {t("chooseProperty.instructionText")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Map Container - Right Side */}
            <div className="flex-1 relative h-full lg:h-full overflow-hidden">
              {/* Top Buttons */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                  onClick={() => setActiveView("Visual")}
                  className={`px-6 py-2 text-sm font-medium transition-all cursor-pointer ${
                    activeView === "Visual"
                      ? "bg-white text-gray-900 shadow-md"
                      : "bg-white/70 text-gray-600 hover:bg-white/90"
                  }`}
                >
                  {t("chooseProperty.visualSelection")}
                </button>
                <button
                  onClick={() => router.push(`/${locale}/property-listing`)}
                  className={`px-6 py-2 text-sm font-medium transition-all cursor-pointer ${
                    activeView === "Listing"
                      ? "bg-white text-gray-900 shadow-md"
                      : "bg-white/70 text-gray-600 hover:bg-white/90"
                  }`}
                >
                  {t("chooseProperty.propertyListing")}
                </button>
              </div>

              {/* Background Map Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/akr.webp"
                  alt="Property Map"
                  width={1641}
                  height={1082}
                  className="w-full h-full object-fill"
                  priority
                />

                {/* SVG Overlay with Polygons */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 1641 1082"
                  preserveAspectRatio="none"
                >
                  {properties.map((property) =>
                    property.coords ? (
                      <polygon
                        key={property.id}
                        points={property.coords}
                        className={`
                          transition-all duration-300 cursor-pointer
                          ${
                            property.isSold
                              ? "fill-red-500/50"
                              : "fill-transparent"
                          }
                          hover:fill-[#C7B299]/70
                          ${
                            selectedProperty?.id === property.id
                              ? "fill-[#C7B299]/70"
                              : ""
                          }
                        `}
                        onMouseEnter={(e) => handlePolygonHover(property, e)}
                        onMouseLeave={handlePolygonLeave}
                        onClick={() => handlePolygonClick(property)}
                        style={{
                          stroke: "#2D1810",
                          strokeWidth: 1,
                        }}
                      />
                    ) : null,
                  )}
                </svg>
              </div>
            </div>
          </>
        ) : (
          /* Property Listing View */
          <div className="w-full h-full flex flex-col">
            {/* Top Buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => setActiveView("Visual")}
                className={`px-6 py-2 text-sm font-medium transition-all cursor-pointer ${
                  activeView === "Visual"
                    ? "bg-white text-gray-900 shadow-md"
                    : "bg-white/70 text-gray-600 hover:bg-white/90"
                }`}
              >
                {t("chooseProperty.visualSelection")}
              </button>
              <button
                onClick={() => router.push(`/${locale}/property-listing`)}
                className={`px-6 py-2 text-sm font-medium transition-all cursor-pointer ${
                  activeView === "Listing"
                    ? "bg-white text-gray-900 shadow-md"
                    : "bg-white/70 text-gray-600 hover:bg-white/90"
                }`}
              >
                {t("chooseProperty.propertyListing")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoosePropertie;
