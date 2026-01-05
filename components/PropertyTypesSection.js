// components/PropertyTypesSection.jsx
import { useTranslations } from "next-intl";
export default function PropertyTypesSection() {
  const t = useTranslations("plot-types");
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] bg-black">
      {/* Background Image */}
      <img
        src="/lake-background.webp"
        alt="Lake view"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
          <button className="bg-[#F7EAD7] text-black py-4 px-8 uppercase tracking-[0.3em] text-sm hover:opacity-90 transition-opacity w-full md:w-auto cursor-pointer">
            {t("private-houses")}
          </button>
          <button className="bg-[#F7EAD7] text-black py-4 px-8 uppercase tracking-[0.3em] text-sm hover:opacity-90 transition-opacity w-full md:w-auto cursor-pointer">
            {t("land-plots")}
          </button>
          <button className="bg-[#F7EAD7] text-black py-4 px-8 uppercase tracking-[0.3em] text-sm hover:opacity-90 transition-opacity w-full md:w-auto cursor-pointer">
            {t("private-villas")}
          </button>
        </div>
      </div>
    </section>
  );
}
