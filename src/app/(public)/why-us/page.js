import Hero from "@/components/Hero";
import Packages from "@/views/home/Packages";
import Image from "next/image";

export const metadata = {
  title: "Hobi Holidays : Why Us",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function TourSchedule() {
  const features = [
    {
      title: "Fasilitas Trip Berkualitas",
      description:
        "Dengan fasilitas trip berkualitas, Anda akan merasakan pelayanan prima, akomodasi nyaman, transportasi terjamin, dan itinerary yang dirancang khusus untuk memaksimalkan pengalaman perjalanan Anda. Setiap detail diperhatikan agar perjalanan Anda lancar, aman, dan penuh kenangan tak terlupakan!",
      image: "/why-us/1.png",
    },
    {
      title: "Tour Leader Profesional",
      description:
        "Dengan didampingi tour leader profesional, perjalanan Anda akan lebih terarah, informatif, dan menyenangkan. Mereka siap membantu, memberikan insight lokal, serta memastikan setiap momen perjalanan Anda berjalan lancar dan penuh kebahagiaan. Jelajahi destinasi dengan percaya diri bersama pemandu yang berpengalaman!",
      image: "/why-us/2.png",
    },
    {
      title: "Skema Pembayaran Fleksibel",
      description:
        "Nikmati kemudahan merencanakan perjalanan impian Anda dengan skema pembayaran fleksibel. Cukup bayar DP 3 Juta saja untuk mengamankan seat Anda, dan kami akan menjamin kursi tersebut tidak diberikan kepada orang lain. Sisa pembayaran bisa disesuaikan dengan kenyamanan Anda, membuat traveling jadi lebih mudah dan terjangkau!",
      image: "/why-us/3.png",
    },
    {
      title: "Transaksi Mudah dan Aman",
      description:
        "Nikmati kemudahan bertransaksi dengan sistem online terpercaya kami. Prosesnya cepat, aman, dan bebas ribet, sehingga Anda bisa fokus merencanakan perjalanan impian tanpa khawatir. Dengan transaksi mudah, traveling jadi lebih praktis dan menyenangkan!",
      image: "/why-us/4.png",
    },
  ];

  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Why Choose Us ?" image={"/why-us/hero.png"} />

      <div className="grid grid-cols-1 gap-12 lg:mx-24 mx-12 max-w-[80%]">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col lg:flex-row  gap-6">
            <Image
              src={feature.image}
              width={200}
              height={200}
              className="rounded-lg object-cover shadow-lg hidden lg:block"
              alt={feature.title}
            />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#004FC0]">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-medium mt-4">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
