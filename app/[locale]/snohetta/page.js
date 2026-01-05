import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";

export const metadata = {
  title: "Club House by Snøhetta - The Lake by Placemakers",
  description:
    "The Club House, designed by world-renowned Snøhetta studio, is the heart of our lakeside community. A chic gathering space for morning coffee, yoga, cultural events, and evening cocktails with panoramic lake views. Where modern design meets Georgian authenticity.",
  keywords: [
    "Club House Snøhetta",
    "The Lake Club House",
    "Snøhetta architecture",
    "community clubhouse Lisi Lake",
    "lakeside club Tbilisi",
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
    title: "Club House by Snøhetta | The Lake by Placemakers",
    description:
      "Iconic Club House designed by world-leading Norwegian studio Snøhetta. Morning coffee to late-night gatherings, yoga sessions to art exhibitions, all with stunning lake views.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Club House by Snøhetta - Where Community Comes Together",
    description:
      "Chic yet grounded. Modern design meets Georgian authenticity. From morning yoga to evening cocktails by the lake.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/snohetta",
  },
};
const snohetta = () => {
  return (
    <div>
      <Header />
      <Hero
        image="/hero-cover.webp"
        height="100vh"
        title="Club House By <br/>Snohetta"
        highlightWords={["Club House By <br/>Snohetta"]}
        uppercase={true}
      />

      <ImageTextSection
        image="/lake-1.png"
        title="The Lake house"
        subtitle=""
        description="The Lake-house, designed by Snøhetta, the renowned Norwegian architecture studio, is the heart of the lakeside community. Chic yet grounded, it blends modern design with Georgian authenticity. A place to unwind and socialize, from slow morning coffee and lakeside brunches to afternoon yoga sessions, evening cocktails, and late-night fireside gatherings. Enjoy curated cultural events, art exhibitions, and quiet corners to read, work, or simply soak in the panoramic lake views, always offering the perfect setting for every moment of your day."
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
        image="/lake-1.png"
        title="Snøhetta"
        subtitle=""
        description="Snøhetta is a world-leading architecture and design studio known for projects that blend bold creativity with a deep sensitivity to context. Their portfolio includes iconic cultural landmarks such as the Oslo Opera House, the National September 11 Memorial Pavilion in New York, and the Bibliotheca Alexandrina in Egypt, each celebrated for their innovative forms and immersive experiences. Their approach combines architecture, landscape, and interior design into cohesive environments, emphasizing human experience, sustainability, and harmony with the surroundings. Every project tells a story, creating spaces that are not only visually striking but also deeply connected to the people and culture they serve."
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

export default snohetta;
