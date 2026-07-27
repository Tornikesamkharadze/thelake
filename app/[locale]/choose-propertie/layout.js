import { getAlternateUrls } from "@/lib/metadata";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "აირჩიეთ ნაკვეთი - ინტერაქტიული რუკა | The Lake by Placemakers"
      : "Choose Your Plot - Interactive Map | The Lake by Placemakers",
    description: isKa
      ? "აირჩიეთ თქვენი ნაკვეთი ინტერაქტიული რუკის საშუალებით The Lake-ში, ლისის ტბის პირას. ნახეთ ზომა, სტატუსი და დეტალები თითოეულ ნაკვეთზე."
      : "Choose your plot using our interactive map at The Lake by Placemakers, on the shores of Lisi Lake. View size, status, and details for every plot.",
    keywords: [
      "The Lake choose plot",
      "Lisi Lake interactive map",
      "The Lake plot selection",
      "Lisi Lake land plots",
      "The Lake by Placemakers map",
    ],
    openGraph: {
      title: isKa
        ? "აირჩიეთ ნაკვეთი | The Lake by Placemakers"
        : "Choose Your Plot | The Lake by Placemakers",
      description: isKa
        ? "ინტერაქტიული რუკა ნაკვეთის ასარჩევად ლისის ტბის პირას."
        : "Interactive map to choose your plot by Lisi Lake.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "აირჩიეთ ნაკვეთი | The Lake by Placemakers"
        : "Choose Your Plot | The Lake by Placemakers",
      description: isKa
        ? "აირჩიეთ თქვენი ნაკვეთი ინტერაქტიული რუკით ლისის ტბის პირას."
        : "Choose your plot with our interactive map by Lisi Lake.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/choose-propertie"),
  };
}

export default function ChoosePropertieLayout({ children }) {
  return children;
}
