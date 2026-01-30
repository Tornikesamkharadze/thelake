import { getAlternateUrls } from "@/lib/metadata";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "ჩვენს შესახებ - პრემიუმ უბანი ლისზე"
      : "About Us - Luxury Neighbourhood Tbilisi",
    description: isKa
      ? "გაეცანით The Lake by Placemakers - კერძო უბანი 90 ვილითა და სახლით 14 ჰექტარზე ლისის ტბის პირას. განიცადეთ ექსკლუზიური ცხოვრება ტბის პირას მხოლოდ 7 კმ თბილისის ცენტრიდან."
      : "Discover The Lake by Placemakers - a private neighbourhood of 90 villas and houses on 14 hectares by Lisi Lake. Experience exclusive lakeside living just 7 km from Tbilisi city centre, shaped by international architecture and nature's calm.",
    keywords: [
      "The Lake Placemakers",
      "Lisi Lake villas",
      "luxury neighbourhood Tbilisi",
      "private community Georgia",
      "lakeside living Tbilisi",
      "exclusive villas Lisi Lake",
      "international architecture Georgia",
      "premium real estate Tbilisi",
      "The Lake team",
      "Placemakers Tbilisi",
      "luxury homes Georgia",
      "lake view properties",
      "private neighbourhood Lisi Lake",
      "real estate development Tbilisi",
      "lakeside community Georgia",
    ],
    openGraph: {
      title: isKa
        ? "ჩვენს შესახებ | The Lake by Placemakers"
        : "About Us | The Lake by Placemakers",
      description: isKa
        ? "კერძო უბანი 90 ვილითა და სახლით 14 ჰექტარზე ლისის ტბის პირას. მხოლოდ 7 კმ ცენტრიდან."
        : "A private neighbourhood of 90 villas and houses on 14 hectares by Lisi Lake. Just 7 km from the city centre, offering exclusive lifestyle shaped by international architecture.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "The Lake - ექსკლუზიური ცხოვრება ლისის ტბის პირას"
        : "About The Lake - Exclusive Lakeside Living in Tbilisi",
      description: isKa
        ? "90 ვილა და სახლი 14 ჰექტარზე ლისის ტბის პირას. 7 კმ თბილისის ცენტრიდან."
        : "90 villas and houses on 14 hectares by Lisi Lake. International architecture meets nature's calm, just 7 km from Tbilisi city centre.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/about"),
  };
}

export default function AboutLayout({ children }) {
  return children;
}
