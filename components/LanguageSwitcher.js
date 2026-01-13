"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher({ className = "" }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    // ✅ უფრო რელიაბილური - ამოიღებს locale-ს pathname-დან
    const segments = pathname.split("/").filter(Boolean);

    // თუ პირველი segment არის locale, შეცვალე ის
    if (segments[0] === locale) {
      segments[0] = newLocale;
    } else {
      // თუ არ არის locale pathname-ში, დაამატე
      segments.unshift(newLocale);
    }

    router.push(`/${segments.join("/")}`);
    router.refresh(); // ✅ force refresh რომ messages განახლდეს
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => switchLocale("en")}
        className={`hover:text-[#d3b473] transition-colors cursor-pointer ${
          locale === "en" ? "font-bold" : ""
        }`}
      >
        Eng
      </button>
      <span>/</span>
      <button
        onClick={() => switchLocale("ka")}
        className={`hover:text-[#d3b473] transition-colors cursor-pointer ${
          locale === "ka" ? "font-bold" : ""
        }`}
      >
        Geo
      </button>
    </div>
  );
}
