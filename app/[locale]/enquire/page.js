import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import EnquireForm from "@/components/EnquireForm";
import { getAlternateUrls } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "დაგვიკავშირდი | The Lake by Placemakers"
      : "Enquire | The Lake by Placemakers",
    description: isKa
      ? "დაგვიკავშირდით The Lake by Placemakers-ში. შეავსეთ ფორმა და ჩვენი გუნდი დაგიკავშირდებათ უახლოეს დროში."
      : "Get in touch with The Lake by Placemakers. Fill in the enquiry form and our team will be in contact with you shortly.",
    keywords: [
      "The Lake enquire",
      "The Lake contact",
      "Lisi Lake property enquiry",
      "The Lake by Placemakers contact",
      "luxury villa enquiry Tbilisi",
      "Lisi Lake real estate enquiry",
      "The Lake Tbilisi contact form",
      "Placemakers enquiry Georgia",
      "buy property Lisi Lake",
      "lakeside home enquiry Tbilisi",
    ],
    openGraph: {
      title: isKa
        ? "დაგვიკავშირდი | The Lake by Placemakers"
        : "Enquire | The Lake by Placemakers",
      description: isKa
        ? "შეავსეთ ფორმა და ჩვენი გუნდი დაგიკავშირდებათ უახლოეს დროში."
        : "Fill in the enquiry form and our team will be in contact with you shortly.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "დაგვიკავშირდი | The Lake by Placemakers"
        : "Enquire | The Lake by Placemakers",
      description: isKa
        ? "შეავსეთ ფორმა და ჩვენი გუნდი დაგიკავშირდებათ."
        : "Fill in the enquiry form and our team will be in contact with you shortly.",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/enquire"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

const EnquirePage = () => {
  return (
    <>
      <Header />
      <main>
        <EnquireForm />
      </main>
      <Footer />
    </>
  );
};

export default EnquirePage;
