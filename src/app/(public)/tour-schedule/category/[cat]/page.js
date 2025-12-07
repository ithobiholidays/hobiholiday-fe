import Hero from "@/components/Hero";
import Packages from "@/views/home/Packages";
import axios from "axios";
import Image from "next/image";
import { Suspense } from "react";

export const metadata = {
  title: "Hobi Holidays : Tour Schedule",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

// async function fetchDataCategory() {
//   return await GET("category/all");
// }

// async function fetchDataFilteredProduct(body) {
//   return await POST("product/filtered?s=1", body);
// }

export default async function TourSchedule() {
  return (
    <Suspense>
      <div className="flex flex-col gap-y-24">
        <Hero
          title="Jelajahi Berbagai Destinasi Impian Anda Dengan Sekali Klik!"
          image={"/image2.png"}
        />
        <Packages />
      </div>
    </Suspense>
  );
}
