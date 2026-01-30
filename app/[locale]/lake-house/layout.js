import { getAlternateUrls } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "ტბის სახლი Snøhetta - დიზაინი Snøhetta-ს მიერ | The Lake by Placemakers"
      : "Lake House by Snøhetta - The Lake by Placemakers",
    description: isKa
      ? "Lake House, დიზაინი Snøhetta-ს მიერ, არის ჩვენი ტბის პირის თემის გული. ელეგანტური შეხვედრების სივრცე რეგისტრაციით."
      : "The Lake House, designed by world-renowned Snøhetta studio, is the heart of our lakeside community. A chic gathering space for morning coffee, yoga, cultural events, and evening cocktails with panoramic lake views.",
    keywords: [
      "Lake House Snøhetta",
      "The Lake Lake House",
      "Snøhetta architecture",
      "community Lakehouse Lisi Lake",
      "lakeside Lake Tbilisi",
      "Norwegian architecture Georgia",
      "cultural events venue",
      "yoga studio Tbilisi",
      "panoramic lake views",
      "modern design Georgia",
      "The Lake by Placemakers",
      "Lisi Lake amenities",
      "exclusive community hub",
      "architectural landmark Tbilisi",
      "Oslo Opera House architects",
      "Snøhetta Tbilisi",
    ],
    openGraph: {
      title: isKa
        ? "Lake House by Snøhetta | The Lake by Placemakers"
        : "Lake House by Snøhetta | The Lake by Placemakers",
      description: isKa
        ? "იკონური Lake House დიზაინი Snøhetta-ს მიერ. რეგისტრაციადან გვიან ღამის შეხვედრებამდე."
        : "Iconic Lake House designed by world-leading Norwegian studio Snøhetta. Morning coffee to late-night gatherings, yoga sessions to art exhibitions, all with stunning lake views.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "Lake House by Snøhetta - სადაც თემი იკრიბება"
        : "Lake House by Snøhetta - Where Community Comes Together",
      description: isKa
        ? "ელეგანტური და ფუძემდებლური. თანამედროვე დიზაინი ქართული ავთენტურობით."
        : "Chic yet grounded. Modern design meets Georgian authenticity. From morning yoga to evening cocktails by the lake.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/lake-house"),
  };
}

export default function LakeHouseLayout({ children }) {
  return children;
}
