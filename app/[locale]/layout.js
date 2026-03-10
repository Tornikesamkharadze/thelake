// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { getAlternateUrls } from "@/lib/metadata";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const tbcContractica = localFont({
  src: [
    {
      path: "../../public/fonts/TBCContractica-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContractica-Book.ttf",
      weight: "350",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContractica-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContractica-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContractica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContractica-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-contractica",
});

const tbcContracticaCaps = localFont({
  src: [
    {
      path: "../../public/fonts/TBCContracticaCAPS-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContracticaCAPS-Book.ttf",
      weight: "350",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContracticaCAPS-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContracticaCAPS-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContracticaCAPS-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/TBCContracticaCAPS-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-contractica-caps",
});

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
    ),
    title: isKa
      ? "The Lake by Placemakers - ექსკლუზიური ვილები და სახლები ლისის ტბის პირას"
      : "The Lake by Placemakers - Exclusive Villas & Houses by Lisi Lake",
    description: isKa
      ? "მშვიდი, ექსკლუზიური საცხოვრებელი კომპლექსი ვრცელი ვილებით (500–800 კვ.მ) და კერძო სახლებით (200–400 კვ.მ) ლისის ტბის პირას. 90 სახლი 14 ჰექტარზე კერძო პარკით, პანორამული ხედებით და საერთაშორისო არქიტექტურით. მხოლოდ 7 კმ თბილისის ცენტრიდან."
      : "A quiet, exclusive community of spacious villas (500–800 sq.m) and private houses (200–400 sq.m) by Lisi Lake. 90 homes on 14 hectares with private park, panoramic lake views, and international architecture. Just 7 km from Tbilisi city centre.",
    verification: {
      google: "uNGX89obPbBnvZ_BKr7vXkP019bQ9LKJ129sCSg00c0",
      other: {
        "facebook-domain-verification": "1kcivi3ctuhxyj6xl864o6yfs8ffmo",
      },
    },
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
    alternates: getAlternateUrls(""),
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
    <html
      lang={locale}
      className={`${tbcContractica.variable} ${tbcContracticaCaps.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="video"
          href="/opt_withoutLogo.mp4"
          type="video/mp4"
        />
      </head>

      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KM8VGBC6');`}
      </Script>

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1202701308028295');
          fbq('track', 'PageView');
        `}
      </Script>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KM8VGBC6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1202701308028295&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#312618",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "0px",
              fontSize: "12px",
              fontWeight: "500",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />

        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
