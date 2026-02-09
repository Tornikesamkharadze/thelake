import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import PropertyListing from "@/components/PropertyListing";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <main>
        <PropertyListing />
      </main>
      <Footer />
    </>
  );
};

export default page;
