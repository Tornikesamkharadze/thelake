import { PARTNERS_NOINDEX } from "@/lib/metadata";

// Applies to /partners and every /partners/[slug] page
export const metadata = PARTNERS_NOINDEX
  ? { robots: { index: false, follow: true } }
  : {};

export default function PartnersLayout({ children }) {
  return children;
}
