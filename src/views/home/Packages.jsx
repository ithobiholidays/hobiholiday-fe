"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

import {
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
} from "react-icons/fa";
import { FiDownload, FiSearch } from "react-icons/fi";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Checkbox,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetData, usePostData } from "@/utils/api";
import Image from "next/image";
import { convertPrice, downloadFileFromUrl } from "@/utils/common";
import { PiShareFatFill } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import ShareComponent from "./ShareComponent";
import { slugify, deslugify } from "@/utils/hooks/slugify";
import LeadFormModal from "@/components/LeadFormModal";

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
  const [filterMonths, setFilterMonths] = useState([]);
  const [filterYears, setFilterYears] = useState([]);

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

    // Helper: bangun body filter dari semua filter aktif
    const buildFilterBody = (pageNum = 1) => {
      const body = { p: pageNum, limit: 9 };
      if (selectedCategory?.id) {
        body.categoryIds = [selectedCategory.id];
      } else if (!search && filterMonths.length === 0 && filterYears.length === 0) {
        // Semua Destinasi tanpa filter lain → kirim semua kategori
        body.categoryIds = (dataCategory || []).map((c) => c.id);
      }
      if (search) body.search = search;
      if (filterMonths.length) body.month = filterMonths;
      if (filterYears.length) body.year = filterYears;
      return body;
    };
  
    const onLoadMore = async () => {
      const nextPage = page + 1;
      const responseProduct = await postData(
        "/product/filtered-limit?s=1",
        buildFilterBody(nextPage)
      );
      setPage(nextPage);
      setProductData((prev) => [...prev, ...(responseProduct?.data || [])]);
    };
  
    const handleCardClick = (product) => {
      const tripSlug = createTripSlug(product.title, product.date);
      const categoryName = getCategoryName(product);
      router.push(`/tour-schedule/category/${slugify(categoryName)}/${tripSlug}`);
    };
  
    // Fetch awal: ambil categories, set selected dari URL params + query
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          const responseCategory = await getData("/category/all?s=1");
          if (responseCategory?.data?.length) {
            const allCategories = responseCategory.data;
            const rawCat = params?.cat;
            const categoryIdFromParams = deslugify(rawCat);
  
            let selected = allCategories[0];
  
            if (rawCat) {
              // Di tour-schedule selalu ada segmen kategori di path
              if (rawCat === "1" || rawCat === "semua" || rawCat === "all") {
                selected = SEMUA_DESTINASI; // default → Semua Destinasi
              } else {
                const matchedCategory = allCategories.find(
                  (cat) =>
                    cat.name.toLowerCase() ===
                    decodeURIComponent(categoryIdFromParams).toLowerCase()
                );
                selected = matchedCategory || SEMUA_DESTINASI;
              }
            }
  
            // Baca filter dari query URL (untuk deep-link iklan / share)
            const qSearch = searchParams.get("q");
            const qBulan = searchParams.get("bulan");
            const qTahun = searchParams.get("tahun");
            if (qSearch) {
              setSearchInput(qSearch);
              setSearch(qSearch);
            }
            if (qBulan) setFilterMonths(qBulan.split(",").filter(Boolean));
            if (qTahun) setFilterYears(qTahun.split(",").filter(Boolean));
  
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
  
    // Fetch produk setiap kali filter apa pun berubah (kombinasi)
    useEffect(() => {
      if (selectedCategory === "") return; // belum init
  
      const fetchProducts = async () => {
        const body = buildFilterBody(1);
        const noFilter =
          (!body.categoryIds || body.categoryIds.length === 0) &&
          !body.search &&
          !body.month &&
          !body.year;

        // Tidak ada filter sama sekali (mis. kategori belum termuat) → kosongkan
        if (noFilter) {
          setProductData([]);
          setPage(1);
          return;
        }
        try {
          const responseProduct = await postData(
            "/product/filtered-limit?s=1",
            body
          );
          setProductData(responseProduct?.data || []);
          setPage(1);
          if (window.innerWidth >= 1100) setIsOpenDropdown(false);
        } catch (error) {
          console.error("Error fetching products", error);
        }
      };
  
      fetchProducts();
    }, [selectedCategory, search, filterMonths, filterYears, dataCategory]);
  
    // Sinkron kategori (path) + filter (query) ke URL
    useEffect(() => {
      if (selectedCategory === "") return;
      const q = new URLSearchParams();
      if (search) q.set("q", search);
      if (filterMonths.length) q.set("bulan", filterMonths.join(","));
      if (filterYears.length) q.set("tahun", filterYears.join(","));
      const qs = q.toString();

      // Di tour-schedule kategori ikut di path (all / nama-slug)
      let base = window.location.pathname;
      if (path.includes("/tour-schedule")) {
        base =
          "/tour-schedule/category/" +
          (selectedCategory?.id == null
            ? "all"
            : slugify(selectedCategory.name));
      }
      window.history.replaceState(null, "", qs ? `${base}?${qs}` : base);
    }, [selectedCategory, search, filterMonths, filterYears, path]);
  
    const resetFilters = () => {
      setSearchInput("");
      setSearch("");
      setFilterMonths([]);
      setFilterYears([]);
    };

    const toggleMonth = (val) => {
      setFilterMonths((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );
      setPage(1);
    };

    const toggleYear = (val) => {
      setFilterYears((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );
      setPage(1);
    };

    // List categories: Semua Destinasi + dari DB
    const allCategoryList = dataCategory ? [SEMUA_DESTINASI, ...dataCategory] : [];

    // Label tombol filter (ringkas jika lebih dari 1)
    const monthBtnLabel =
      filterMonths.length === 0
        ? "Bulan"
        : filterMonths.length === 1
        ? months.find((m) => m.value === filterMonths[0])?.label
        : `${filterMonths.length} Bulan`;
    const yearBtnLabel =
      filterYears.length === 0
        ? "Tahun"
        : filterYears.length === 1
        ? filterYears[0]
        : `${filterYears.length} Tahun`;
  
    const [leadModal, setLeadModal] = useState({ open: false, product: null });

    // Drawer filter untuk mobile (destinasi & waktu terpisah)
    const {
      isOpen: isDestOpen,
      onOpen: onDestOpen,
      onClose: onDestClose,
    } = useDisclosure();
    const {
      isOpen: isWaktuOpen,
      onOpen: onWaktuOpen,
      onClose: onWaktuClose,
    } = useDisclosure();

    // Jumlah pilihan waktu aktif (untuk badge tombol di mobile)
    const waktuCount = filterMonths.length + filterYears.length;

    return (
      <div className="lg:px-12 px-6" id="category-section">
        {/* ===== MOBILE: bar sticky (search + tombol Filter) ===== */}
        <div className="xl:hidden sticky top-0 z-30 -mx-6 lg:-mx-12 px-6 lg:px-12 py-3 mb-4 bg-white/95 backdrop-blur border-b border-gray-100">
          {/* Search full width */}
          <div className="flex items-center min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 mb-2 transition focus-within:border-[#004FC0] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
            <FiSearch className="text-[#004FC0] mr-2 flex-shrink-0" />
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
                className="text-gray-400 hover:text-gray-600 ml-1 text-xs flex-shrink-0"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tombol Destinasi (kiri) + Bulan & Tahun (kanan) */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 whitespace-nowrap">
                Pilih Destinasi
              </p>
              <button
                onClick={onDestOpen}
                className={`w-full flex items-center justify-between gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition ${
                  selectedCategory?.id
                    ? "border-[#FFA80F] text-[#004FC0] bg-orange-50"
                    : "border-gray-300 text-gray-700 bg-white"
                }`}
              >
                <span className="truncate">
                  {selectedCategory?.id ? selectedCategory.name : "Destinasi"}
                </span>
                <FaChevronDown className="flex-shrink-0 text-gray-400" />
              </button>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 whitespace-nowrap">
                Pilih Waktu
              </p>
              <button
                onClick={onWaktuOpen}
                className={`w-full relative flex items-center justify-between gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition ${
                  waktuCount > 0
                    ? "border-[#FFA80F] text-[#004FC0] bg-orange-50"
                    : "border-gray-300 text-gray-700 bg-white"
                }`}
              >
                <span className="truncate">Bulan & Tahun</span>
                {waktuCount > 0 ? (
                  <span className="flex-shrink-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#FFA80F] rounded-full">
                    {waktuCount}
                  </span>
                ) : (
                  <FaChevronDown className="flex-shrink-0 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ===== BODY: Rail filter (kiri) + Grid produk (kanan) ===== */}
        <div className="flex flex-col xl:flex-row items-start gap-6 lg:gap-8">
          {/* ===== LEFT RAIL (desktop): search + waktu + kategori ===== */}
          <div className="hidden xl:block xl:w-72 xl:flex-shrink-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-5">
          {/* Search */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 transition focus-within:border-[#004FC0] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
            <FiSearch className="text-[#004FC0] mr-2 flex-shrink-0" />
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
                className="text-gray-400 hover:text-gray-600 ml-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>
  
          {/* Kategori dipindahkan ke sidebar di bawah */}
  
          {/* Bulan + Tahun + Reset */}
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Waktu Keberangkatan
          </p>
          <div className="grid grid-cols-2 gap-2 items-start">
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                rightIcon={<FaChevronDown />}
                variant="outline"
                size="sm"
                w="full"
                className={`!border-gray-300 !justify-between !px-3 ${
                  filterMonths.length > 0
                    ? "!border-[#FFA80F] !text-[#004FC0]"
                    : ""
                }`}
              >
                <span className="flex items-center gap-1.5 min-w-0">
                  <span className="truncate">{monthBtnLabel}</span>
                  {filterMonths.length > 0 && (
                    <span className="flex-shrink-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#FFA80F] rounded-full">
                      {filterMonths.length}
                    </span>
                  )}
                </span>
              </MenuButton>
              <MenuList maxH="340px" overflowY="auto" minW="230px" py={2}>
                <div className="flex items-center justify-between px-3 pb-2 mb-1 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-500">
                    Pilih bulan
                  </span>
                  {filterMonths.length > 0 && (
                    <button
                      onClick={() => { setFilterMonths([]); setPage(1); }}
                      className="text-[11px] text-red-500 hover:underline font-medium"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                {months.map((m) => {
                  const checked = filterMonths.includes(m.value);
                  return (
                    <MenuItem
                      key={m.value}
                      closeOnSelect={false}
                      onClick={() => toggleMonth(m.value)}
                      bg={checked ? "blue.50" : undefined}
                      borderRadius="md"
                      mx={1}
                      my={0.5}
                      w="auto"
                    >
                      <Checkbox
                        isChecked={checked}
                        pointerEvents="none"
                        colorScheme="orange"
                        mr={3}
                      />
                      <span
                        className={
                          checked
                            ? "text-blue-700 font-semibold text-sm"
                            : "text-gray-700 text-sm"
                        }
                      >
                        {m.label}
                      </span>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>

            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                rightIcon={<FaChevronDown />}
                variant="outline"
                size="sm"
                w="full"
                className={`!border-gray-300 !justify-between !px-3 ${
                  filterYears.length > 0
                    ? "!border-[#FFA80F] !text-[#004FC0]"
                    : ""
                }`}
              >
                <span className="flex items-center gap-1.5 min-w-0">
                  <span className="truncate">{yearBtnLabel}</span>
                  {filterYears.length > 0 && (
                    <span className="flex-shrink-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#FFA80F] rounded-full">
                      {filterYears.length}
                    </span>
                  )}
                </span>
              </MenuButton>
              <MenuList maxH="340px" overflowY="auto" minW="200px" py={2}>
                <div className="flex items-center justify-between px-3 pb-2 mb-1 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-500">
                    Pilih tahun
                  </span>
                  {filterYears.length > 0 && (
                    <button
                      onClick={() => { setFilterYears([]); setPage(1); }}
                      className="text-[11px] text-red-500 hover:underline font-medium"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                {years.map((y) => {
                  const checked = filterYears.includes(y);
                  return (
                    <MenuItem
                      key={y}
                      closeOnSelect={false}
                      onClick={() => toggleYear(y)}
                      bg={checked ? "blue.50" : undefined}
                      borderRadius="md"
                      mx={1}
                      my={0.5}
                      w="auto"
                    >
                      <Checkbox
                        isChecked={checked}
                        pointerEvents="none"
                        colorScheme="orange"
                        mr={3}
                      />
                      <span
                        className={
                          checked
                            ? "text-blue-700 font-semibold text-sm"
                            : "text-gray-700 text-sm"
                        }
                      >
                        {y}
                      </span>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>

            {(search || filterMonths.length > 0 || filterYears.length > 0) && (
              <button
                onClick={resetFilters}
                className="col-span-2 flex items-center justify-center gap-1 text-sm text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition w-full"
              >
                ✕ Reset semua
              </button>
            )}
          </div>
  
          {/* Chip filter aktif */}
          {(selectedCategory?.id ||
            search ||
            filterMonths.length > 0 ||
            filterYears.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500">Filter aktif:</span>

              {selectedCategory?.id && (
                <span className="flex items-center gap-1.5 bg-blue-50 text-[#004FC0] text-xs font-medium pl-3 pr-2 py-1.5 rounded-full border border-blue-100">
                  {selectedCategory.name}
                  <button
                    onClick={() => setSelectedCategory(SEMUA_DESTINASI)}
                    className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition text-[10px]"
                  >
                    ✕
                  </button>
                </span>
              )}
              {search && (
                <span className="flex items-center gap-1.5 bg-blue-50 text-[#004FC0] text-xs font-medium pl-3 pr-2 py-1.5 rounded-full border border-blue-100">
                  "{search}"
                  <button
                    onClick={() => setSearchInput("")}
                    className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition text-[10px]"
                  >
                    ✕
                  </button>
                </span>
              )}
              {filterMonths.map((mVal) => (
                <span
                  key={`m-${mVal}`}
                  className="flex items-center gap-1.5 bg-blue-50 text-[#004FC0] text-xs font-medium pl-3 pr-2 py-1.5 rounded-full border border-blue-100"
                >
                  {months.find((m) => m.value === mVal)?.label || mVal}
                  <button
                    onClick={() => toggleMonth(mVal)}
                    className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition text-[10px]"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {filterYears.map((yVal) => (
                <span
                  key={`y-${yVal}`}
                  className="flex items-center gap-1.5 bg-blue-50 text-[#004FC0] text-xs font-medium pl-3 pr-2 py-1.5 rounded-full border border-blue-100"
                >
                  {yVal}
                  <button
                    onClick={() => toggleYear(yVal)}
                    className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition text-[10px]"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
          {/* Kategori */}
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 mt-5">
            Destinasi
          </p>
          {loadingCategory ? (
            <Skeleton height="240px" className="rounded-xl" />
          ) : (
            <>
              {/* Mobile: dropdown kategori */}
              <div className="w-full font-sans border border-orange-500 rounded-lg overflow-hidden xl:hidden">
                <div
                  className="bg-[#FFA80F] text-white px-4 py-3 cursor-pointer flex items-center justify-between w-full"
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
                    {allCategoryList?.map((category) => (
                      <div
                        key={category?.id ?? "semua"}
                        onClick={() => {
                          setSelectedCategory(category);
                          setPage(1);
                        }}
                        className={`px-4 py-2 cursor-pointer transition ${
                          selectedCategory?.id === category?.id
                            ? "bg-orange-100 text-[#004FC0] font-semibold"
                            : "text-blue-700 hover:bg-orange-50"
                        }`}
                      >
                        {category?.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop: list kategori */}
              <ul className="hidden xl:flex xl:flex-col gap-1.5">
                {allCategoryList?.map((category) => {
                  const isActive = selectedCategory?.id === category?.id;
                  return (
                    <li
                      key={category?.id ?? "semua"}
                      onClick={() => {
                        setSelectedCategory(category);
                        setPage(1);
                      }}
                      className={`text-sm font-medium py-2.5 px-4 rounded-lg cursor-pointer transition-all border ${
                        isActive
                          ? "bg-[#FFA80F] text-white border-[#FFA80F] shadow-sm shadow-orange-200"
                          : "bg-white text-blue-700 border-gray-200 hover:border-[#FFA80F] hover:bg-orange-50"
                      }`}
                    >
                      {category?.name}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          </div>
          {/* /LEFT RAIL */}

          {/* ===== RIGHT: Produk ===== */}
          <div className="flex-1 w-full min-w-0">
        {/* Jumlah hasil */}
        {!loadingProduct && productData?.length > 0 && (
          <p className="text-sm text-gray-500 mb-4">
            Menampilkan{" "}
            <span className="font-semibold text-gray-700">
              {productData.length}
            </span>
            {totalProduct ? (
              <>
                {" "}
                dari{" "}
                <span className="font-semibold text-gray-700">
                  {totalProduct}
                </span>
              </>
            ) : (
              ""
            )}{" "}
            trip
          </p>
        )}
  
        {/* ============ GRID PRODUK ============ */}
        <div className="grid grid-cols-1 2xl:grid-cols-3 sm:grid-cols-2 lg:gap-6 md:gap-4 gap-2 items-stretch">
          {loadingCategory || loadingProduct ? (
            <>
              <Skeleton height="300" />
              <Skeleton height="300" />
              <Skeleton height="300" />
            </>
          ) : productData?.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl mb-3">🔍</div>
              <p className="text-lg font-semibold text-gray-700">
                Tidak ada trip untuk filter ini
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Coba ubah bulan/tahun, pilih destinasi lain, atau reset filter
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#004FC0] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            productData?.map((product, index) => (
              <div
                key={index}
                className="md:p-3 p-1 border-2 rounded-lg relative transition-transform duration-300 hover:cursor-pointer hover:shadow-xl bg-slate-50 flex flex-col h-full"
              onClick={() => handleCardClick(product)}
            >
              <div className="relative">
                <Image
                  src={`${product?.bannerHost}${product?.banner}`}
                  width={325}
                  height={325}
                  className={`w-full h-auto aspect-square object-cover md:aspect-[4/3] ${product?.isSoldOut ? "grayscale" : "grayscale-0"
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
              <div className="bg-[#FFA80F] flex flex-col items-center justify-center py-1 mt-1 w-full min-h-[72px]">
                <p className="font-semibold text-white lg:text-xl text-center text-xs md:text-base px-2 line-clamp-2">
                  {product?.title}
                </p>
                <p className="text-[#004FC0] font-bold md:text-base text-xs">
                  {product?.date}
                </p>
              </div>
              <div className="bg-[#004FC0] flex lg:flex-row flex-col md:gap-4 gap-2 md:p-4 p-1 py-2 mt-1 rounded-b-lg items-center min-h-[100px]">
                <p className="text-white order-2 lg:order-1 md:text-sm text-[10px] col-span-3 lg:border-r pr-1 border-white flex-1 text-center line-clamp-4">
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

              <div className="flex gap-1 mt-auto pt-4 justfiy-between items-center lg:flex flex-wrap">
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

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLeadModal({ open: true, product });
                  }}
                  className="bg-[#FFA80F] py-1.5 px-2 rounded-full flex gap-1 items-center hover:opacity-80"
                >
                  <FaWhatsapp className="text-white shadow-lg text-xs hd:text-xl 3xl:text-base font-semibold" />
                  <p className="text-white font-semibold hd:text-lg 3xl:text-xs xs:text-[10px]">
                    TOUR CONSULTANT
                  </p>
                </button>
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
          {/* /Kolom produk */}
          </div>
        </div>
        {/* /Body grid */}

        {/* ===== MOBILE: Drawer Destinasi ===== */}
        <Drawer isOpen={isDestOpen} onClose={onDestClose} placement="bottom">
          <DrawerOverlay />
          <DrawerContent borderTopRadius="2xl" maxH="85vh">
            <DrawerHeader borderBottomWidth="1px">
              <span className="text-[#004FC0] font-bold text-lg">
                Pilih Destinasi
              </span>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody className="!py-4">
              <div className="flex flex-col gap-1.5">
                {allCategoryList?.map((category) => {
                  const isActive = selectedCategory?.id === category?.id;
                  return (
                    <button
                      key={category?.id ?? "semua"}
                      onClick={() => {
                        setSelectedCategory(category);
                        setPage(1);
                        onDestClose();
                      }}
                      className={`text-sm font-medium py-2.5 px-4 rounded-lg border text-left transition-all ${
                        isActive
                          ? "bg-[#FFA80F] text-white border-[#FFA80F]"
                          : "bg-white text-blue-700 border-gray-200"
                      }`}
                    >
                      {category?.name}
                    </button>
                  );
                })}
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* ===== MOBILE: Drawer Waktu (Bulan & Tahun) ===== */}
        <Drawer isOpen={isWaktuOpen} onClose={onWaktuClose} placement="bottom">
          <DrawerOverlay />
          <DrawerContent borderTopRadius="2xl" maxH="85vh">
            <DrawerHeader borderBottomWidth="1px">
              <span className="text-[#004FC0] font-bold text-lg">
                Waktu Keberangkatan
              </span>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody className="!py-4">
              {/* Bulan */}
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Bulan
              </p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {months.map((m) => {
                  const checked = filterMonths.includes(m.value);
                  return (
                    <button
                      key={m.value}
                      onClick={() => toggleMonth(m.value)}
                      className={`text-sm py-2 px-2 rounded-lg border transition ${
                        checked
                          ? "bg-blue-50 text-[#004FC0] border-[#004FC0] font-semibold"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>

              {/* Tahun */}
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Tahun
              </p>
              <div className="grid grid-cols-4 gap-2">
                {years.map((y) => {
                  const checked = filterYears.includes(y);
                  return (
                    <button
                      key={y}
                      onClick={() => toggleYear(y)}
                      className={`text-sm py-2 px-2 rounded-lg border transition ${
                        checked
                          ? "bg-blue-50 text-[#004FC0] border-[#004FC0] font-semibold"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px" gap={3}>
              <button
                onClick={() => {
                  setFilterMonths([]);
                  setFilterYears([]);
                  setPage(1);
                }}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl font-medium"
              >
                Reset
              </button>
              <button
                onClick={onWaktuClose}
                className="flex-1 bg-[#004FC0] text-white py-2.5 rounded-xl font-semibold"
              >
                Lihat hasil
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <LeadFormModal
          isOpen={leadModal.open}
          onClose={() => setLeadModal({ open: false, product: null })}
          productTitle={leadModal.product?.title || ""}
          categoryName={getCategoryName(leadModal.product)}
          productUrl={
            leadModal.product
              ? `${window.location.origin}/tour-schedule/category/${slugify(getCategoryName(leadModal.product))}/${createTripSlug(leadModal.product.title, leadModal.product.date)}`
              : ""
          }
        />
      </div>
    );
  };



export default Packages;
