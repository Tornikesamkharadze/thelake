import { Footer } from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";

export const metadata = {
  title: "Gallery - The Lake by Placemakers",
  description:
    "Explore stunning interior and exterior views of The Lake luxury residential community. Browse our photo gallery showcasing lakeside villas, modern amenities, and breathtaking Lisi Lake surroundings.",
  keywords: [
    "The Lake gallery",
    "Lisi Lake property photos",
    "luxury villas Tbilisi",
    "lakeside homes Georgia",
    "The Lake interior design",
    "The Lake exterior views",
    "Lisi Lake real estate photos",
    "luxury residence gallery",
    "The Lake by Placemakers photos",
    "Tbilisi lakeside community",
    "Georgian luxury real estate",
    "Lisi Lake architecture",
    "premium homes Tbilisi",
    "The Lake amenities photos",
    "residential community gallery",
  ],
  openGraph: {
    title: "Photo Gallery | The Lake by Placemakers",
    description:
      "Discover The Lake through our curated gallery. View stunning interiors, scenic exteriors, and the natural beauty of Lisi Lake.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery - Luxury Living at The Lake",
    description:
      "Browse stunning photos of The Lake's interiors, exteriors, and breathtaking Lisi Lake views. Your future home awaits.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/gallery",
  },
};

const gallery = () => {
  return (
    <div>
      <Header />
      <Gallery />
      <Footer />
    </div>
  );
};

export default gallery;