import { getAlternateUrls } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    title: isKa
      ? "კონფიდენციალურობის პოლიტიკა - The Lake by Placemakers"
      : "Privacy Policy - The Lake by Placemakers",
    description: isKa
      ? "სს „ფლეისმეიკერს ტბა“-ს კონფიდენციალურობის პოლიტიკა — პერსონალურ მონაცემთა დამუშავების წესები პროექტ The Lake • ტბა-სთან დაკავშირებით."
      : "Privacy Policy of JSC Placemakers Tba — rules and conditions of personal data processing in connection with The Lake • Tba project.",
    openGraph: {
      title: isKa
        ? "კონფიდენციალურობის პოლიტიკა | The Lake by Placemakers"
        : "Privacy Policy | The Lake by Placemakers",
      description: isKa
        ? "პერსონალურ მონაცემთა დამუშავების წესები — The Lake • ტბა."
        : "Rules of personal data processing — The Lake • Tba.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    alternates: getAlternateUrls("/privacy-policy"),
  };
}

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
