import Hero from "@/components/Hero";
import Packages from "@/views/home/Packages";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "Hobi Holidays : Contact Us",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function Contact() {
  const agents = [
    {
      name: "Marhaeni Riska Hasana Audina",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/agent/riska.jpg",
    },
    {
      name: "Fahrul Rodzi",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/agent/irul.jpg",
    },
    {
      name: "Muhammad Noor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/agent/noor.jpg",
    },
    {
      name: "Silmi Eka Siswanti",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/agent/silmi.jpg",
    },
    {
      name: "Bintang Putra Rianto",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/agent/bintang.jpg",
    },
  ];

  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Contact Us" image={"/contact-us.png"} />

      {/* put here */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 w-full px-16">
        {agents.map((award, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white"
          >
            <div className="max-w-[300px] aspect-[4/5] mb-4 overflow-hidden flex items-center justify-center rounded-full">
              <Image
                src={award.image}
                width={300}
                height={300}
                alt={award.name}
              />
            </div>
            <h3 className="text-2xl font-bold text-blue-700">{award.name}</h3>
            <a
              href="http://wa.me/+6282310702343"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#4FB391] text-white  px-4 py-2 rounded-2xl mt-8 w-fit hover:opacity-90 flex items-center gap-2">
                <FaWhatsapp /> Chat Whatsapp
              </button>
            </a>
            {/* <p className="text-gray-600 mt-2">{award.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
