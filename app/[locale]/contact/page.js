"use client";

import StayInTouchWithContact from "@/components/StayInTouchWithContact";
import ContactWithImage from "@/components/ContactWithImage";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <Header />
      <main>
        <ContactWithImage
          image="/lake-1.png"
          title={t("contactTitle")}
          location={t("address")}
          locationUrl="https://maps.app.goo.gl/LQaNV2GhVjdXhmJ88"
          phone={t("phone")}
          email={t("email")}
          imagePosition="left"
          backgroundColor="#D3B473"
          textBoxColor="#F7EAD7"
        />

        <StayInTouchWithContact
          showAddressBox={false}
          backgroundImage="/lake-1.png"
          contactBoxBackgroundColor="#F7EAD7"
        />
      </main>
      <Footer />
    </>
  );
}
