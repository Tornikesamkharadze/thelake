import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "The Lake by Placemakers - Exclusive Villas & Houses by Lisi Lake",
  description:
    "A quiet, exclusive community of spacious villas (500–800 sq.m) and private houses (200–400 sq.m) by Lisi Lake. 90 homes on 14 hectares with private park, panoramic lake views, and international architecture. Just 7 km from Tbilisi city centre.",
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
    title: "The Lake by Placemakers - Your Home Over the Lake",
    description:
      "Exclusive community of 90 villas and houses on 14 hectares by Lisi Lake. Spacious homes with private park and panoramic views, just 7 km from Tbilisi centre.",
    type: "website",
    locale: "en_US",
    siteName: "The Lake",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lake by Placemakers - Exclusive Living by Lisi Lake",
    description:
      "90 villas & houses on 14 hectares. Private park, lake views, international architecture. 7 km from Tbilisi.",
    images: ["/og-image.png"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
