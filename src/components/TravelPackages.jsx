import React, { useState } from "react";
import { FaShare, FaWhatsapp } from "react-icons/fa";
import { MdFileDownload, MdOutlineFileDownload } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const categories = [
  "Korea",
  "Jepang",
  "Turki & Middle East",
  "UK Scotland",
  "USA & Canada",
  "Scandinavia & Balkan",
  "Russia & China",
  "Afrika",
  "Australia & New Zealand",
  "Spain Portugal",
  "Uzbekistan & 4tan",
  "Other Asia",
  "Other Europe",
  "Premium Trip",
];

const travelPackages = [
  {
    title: "Sparkling Australia",
    date: "24-30 April 2025",
    highlights: [
      "Queen Victoria",
      "Sydney Harbor",
      "Flinders Street Station",
      "Brighton Beach",
      "Sydney Opera House",
    ],
    price: "19,8",
    imageUrl: "card1.png", // Example placeholder image
  },
  // Duplicate objects to simulate multiple cards
  {
    title: "Sparkling Australia",
    date: "24-30 April 2025",
    highlights: [
      "Queen Victoria",
      "Sydney Harbor",
      "Flinders Street Station",
      "Brighton Beach",
      "Sydney Opera House",
    ],
    price: "19,8",
    imageUrl: "card1.png",
  },
  {
    title: "Sparkling Australia",
    date: "24-30 April 2025",
    highlights: [
      "Queen Victoria",
      "Sydney Harbor",
      "Flinders Street Station",
      "Brighton Beach",
      "Sydney Opera House",
    ],
    price: "19,8",
    imageUrl: "card1.png",
  },
];

const TravelPackages = () => {
  const [selectedItem, setSelectedItem] = useState(categories[0]);

  return (
    <div className="flex min-h-screen items-start ml-12">
      {/* Sidebar */}
      <div className="w-1/5 bg-white rounded-lg">
        <ul className="">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`font-semibold border mb-2 border-[#FFA80F] py-2 px-4 cursor-pointer transition
            ${
              selectedItem === category
                ? "bg-yellow-500 text-white"
                : "text-blue-700 hover:bg-yellow-500 hover:text-white"
            }`}
              onClick={() => setSelectedItem(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
        <div className=" p-3 border shadow-2xl rounded-lg relative ">
          <img src="card1.png" className="w-full" alt="" />
          <div className="absolute w-full top-8 right-0 px-3">
            <div className="py-1 flex w-full justify-center bg-[#D7E4EF]">
              <p className="text-sky-700 font-semibold">
                AUTUMN HOLIDAY SERIES
              </p>
            </div>
          </div>
          <div className="bg-[#FFA80F] flex flex-col items-center justify-center gap-1 py-2 mt-1 w-full">
            <p className="font-semibold text-white text-xl">
              SPARKLING AUSTRALIA
            </p>
            <p className="text-sky-800 font-semibold">24 - 30 April 2024</p>
          </div>
          <div className="bg-[#004FC0] flex items-center justify-center gap-1 p-4 mt-1 rounded-lg">
            <p className=" text-white text-sm">
              Queen Victoria - Sydney Harbor - Flinders Street Station -
              Brighton Beach - Sydney Opera House
            </p>
            <div className="border-l border-white px-4 flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold">19,8</p>
              <p className="text-[10px] text-white text-center">Juta/ pax</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 justify-between lg:flex">
            <div className="bg-[#FFA80F] p-1.5 rounded-full">
              <FaShare className="text-white shadow-lg" />
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center flex-1">
              <FiDownload className="text-white shadow-lg text-lg pb-1 font-semibold" />
              <p className="text-white text-xs">ITINERARY</p>
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FaWhatsapp className="text-white shadow-lg text-lg font-semibold" />
              <p className="text-white text-xs">TOUR CONSULTANT</p>
            </div>
          </div>
        </div>
        <div className=" p-3 border shadow-2xl rounded-lg relative ">
          <img src="card1.png" className="w-full" alt="" />
          <div className="absolute w-full top-8 right-0 px-3">
            <div className="py-1 flex w-full justify-center bg-[#D7E4EF]">
              <p className="text-sky-700 font-semibold">
                AUTUMN HOLIDAY SERIES
              </p>
            </div>
          </div>
          <div className="bg-[#FFA80F] flex flex-col items-center justify-center gap-1 py-2 mt-1 w-full">
            <p className="font-semibold text-white text-xl">
              SPARKLING AUSTRALIA
            </p>
            <p className="text-sky-800 font-semibold">24 - 30 April 2024</p>
          </div>
          <div className="bg-[#004FC0] flex items-center justify-center gap-1 p-4 mt-1 rounded-lg">
            <p className=" text-white text-sm">
              Queen Victoria - Sydney Harbor - Flinders Street Station -
              Brighton Beach - Sydney Opera House
            </p>
            <div className="border-l border-white px-4 flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold">19,8</p>
              <p className="text-[10px] text-white text-center">Juta/ pax</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 justify-between">
            <div className="bg-[#FFA80F] p-1.5 rounded-full">
              <FaShare className="text-white shadow-lg" />
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FiDownload className="text-white shadow-lg text-lg pb-1 font-semibold" />
              <p className="text-white text-xs">ITINERARY</p>
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FaWhatsapp className="text-white shadow-lg text-lg font-semibold" />
              <p className="text-white text-xs">TOUR CONSULTANT</p>
            </div>
          </div>
        </div>
        <div className=" p-3 border shadow-2xl rounded-lg relative ">
          <img src="card1.png" className="w-full" alt="" />
          <div className="absolute w-full top-8 right-0 px-3">
            <div className="py-1 flex w-full justify-center bg-[#D7E4EF]">
              <p className="text-sky-700 font-semibold">
                AUTUMN HOLIDAY SERIES
              </p>
            </div>
          </div>
          <div className="bg-[#FFA80F] flex flex-col items-center justify-center gap-1 py-2 mt-1 w-full">
            <p className="font-semibold text-white text-xl">
              SPARKLING AUSTRALIA
            </p>
            <p className="text-sky-800 font-semibold">24 - 30 April 2024</p>
          </div>
          <div className="bg-[#004FC0] flex items-center justify-center gap-1 p-4 mt-1 rounded-lg">
            <p className=" text-white text-sm">
              Queen Victoria - Sydney Harbor - Flinders Street Station -
              Brighton Beach - Sydney Opera House
            </p>
            <div className="border-l border-white px-4 flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold">19,8</p>
              <p className="text-[10px] text-white text-center">Juta/ pax</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 justify-between">
            <div className="bg-[#FFA80F] p-1.5 rounded-full">
              <FaShare className="text-white shadow-lg" />
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FiDownload className="text-white shadow-lg text-lg pb-1 font-semibold" />
              <p className="text-white text-xs">ITINERARY</p>
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FaWhatsapp className="text-white shadow-lg text-lg font-semibold" />
              <p className="text-white text-xs">TOUR CONSULTANT</p>
            </div>
          </div>
        </div>
        <div className=" p-3 border shadow-2xl rounded-lg relative ">
          <img src="card1.png" className="w-full" alt="" />
          <div className="absolute w-full top-8 right-0 px-3">
            <div className="py-1 flex w-full justify-center bg-[#D7E4EF]">
              <p className="text-sky-700 font-semibold">
                AUTUMN HOLIDAY SERIES
              </p>
            </div>
          </div>
          <div className="bg-[#FFA80F] flex flex-col items-center justify-center gap-1 py-2 mt-1 w-full">
            <p className="font-semibold text-white text-xl">
              SPARKLING AUSTRALIA
            </p>
            <p className="text-sky-800 font-semibold">24 - 30 April 2024</p>
          </div>
          <div className="bg-[#004FC0] flex items-center justify-center gap-1 p-4 mt-1 rounded-lg">
            <p className=" text-white text-sm">
              Queen Victoria - Sydney Harbor - Flinders Street Station -
              Brighton Beach - Sydney Opera House
            </p>
            <div className="border-l border-white px-4 flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold">19,8</p>
              <p className="text-[10px] text-white text-center">Juta/ pax</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 justify-between">
            <div className="bg-[#FFA80F] p-1.5 rounded-full">
              <FaShare className="text-white shadow-lg" />
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FiDownload className="text-white shadow-lg text-lg pb-1 font-semibold" />
              <p className="text-white text-xs">ITINERARY</p>
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FaWhatsapp className="text-white shadow-lg text-lg font-semibold" />
              <p className="text-white text-xs">TOUR CONSULTANT</p>
            </div>
          </div>
        </div>
        <div className=" p-3 border shadow-2xl rounded-lg relative ">
          <img src="card1.png" className="w-full" alt="" />
          <div className="absolute w-full top-8 right-0 px-3">
            <div className="py-1 flex w-full justify-center bg-[#D7E4EF]">
              <p className="text-sky-700 font-semibold">
                AUTUMN HOLIDAY SERIES
              </p>
            </div>
          </div>
          <div className="bg-[#FFA80F] flex flex-col items-center justify-center gap-1 py-2 mt-1 w-full">
            <p className="font-semibold text-white text-xl">
              SPARKLING AUSTRALIA
            </p>
            <p className="text-sky-800 font-semibold">24 - 30 April 2024</p>
          </div>
          <div className="bg-[#004FC0] flex items-center justify-center gap-1 p-4 mt-1 rounded-lg">
            <p className=" text-white text-sm">
              Queen Victoria - Sydney Harbor - Flinders Street Station -
              Brighton Beach - Sydney Opera House
            </p>
            <div className="border-l border-white px-4 flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold">19,8</p>
              <p className="text-[10px] text-white text-center">Juta/ pax</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 justify-between">
            <div className="bg-[#FFA80F] p-1.5 rounded-full">
              <FaShare className="text-white shadow-lg" />
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FiDownload className="text-white shadow-lg text-lg pb-1 font-semibold" />
              <p className="text-white text-xs">ITINERARY</p>
            </div>
            <div className="bg-[#FFA80F] py-1.5 px-4 rounded-full flex gap-1 items-center">
              <FaWhatsapp className="text-white shadow-lg text-lg font-semibold" />
              <p className="text-white text-xs">TOUR CONSULTANT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPackages;
