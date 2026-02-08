"use client";

import React, { useState } from "react";
import Image from "next/image";
import { properties } from "@/lib/dummyData";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation"; // ← დამატებული

const ChoosePropertie = () => {
  const t = useTranslations();
  const router = useRouter(); // ← დამატებული

  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [activeView, setActiveView] = useState("Visual");

  const handlePolygonHover = (property, event) => {
    setSelectedProperty(property);
    setHoveredProperty(property);
  };

  const handlePolygonLeave = () => {
    setHoveredProperty(null);
  };

  // ← დამატებული ფუნქცია
  const handlePolygonClick = (property) => {
    // Navigate to property detail page
    router.push(`/ka/property/${property.houseNo}`);
  };

  return (
    <div className="h-[calc(100vh-148px)] bg-white overflow-hidden">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row h-full">
        {/* Property Info Card - Left Side */}
        <div className="lg:w-[400px] w-full bg-[#C2B49B] flex flex-col h-full lg:h-auto overflow-y-auto">
          {/* Title */}
          <div className="bg-[#F7EAD7] px-6 py-6">
            <h1 className="text-2xl font-light text-[#000000] font-contractica-regular uppercase tracking-wide text-center">
              {selectedProperty?.type} - {selectedProperty?.houseNo}
            </h1>
          </div>

          {/* Property Details */}
          <div className="px-6 py-4 space-y-0">
            {/* Code */}
            <div className="py-4 border-b border-gray-800/20">
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-700">
                  {t("chooseProperty.code")}
                </span>
                <span className="text-sm font-medium text-gray-900 text-right">
                  {selectedProperty?.sakadastroKodi || "---"}
                </span>
              </div>
            </div>

            {/* Land Size */}
            <div className="py-4 border-b border-gray-800/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  {t("chooseProperty.landSize")}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedProperty?.landSize} m2
                </span>
              </div>
            </div>

            {/* Building Space */}
            <div className="py-4 border-b border-gray-800/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  {t("chooseProperty.buildingSpace")}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedProperty?.buildingSpace ||
                    t("chooseProperty.defaultBuildingSpace")}
                </span>
              </div>
            </div>
          </div>

          {/* Property 2D Image */}
          <div className="mt-auto px-6 pb-6">
            {selectedProperty?.twoDImg ? (
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
              onClick={() => setActiveView("Listing")}
              className={`px-6 py-2 text-sm font-medium transition-all cursor-pointer  ${
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
                        property.isSold ? "fill-red-500/50" : "fill-transparent"
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
      </div>
    </div>
  );
};

export default ChoosePropertie;
