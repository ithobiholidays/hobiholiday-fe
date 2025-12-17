"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaWhatsapp, FaCalendarAlt, FaTag, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FiDownload, FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";
import { IoMdPricetag } from "react-icons/io";
import { MdVerified } from "react-icons/md";
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
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const { getData } = useGetData();
  const { postData } = usePostData();

  const createTripSlug = (title, date) => slugify(`${title} ${date}`);

  // Handle scroll untuk floating button di mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        setShowFloatingButton(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const discountPercentage = useMemo(() => {
    if (tripData?.price && tripData?.discPrice) {
      const discount = ((tripData.price - tripData.discPrice) / tripData.price) * 100;
      return Math.round(discount);
    }
    return 0;
  }, [tripData]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Skeleton height="80px" className="mb-6 rounded-2xl" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton height="500px" className="rounded-2xl" />
              <Skeleton height="400px" className="rounded-2xl" />
            </div>
            <div className="space-y-6">
              <Skeleton height="350px" className="rounded-2xl" />
              <Skeleton height="200px" className="rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );

  if (!tripData)
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-[#004FC0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Trip Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">Maaf, trip yang Anda cari tidak tersedia atau telah dihapus.</p>
          </div>
          <button
            onClick={() => router.push(`/tour-schedule/category/${params.cat}`)}
            className="bg-gradient-to-r from-[#FFA80F] to-[#FF9500] text-white px-8 py-3 rounded-full hover:from-[#FF9500] hover:to-[#FF8500] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold inline-flex items-center gap-2"
          >
            <span>←</span>
            Kembali ke Daftar Trip
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-10 py-4 sm:py-6 lg:py-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <button
            onClick={() => router.push(`/tour-schedule/category/${params.cat}`)}
            className="group inline-flex items-center gap-2 text-[#004FC0] font-semibold hover:gap-3 transition-all duration-300 text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span className="hidden sm:inline">Kembali ke Daftar Trip</span>
            <span className="sm:hidden">Kembali</span>
          </button>

          {/* Breadcrumb Path - Desktop */}
          <div className="hidden md:flex items-center gap-2 mt-2 text-xs lg:text-sm text-gray-500">
            <span className="hover:text-[#004FC0] cursor-pointer transition-colors">Beranda</span>
            <span>/</span>
            <span className="hover:text-[#004FC0] cursor-pointer transition-colors">{categoryData?.name || "Kategori"}</span>
            <span>/</span>
            <span className="text-gray-700 font-medium truncate max-w-[200px] lg:max-w-[300px]">{tripData?.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 pb-24 lg:pb-0">
              {/* Hero Image Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative group">
                  <Image
                    src={`${tripData.bannerHost}${tripData.banner}`}
                    width={1200}
                    height={800}
                    alt={tripData.title}
                    priority
                    className={`w-full object-cover h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[520px] transition-transform duration-700 group-hover:scale-110 ${
                      tripData?.isSoldOut ? "grayscale" : ""
                    }`}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Badges Container */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-start gap-2 flex-wrap">
                    {/* Theme Badge */}
                    {tripData?.theme && (
                      <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg animate-slideInLeft">
                        <p className="text-[#005A93] font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-1.5 sm:gap-2">
                          <FaMapMarkerAlt className="text-[#FFA80F] text-sm sm:text-base" />
                          <span className="hidden xs:inline">{tripData.theme}</span>
                          <span className="xs:hidden">{tripData.theme.slice(0, 10)}...</span>
                        </p>
                      </div>
                    )}

                    {/* Label Badge */}
                    {tripData?.label && (
                      <div className="bg-gradient-to-r from-[#004FC0] to-[#0066FF] text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg font-semibold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 animate-slideInRight">
                        <FaTag className="text-[#FFA80F]" />
                        <span>{tripData.label}</span>
                      </div>
                    )}
                  </div>

                  {/* Sold Out Overlay */}
                  {tripData?.isSoldOut && (
                    <>
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/icon/sold.webp"
                          width={200}
                          height={200}
                          alt="Sold Out"
                          className="w-[45%] xs:w-[40%] sm:w-[35%] md:w-[30%] drop-shadow-2xl animate-pulse"
                        />
                      </div>
                    </>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                    <h1 className="text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg leading-tight">
                      {tripData?.title}
                    </h1>
                    <div className="flex items-center gap-2 text-white/95">
                      <FaCalendarAlt className="text-[#FFA80F] text-sm sm:text-base" />
                      <p className="font-semibold text-sm sm:text-base md:text-lg">{tripData?.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features - Mobile Only */}
              <div className="flex flex-col md:flex-row gap-3 lg:hidden">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border-2 border-blue-200 hover:shadow-md transition-all flex-1">
                  <FaMapMarkerAlt className="text-[#FFA80F] text-2xl mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#004FC0]">{categoryData?.name}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border-2 border-blue-200 hover:shadow-md transition-all flex-1">
                  <FaCalendarAlt className="text-[#FFA80F] text-2xl mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#004FC0]">{tripData?.date}</p>
                </div>
              </div>

              {/* Price Card - Mobile Only (Static) */}
              <div className="lg:hidden bg-gradient-to-br from-[#004FC0] to-[#0066FF] rounded-2xl p-5 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <IoMdPricetag className="text-2xl text-[#FFA80F]" />
                    <h3 className="text-lg font-bold text-white">Harga Special</h3>
                  </div>
                </div>

                {/* Price Section */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {tripData?.price && (
                      <p className="text-white/70 line-through text-base">
                        Rp {convertPrice(tripData.price)} Jt
                      </p>
                    )}
                    {discountPercentage > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-5xl font-black text-white">
                      {convertPrice(tripData?.discPrice)}
                    </span>
                    <span className="text-lg text-white/90 font-medium">Juta/pax</span>
                  </div>
                </div>
              </div>

              {/* Trip Description */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-[#FFA80F] to-[#FF9500] rounded-full"></div>
                  <h2 className="text-[#004FC0] text-xl sm:text-2xl lg:text-3xl font-bold">
                    Tentang Trip Ini
                  </h2>
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-[#004FC0] prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-4 first:prose-headings:mt-0 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3 prose-p:text-sm sm:prose-p:text-base prose-li:text-gray-700 prose-li:my-1 prose-li:text-sm sm:prose-li:text-base prose-li:leading-relaxed prose-strong:text-[#004FC0] prose-strong:font-semibold prose-a:text-[#FFA80F] prose-a:no-underline hover:prose-a:underline prose-ul:my-3 prose-ul:pl-5 prose-ol:my-3 prose-ol:pl-5 prose-img:rounded-xl prose-img:shadow-md prose-img:my-4 [&>*]:break-words"
                />
              </div>
            </div>

            {/* Right Column - Sticky Sidebar (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 space-y-5 xl:space-y-6">
                {/* Price Card */}
                <div className="bg-gradient-to-br from-[#004FC0] via-[#0066FF] to-[#004FC0] rounded-2xl p-6 xl:p-7 shadow-2xl text-white hover:shadow-3xl transition-all duration-300 border-2 border-white/10 relative overflow-hidden group">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <IoMdPricetag className="text-2xl xl:text-3xl text-[#FFA80F]" />
                        <h3 className="text-lg xl:text-xl font-bold">Harga Special</h3>
                      </div>
                    </div>

                    {tripData?.price && (
                      <div className="mb-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-white/70 line-through text-lg xl:text-xl">
                            Rp {convertPrice(tripData.price)} Jt
                          </p>
                          {discountPercentage > 0 && (
                            <span className="bg-red-500 text-white text-xs xl:text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                              HEMAT {discountPercentage}%
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mb-2">
                      <div className="flex items-baseline gap-2">
                        <div className="text-5xl xl:text-6xl font-black">
                          {convertPrice(tripData?.discPrice)}
                        </div>
                        <div className="text-white/90 text-base xl:text-lg font-semibold">
                          Juta/pax
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/20">
                      <div className="space-y-3 text-sm xl:text-base">
                        {categoryData?.name && (
                          <div className="flex items-center gap-3 group/item">
                            <div className="bg-white/10 p-2 rounded-lg group-hover/item:bg-white/20 transition-colors">
                              <FaMapMarkerAlt className="text-[#FFA80F]" />
                            </div>
                            <span>{categoryData.name}</span>
                          </div>
                        )}
                        {tripData?.date && (
                          <div className="flex items-center gap-3 group/item">
                            <div className="bg-white/10 p-2 rounded-lg group-hover/item:bg-white/20 transition-colors">
                              <FaCalendarAlt className="text-[#FFA80F]" />
                            </div>
                            <span>{tripData?.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 xl:space-y-4">
                  <a
                    href={`https://wa.me/6282310702343?text=${encodeURIComponent(
                      `Halo, Saya tertarik dengan paket travel ${tripData?.title}. Bisa dijelaskan detailnya?\n\n${window.location.href}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-r from-green-500 to-green-600 text-white py-4 xl:py-5 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border-2 border-green-400/30"
                  >
                    <div className="flex items-center justify-center gap-3 group">
                      <FaWhatsapp className="text-2xl xl:text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                      <div className="text-left">
                        <div className="font-bold text-base xl:text-lg">Hubungi Admin</div>
                        <div className="text-xs xl:text-sm text-green-100">Chat via WhatsApp</div>
                      </div>
                    </div>
                  </a>

                  <button
                    onClick={() => {
                      // Bersihkan nama file dari karakter yang bermasalah
                      const cleanFileName = tripData?.title
                        .replace(/\./g, '_') // Ganti semua titik dengan underscore
                        .replace(/[\/\\:*?"<>|]/g, '_') // Ganti karakter ilegal dengan underscore
                        .replace(/\s+/g, '_') // Ganti spasi dengan underscore
                        .trim();
                      
                      downloadFileFromUrl(
                        `${tripData?.iteneraryHost}${tripData?.itenerary}`,
                        cleanFileName
                      );
                    }}
                    className="w-full bg-gradient-to-r from-[#FFA80F] to-[#FF9500] text-white py-4 xl:py-5 px-6 rounded-xl hover:from-[#FF9500] hover:to-[#FF8500] transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border-2 border-orange-400/30"
                  >
                    <div className="flex items-center justify-center gap-3 group">
                      <FiDownload className="text-xl xl:text-2xl group-hover:scale-110 group-hover:translate-y-1 transition-all duration-300" />
                      <div className="text-left">
                        <div className="font-bold text-base xl:text-lg">Download Itinerary</div>
                        <div className="text-xs xl:text-sm text-orange-100">File PDF lengkap</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button - Mobile Only */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-200 transition-all duration-300 z-50 ${
          showFloatingButton ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="px-3 sm:px-4 py-3">
          {/* Price Info */}
          <div className="flex items-center justify-between mb-3">
            {/* Kiri: Mulai dari + Harga */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                Mulai dari
              </span>

              <span className="text-lg font-bold text-[#004FC0]">
                Rp {convertPrice(tripData?.discPrice)}
              </span>

              <span className="text-sm text-gray-600 font-medium">
                Juta/pax
              </span>
            </div>
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              onClick={() => {
                // Bersihkan nama file dari karakter yang bermasalah
                const cleanFileName = tripData?.title
                  .replace(/\./g, '_') // Ganti semua titik dengan underscore
                  .replace(/[\/\\:*?"<>|]/g, '_') // Ganti karakter ilegal dengan underscore
                  .replace(/\s+/g, '_') // Ganti spasi dengan underscore
                  .trim();
                
                downloadFileFromUrl(
                  `${tripData?.iteneraryHost}${tripData?.itenerary}`,
                  cleanFileName
                );
              }}
              className="bg-white border-2 border-[#FFA80F] text-[#FFA80F] py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 transition-all font-bold text-xs sm:text-sm"
            >
              <FiDownload className="text-base sm:text-lg flex-shrink-0" />
              <span>Itinerary</span>
            </button>
            <a
              href={`https://wa.me/6282310702343?text=${encodeURIComponent(
                `Halo, Saya tertarik dengan paket travel ${tripData?.title}. Bisa dijelaskan detailnya?\n\n${window.location.href}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 transition-all font-bold text-xs sm:text-sm"
            >
              <FaWhatsapp className="text-lg sm:text-xl flex-shrink-0" />
              <span>Konsultasi</span>
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
        @media (max-width: 1024px) {
          .prose {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TripDetailContent;