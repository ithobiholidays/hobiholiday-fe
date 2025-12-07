import Hero from "@/components/Hero";
import Packages from "@/views/home/Packages";
import Image from "next/image";

export const metadata = {
  title: "Hobi Holidays : Tour Schedule",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function TourSchedule() {
  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Perjalanan Kami" image={"/perjalanan-kami.png"} />

      <div className="flex items-center gap-12 bg-white p-8 justify-center">
        <Image
          src="/history.webp"
          className="object-fill max-w-full h-auto w-40 sm:w-60 md:w-72 lg:w-80 xl:w-96 hidden lg:block"
          width={400}
          height={400}
          alt="Travel 3"
        />

        {/* Text Section */}
        <div className="max-w-2xl text-left">
          <h2 className="text-[#004FC0] font-bold text-2xl sm:text-3xl md:text-4xl lg:block hidden">
            Awal 2017 adalah Langkah kecil
          </h2>
          <h2 className="text-[#004FC0] font-bold text-2xl sm:text-3xl md:text-4xl lg:block hidden">
            PT Semesta Hobi Wisata
          </h2>
          <h2 className="text-[#004FC0] font-bold text-2xl md:text-3xl lg:hidden block">
            Awal 2017 adalah Langkah kecil PT Semesta Hobi Wisata
          </h2>

          <p className="text-gray-700 mt-4 ">
            Berdiri di sebuah kantor kecil berlokasi di timur kota Jakarta.
            Sejak awal kami mendedikasikan diri untuk melayani pelanggan
            berlibur ke luar negeri dengan ragam destinasi di lima benua. Hingga
            saat ini kami telah melayani lebih dari 15.000 pelanggan di seluruh
            Indonesia dari Timur hingga Barat.
          </p>

          <br />

          <h3 className="text-lg font-bold">Visi</h3>
          <ul className="list-disc pl-5">
            <li>IPO di 2027</li>
          </ul>
          <br />
          <h3 className="text-lg font-bold">Misi</h3>
          <ul className="list-disc pl-5">
            <li>Menambah cabang di berbagai tempat di Indonesia</li>
            <li>Terintegrasi dengan system yang terpadu</li>
            <li>
              Semakin diperhitungkan menjadi travel agent terpercaya dengan
              pelayanan terbaik
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
