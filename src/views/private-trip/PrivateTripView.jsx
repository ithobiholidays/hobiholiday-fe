"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const PrivateTripView = () => {
  const [nama, setNama] = useState("");
  const [noWa, setNoWa] = useState("");
  const [instansi, setInstansi] = useState("");

  const handleWhatsappClick = () => {
    // Ensure the phone number starts with 62 instead of 0
    let formattedNumber = noWa.replace(/^0/, "62"); // Replaces leading '0' with '62'

    const message = encodeURIComponent(
      `Hello, my name is ${nama}. I am from ${instansi} and would like to ask about private trip.`
    );

    const whatsappUrl = `https://wa.me/6282310702343?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 max-w-full px-8 md:px-16 lg:px-36 xl:px-48 gap-16">
      <div className="flex flex-col items-center">
        <Image
          src="/image7.png"
          width={400}
          height={600}
          alt="Team"
          className="rounded-lg shadow-lg mb-6 w-full h-auto max-w-[500px]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#004FC0] mb-4">
          Fleksibilitas
        </h3>
        <p className="text-gray-700 leading-relaxed mb-8 text-base sm:text-lg md:text-xl">
          Bila uang bukan menjadi masalah buat keluarga Anda, mengapa tidak
          dibuat Private Trip saja? Flexibilitas adalah kuncinya. Anda bebas
          mengatur perjalanan Anda.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8 text-base sm:text-lg md:text-xl">
          Pengalaman kami melayani Corporate Trip/Incentive Trip dan Study Tour
          membawa kami lebih maju dibandingkan yang lain. Anda harus mencobanya.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8 text-base sm:text-lg md:text-xl">
          Dapatkan Harga Terbaik Disini
        </p>

        <div className="flex gap-4 items-center mb-2">
          <p className="min-w-[100px]">Nama</p>
          <input
            placeholder="Isi Nama Disini..."
            variant="outline"
            className="border px-4 py-2 w-full"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        {/* <div className="flex gap-4 items-center mb-2">
          <p className="min-w-[100px]">No WA</p>
          <input
            placeholder="Isi No WA Disini..."
            variant="outline"
            className="border px-4 py-2 w-full"
            value={noWa}
            onChange={(e) => setNoWa(e.target.value)}
          />
        </div> */}
        <div className="flex gap-4 items-center">
          <p className="min-w-[100px]">Instansi</p>
          <input
            placeholder="Isi Instansi Disini..."
            variant="outline"
            className="border px-4 py-2 w-full"
            value={instansi}
            onChange={(e) => setInstansi(e.target.value)}
          />
        </div>

        <button
          className="bg-[#004FC0] text-white  px-4 py-2 rounded-2xl mt-8 w-fit hover:opacity-90 flex items-center gap-2"
          onClick={handleWhatsappClick}
        >
          <FaWhatsapp /> Chat Whatsapp
        </button>
      </div>
    </div>
  );
};

export default PrivateTripView;
