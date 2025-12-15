import StayInTouchWithContact from "@/components/StayInTouchWithContact";
import ContactWithImage from "@/components/ContactWithImage";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title:
    "Contact Us - The Lake by Placemakers | Luxury Villas Lisi Lake Tbilisi",
  description:
    "Get in touch with The Lake by Placemakers. Visit us at Lisi Lake, Tbilisi, Georgia. Call +995 511 55 33 33 or email info@placemakers.ge. Discover exclusive lakeside living in a private neighbourhood of 90 luxury villas and houses.",
  keywords: [
    "contact The Lake Placemakers",
    "Lisi Lake contact",
    "luxury villas Tbilisi contact",
    "The Lake Tbilisi phone",
    "Placemakers Georgia contact",
    "Lisi Lake real estate inquiry",
    "luxury neighbourhood contact Tbilisi",
    "villa sales Lisi Lake",
    "The Lake location",
    "exclusive villas contact Georgia",
    "Tbilisi luxury homes inquiry",
    "lakeside properties contact",
    "premium real estate Tbilisi contact",
    "villa information Lisi Lake",
    "Placemakers contact details",
  ],
  openGraph: {
    title: "Contact The Lake by Placemakers | Lisi Lake Tbilisi",
    description:
      "Contact us at Lisi Lake, Tbilisi, Georgia. Call +995 511 55 33 33 or email info@placemakers.ge. Explore luxury villas and houses in an exclusive lakeside community just 7 km from the city centre.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact The Lake by Placemakers - Luxury Lakeside Living Tbilisi",
    description:
      "Get in touch with The Lake. Located at Lisi Lake, Tbilisi. Phone: +995 511 55 33 33 | Email: info@placemakers.ge. Discover exclusive villa living.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const contact = () => {
  return (
    <div>
      <Header />

      <ContactWithImage
        image="/lake-1.png"
        title="CONTACT"
        location="Lisi Lake, Tbilisi, Georgia"
        locationUrl="https://maps.app.goo.gl/LQaNV2GhVjdXhmJ88"
        phone="+995 511 55 33 33"
        email="info@placemakers.ge"
        imagePosition="left"
        backgroundColor="#D3B473"
        textBoxColor="#F7EAD7"
      />

      <StayInTouchWithContact
        showAddressBox={false}
        backgroundImage="/lake-1.png" // მთავარი ბექგრაუნდი
        contactBoxBackgroundColor="#F7EAD7" // კონტაქტის ბოქსის ფერი
        formTitle="STAY IN TOUCH"
      />

      <Footer />
    </div>
  );
};

export default contact;
