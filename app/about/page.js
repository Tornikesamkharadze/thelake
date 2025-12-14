import Divider from "@/components/Divider";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import ImageTextSection from "@/components/ImageTextSection";
import PartnersSlider from "@/components/Partnersslider";
import TeamSwiper from "@/components/TeamSwiper";
import Timeline from "@/components/TimeLine";

export const metadata = {
  title: "About Us - Luxury Neighbourhood Tbilisi",
  description:
    "Discover The Lake by Placemakers - a private neighbourhood of 90 villas and houses on 14 hectares by Lisi Lake. Experience exclusive lakeside living just 7 km from Tbilisi city centre, shaped by international architecture and nature's calm.",
  keywords: [
    "The Lake Placemakers",
    "Lisi Lake villas",
    "luxury neighbourhood Tbilisi",
    "private community Georgia",
    "lakeside living Tbilisi",
    "exclusive villas Lisi Lake",
    "international architecture Georgia",
    "premium real estate Tbilisi",
    "The Lake team",
    "Placemakers Tbilisi",
    "luxury homes Georgia",
    "lake view properties",
    "private neighbourhood Lisi Lake",
    "real estate development Tbilisi",
    "lakeside community Georgia",
  ],
  openGraph: {
    title: "About Us | The Lake by Placemakers",
    description:
      "A private neighbourhood of 90 villas and houses on 14 hectares by Lisi Lake. Just 7 km from the city centre, offering exclusive lifestyle shaped by international architecture.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About The Lake - Exclusive Lakeside Living in Tbilisi",
    description:
      "90 villas and houses on 14 hectares by Lisi Lake. International architecture meets nature's calm, just 7 km from Tbilisi city centre.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

const about = () => {
  const timelineData = [
    {
      year: "2024 JAN",
      title: "Idea is born",
      description:
        "Set on 14 hectares by Lisi Lake, this private neighbourhood",
    },
    {
      year: "2024 JAN",
      title: "Idea is born",
      description:
        "Set on 14 hectares by Lisi Lake, this private neighbourhood",
    },
    {
      year: "2024 JAN",
      title: "Idea is born",
      description:
        "Set on 14 hectares by Lisi Lake, this private neighbourhood",
    },
    {
      year: "2024 JAN",
      title: "Idea is born",
      description:
        "Set on 14 hectares by Lisi Lake, this private neighbourhood",
    },
  ];

  const teamMembers = [
    {
      image: "/team-member.webp",
      name: "Name Surensme",
      position: "Ceo / Founder",
      description:
        "dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      image: "/team-member.webp",
      name: "Name Surensme",
      position: "Ceo / Founder",
      description:
        "dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      image: "/team-member.webp",
      name: "Name Surensme",
      position: "Ceo / Founder",
      description:
        "dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      image: "/team-member.webp",
      name: "Name Surensme",
      position: "Ceo / Founder",
      description:
        "dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      image: "/team-member.webp",
      name: "Name Surensme",
      position: "Ceo / Founder",
      description:
        "dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      image: "/team-member.webp",
      name: "Name Surensme",
      position: "Ceo / Founder",
      description:
        "dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
  ];
  return (
    <div>
      <Header />
      <ImageTextSection
        image="/lake-1.png"
        title="who are we"
        subtitle="Placemakers motto"
        description="Set on 14 hectares by Lisi Lake, this private neighbourhood features 90 villas and houses surrounded by a private park and panoramic lake views. Just 7 km from the city centre, it offers an exclusive lifestyle shaped by international architecture and nature’s calm"
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
      <TeamSwiper
        title="TEAM"
        members={teamMembers}
        // ფერები
        backgroundColor="#ffffff"
        titleColor="#000000"
        cardBackgroundColor="#F7EAD7"
        nameColor="#312618"
        positionColor="#312618"
        descriptionColor="#312618"
        // ფონტის სიმძიმე
        titleWeight="400"
        nameWeight="400"
        positionWeight="400"
        descriptionWeight="400"
        // ტექსტის ტრანსფორმაცია
        titleTransform="uppercase"
        nameTransform="none"
        positionTransform="none"
        descriptionTransform="none"
        // Swiper settings
        autoplay={false}
        autoplayDelay={3000}
        loop={true}
      />

      <ImageTextSection
        image="/lake-1.png"
        title="about the project"
        subtitle="The Lake  motto"
        description="Set on 14 hectares by Lisi Lake, this private neighbourhood features 90 villas and houses surrounded by a private park and panoramic lake views. Just 7 km from the city centre, it offers an exclusive lifestyle shaped by international architecture and nature’s calm"
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

      <Divider
        text="timeline"
        uppercase={true}
        bgColor="bg-[#ED5C3F]"
        textColor="text-white"
      />

      <Timeline
        items={timelineData}
        // ფერები
        backgroundColor="#e8dfd0"
        lineColor="#ED5C3F"
        dotColor="#ED5C3F"
        yearColor="#000000"
        titleColor="#000000"
        descriptionColor="#000000"
        // ფონტის სიმძიმე
        yearWeight="400"
        titleWeight="700"
        descriptionWeight="400"
        // ტექსტის ტრანსფორმაცია
        yearTransform="none"
        titleTransform="none"
        descriptionTransform="none"
        // დოტის ზომა
        dotSize="14px"
      />
      <PartnersSlider />
      <Footer />
    </div>
  );
};

export default about;
