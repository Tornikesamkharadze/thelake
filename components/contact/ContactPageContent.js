"use client";

import StayInTouchWithContact from "@/components/StayInTouchWithContact";
import ContactWithImage from "@/components/ContactWithImage";
import { useTranslations } from "next-intl";

const DEFAULT_LOCATION_URL = "https://maps.app.goo.gl/LQaNV2GhVjdXhmJ88";

export default function ContactPageContent({ contact }) {
  const t = useTranslations("contact");

  const title = t("contactTitle");
  const location = contact?.address ?? t("address");
  const locationUrl =
    (contact?.googleMaps?.trim() && contact.googleMaps.startsWith("http")
      ? contact.googleMaps
      : null) || DEFAULT_LOCATION_URL;
  const phone = contact?.phone ?? t("phone");
  const email = contact?.email ?? t("email");
  const image = contact?.distanceBackgroundUrl || "/lake-1.png";
  const backgroundImage = contact?.distanceBackgroundUrl || "/lake-1.png";

  return (
    <>
      <ContactWithImage
        image={image}
        title={title}
        location={location}
        locationUrl={locationUrl}
        phone={phone}
        email={email}
        imagePosition="left"
        backgroundColor="#D3B473"
        textBoxColor="#F7EAD7"
      />

      <StayInTouchWithContact
        showAddressBox={false}
        backgroundImage={backgroundImage}
        contactBoxBackgroundColor="#F7EAD7"
        address={contact?.address}
        phone={contact?.phone}
        email={contact?.email}
      />
    </>
  );
}
