import { getAlternateUrls } from "@/lib/metadata";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "ქონების სია - ვილები და სახლები გასაყიდად | The Lake by Placemakers"
      : "Property Listing - Villas & Houses for Sale | The Lake by Placemakers",
    description: isKa
      ? "დაათვალიერეთ ხელმისაწვდომი ვილები და სახლები The Lake-ში, ლისის ტბის პირას. ფილტრეთ ტიპის, ფართობისა და სტატუსის მიხედვით."
      : "Browse available villas and houses at The Lake by Placemakers, on the shores of Lisi Lake. Filter by type, size, and status to find your future home.",
    keywords: [
      "The Lake property listing",
      "Lisi Lake villas for sale",
      "luxury houses Tbilisi for sale",
      "Lisi Lake real estate listing",
      "The Lake by Placemakers properties",
    ],
    openGraph: {
      title: isKa
        ? "ქონების სია | The Lake by Placemakers"
        : "Property Listing | The Lake by Placemakers",
      description: isKa
        ? "ვილები და სახლები გასაყიდად ლისის ტბის პირას, The Lake by Placemakers."
        : "Villas and houses for sale by Lisi Lake, The Lake by Placemakers.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "ქონების სია | The Lake by Placemakers"
        : "Property Listing | The Lake by Placemakers",
      description: isKa
        ? "დაათვალიერეთ ხელმისაწვდომი ვილები და სახლები ლისის ტბის პირას."
        : "Browse available villas and houses by Lisi Lake.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/property-listing"),
  };
}

export default function PropertyListingLayout({ children }) {
  return children;
}
