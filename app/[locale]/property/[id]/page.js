import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import PropertyDetail from "@/components/PropertyDetail";
import { properties } from "@/lib/dummyData";
import { notFound } from "next/navigation";

export default async function PropertyPage({ params }) {
  // Await params for Next.js 15+
  const { id } = await params;

  // Find property by houseNo
  const property = properties.find((p) => p.houseNo === id);

  // If property not found, show 404
  if (!property) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <PropertyDetail property={property} />
      </main>
      <Footer />
    </>
  );
}

// Optional: Generate static params for all properties
export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.houseNo,
  }));
}
