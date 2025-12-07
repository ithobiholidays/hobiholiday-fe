import React from "react";

import {
  FaCheckCircle,
  FaUserTie,
  FaCreditCard,
  FaRegCalendarAlt,
} from "react-icons/fa";

const Hero2 = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 items-start 2xl:px-24 md:px-12 px-8 gap-16 3xl:-mt-16 3xl:-mb-14 2xl:-mt-28 xl:-mt-2 xl:-mb-20 lg:my-0 md:-my-10 xs:-my-20 ">
      <img
        src="/home/4.webp"
        className="max-h-[650px] rounded-lg col-span-2 xl:block hidden self-center place-self-center"
        alt="Travel"
        width={400}
        height={400}
      />
      <div className="lg:col-span-3 col-span-5 xl:max-w-[90%]">
        <h2 className="xl:text-4xl lg:text-3xl text-2xl font-bold text-blue-800 text-wrap mt-2 xl:hidden block">
          Rasakan Pengalaman Liburan yang Tak Terlupakan bersama Hobi Holidays!
        </h2>
        <h2 className="hd:text-5xl 3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl font-bold text-blue-800 text-wrap mt-2 xl:block hidden">
          Rasakan Pengalaman Liburan
        </h2>
        <h2 className="hd:text-5xl 3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl font-bold text-blue-800 text-wrap mt-2 xl:block hidden">
          yang Tak Terlupakan bersama
        </h2>
        <h2 className="hd:text-5xl 3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl font-bold text-blue-800 text-wrap mt-2 xl:block hidden">
          Hobi Holidays!
        </h2>
        <p className=" font-medium 3xl:text-lg hd:text-xl mt-8">
          Liburan Anda akan berkesan bersama kami. Lebih dari 15 ribu orang
          telah mengarungi indahnya dunia mulai Asia, Eropa, Amerika hingga
          Afrika. Kami berjanji menghadirkan bukan sekadar perjalanan, tetapi
          kenangan yang akan Anda bawa selamanya. Bergabunglah dengan kami, dan
          pastikan setiap langkah perjalanan Anda adalah langkah menuju
          pengalaman hidup yang autentik dan menakjubkan.
        </p>

        <div className="w-full xl:hidden rounded-lg col-span-2 my-5 aspect-square flex justify-center items-center overflow-hidden">
          <img
            src="/home/4.webp"
            className="w-full h-auto"
            alt="Travel"
            width={600}
            height={600}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="flex items-start space-x-3 border-t-[3px] border-[#004FC0] py-2">
            <img src="/icon/1.webp" className="w-12 h-auto"></img>
            <div>
              <h4 className="font-semibold 3xl:text-lg hd:text-xl text-[#004FC0]">
                Fasilitas Berkualitas
              </h4>
              <p className="text-gray-500 3xl:text-sm hd:text-lg">
                Nikmati pelayanan prima, akomodasi nyaman, dan itinerary yang
                memastikan pengalaman perjalanan Anda.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 border-t-[3px] border-[#004FC0] py-2">
            <img src="/icon/2.webp" className="w-12 h-auto"></img>
            <div>
              <h4 className="font-semibold 3xl:text-lg hd:text-xl text-[#004FC0]">
                Tour Leader Profesional
              </h4>
              <p className="text-gray-500 3xl:text-sm hd:text-lg">
                Siap membantu, memberikan insight lokal, serta memastikan
                perjalanan Anda berjalan lancar.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 border-t-[3px] border-[#004FC0] py-2">
            <img src="/icon/3.webp" className="w-12 h-auto"></img>
            <div>
              <h4 className="font-semibold 3xl:text-lg hd:text-xl text-[#004FC0]">
                Skema Fleksibel
              </h4>
              <p className="text-gray-500 3xl:text-sm hd:text-lg">
                Cukup bayar DP 3 Juta untuk mengamankan seat Anda, sisanya bisa
                dicicil.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 border-t-[3px] border-[#004FC0] py-2">
            <img src="/icon/4.webp" className="w-12 h-auto"></img>
            <div>
              <h4 className="font-semibold 3xl:text-lg hd:text-xl text-[#004FC0]">
                Transaksi Mudah
              </h4>
              <p className="text-gray-500 3xl:text-sm hd:text-lg">
                Nikmati kemudahan bertransaksi dengan sistem online terpercaya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
