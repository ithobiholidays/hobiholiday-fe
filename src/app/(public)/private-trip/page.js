import Hero from "@/components/Hero";
import Packages from "@/views/home/Packages";
import PrivateTripView from "@/views/private-trip/PrivateTripView";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";

export const metadata = {
  title: "Hobi Holidays : Private Trip",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function PrivateTrip() {
  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Tentang Private Trip" image={"/private-trip.png"} />

      <PrivateTripView />
    </div>
  );
}
