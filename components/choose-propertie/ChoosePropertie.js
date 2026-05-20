"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";

const MAP_SVG_URL = "/map.svg";

const ChoosePropertie = ({ properties = [] }) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || "ka";

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [svgContent, setSvgContent] = useState("");
  const mapContainerRef = useRef(null);
  const handlersRef = useRef({});

  const hasValue = (value) => {
    return value && value.trim() !== "";
  };

  const handlePolygonHover = (property, event) => {
    setSelectedProperty(property ?? null);
    setHoveredProperty(property ?? null);
    if (event?.target) {
      event.target.style.fill = "rgba(199,178,153,1)";
    }
  };

  const handlePolygonLeave = (event, baseFill = "transparent") => {
    setHoveredProperty(null);
    if (event?.target) {
      event.target.style.fill = baseFill;
    }
  };

  const handlePolygonClick = (property) => {
    sessionStorage.setItem("propertyListingReferrer", "visual");
    sessionStorage.setItem("propertyListingUrl", window.location.pathname);
    router.push(`/${locale}/property/${(property.houseNo || "").toUpperCase()}`);
  };

  handlersRef.current = {
    handlePolygonClick,
    handlePolygonHover,
    handlePolygonLeave,
  };

  // Load map SVG once and inject into container (so re-renders don't replace DOM and kill listeners)
  useEffect(() => {
    fetch(MAP_SVG_URL)
      .then((r) => r.text())
      .then((html) =>
        setSvgContent(html.replace(/<\?xml[^?]*\?>\s*/i, "").trim())
      )
      .catch(() => setSvgContent(""));
  }, []);

  // Inject SVG into container once (never from render – avoids replacing nodes and losing listeners)
  useEffect(() => {
    if (!mapContainerRef.current || !svgContent) return;
    if (mapContainerRef.current.hasChildNodes()) return;
    mapContainerRef.current.innerHTML = svgContent;
  }, [svgContent]);

  // Attach click/hover to SVG shape elements (polygon + path) whose id matches a property (by houseNo, uppercase)
  useEffect(() => {
    if (!mapContainerRef.current || !svgContent || !properties.length) return;
    const svg = mapContainerRef.current.querySelector("svg");
    if (!svg) return;

    const byId = new Map(
      properties.map((p) => [(p.houseNo || "").toUpperCase(), p])
    );
    const cleanup = [];

    // All shape elements with id (polygon + path); use tagName so SVG-in-HTML / namespace doesn’t skip polygons
    const polygons = [...svg.querySelectorAll("polygon[id]")];
    const paths = [...svg.querySelectorAll("path[id]")];
    const shapes = [...polygons, ...paths];

    shapes.forEach((el) => {
      const id = (el.id || "").toUpperCase();
      const prop = byId.get(id);

      if (!prop?.coords) {
        el.style.fill = "transparent";
        el.style.pointerEvents = "none";
        el.style.cursor = "default";
        return;
      }

      const baseFill = prop.isSold ? "rgba(239,68,68,1)" : "transparent";
      el.style.fill = baseFill;

      const onEnter = (e) => handlersRef.current.handlePolygonHover(prop, e);
      const onLeave = (e) => handlersRef.current.handlePolygonLeave(e, baseFill);
      const onClick = () => handlersRef.current.handlePolygonClick(prop);

      el.style.cursor = "pointer";
      el.style.pointerEvents = "auto";
      el.addEventListener("click", onClick);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      cleanup.push(() => {
        el.removeEventListener("click", onClick);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, [svgContent, properties]);

  return (
    <div className="h-[calc(100vh-148px)] bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">
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
              <div className="mt-[50px] px-6 pb-6">
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
        <div className="flex-1 bg-[#ed5c3f] relative h-full lg:h-full overflow-hidden">
          {/* Top Buttons */}
          <div className="absolute top-4 right-4 z-45 flex gap-2">
            <button className="px-6 py-2 text-sm font-medium transition-all cursor-pointer bg-[#312618] text-[#F7EAD7] shadow-md">
              {t("chooseProperty.visualSelection")}
            </button>
            <button
              onClick={() => router.push(`/${locale}/property-listing`)}
              className="px-6 py-2 text-sm font-medium transition-all cursor-pointer bg-[#F7EAD7]/90 text-[#312618] border border-[#312618] hover:bg-[#C2B49B]"
            >
              {t("chooseProperty.propertyListing")}
            </button>
          </div>

          {/* Map from main.svg – injected once in effect so paths stay clickable; territory.png as bg, SVG overlays on top */}
          <div
            className="relative w-full h-full flex items-center justify-center bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/territory.png)" }}
          >
            <div
              ref={mapContainerRef}
              className="relative z-10 w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
            />
            {!svgContent && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                {t("chooseProperty.loadingMap") || "Loading map…"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePropertie;
