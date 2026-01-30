import { getAlternateUrls } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "სერვისები თქვენთვის - The Lake by Placemakers"
      : "Services for You - The Lake by Placemakers",
    description: isKa
      ? "განსაკუთრებული კონსიერჟ სერვისები The Lake-ში. მიტანიდან და დალაგებიდან ბიზნეს ლაუნჯამდე და ბავშვების ზონამდე."
      : "Experience exceptional concierge services at The Lake. From delivery and housekeeping to business lounge, kids zone, gardening, and pet care. Everything you need for effortless lakeside living.",
    keywords: [
      "concierge services Lisi Lake",
      "delivery service Tbilisi",
      "housekeeping services",
      "business lounge Lisi Lake",
      "kids zone The Lake",
      "gardening services Tbilisi",
      "pet services Georgia",
      "luxury amenities Lisi Lake",
      "The Lake by Placemakers",
      "residential services Tbilisi",
      "community services Georgia",
      "lifestyle services Lisi Lake",
      "home care services",
      "pet grooming Tbilisi",
      "professional cleaning services",
      "lakeside community amenities",
    ],
    openGraph: {
      title: isKa
        ? "სერვისები თქვენთვის | The Lake by Placemakers"
        : "Services for You | The Lake by Placemakers",
      description: isKa
        ? "სასურსათიდან ცხოველების მოვლამდე. ყველა სერვისი თქვენი ცხოვრების გასამარტივებლად."
        : "From groceries to pet care, housekeeping to gardening. Every service designed to make your life at The Lake seamless and extraordinary.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "სერვისები - უმარტივესი ცხოვრება The Lake-ში"
        : "Services for You - Effortless Living at The Lake",
      description: isKa
        ? "მიტანა, დალაგება, ბიზნეს ლაუნჯი, ბავშვების ზონა, ბაღი და ცხოველების სერვისები."
        : "Delivery, housekeeping, business lounge, kids zone, gardening & pet services. Everything you need for luxury lakeside living.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/services-for-you"),
  };
}

export default function ServicesForYouLayout({ children }) {
  return children;
}
