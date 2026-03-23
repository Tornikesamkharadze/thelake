import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import ContactPageContent from "@/components/contact/ContactPageContent";
import { getContact, STRAPI_URL } from "@/lib/strapi";
import { mapStrapiContactToFrontend } from "@/lib/adapters/contact";

export const dynamic = "force-dynamic";

export default async function ContactPage({ params }) {
  const { locale } = await params;
  let contact = null;
  try {
    const { data } = await getContact({ locale, populate: "*" });
    contact = mapStrapiContactToFrontend(data, STRAPI_URL);
  } catch {
    contact = null;
  }

  return (
    <>
      <Header />
      <main>
        <ContactPageContent contact={contact} />
      </main>
      <Footer />
    </>
  );
}
