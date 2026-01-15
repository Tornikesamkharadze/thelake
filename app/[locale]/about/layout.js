export const metadata = {
  title: "About Us - Luxury Neighbourhood Tbilisi",
  description:
    "Discover The Lake by Placemakers - a private neighbourhood of 90 villas and houses on 14 hectares by Lisi Lake. Experience exclusive lakeside living just 7 km from Tbilisi city centre, shaped by international architecture and nature's calm.",
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
    title: "About Us | The Lake by Placemakers",
    description:
      "A private neighbourhood of 90 villas and houses on 14 hectares by Lisi Lake. Just 7 km from the city centre, offering exclusive lifestyle shaped by international architecture.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About The Lake - Exclusive Lakeside Living in Tbilisi",
    description:
      "90 villas and houses on 14 hectares by Lisi Lake. International architecture meets nature's calm, just 7 km from Tbilisi city centre.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
