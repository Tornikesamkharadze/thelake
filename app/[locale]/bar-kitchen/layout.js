import { getAlternateUrls } from "@/lib/metadata";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "ბარი და სამზარეულო - The Lake by Placemakers"
      : "Bar & Kitchen - The Lake by Placemakers",
    description: isKa
      ? "განიცადეთ განსაკუთრებული სადილი The Lake-ში. ახალი საცხობი, ბარი ქართული სპირიტებით და ფერმიდან მაგიდამდე რესტორანი სეზონური ინგრედიენტებით."
      : "Experience exceptional dining at The Lake. Fresh bakery with sourdough and pastries, relaxed bar with signature cocktails and Georgian spirits, and farm-to-table restaurant with open kitchen featuring seasonal local ingredients.",
    keywords: [
      "restaurant Lisi Lake",
      "bar Tbilisi",
      "bakery Lisi Lake",
      "farm-to-table restaurant Georgia",
      "open kitchen restaurant",
      "Georgian spirits bar",
      "signature cocktails Tbilisi",
      "sourdough bakery Georgia",
      "local ingredients restaurant",
      "cooking classes Tbilisi",
      "seasonal menu Lisi Lake",
      "The Lake by Placemakers",
      "lakeside dining Tbilisi",
      "specialty wine shop Georgia",
      "artisan bakery Tbilisi",
      "gastropub Lisi Lake",
    ],
    openGraph: {
      title: isKa
        ? "ბარი და სამზარეულო | The Lake by Placemakers"
        : "Bar & Kitchen | The Lake by Placemakers",
      description: isKa
        ? "საცხობიდან ფერმიდან მაგიდამდე სადილამდე. ხელოსნური საცხობი, ბარი ქართული სპირიტებით და რესტორანი ღია სამზარეულოთი."
        : "From fresh sourdough to farm-to-table dining. Artisan bakery, relaxed bar with Georgian spirits, and restaurant with open kitchen. Where quality meets comfort by the lake.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "ბარი და სამზარეულო - განსაკუთრებული სადილი The Lake-ში"
        : "Bar & Kitchen - Exceptional Dining at The Lake",
      description: isKa
        ? "საცხობი, ბარი და რესტორანი. სეზონური ინგრედიენტები, ხელნაკეთი კოქტეილები ლისის ტბის პირას."
        : "Bakery, bar, and farm-to-table restaurant. Seasonal ingredients, signature cocktails, and warm atmosphere by Lisi Lake.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/bar-kitchen"),
  };
}

export default function BarKitchenLayout({ children }) {
  return children;
}
