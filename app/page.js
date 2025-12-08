import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import ImageTextSection from "@/components/ImageTextSection";
import TextImageSideSection from "@/components/TextImageSideSection";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <Header />
      <ImageTextSection
        image="/lake-1.png"
        title="Why Own at The Lake by placemakers?"
        subtitle="Your home. Your sanctuary. Your playground"
        description="Set on 14 hectares by Lisi Lake, this private neighbourhood features 90 villas and houses surrounded by a private park and panoramic lake views. Just 7 km from the city centre, it offers an exclusive lifestyle shaped by international architecture and nature's calm"
        imagePosition="left"
        // ფერები
        titleColor="#000000"
        subtitleColor="#000000"
        descriptionColor="#000000"
        //ბექგრაუნდი
        backgroundColor="#C2B49B"
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

      {/*     <TextImageSideSection
        image="/lake-1.png"
        title="LIFE IN NATURE"
        description="Located in Tbilisi's main recreation area, embraced by mountain terrain and overlooking Lisi Lake. Here, every day begins with clean air, open views, and the quiet rhythm of nature, yet the city's energy is only minutes away."
        imagePosition="right"
        backgroundColor="#e8dfd0"
        titleColor="#000000"
        descriptionColor="#000000"
      /> */}
      <Footer />
    </div>
  );
}
