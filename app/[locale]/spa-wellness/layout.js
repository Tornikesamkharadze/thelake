import { getAlternateUrls } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "სპა და ველნესი - ელეგანტური აუზი პანორამული ხედებით | The Lake by Placemakers"
      : "Spa & Wellness - The Lake by Placemakers",
    description: isKa
      ? "სრული ველნესი The Lake-ში. ბუნებრივი სპა მკურნალობა, ელეგანტური აუზი პანორამული ხედებით და ტბის პირას იოგა."
      : "Complete wellness sanctuary at The Lake. Natural spa treatments inspired by the lakeside landscape, elegant pool with panoramic views, modern gym with latest equipment, and lakeside yoga sessions.",
    keywords: [
      "spa Lisi Lake",
      "wellness center Tbilisi",
      "luxury spa Georgia",
      "yoga classes Lisi Lake",
      "fitness gym Tbilisi",
      "swimming pool Lisi Lake",
      "massage treatments Georgia",
      "lakeside yoga Tbilisi",
      "natural spa treatments",
      "wellness retreat Georgia",
      "The Lake by Placemakers",
      "spa facials Tbilisi",
      "outdoor yoga Georgia",
      "luxury fitness center",
      "holistic wellness Lisi Lake",
      "relaxation spa Tbilisi",
    ],
    openGraph: {
      title: isKa
        ? "სპა და ველნესი | The Lake by Placemakers"
        : "Spa & Wellness | The Lake by Placemakers",
      description: isKa
        ? "ბუნებრივი სპა მკურნალობა, ელეგანტური აუზი, თანამედროვე დარბაზი და იოგა ტბის პირას."
        : "Natural spa treatments, elegant lakeside pool, modern gym, and yoga by the water. Your wellness sanctuary surrounded by nature at Lisi Lake.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "სპა და ველნესი - დასვენება The Lake-ში"
        : "Spa & Wellness - Rest & Renewal at The Lake",
      description: isKa
        ? "სპა, აუზი, დარბაზი და იოგა. სრული ველნესი ტბის ხედებით."
        : "Spa, pool, gym, and yoga. Complete wellness experience with lake views and natural surroundings. Balance restored daily.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/spa-wellness"),
  };
}

export default function SpaWellnessLayout({ children }) {
  return children;
}
