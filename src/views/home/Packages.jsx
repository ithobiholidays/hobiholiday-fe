"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

import {
  FaChevronDown,
  FaChevronUp,
  FaShare,
  FaWhatsapp,
} from "react-icons/fa";
import { MdFileDownload, MdOutlineFileDownload } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
} from "@chakra-ui/react";
import { useGetData, usePostData } from "@/utils/api";
import Image from "next/image";
import { convertPrice, downloadFileFromUrl, formatIDR } from "@/utils/common";
import { PiShareFatFill } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import ShareComponent from "./ShareComponent";

import { slugify, deslugify } from "@/utils/hooks/slugify";

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productData, setProductData] = useState([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1100) {
      setIsOpenDropdown(true);
    }
  }, []);

  const params = useParams();
  const router = useRouter();
  const path = usePathname();

  const [page, setPage] = useState(1);

  const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);
  const searchParams = useSearchParams();

  const {
    getData,
    data: dataCategory,
    totalData: totalCategory,
    loading: loadingCategory,
  } = useGetData();
  const {
    postData,
    data: dataProduct,
    totalData: totalProduct,
    loading: loadingProduct,
  } = usePostData();

  // Helper function to create slug from title + date
  const createTripSlug = (title, date) => {
    return slugify(`${title} ${date}`);
  };

  const onLoadMore = async () => {
    const responseProduct = await postData("/product/filtered-limit?s=1", {
      categoryIds: [selectedCategory.id],
      p: page + 1,
      limit: 9,
    });
    setPage(page + 1);
    setProductData((prevProduct) => [...prevProduct, ...responseProduct?.data]);
  };

  // Navigate to detail page instead of opening modal
  const handleCardClick = (product) => {
    const tripSlug = createTripSlug(product.title, product.date);
    router.push(
      `/tour-schedule/category/${slugify(selectedCategory.name)}/${tripSlug}`
    );
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const responseCategory = await getData("/category/all?s=1");
        if (responseCategory?.data?.length) {
          const allCategories = responseCategory.data;
          const categoryIdFromParams = deslugify(params?.cat);

          let selected = allCategories[0];

          if (categoryIdFromParams && categoryIdFromParams !== "1") {
            const matchedCategory = allCategories.find(
              (cat) =>
                cat.name.toLowerCase() ===
                decodeURIComponent(categoryIdFromParams).toLowerCase()
            );
            if (matchedCategory) selected = matchedCategory;
          }

          if (params.cat === "1") {
            router.push("/tour-schedule/category/" + slugify(selected.name));
          }

          setSelectedCategory(selected);

          if (categoryIdFromParams) {
            const categorySection = document.getElementById("category-section");
            if (categorySection) {
              const yOffset = -120;
              const y =
                categorySection.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;

              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products when user selects a new category
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!selectedCategory) return;

      try {
        const responseProduct = await postData("/product/filtered-limit?s=1", {
          categoryIds: [selectedCategory?.id],
          p: 1,
          limit: 9,
        });
        setProductData(responseProduct.data);
        if (window.innerWidth >= 1100) {
          setIsOpenDropdown(false);
        }

      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  return (
    <div
      className="grid grid-cols-5 lg:px-12  px-6 items-start gap-8"
      id="category-section"
    >
      {loadingCategory || loadingProduct ? (
        <Skeleton height="300" />
      ) : (
        <>
          <div className="w-full font-sans border border-orange-500 rounded overflow-hidden xl:hidden col-span-5">
            {/* Dropdown Header */}
            <div
              className="bg-yellow-500 text-white px-4 py-3 cursor-pointer flex items-center justify-between w-full"
              onClick={toggleDropdown}
            >
              <div className="flex flex-col">
                <p className="font-bold text-lg">{selectedCategory?.name}</p>
                {!isOpenDropdown && (
                  <p className="text-[10px] text-white opacity-80 -mt-1">
                    Klik untuk pilih Destinasi lain
                  </p>
                )}
              </div>
              {isOpenDropdown ? (
                <FaChevronUp className="ml-2 w-5 h-5" />
              ) : (
                <FaChevronDown className="ml-2 w-5 h-5" />
              )}
            </div>

            {/* Dropdown List (inline, not absolute) */}
            {isOpenDropdown && (
              <div className="bg-white max-h-64 overflow-y-auto">
                {dataCategory?.map((category, index) => (
                  <div
                    key={category?.id}
                    onClick={() => {
                      setSelectedCategory(category);
                      setPage(1);
                    }}
                    className="px-4 py-2 text-blue-700 hover:bg-orange-100 cursor-pointer"
                  >
                    {category?.name}
                  </div>
                ))}
                <div className="sticky bottom-0 bg-white text-center py-1 pointer-events-none">
                  <p className="text-[10px] text-gray-400">Scroll untuk lihat Destinasi lain</p>
                </div>
              </div>
            )}
          </div>
          <div className="xl:col-span-1 hidden xl:block bg-white rounded-lg xl:mb-0">
            <div className="overflow-x-auto whitespace-nowrap lg:whitespace-normal ">
              <ul className="flex xl:block gap-4">
                {dataCategory?.map((category, index) => (
                  <li
                    key={index}
                    className={`font-semibold border border-[#FFA80F] py-2 px-4 cursor-pointer transition flex-shrink-0 mb-1
                    ${
                      selectedCategory.id === category?.id
                        ? "bg-yellow-500 text-white"
                        : "text-blue-700 hover:bg-yellow-500 hover:text-white"
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setPage(1);
                      if (path.includes("/tour-schedule")) {
                        router.push(
                          "/tour-schedule/category/" + slugify(category.name)
                        );
                      }
                    }}
                  >
                    {category?.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      <div className="xl:col-span-4 col-span-5 grid grid-cols-1 2xl:grid-cols-3 sm:grid-cols-2 lg:gap-6 md:gap-4 gap-2">
        {/* Show skeleton loaders if loading */}
        {loadingCategory || loadingProduct ? (
          <>
            <Skeleton height="300" />
            <Skeleton height="300" />
            <Skeleton height="300" />
          </>
        ) : productData?.length === 0 ? (
          <div className="  text-lg">No Data</div>
        ) : (
          productData?.map((product, index) => (
            <div
              key={index}
              className="md:p-3 p-1 border-2 rounded-lg relative transition-transform duration-300 hover:cursor-pointer hover:shadow-xl bg-slate-50"
              onClick={() => handleCardClick(product)}
            >
              <div className="relative">
                <Image
                  src={`${product?.bannerHost}${product?.banner}`}
                  width={325}
                  height={325}
                  className={`w-full h-auto aspect-square object-cover md:aspect-[4/3] ${
                    product?.isSoldOut ? "grayscale" : "grayscale-0"
                  }`}
                  alt={product?.title}
                />

                <div className="rounded-full bg-[#004FC0] px-1.5 py-2.5 text-white font-semibold absolute bottom-2 right-2 text-xs md:text-base">
                  {product?.label}
                </div>

                {product?.isSoldOut && (
                  <Image
                    src="/icon/sold.webp"
                    width={200}
                    height={200}
                    className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-xl w-1/2 sm:w-[40%] lg:w-1/2 "
                    alt="Product Sold"
                  />
                )}
              </div>
              <div className="absolute w-full top-8 right-0 md:px-3 px-1">
                <div className="py-1 flex w-full justify-center bg-[#D7E4EF]">
                  <p className="text-sky-700 font-semibold text-xs md:text-base">
                    {product?.theme}
                  </p>
                </div>
              </div>
              <div className="bg-[#FFA80F] flex flex-col items-center justify-center py-1 mt-1 w-full">
                <p className="font-semibold text-white lg:text-xl text-center text-xs md:text-base px-2">
                  {product?.title}
                </p>
                <p className="text-[#004FC0] font-bold md:text-base text-xs">
                  {product?.date}
                </p>
              </div>
              <div className="bg-[#004FC0] flex lg:flex-row flex-col md:gap-4 gap-2 md:p-4 p-1 py-2 mt-1 rounded-b-lg items-center">
                <p className="text-white order-2 lg:order-1 md:text-sm text-[10px] col-span-3 lg:border-r pr-1 border-white flex-1 text-center">
                  {product?.detail}
                </p>
                <div className="min-w-[60px] order-1 lg:order-2 flex flex-col lg:gap-0 md:gap-2 items-center border-b py-2 lg:border-none lg:pb-0">
                  {product?.price && (
                    <p className="text-white text-xs line-through mb-1 mr-1">
                      {convertPrice(product?.price)} Juta/pax
                    </p>
                  )}
                  <p className="text-white text-3xl font-bold text-center">
                    {convertPrice(product?.discPrice)}
                  </p>
                  <p className="text-[10px] text-white text-center">
                    Juta/ pax
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mt-4 justfiy-between items-center lg:flex flex-wrap">
                <Popover placement="bottom-start">
                  <PopoverTrigger>
                    <button
                      className="bg-[#FFA80F] py-1.5 px-1.5 hd:p-2 rounded-full flex gap-1 items-center hover:opacity-80"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <PiShareFatFill className="text-white shadow-lg text-xs hd:text-xl 3xl:text-base font-semibold" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                      <ShareComponent
                        shareUrl={`${
                          window.location.origin
                        }/tour-schedule/category/${slugify(
                          selectedCategory.name
                        )}/${createTripSlug(product.title, product.date)}`}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <button
                  className="bg-[#FFA80F] py-1.5 px-2 rounded-full flex gap-1 items-center hover:opacity-80"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Bersihkan nama file dari karakter yang bermasalah
                    const cleanFileName = product?.title
                      .replace(/\./g, '') // Hapus semua titik
                      .replace(/[\/\\:*?"<>|]/g, '_') // Ganti karakter ilegal dengan underscore
                      .trim();
                    
                    downloadFileFromUrl(
                      `${product?.iteneraryHost}${product?.itenerary}`,
                      cleanFileName
                    );
                  }}
                >
                  <FiDownload className="text-white shadow-lg text-xs hd:text-xl 3xl:text-base font-semibold" />
                  <p className="text-white font-semibold hd:text-lg 3xl:text-xs xs:text-[10px]">
                    ITINERARY
                  </p>
                </button>

                <a
                  href={`https://wa.me/6282310702343?text=${encodeURIComponent(
                    `Halo, saya tertarik dengan paket tour:\n\n${product?.title}\nTanggal: ${product?.date}\nHarga: ${convertPrice(product?.discPrice)} Juta/pax\n\nLink: ${
                      window.location.origin
                    }/tour-schedule/category/${slugify(
                      selectedCategory.name
                    )}/${createTripSlug(product.title, product.date)}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFA80F] py-1.5 px-2 rounded-full flex gap-1 items-center hover:opacity-80"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaWhatsapp className="text-white shadow-lg text-xs hd:text-xl 3xl:text-base font-semibold" />
                  <p className="text-white font-semibold hd:text-lg 3xl:text-xs xs:text-[10px]">
                    TOUR CONSULTANT
                  </p>
                </a>
              </div>
            </div>
          ))
        )}
        {totalProduct > 9 && productData.length < totalProduct && (
          <div className="relative col-span-full">
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-6">
              <button
                className="text-blue-700 font-semibold md:text-base text-xs"
                onClick={onLoadMore}
                disabled={loadingProduct}
              >
                {`${loadingProduct ? "Loading..." : "Lihat Lebih Banyak Trip"}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;