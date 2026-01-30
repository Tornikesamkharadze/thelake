import { getAlternateUrls } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "ტბის ცხოვრების სტილი - ცხოვრება ლისის ტბის პირას"
      : "The Lake Lifestyle - Life by Lisi Lake",
    description: isKa
      ? "განიცადეთ ცხოვრება ლისის ტბის პირას თბილისის მთავარ რეკრეაციულ არეალში. სუფთა ჰაერი, ღია ხედები, ლაშქრობის ბილიკები."
      : "Experience life by Lisi Lake in Tbilisi's main recreation area. Clean air, open views, hiking trails, water ponds, and mountain biking minutes from the city. Contemporary art, fishing, sports, and top-rated schools nearby.",
    keywords: [
      "Lisi Lake",
      "Tbilisi lifestyle",
      "nature living",
      "hiking trails",
      "mountain biking",
      "Hippodrome",
      "contemporary art",
      "fishing",
      "sports activities",
      "private schools",
      "Tbilisi recreation",
      "outdoor living",
    ],
    openGraph: {
      title: isKa
        ? "The Lake ცხოვრების სტილი - ცხოვრება ლისის ტბის პირას"
        : "The Lake Lifestyle - Life by Lisi Lake in Tbilisi",
      description: isKa
        ? "იცხოვრეთ ბუნებით გარშემორტყმული სუფთა ჰაერით, ლაშქრობის ბილიკებით, ხელოვნებით და სპორტით."
        : "Live surrounded by nature with clean air, hiking trails, water ponds, and mountain bike tracks. Art exhibitions, fishing, sports, and quality education - all minutes from Tbilisi.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "The Lake ცხოვრების სტილი - ლისის ტბა"
        : "The Lake Lifestyle - Life by Lisi Lake",
      description: isKa
        ? "ცხოვრება ლისის ტბაზე: ბუნება, სპორტი, ხელოვნება და განათლება თბილისიდან წუთებში."
        : "Experience life by Lisi Lake: nature, sports, art, and quality education minutes from Tbilisi.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/the-lake-lifestyle"),
  };
}

export default function TheLifestyleLayout({ children }) {
  return children;
}
