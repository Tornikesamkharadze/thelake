import LocationMapSection from "@/components/LocationMapSection";
import { getAlternateUrls } from "@/lib/metadata";
import { getContact, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiContactToFrontend } from "@/lib/adapters/contact";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "გვიპოვე რუკაზე - მდებარეობა და მიმართულებები | The Lake by Placemakers"
      : "Find Us - The Lake by Placemakers | Location & Directions Lisi Lake Tbilisi",
    description: isKa
      ? "ეწვიეთ The Lake by Placemakers ლისის ტბაზე, თბილისი. მდებარეობს მხოლოდ 7 კმ ქალაქის ცენტრიდან."
      : "Visit The Lake by Placemakers at Lisi Lake, Tbilisi. Located just 7 km from city centre with easy access to private schools, sports centres, and public transportation. 5-minute walk to Lisi Lake.",
    keywords: [
      "The Lake location",
      "Lisi Lake directions",
      "The Lake by Placemakers address",
      "how to get to Lisi Lake",
      "Tbilisi luxury villas location",
      "Lisi Lake neighbourhood map",
      "The Lake Tbilisi directions",
      "Placemakers location Georgia",
      "lakeside community Tbilisi location",
      "Lisi Lake real estate location",
      "The Lake access routes",
      "private neighbourhood Tbilisi map",
      "luxury homes Lisi Lake directions",
      "Tbilisi lakeside location",
      "The Lake proximity amenities",
    ],
    openGraph: {
      title: isKa
        ? "იპოვე ჩვენ ლისის ტბაზე | The Lake by Placemakers"
        : "Find Us at Lisi Lake | The Lake by Placemakers",
      description: isKa
        ? "ლისის ტბაზე, 7 კმ თბილისის ცენტრიდან. 5 წუთის სავალი ტბამდე."
        : "Located at Lisi Lake, just 7 km from Tbilisi city centre. Easy access to schools, sports centres, and public transportation. 5-minute walk to the lake.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "იპოვე The Lake by Placemakers - ლისის ტბა თბილისი"
        : "Find The Lake by Placemakers - Lisi Lake Tbilisi Location",
      description: isKa
        ? "7 კმ ცენტრიდან, 5 წუთი ლისის ტბამდე."
        : "7 km from city centre, 5-minute walk to Lisi Lake. Discover our location with convenient access to schools, sports centres, and transportation.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/find-us"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function FindUsPage({ params }) {
  const { locale } = await params;
  let contact = null;
  try {
    const { data } = await getContact({ locale, populate: "*" });
    contact = mapStrapiContactToFrontend(data, STRAPI_URL);
  } catch {
    contact = null;
  }

  const mapEmbedUrl = contact?.googleMaps?.trim().startsWith("http")
    ? contact.googleMaps.trim()
    : null;
  const distanceTitle = contact?.distanceTitle || null;
  const distances =
    contact?.distanceItems?.length > 0 ? contact.distanceItems : null;

  return (
    <main>
      <LocationMapSection
        mapEmbedUrl={mapEmbedUrl}
        distanceTitle={distanceTitle}
        distances={distances}
      />
    </main>
  );
}
