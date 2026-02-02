import { Footer } from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import { getAlternateUrls } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "გალერეა - ინტერიერები და ექსტერიერები | The Lake by Placemakers"
      : "Gallery - The Lake by Placemakers",
    description: isKa
      ? "დაათვალიერეთ The Lake-ის ინტერიერები და ექსტერიერები. ფოტო გალერეა ვილებით, ტბის პირის სახლებით და ლისის ტბის გარემოთი."
      : "Explore stunning interior and exterior views of The Lake luxury residential community. Browse our photo gallery showcasing lakeside villas, modern amenities, and breathtaking Lisi Lake surroundings.",
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
      title: isKa
        ? "ფოტო გალერეა | The Lake by Placemakers"
        : "Photo Gallery | The Lake by Placemakers",
      description: isKa
        ? "აღმოაჩინეთ The Lake ჩვენი გალერეის საშუალებით. ნახეთ ინტერიერები, ექსტერიერები და ლისის ტბის ბუნება."
        : "Discover The Lake through our curated gallery. View stunning interiors, scenic exteriors, and the natural beauty of Lisi Lake.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "გალერეა - ლუქს ცხოვრება The Lake-ში"
        : "Gallery - Luxury Living at The Lake",
      description: isKa
        ? "დაათვალიერეთ The Lake-ის ინტერიერები, ექსტერიერები და ლისის ტბის ხედები."
        : "Browse stunning photos of The Lake's interiors, exteriors, and breathtaking Lisi Lake views. Your future home awaits.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/gallery"),
  };
}

const gallery = () => {
  return (
    <>
      <Header />
      <main>
        <Gallery />
      </main>
      <Footer />
    </>
  );
};

export default gallery;
