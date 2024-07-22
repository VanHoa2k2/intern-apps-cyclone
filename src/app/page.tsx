"use client";

import SectionBg from "@/component/client/home/SectionBg";
import SectionCompanyLogo from "@/component/client/home/SectionCompanyLogo";
import SectionFeaturedProduct from "@/component/client/home/SectionFeaturedProduct";
import SectionRecentlyAdded from "@/component/client/home/SectionRecentlyAdded";
import SectionTestimonial from "@/component/client/home/SectionTestimonial";
import SectionTopCategory from "@/component/client/home/SectionTopCategory";

export default function Home() {
  return (
    <main>
      <SectionBg />
      <SectionCompanyLogo />
      <SectionFeaturedProduct />
      <SectionTopCategory />
      <SectionTestimonial />
      <SectionRecentlyAdded />
    </main>
  );
}
