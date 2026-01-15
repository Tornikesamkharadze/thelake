// app/[locale]/lake-house/layout.js
export const metadata = {
  title: "Lake House by Snøhetta - The Lake by Placemakers",
  description:
    "The Lake House, designed by world-renowned Snøhetta studio, is the heart of our lakeside community. A chic gathering space for morning coffee, yoga, cultural events, and evening cocktails with panoramic lake views. Where modern design meets Georgian authenticity.",
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
    title: "Lake House by Snøhetta | The Lake by Placemakers",
    description:
      "Iconic Lake House designed by world-leading Norwegian studio Snøhetta. Morning coffee to late-night gatherings, yoga sessions to art exhibitions, all with stunning lake views.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lake House by Snøhetta - Where Community Comes Together",
    description:
      "Chic yet grounded. Modern design meets Georgian authenticity. From morning yoga to evening cocktails by the lake.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/lake-house",
  },
};

export default function LakeHouseLayout({ children }) {
  return children;
}
