"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { Skeleton } from "@chakra-ui/react";
import { useGetData, usePostData } from "@/utils/api";
import { convertPrice, downloadFileFromUrl, formatIDR } from "@/utils/common";
import DOMPurify from "dompurify";
import { slugify } from "@/utils/hooks/slugify";

const TripDetailContent = () => {
  const params = useParams();
  const router = useRouter();
  const [tripData, setTripData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { getData } = useGetData();
  const { postData } = usePostData();

  const createTripSlug = (title, date) => slugify(`${title} ${date}`);

  useEffect(() => {
    const fetchTripDetail = async () => {
      try {
        setLoading(true);

        const responseCategory = await getData("/category/all?s=1");
        const category = responseCategory?.data?.find(
          (cat) => slugify(cat.name) === params.cat
        );

        if (category) {
          setCategoryData(category);

          const responseProduct = await postData(
            "/product/filtered-limit?s=1",
            { categoryIds: [category.id], p: 1, limit: 100 }
          );

          const slugFromUrl = params.slug;

          const matchedTrip = responseProduct?.data?.find((trip) => {
            const tripSlug = createTripSlug(trip.title, trip.date);
            return tripSlug === slugFromUrl;
          });

          setTripData(matchedTrip);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetail();
  }, [params.slug, params.cat]);

  const sanitizedContent = useMemo(() => {
    return tripData?.description
      ? DOMPurify.sanitize(tripData.description)
      : "";
  }, [tripData]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton height="600px" />
      </div>
    );

  if (!tripData)
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Trip Tidak Ditemukan</h1>
        <button
          onClick={() =>
            router.push(`/tour-schedule/category/${params.cat}`)
          }
          className="bg-[#FFA80F] text-white px-6 py-3 rounded-full"
        >
          Kembali ke Daftar Trip
        </button>
      </div>
    );

  return (
    <div className="container mx-auto px-4 lg:px-10 py-6 lg:py-12">
      
      {/* Back */}
      <button
        onClick={() =>
          router.push(`/tour-schedule/category/${params.cat}`)
        }
        className="mb-4 md:mb-6 text-[#004FC0] font-semibold hover:underline flex items-center gap-2 text-sm md:text-base"
      >
        <span>←</span> Kembali ke Daftar Trip
      </button>

      <div className="max-w-4xl mx-auto">

        {/* Banner */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-6">

          <div className="relative">
            <Image
              src={`${tripData.bannerHost}${tripData.banner}`}
              width={1200}
              height={800}
              alt={tripData.title}
              priority
              className={`w-full object-cover h-auto max-h-[450px] sm:max-h-[500px] md:max-h-[550px]
                ${tripData?.isSoldOut ? "grayscale" : ""}
              `}
            />

            {/* Label */}
            <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5">
              <div className="bg-[#004FC0] text-white py-2 px-4 text-xs sm:text-sm md:text-base rounded-full shadow">
                {tripData?.label}
              </div>
            </div>

            {/* Sold Out */}
            {tripData?.isSoldOut && (
              <Image
                src="/icon/sold.webp"
                width={200}
                height={200}
                alt="Sold Out"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[50%] sm:w-[40%] md:w-[35%]"
              />
            )}

            {/* Theme */}
            <div className="absolute top-4 left-0 w-full">
                <div className="bg-[#D7E4EF] py-1 text-center">
                    <p className="text-[#005A93] font-semibold text-sm sm:text-base tracking-wide uppercase">
                    {tripData?.theme}
                    </p>
                </div>
            </div>

          </div>

          {/* Title & Date */}
          <div className="bg-[#FFA80F] p-4 text-center">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
              {tripData?.title}
            </h1>
            <p className="text-[#004FC0] font-bold text-base sm:text-lg md:text-xl">
              {tripData?.date}
            </p>
          </div>

          {/* Price */}
          <div className="bg-[#004FC0] p-5 sm:p-6 text-center">
            {tripData?.price && (
              <p className="text-white line-through text-base sm:text-lg mb-1">
                {convertPrice(tripData?.price)} Juta/pax
              </p>
            )}
            <p className="text-white text-4xl sm:text-5xl font-bold">
              {convertPrice(tripData?.discPrice)}
            </p>
            <p className="text-white text-xs sm:text-sm mt-1">
              Juta / pax
            </p>
          </div>
        </div>

        {/* Tentang Trip */}
        <div className="bg-white rounded-xl p-5 sm:p-6 md:p-8 mb-8">
          <h2 className="text-[#004FC0] text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            Tentang Trip
          </h2>

          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-justify"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button
            onClick={() =>
              downloadFileFromUrl(
                `${tripData?.iteneraryHost}${tripData?.itenerary}`,
                tripData?.title
              )
            }
            className="bg-[#FFA80F] py-3 px-6 rounded-full flex items-center justify-center gap-2 
              hover:opacity-80 transition text-sm sm:text-base flex-1"
          >
            <FiDownload className="text-white text-xl" />
            <span className="text-white font-semibold">ITINERARY</span>
          </button>

          <a
            href={`https://wa.me/6282310702343?text=${encodeURIComponent(
              `Halo, Saya tertarik dengan paket travel ${tripData?.title}. Bisa dijelaskan detailnya?\n\n${window.location.href}`
            )}`}
            target="_blank"
            className="bg-[#FFA80F] py-3 px-6 rounded-full flex items-center justify-center gap-2
            hover:opacity-80 transition text-sm sm:text-base flex-1"
          >
            <FaWhatsapp className="text-white text-xl" />
            <span className="text-white font-semibold">
              TOUR CONSULTANT
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TripDetailContent;
