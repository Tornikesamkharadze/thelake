import { getAlternateUrls } from "@/lib/metadata";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    title:
      locale === "ka"
        ? "დაგვიკავშირდით - The Lake by Placemakers | ლუქს ვილები ლისის ტბა"
        : "Contact Us - The Lake by Placemakers | Luxury Villas Lisi Lake Tbilisi",
    description:
      locale === "ka"
        ? "დაგვიკავშირდით The Lake by Placemakers. ეწვიეთ ლისის ტბაზე, თბილისი. +995 511 55 33 33 | info@placemakers.ge"
        : "Get in touch with The Lake by Placemakers. Visit us at Lisi Lake, Tbilisi, Georgia. Call +995 511 55 33 33 or email info@placemakers.ge.",
    keywords: [
      "contact The Lake Placemakers",
      "Lisi Lake contact",
      "luxury villas Tbilisi contact",
    ],
    openGraph: {
      title: "Contact The Lake by Placemakers | Lisi Lake Tbilisi",
      description:
        "Contact us at Lisi Lake, Tbilisi, Georgia. +995 511 55 33 33",
      type: "website",
      locale: locale === "ka" ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact The Lake by Placemakers",
      description: "Get in touch. Phone: +995 511 55 33 33",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/contact"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ContactLayout({ children }) {
  return children;
}
