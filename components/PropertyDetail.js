"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const PropertyDetail = ({ property }) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || "ka";

  const [referrerInfo, setReferrerInfo] = useState(null);

  useEffect(() => {
    const referrer = sessionStorage.getItem("propertyListingReferrer");
    const referrerUrl = sessionStorage.getItem("propertyListingUrl");

    if (referrer && referrerUrl) {
      setReferrerInfo({ type: referrer, url: referrerUrl });
    }
  }, []);

  const handleBack = () => {
    sessionStorage.removeItem("propertyListingReferrer");
    sessionStorage.removeItem("propertyListingUrl");

    if (referrerInfo) {
      const targetUrl = referrerInfo.url.replace(/\/(ka|en)\//, `/${locale}/`);
      router.push(targetUrl);
    } else {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push(`/${locale}/choose-propertie`);
      }
    }
  };

  const hasValue = (value) => {
    return value && value !== "---" && value.trim() !== "";
  };

  return (
    <div className="h-[calc(100vh-148px)] bg-white overflow-hidden relative">
      {/* Background Image - Full Width */}
      <div className="absolute inset-0">
        <Image
          src="/land-plot.webp"
          alt="Property Map"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Property Info Box - Floating on Background */}
      <div className="relative h-full flex items-start pt-6 pl-6 lg:pt-8 lg:pl-8">
        <div className="w-full max-w-[350px] bg-[#D4C4A8] flex flex-col max-h-[calc(100%-48px)] overflow-y-auto">
          {/* Header with Back Button and Title */}
          <div className="bg-[#F7EAD7] px-6 py-6">
            <div className="flex items-start gap-3">
              <button
                onClick={handleBack}
                className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <h1 className="text-2xl font-light text-gray-800 uppercase tracking-wide">
                {property?.type} - {property?.houseNo}
              </h1>
            </div>
          </div>

          {/* Property Details */}
          <div className="px-6 py-6 space-y-3 flex-1">
            {/* View */}
            {hasValue(property?.view) && (
              <div className="flex gap-2">
                <span className="text-sm text-gray-700 font-medium">
                  {t("propertyDetail.view")}:
                </span>
                <span className="text-sm text-gray-700">{property.view}</span>
              </div>
            )}

            {/* Sector */}
            {hasValue(property?.sector) && (
              <div className="flex gap-2">
                <span className="text-sm text-gray-700 font-medium">
                  {t("propertyDetail.sector")}:
                </span>
                <span className="text-sm text-gray-700">
                  {property.sector}
                </span>
              </div>
            )}

            {/* Cadastral plot number */}
            {hasValue(property?.sakadastroKodi) && (
              <div className="flex gap-2">
                <span className="text-sm text-gray-700 font-medium">
                  {t("propertyDetail.cadastralPlotNumber")}:
                </span>
                <span className="text-sm text-gray-700">
                  {property.sakadastroKodi}
                </span>
              </div>
            )}

            {(hasValue(property?.view) ||
              hasValue(property?.sector) ||
              hasValue(property?.sakadastroKodi)) && (
              <div className="border-t border-gray-800/20 pt-3"></div>
            )}

            {/* Total land area */}
            {hasValue(property?.landSize) && (
              <div className="flex gap-2">
                <span className="text-sm text-gray-700 font-medium">
                  {t("propertyDetail.totalLandArea")}:
                </span>
                <span className="text-sm text-gray-700">
                  {property.landSize} m2
                </span>
              </div>
            )}

            {/* Total house area */}
            {hasValue(property?.totalHouseArea) && (
              <div className="flex gap-2">
                <span className="text-sm text-gray-700 font-medium">
                  {t("propertyDetail.totalHouseArea")}:
                </span>
                <span className="text-sm text-gray-700">
                  {property.totalHouseArea}
                </span>
              </div>
            )}

            {(hasValue(property?.landSize) ||
              hasValue(property?.totalHouseArea)) && (
              <div className="border-t border-gray-800/20 pt-3"></div>
            )}

            {/* Living area */}
            {(hasValue(property?.firstFloor) ||
              hasValue(property?.secondFloor)) && (
              <div>
                <div className="text-sm text-gray-700 font-medium mb-1">
                  {t("propertyDetail.livingArea")}:
                </div>
                <div className="pl-3 space-y-1">
                  {hasValue(property?.firstFloor) && (
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {t("propertyDetail.firstFloor")}:
                      </span>
                      <span className="text-sm text-gray-700">
                        {property.firstFloor}
                      </span>
                    </div>
                  )}
                  {hasValue(property?.secondFloor) && (
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {t("propertyDetail.secondFloor")}:
                      </span>
                      <span className="text-sm text-gray-700">
                        {property.secondFloor}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(hasValue(property?.firstFloor) ||
              hasValue(property?.secondFloor)) && (
              <div className="border-t border-gray-800/20 pt-3"></div>
            )}

            {/* Terrace area */}
            {(hasValue(property?.terraceArea) ||
              hasValue(property?.terraceFirstFloor) ||
              hasValue(property?.terraceSecondFloor)) && (
              <div>
                <div className="text-sm text-gray-700 font-medium mb-1">
                  {t("propertyDetail.terraceArea")}:
                </div>
                <div className="pl-3 space-y-1">
                  {hasValue(property?.terraceArea) && (
                    <div className="text-sm text-gray-700">
                      {property.terraceArea}
                    </div>
                  )}
                  {hasValue(property?.terraceFirstFloor) && (
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {t("propertyDetail.firstFloor")}:
                      </span>
                      <span className="text-sm text-gray-700">
                        {property.terraceFirstFloor}
                      </span>
                    </div>
                  )}
                  {hasValue(property?.terraceSecondFloor) && (
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {t("propertyDetail.secondFloor")}:
                      </span>
                      <span className="text-sm text-gray-700">
                        {property.terraceSecondFloor}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(hasValue(property?.terraceArea) ||
              hasValue(property?.terraceFirstFloor) ||
              hasValue(property?.terraceSecondFloor)) && (
              <div className="border-t border-gray-800/20 pt-3"></div>
            )}

            {/* Ceiling heights */}
            {(hasValue(property?.ceilingHeights) ||
              hasValue(property?.entranceHall) ||
              hasValue(property?.mainAreas) ||
              hasValue(property?.bedrooms)) && (
              <div>
                <div className="text-sm text-gray-700 font-medium mb-1">
                  {t("propertyDetail.ceilingHeights")}:
                </div>
                <div className="pl-3 space-y-1">
                  {hasValue(property?.ceilingHeights) && (
                    <div className="text-sm text-gray-700">
                      {property.ceilingHeights}
                    </div>
                  )}
                  {hasValue(property?.entranceHall) && (
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {t("propertyDetail.entranceHall")}:
                      </span>
                      <span className="text-sm text-gray-700">
                        {property.entranceHall}
                      </span>
                    </div>
                  )}
                  {hasValue(property?.mainAreas) && (
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {t("propertyDetail.mainAreas")}:
                      </span>
                      <span className="text-sm text-gray-700">
                        {property.mainAreas}
                      </span>
                    </div>
                  )}
                  {hasValue(property?.bedrooms) && (
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {t("propertyDetail.bedrooms")}:
                      </span>
                      <span className="text-sm text-gray-700">
                        {property.bedrooms}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Reserve Button */}
          <div className="px-6 pb-6 flex justify-center">
            <Link href={`/${locale}/enquire`} className="max-w-[200px] w-full">
              <button className="w-full bg-[#ED5C3F] hover:bg-[#d94d30] text-white font-medium py-3 px-6 transition-colors uppercase tracking-wide cursor-pointer">
                {t("propertyDetail.reserve")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;