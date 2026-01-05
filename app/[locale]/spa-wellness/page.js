import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";

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

const spaWellness = () => {
  return (
    <div>
      <Header />
      <Hero
        image="/spa-wellness-bg.webp"
        height="100vh"
        title="spa & wellness"
        highlightWords={["spa & wellness"]}
        uppercase={true}
      />

      <ImageTextSection
        image="/spa.webp"
        title="spa"
        subtitle=""
        description="Designed for rest and renewal. Treatments use natural ingredients inspired by the lake and surrounding landscape, offering massages, facials, and rituals that restore balance to body and mind."
        imagePosition="left"
        // ფერები
        titleColor="#000000"
        subtitleColor="#000000"
        descriptionColor="#000000"
        //ბექგრაუნდი
        backgroundColor="#F7EAD7"
        textBoxColor="#F7EAD7"
        // ფონტის ზომები
        titleSize="25px"
        subtitleSize="19px"
        descriptionSize="19px"
        // ფონტის სიმძიმე
        titleWeight="400"
        subtitleWeight="700"
        descriptionWeight="400"
        // ტექსტის ტრანსფორმაცია
        titleTransform="uppercase"
        subtitleTransform="none"
        descriptionTransform="none"
      />

      <ImageTextSection
        image="/pool.webp"
        title="pool"
        subtitle=""
        description="A calm, elegant pool framed by nature, perfect for early morning laps or slow swims at sunset. With comfortable loungers and lake views all around, it's a daily escape where relaxation comes naturally."
        imagePosition="right"
        // ფერები
        titleColor="#000000"
        subtitleColor="#000000"
        descriptionColor="#000000"
        //ბექგრაუნდი
        backgroundColor="#F7EAD7"
        textBoxColor="#C2B49B"
        // ფონტის ზომები
        titleSize="25px"
        subtitleSize="19px"
        descriptionSize="19px"
        // ფონტის სიმძიმე
        titleWeight="400"
        subtitleWeight="700"
        descriptionWeight="400"
        // ტექსტის ტრანსფორმაცია
        titleTransform="uppercase"
        subtitleTransform="none"
        descriptionTransform="none"
      />

      <ImageTextSection
        image="/gym.webp"
        title="gym"
        subtitle=""
        description="A modern fitness space equipped with the latest training technology. Large windows open to views of the lake and hills, creating an inspiring environment for both intense workouts and quiet morning stretches."
        imagePosition="left"
        // ფერები
        titleColor="#000000"
        subtitleColor="#000000"
        descriptionColor="#000000"
        //ბექგრაუნდი
        backgroundColor="#F7EAD7"
        textBoxColor="#C2B49B"
        // ფონტის ზომები
        titleSize="25px"
        subtitleSize="19px"
        descriptionSize="19px"
        // ფონტის სიმძიმე
        titleWeight="400"
        subtitleWeight="700"
        descriptionWeight="400"
        // ტექსტის ტრანსფორმაცია
        titleTransform="uppercase"
        subtitleTransform="none"
        descriptionTransform="none"
      />

      <ImageTextSection
        image="/yoga.webp"
        title="yoga"
        subtitle=""
        description="From sunrise stretches by the lake to evening group sessions on the deck, yoga becomes part of the daily rhythm. Surrounded by fresh air and soft light, it's where balance, focus, and calm naturally return."
        imagePosition="right"
        // ფერები
        titleColor="#000000"
        subtitleColor="#000000"
        descriptionColor="#000000"
        //ბექგრაუნდი
        backgroundColor="#F7EAD7"
        textBoxColor="#F7EAD7"
        // ფონტის ზომები
        titleSize="25px"
        subtitleSize="19px"
        descriptionSize="19px"
        // ფონტის სიმძიმე
        titleWeight="400"
        subtitleWeight="700"
        descriptionWeight="400"
        // ტექსტის ტრანსფორმაცია
        titleTransform="uppercase"
        subtitleTransform="none"
        descriptionTransform="none"
      />

      <Footer />
    </div>
  );
};

export default spaWellness;
