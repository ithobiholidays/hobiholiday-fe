import Image from "next/image";

import YoutubeCarousel from "@/views/home/Swiper";
import Hero1 from "@/views/home/Hero1";
import Hero2 from "@/views/home/Hero2";
import Packages from "@/views/home/Packages";
import Blog from "@/views/home/Blog";
import { Suspense } from "react";

export const metadata = {
  title: "Hobi Holidays : Home",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function Home() {
  return (
    <Suspense>
      <div className="flex flex-col gap-y-36">
        <Hero1 />
        <Hero2 />

        <YoutubeCarousel />

        <Blog />
        <Packages />
      </div>
    </Suspense>
  );
}
