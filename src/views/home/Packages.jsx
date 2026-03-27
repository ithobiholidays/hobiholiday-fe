"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

import {
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
  FaCalendarAlt,
  FaCalendar,
} from "react-icons/fa";
import { FiDownload, FiSearch } from "react-icons/fi";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@chakra-ui/react";
import { useGetData, usePostData } from "@/utils/api";
import Image from "next/image";
import { convertPrice, downloadFileFromUrl } from "@/utils/common";
import { PiShareFatFill } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import ShareComponent from "./ShareComponent";
import { slugify, deslugify } from "@/utils/hooks/slugify";

const SEMUA_DESTINASI = { id: null, name: "Semua Destinasi" };

const months = [
  { value: "1", label: "Januari" },
  { value: "2", label: "Februari" },
  { value: "3", label: "Maret" },
  { value: "4", label: "April" },
  { value: "5", label: "Mei" },
  { value: "6", label: "Juni" },
  { value: "7", label: "Juli" },
  { value: "8", label: "Agustus" },
  { value: "9", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];

const years = ["2025", "2026", "2027", "2028"];

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productData, setProductData] = useState([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [page, setPage] = useState(1);

  // Search & filter states
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    if (window.innerWidth < 1100) {
      setIsOpenDropdown(true);
    }
  }, []);

  const params = useParams();
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  // Debounce search input 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    getData,
    data: dataCategory,
    loading: loadingCategory,
  } = useGetData();
  const {
    postData,
    data: dataProduct,
    totalData: totalProduct,
    loading: loadingProduct,
  } = usePostData();

  // Apakah sedang dalam mode search/filter global
  const isSearchMode = selectedCategory?.id === null;

  // Helper: buat slug dari title + date
  const createTripSlug = (title, date) => slugify(`${title} ${date}`);

  // Helper: ambil nama category untuk URL (saat Semua Destinasi, pakai dari produk)
  const getCategoryName = (product) => {
    if (isSearchMode) {
      return product?.categories?.[0] || "tour";
    }
    return selectedCategory?.name || "tour";
  };

  const onLoadMore = async () => {
    const nextPage = page + 1;
    const body = { p: nextPage, limit: 9 };

    if (isSearchMode) {
      if (search) body.search = search;
      if (filterMonth) body.month = filterMonth;
      if (filterYear) body.year = filterYear;
    } else {
      body.categoryIds = [selectedCategory?.id];
    }

    const responseProduct = await postData("/product/filtered-limit?s=1", body);
    setPage(nextPage);
    setProductData((prev) => [...prev, ...responseProduct?.data]);
  };

  const handleCardClick = (product) => {
    const tripSlug = createTripSlug(product.title, product.date);
    const categoryName = getCategoryName(product);
    router.push(`/tour-schedule/category/${slugify(categoryName)}/${tripSlug}`);
  };

  // Fetch awal: ambil categories, set selected dari URL params
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

  // Fetch produk saat selectedCategory berubah
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!selectedCategory) return;

      try {
        const body = { p: 1, limit: 9 };

        if (isSearchMode) {
          if (search) body.search = search;
          if (filterMonth) body.month = filterMonth;
          if (filterYear) body.year = filterYear;
        } else {
          body.categoryIds = [selectedCategory?.id];
        }

        const responseProduct = await postData("/product/filtered-limit?s=1", body);
        setProductData(responseProduct?.data || []);
        setPage(1);

        if (window.innerWidth >= 1100) {
          setIsOpenDropdown(false);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  // Fetch produk saat search/filter berubah (hanya saat mode Semua Destinasi)
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchFiltered = async () => {
      try {
        const body = { p: 1, limit: 9 };

        if (search || filterMonth || filterYear) {
          // Auto-pindah ke Semua Destinasi
          setSelectedCategory(SEMUA_DESTINASI);
          if (search) body.search = search;
          if (filterMonth) body.month = filterMonth;
          if (filterYear) body.year = filterYear;
        } else {
          // Filter dikosongkan → balik ke category yang terakhir dipilih
          // (akan ditangani oleh useEffect selectedCategory di atas)
          return;
        }

        const responseProduct = await postData("/product/filtered-limit?s=1", body);
        setProductData(responseProduct?.data || []);
        setPage(1);
      } catch (error) {
        console.error("Error fetching filtered products", error);
      }
    };

    fetchFiltered();
  }, [search, filterMonth, filterYear]);

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setFilterMonth("");
    setFilterYear("");
  };

  // List categories untuk sidebar: Semua Destinasi + dari DB
  const allCategoryList = dataCategory ? [SEMUA_DESTINASI, ...dataCategory] : [];

  return (
    <div
      className="grid grid-cols-5 lg:px-12 px-6 items-start gap-8"
      id="category-section"
    >
      {loadingCategory ? (
        <Skeleton height="300" className="col-span-5" />
      ) : (
        <>
          {/* Mobile: Dropdown category */}
          <div className="w-full font-sans border border-orange-500 rounded overflow-hidden xl:hidden col-span-5">
            <div
              className="bg-yellow-500 text-white px-4 py-3 cursor-pointer flex items-center justify-between w-full"
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
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

            {isOpenDropdown && (
              <div className="bg-white max-h-64 overflow-y-auto">
                {allCategoryList?.map((category, index) => (
                  <div
                    key={category?.id ?? "semua"}
                    onClick={() => {
                      setSelectedCategory(category);
                      setPage(1);
                      if (category.id !== null) resetFilters();
                    }}
                    className="px-4 py-2 text-blue-700 hover:bg-orange-100 cursor-pointer"
                  >
                    {category?.name}
                  </div>
                ))}
                <div className="sticky bottom-0 bg-white text-center py-1 pointer-events-none">
                  <p className="text-[10px] text-gray-400">
                    Scroll untuk lihat Destinasi lain
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Sidebar category */}
          <div className="xl:col-span-1 hidden xl:block bg-white rounded-lg xl:mb-0">
            <div className="overflow-x-auto whitespace-nowrap lg:whitespace-normal">
              <ul className="flex xl:block gap-4">
                {allCategoryList?.map((category, index) => (
                  <li
                    key={category?.id ?? "semua"}
                    className={`font-semibold border border-[#FFA80F] py-2 px-4 cursor-pointer transition flex-shrink-0 mb-1
                    ${
                      selectedCategory?.id === category?.id
                        ? "bg-yellow-500 text-white"
                        : "text-blue-700 hover:bg-yellow-500 hover:text-white"
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setPage(1);
                      if (category.id !== null) {
                        resetFilters();
                        if (path.includes("/tour-schedule")) {
                          router.push(
                            "/tour-schedule/category/" + slugify(category.name)
                          );
                        }
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

      {/* Kolom produk */}
      <div className="xl:col-span-4 col-span-5 grid grid-cols-1 2xl:grid-cols-3 sm:grid-cols-2 lg:gap-6 md:gap-4 gap-2">

        {/* Search & Filter UI */}
        <div className="col-span-full mb-4">
          <div className="bg-[#004FC0] rounded-2xl px-4 py-3 shadow-lg">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">

              {/* Search input — full width di mobile, flex-1 di desktop */}
              <div className="col-span-2 flex items-center sm:flex-1 bg-white rounded-xl px-3 py-2.5">
                <FiSearch className="text-[#004FC0] mr-2 flex-shrink-0 text-base" />
                <input
                  type="text"
                  placeholder="Cari nama paket tour..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="outline-none text-sm w-full text-gray-700 placeholder-gray-400 bg-transparent"
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="text-gray-400 hover:text-gray-600 ml-1 flex-shrink-0 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Month filter — col 1 di mobile */}
              <div className="col-span-1 flex items-center gap-1.5 bg-white rounded-xl px-3 py-2.5">
                <FaCalendarAlt className="text-[#004FC0] flex-shrink-0 text-sm" />
                <select
                  value={filterMonth}
                  onChange={(e) => { setFilterMonth(e.target.value); setPage(1); }}
                  className="outline-none text-sm bg-transparent text-gray-700 cursor-pointer w-full"
                >
                  <option value="">Semua Bulan</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              {/* Year filter — col 2 di mobile */}
              <div className="col-span-1 flex items-center gap-1.5 bg-white rounded-xl px-3 py-2.5">
                <FaCalendar className="text-[#004FC0] flex-shrink-0 text-sm" />
                <select
                  value={filterYear}
                  onChange={(e) => { setFilterYear(e.target.value); setPage(1); }}
                  className="outline-none text-sm bg-transparent text-gray-700 cursor-pointer w-full"
                >
                  <option value="">Semua Tahun</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Reset button — full width di mobile */}
              {(searchInput || filterMonth || filterYear) && (
                <button
                  onClick={resetFilters}
                  className="col-span-2 flex items-center justify-center gap-1 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2.5 rounded-xl transition-colors font-medium w-full sm:w-auto"
                >
                  ✕ Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading / No Data / Product cards */}
        {loadingCategory || loadingProduct ? (
          <>
            <Skeleton height="300" />
            <Skeleton height="300" />
            <Skeleton height="300" />
          </>
        ) : productData?.length === 0 ? (
          <div className="text-lg">No Data</div>
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
                    className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-xl w-1/2 sm:w-[40%] lg:w-1/2"
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
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PiShareFatFill className="text-white shadow-lg text-xs hd:text-xl 3xl:text-base font-semibold" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                      <ShareComponent
                        shareUrl={`${window.location.origin}/tour-schedule/category/${slugify(getCategoryName(product))}/${createTripSlug(product.title, product.date)}`}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <button
                  className="bg-[#FFA80F] py-1.5 px-2 rounded-full flex gap-1 items-center hover:opacity-80"
                  onClick={(e) => {
                    e.stopPropagation();
                    const cleanFileName = product?.title
                      .replace(/\./g, "")
                      .replace(/[\/\\:*?"<>|]/g, "_")
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
                    `Halo, saya tertarik dengan paket tour:\n\n${product?.title}\nTanggal: ${product?.date}\nHarga: ${convertPrice(product?.discPrice)} Juta/pax\n\nLink: ${window.location.origin}/tour-schedule/category/${slugify(getCategoryName(product))}/${createTripSlug(product.title, product.date)}`
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
                {loadingProduct ? "Loading..." : "Lihat Lebih Banyak Trip"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
