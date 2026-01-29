import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ka"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://thelake.ge",
    ), // ✅ შეცვალე ნამდვილი დომენით
    title: isKa
      ? "The Lake by Placemakers - ექსკლუზიური ვილები და სახლები ლისის ტბის პირას"
      : "The Lake by Placemakers - Exclusive Villas & Houses by Lisi Lake",
    description: isKa
      ? "მშვიდი, ექსკლუზიური საცხოვრებელი კომპლექსი ვრცელი ვილებით (500–800 კვ.მ) და კერძო სახლებით (200–400 კვ.მ) ლისის ტბის პირას. 90 სახლი 14 ჰექტარზე კერძო პარკით, პანორამული ხედებით და საერთაშორისო არქიტექტურით. მხოლოდ 7 კმ თბილისის ცენტრიდან."
      : "A quiet, exclusive community of spacious villas (500–800 sq.m) and private houses (200–400 sq.m) by Lisi Lake. 90 homes on 14 hectares with private park, panoramic lake views, and international architecture. Just 7 km from Tbilisi city centre.",
    keywords: [
      "The Lake by Placemakers",
      "Lisi Lake villas",
      "exclusive community Tbilisi",
      "luxury houses Tbilisi",
      "private neighbourhood",
      "panoramic lake views",
      "international architecture",
      "spacious villas Georgia",
      "private park",
      "Lisi Lake real estate",
      "premium living Tbilisi",
      "gated community",
    ],
    openGraph: {
      title: isKa
        ? "The Lake by Placemakers - თქვენი სახლი ტბის პირას"
        : "The Lake by Placemakers - Your Home Over the Lake",
      description: isKa
        ? "ექსკლუზიური საცხოვრებელი კომპლექსი 90 ვილითა და სახლით 14 ჰექტარზე ლისის ტბის პირას. ვრცელი სახლები კერძო პარკით და პანორამული ხედებით, მხოლოდ 7 კმ თბილისის ცენტრიდან."
        : "Exclusive community of 90 villas and houses on 14 hectares by Lisi Lake. Spacious homes with private park and panoramic views, just 7 km from Tbilisi centre.",
      type: "website",
      locale: isKa ? "ka_GE" : "en_US",
      siteName: "The Lake",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isKa
        ? "The Lake by Placemakers - ექსკლუზიური ცხოვრება ლისის ტბის პირას"
        : "The Lake by Placemakers - Exclusive Living by Lisi Lake",
      description: isKa
        ? "90 ვილა და სახლი 14 ჰექტარზე. კერძო პარკი, ტბის ხედები, საერთაშორისო არქიტექტურა. 7 კმ თბილისიდან."
        : "90 villas & houses on 14 hectares. Private park, lake views, international architecture. 7 km from Tbilisi.",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ka: "/ka",
      },
    },
    manifest: "/site.webmanifest",
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
