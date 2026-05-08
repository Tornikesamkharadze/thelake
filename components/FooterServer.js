import { getFooter, getContact } from "@/lib/strapi";
import { Footer } from "./Footer";

export default async function FooterServer({ locale }) {
  let footerData = null;
  let contactData = null;
  try {
    const { data } = await getFooter({ locale });
    footerData = data ?? null;
  } catch {}
  try {
    const { data } = await getContact({ locale });
    contactData = data ?? null;
  } catch {}
  return <Footer footerData={footerData} contactData={contactData} />;
}
