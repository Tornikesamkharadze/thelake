import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import LocationMapSection from "@/components/LocationMapSection";

export const metadata = {
  title:
    "Find Us - The Lake by Placemakers | Location & Directions Lisi Lake Tbilisi",
  description:
    "Visit The Lake by Placemakers at Lisi Lake, Tbilisi. Located just 7 km from city centre with easy access to private schools, sports centres, and public transportation. 5-minute walk to Lisi Lake. Explore our exclusive lakeside neighbourhood location and directions.",
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
    title: "Find Us at Lisi Lake | The Lake by Placemakers",
    description:
      "Located at Lisi Lake, just 7 km from Tbilisi city centre. Easy access to schools, sports centres, and public transportation. 5-minute walk to the lake. Find your way to exclusive lakeside living.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find The Lake by Placemakers - Lisi Lake Tbilisi Location",
    description:
      "7 km from city centre, 5-minute walk to Lisi Lake. Discover our location with convenient access to schools, sports centres, and transportation.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/find-us",
  },
  robots: {
    index: true,
    follow: true,
  },
};
const findUs = () => {
  return (
    <div>
      <Header />
      <LocationMapSection />
      <Footer />
    </div>
  );
};

export default findUs;
