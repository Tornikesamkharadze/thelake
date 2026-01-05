import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageTextSection from "@/components/ImageTextSection";

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

const barKitchen = () => {
  return (
    <div>
      <Header />
      <Hero
        image="/bar-and-kitchen-bg.webp"
        height="100vh"
        title="Bar & kitchen"
        highlightWords={["Bar & kitchen"]}
        uppercase={true}
      />

      <ImageTextSection
        image="/bakery.webp"
        title="bakery"
        subtitle=""
        description="Fresh sourdough, carefully selected pastries, and small-batch wines are paired with local meats, cheeses and seasonal pantry items. A space that combines quality and comfort, part bakery, part specialty shop."
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
        image="/bar.webp"
        title="bar"
        subtitle=""
        description="A relaxed, welcoming space where evenings come alive. More than just a place for drinks, it's where people gather and connect, smoothly flowing into the lounge and library. Enjoy signature cocktails, Georgian spirits, and warm, layered lighting that sets the mood for everything from an early aperitif to a late-night nightcap."
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

      <ImageTextSection
        image="/restaurant.webp"
        title="restaurant"
        subtitle=""
        description="A farm-to-table restaurant featuring an open kitchen and seasonal local ingredients, offering a warm, stylish atmosphere connected to the rhythms of the land. The open kitchen is the heart of the space. During the day, the kitchen hosts occasional cooking classes and interactive sessions, inviting guests to experience the art of cooking. "
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

      <Footer />
    </div>
  );
};

export default barKitchen;
