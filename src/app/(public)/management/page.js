import Hero from "@/components/Hero";
import Packages from "@/views/home/Packages";
import ManagementView from "@/views/management/ManagementView";
import Image from "next/image";

export const metadata = {
  title: "Hobi Holidays : Our Management",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function Management() {
  const features = [
    {
      name: "John Smith",
      job_title: "Komisaris",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/image4.png",
    },
    {
      name: "John Smith",
      job_title: "Founder & Chief Executive Officer",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/image4.png",
    },
    {
      name: "John Smith",
      job_title: "Founder & Chief Executive Officer",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/image4.png",
    },
    {
      name: "John Smith",
      job_title: "Founder & Chief Executive Officer",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/image4.png",
    },
  ];

  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Our Management" image={"/perjalanan-kami.png"} />

      <ManagementView />
      {/* <div className="grid grid-cols-1 gap-12 mx-24 max-w-[80%]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center gap-6"
          >
            <Image
              src={feature.image}
              width={200}
              height={200}
              className="rounded-lg object-cover shadow-lg "
              alt={`${feature.name} - ${feature.job_title}`}
            />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#004FC0]">
                {feature.job_title}
              </h3>
              <h3 className="text-xl md:text-2xl  mt-2">{feature.name}</h3>
              <p className="text-gray-600 mt-2 text-lg">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
