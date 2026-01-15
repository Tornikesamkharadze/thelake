export const metadata = {
  title: "Bar & Kitchen - The Lake by Placemakers",
  description:
    "Experience exceptional dining at The Lake. Fresh bakery with sourdough and pastries, relaxed bar with signature cocktails and Georgian spirits, and farm-to-table restaurant with open kitchen featuring seasonal local ingredients.",
  keywords: [
    "restaurant Lisi Lake",
    "bar Tbilisi",
    "bakery Lisi Lake",
    "farm-to-table restaurant Georgia",
    "open kitchen restaurant",
    "Georgian spirits bar",
    "signature cocktails Tbilisi",
    "sourdough bakery Georgia",
    "local ingredients restaurant",
    "cooking classes Tbilisi",
    "seasonal menu Lisi Lake",
    "The Lake by Placemakers",
    "lakeside dining Tbilisi",
    "specialty wine shop Georgia",
    "artisan bakery Tbilisi",
    "gastropub Lisi Lake",
  ],
  openGraph: {
    title: "Bar & Kitchen | The Lake by Placemakers",
    description:
      "From fresh sourdough to farm-to-table dining. Artisan bakery, relaxed bar with Georgian spirits, and restaurant with open kitchen. Where quality meets comfort by the lake.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bar & Kitchen - Exceptional Dining at The Lake",
    description:
      "Bakery, bar, and farm-to-table restaurant. Seasonal ingredients, signature cocktails, and warm atmosphere by Lisi Lake.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/bar-kitchen",
  },
};

export default function BarKitchenLayout({ children }) {
  return children;
}
