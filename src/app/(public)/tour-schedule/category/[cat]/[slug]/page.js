import Hero from "@/components/Hero";
import ProductDetailContent from "@/views/home/ProductDetailContent";
import { Suspense } from "react";

export const metadata = {
  title: "Detail Trip - Hobi Holidays",
  description: "Informasi lengkap tentang paket tour dan destinasi impian Anda",
};

export default function TripDetailPage() {
  return (
    <Suspense>
      <div className="flex flex-col gap-y-24">
        <Hero
          title="Jelajahi Berbagai Destinasi Impian Anda Dengan Sekali Klik!"
          image={"/image2.png"}
        />
      </div>
      <ProductDetailContent />
    </Suspense>
  );
}