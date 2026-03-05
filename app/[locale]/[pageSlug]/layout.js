import { getAlternateUrls } from "@/lib/metadata";

const PAGE_SLUGS = [
  "bar-kitchen",
  "lake-house",
  "services-for-you",
  "spa-wellness",
  "the-lake-lifestyle",
];

const SLUG_METADATA = {
  "bar-kitchen": {
    title: { en: "Bar & Kitchen - The Lake by Placemakers", ka: "ბარი და სამზარეულო - The Lake by Placemakers" },
    description: { en: "Experience exceptional dining at The Lake. Fresh bakery, relaxed bar with Georgian spirits, and farm-to-table restaurant with open kitchen.", ka: "განიცადეთ განსაკუთრებული სადილი The Lake-ში. საცხობი, ბარი და ფერმიდან მაგიდამდე რესტორანი." },
  },
  "lake-house": {
    title: { en: "Lake House by Snøhetta - The Lake by Placemakers", ka: "ლეიკ ჰაუს Snøhetta-ს მიერ - The Lake by Placemakers" },
    description: { en: "The Lake-house designed by Snøhetta. Chic yet grounded, blending modern design with Georgian authenticity. Unwind and socialize by the lake.", ka: "ლეიკ ჰაუს Snøhetta-ს მიერ დაპროექტებული. ტბის პირას დასვენება და საზოგადოება." },
  },
  "services-for-you": {
    title: { en: "Services for You - The Lake by Placemakers", ka: "მომსახურება თქვენთვის - The Lake by Placemakers" },
    description: { en: "Services at The Lake: delivery, housekeeping, Business Lounge, Kids Zone, gardening, and pet services.", ka: "მომსახურება The Lake-ში: მიწოდება, სამუშაოები, ბიზნეს ლაუნჯი, საბავშვო ზონა და სხვა." },
  },
  "spa-wellness": {
    title: { en: "Spa & Wellness - The Lake by Placemakers", ka: "სპა და ველნესი - The Lake by Placemakers" },
    description: { en: "Complete wellness at The Lake. Natural spa treatments, elegant pool, modern gym, and lakeside yoga.", ka: "სრული ველნესი The Lake-ში. სპა, აუზი, დარბაზი და იოგა ტბის პირას." },
  },
  "the-lake-lifestyle": {
    title: { en: "The Lake Lifestyle - Life by Lisi Lake", ka: "ტბის ცხოვრების სტილი - ცხოვრება ლისის ტბის პირას" },
    description: { en: "Experience life by Lisi Lake. Clean air, open views, hiking trails, art, fishing, sports, and quality education minutes from Tbilisi.", ka: "განიცადეთ ცხოვრება ლისის ტბის პირას. სუფთა ჰაერი, ხედები, ლაშქრობა, ხელოვნება და სპორტი." },
  },
};

export async function generateMetadata({ params }) {
  const { locale, pageSlug } = await params;
  const isKa = locale === "ka";
  const meta = PAGE_SLUGS.includes(pageSlug) ? SLUG_METADATA[pageSlug] : null;
  if (!meta) {
    return { title: "The Lake by Placemakers" };
  }
  const title = isKa ? meta.title.ka : meta.title.en;
  const description = isKa ? meta.description.ka : meta.description.en;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls(`/${pageSlug}`),
  };
}

export default function PageSlugLayout({ children }) {
  return children;
}
