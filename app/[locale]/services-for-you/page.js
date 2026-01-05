import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TextImageSideSection from "@/components/TextImageSideSection";
import TextSection from "@/components/TextSection";

export const metadata = {
  title: "Services for You - The Lake by Placemakers",
  description:
    "Experience exceptional concierge services at The Lake. From delivery and housekeeping to business lounge, kids zone, gardening, and pet care. Everything you need for effortless lakeside living.",
  keywords: [
    "concierge services Lisi Lake",
    "delivery service Tbilisi",
    "housekeeping services",
    "business lounge Lisi Lake",
    "kids zone The Lake",
    "gardening services Tbilisi",
    "pet services Georgia",
    "luxury amenities Lisi Lake",
    "The Lake by Placemakers",
    "residential services Tbilisi",
    "community services Georgia",
    "lifestyle services Lisi Lake",
    "home care services",
    "pet grooming Tbilisi",
    "professional cleaning services",
    "lakeside community amenities",
  ],
  openGraph: {
    title: "Services for You | The Lake by Placemakers",
    description:
      "From groceries to pet care, housekeeping to gardening. Every service designed to make your life at The Lake seamless and extraordinary.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services for You - Effortless Living at The Lake",
    description:
      "Delivery, housekeeping, business lounge, kids zone, gardening & pet services. Everything you need for luxury lakeside living.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/services-for-you",
  },
};
const servicesForYou = () => {
  return (
    <div>
      <Header />
      <Hero
        image="/hero-cover.webp"
        height="100vh"
        title="Services for you"
        highlightWords={["for you"]}
        uppercase={true}
      />
      <TextSection
        title="Services for you"
        description="At The Lake, every detail of daily life is thoughtfully designed to give you more time and peace of mind. From grocery delivery to professional housekeeping, a dedicated business lounge to a vibrant kids zone, expert gardening to comprehensive pet care - our full suite of concierge services ensures your home and lifestyle are effortlessly maintained, so you can focus on what truly matters."
        highlightWords={["THE LAKE"]}
        uppercase={true}
        bgColor="bg-[#F7EAD7]"
        buttonPosition="bottom"
        textColor="text-black"
      />
      <TextImageSideSection
        id="delivery"
        image="/delivery.webp"
        title="delivery"
        description="From groceries and essentials to fresh meals from the Clubhouse restaurant, delivery across The Lake community is seamless and fast, so you can enjoy more time doing what you love."
        imagePosition="right"
        backgroundColor="#C2B49B"
        titleColor="#000000"
        descriptionColor="#000000"
      />
      <TextImageSideSection
        id="housekeeping"
        image="/housekeeping.webp"
        title="housekeeping"
        description="From everyday cleaning to special requests, our housekeeping team is here to make life easier. Reliable, careful, and always respectful of your privacy, so your home feels its best, every day."
        imagePosition="left"
        backgroundColor="#F7EAD7"
        titleColor="#000000"
        descriptionColor="#000000"
      />
      <TextImageSideSection
        id="business-lounge"
        image="/business-lounge.webp"
        title="Business lounge"
        description="A quiet corner for focus and reflection, the Business Lounge and Library offer a calm retreat from the day’s pace. Whether it’s work, reading, or conversation, the space blends comfort with sophistication, lined with curated books, soft light, and views over the lake"
        imagePosition="right"
        backgroundColor="#C2B49B"
        titleColor="#000000"
        descriptionColor="#000000"
      />
      <TextImageSideSection
        id="kids-zone"
        image="/kids-zone.webp"
        title="Kids zone"
        description="A bright, engaging space designed for play, learning, and imagination. The Kids Zone offers safe indoor and outdoor areas where children can explore freely, make friends, and grow surrounded by nature."
        imagePosition="left"
        backgroundColor="#F7EAD7"
        titleColor="#000000"
        descriptionColor="#000000"
      />

      <TextImageSideSection
        id="gardening"
        image="/gardening.webp"
        title="GARDENING"
        description="Professional gardening services keep every outdoor space, from private courtyards to shared gardens, beautifully maintained. Our landscape team ensures your surroundings stay lush, seasonal, and perfectly in tune with the natural setting."
        imagePosition="right"
        backgroundColor="#C2B49B"
        titleColor="#000000"
        descriptionColor="#000000"
      />

      <TextImageSideSection
        id="pet-service"
        image="/pet-service.webp"
        title="PET SERVICE"
        description="Professional pet services take care of every need, walking, grooming, and even looking after your pets while you travel. Your companions stay happy, safe, and well cared for, wherever life takes you."
        imagePosition="left"
        backgroundColor="#F7EAD7"
        titleColor="#000000"
        descriptionColor="#000000"
      />

      <Footer />
    </div>
  );
};

export default servicesForYou;
