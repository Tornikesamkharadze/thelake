"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";

const STATIC_IMAGES = {
  Interior: [
    "/interior/1.webp",
    "/interior/2.webp",
    "/interior/3.webp",
    "/interior/4.webp",
    "/interior/5.webp",
    "/interior/6.webp",
    "/interior/7.webp",
    "/interior/8.webp",
    "/interior/9.webp",
    "/interior/10.webp",
    "/interior/11.webp",
    "/interior/12.webp",
    "/interior/13.webp",
    "/interior/14.webp",
    "/interior/15.webp",
    "/interior/16.webp",
    "/interior/17.webp",
    "/interior/18.webp",
  ],
  Exterior: [
    "/exterior/v1.webp",
    "/exterior/v2.webp",
    "/exterior/v3.webp",
    "/exterior/v4.webp",
    "/exterior/v5.webp",
  ],
};

export default function Gallery() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState("Exterior");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [images] = useState(STATIC_IMAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const currentImages = images[activeFilter];
  const allImages = currentImages;

  useEffect(() => {
    if (swiperInstance && currentImages.length > 1) {
      swiperInstance.slideTo(1);
    }
  }, [activeFilter, swiperInstance, currentImages.length]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
            {t("gallery.title")}
          </h2>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">{t("gallery.loading")}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl md:text-4xl text-[#000000] font-normal md:flex-1 text-center w-full md:w-auto">
              {t("gallery.title")}
            </h2>

            <div className="flex gap-2 text-sm md:text-base items-baseline md:absolute md:right-4 lg:right-8">
              <button
                onClick={() => setActiveFilter("Exterior")}
                className={`px-4 py-2 transition-colors cursor-pointer ${
                  activeFilter === "Exterior"
                    ? "text-[#312618] font-black"
                    : "text-[#312618] font-normal hover:text-gray-600"
                }`}
              >
                {t("gallery.exterior")}
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setActiveFilter("Interior")}
                className={`px-4 py-2 transition-colors cursor-pointer ${
                  activeFilter === "Interior"
                    ? "text-[#312618] font-black"
                    : "text-[#312618] font-normal hover:text-gray-600"
                }`}
              >
                {t("gallery.interior")}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full overflow-visible">
          {currentImages.length > 0 ? (
            <div className="min-h-[400px] md:min-h-[600px]">
              <Swiper
                onSwiper={setSwiperInstance}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.5}
                spaceBetween={50}
                initialSlide={1}
                loop={false}
                speed={1000}
                pagination={false}
                navigation={true}
                modules={[Navigation]}
                className="gallery-swiper"
              >
                {currentImages.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => openLightbox(index)}
                    className="cursor-pointer"
                  >
                    <div className="relative w-full h-[300px] md:h-[500px]">
                      <img
                        src={image}
                        alt={`${t("gallery.imageAlt")} ${index + 1}`}
                        className="w-full h-full object-cover shadow-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {t("gallery.noImages")}
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-pointer"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
          >
            <X size={40} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
          >
            <ChevronLeft size={48} />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] mx-4 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[currentImageIndex]}
              alt={`${t("gallery.imageAlt")} ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
          >
            <ChevronRight size={48} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
