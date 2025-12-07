import Hero from "@/components/Hero";
import CareerView from "@/views/career/CareerView";
import Packages from "@/views/home/Packages";
import Image from "next/image";

export const metadata = {
  title: "Hobi Holidays : Career",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function Career() {
  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Career" image={"/career.png"} />

      <CareerView />
    </div>
  );
}
