export const metadata = {
  title: "Spa & Wellness - The Lake by Placemakers",
  description:
    "Complete wellness sanctuary at The Lake. Natural spa treatments inspired by the lakeside landscape, elegant pool with panoramic views, modern gym with latest equipment, and lakeside yoga sessions. Rest, renewal, and balance in nature.",
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
    title: "Spa & Wellness | The Lake by Placemakers",
    description:
      "Natural spa treatments, elegant lakeside pool, modern gym, and yoga by the water. Your wellness sanctuary surrounded by nature at Lisi Lake.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa & Wellness - Rest & Renewal at The Lake",
    description:
      "Spa, pool, gym, and yoga. Complete wellness experience with lake views and natural surroundings. Balance restored daily.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/spa-wellness",
  },
};

export default function SpaWellnessLayout({ children }) {
  return children;
}