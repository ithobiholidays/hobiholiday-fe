import Hero from "@/components/Hero";
import AwardView from "@/views/awards/AwardView";
import Packages from "@/views/home/Packages";
import Image from "next/image";

export const metadata = {
  title: "Hobi Holidays : Our Achievements",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function Achievements() {
  const awards = [
    {
      title: "The Best Travel Agent Award",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/image5.png", // Replace with actual award image
    },
    {
      title: "The Best Travel Agent Award",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/image5.png",
    },
    {
      title: "The Best Travel Agent Award",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/image5.png",
    },
  ];

  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Our Achievements" image={"/perjalanan-kami.png"} />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-16">
        {awards.map((award, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white"
          >
            <Image
              src={award.image}
              width={200}
              height={200}
              alt={award.title}
              className="mb-4"
            />
            <h3 className="text-2xl font-bold text-blue-700">{award.title}</h3>
            <p className="text-gray-600 mt-2">{award.description}</p>
          </div>
        ))}
      </div> */}

      <AwardView />
    </div>
  );
}
