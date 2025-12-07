"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetData, usePostData } from "@/utils/api";

import ReactPlayer from "react-player/lazy";

const YoutubeCarousel = () => {
  const { getData, data, totalData, loading } = useGetData();

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getData("/testi/all?q=");
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    playing: false,
    controls: true,
    volume: 1,
    muted: false,
    pip: true,
    width: "100%",
    height: "100%",
    stopOnUnmount: true,
    wrapper: "div",
    config: { youtube: { playerVars: { showinfo: 0 } } },
  };

  return (
    <div className="bg-[#004FC0] py-24 relative" id="testimony-section">
      <h2 className="text-white text-center 2xl:text-4xl xl:text-3xl md:text-2xl text-xl font-bold mb-12">
        Apa Kata Mereka Tentang Hobi Holidays?
      </h2>

      <div className="flex items-center lg:gap-8 justify-center">
        {/* Previous Button */}
        <button
          ref={prevRef}
          disabled={isBeginning}
          className={`bg-white p-2 rounded-full shadow-md transition lg:ml-5 xs:ml-2 ${
            isBeginning ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
        >
          <FaChevronLeft className="text-blue-700 lg:w-6 lg:h-6 xs:w-4 xs:h-4" />
        </button>

        {/* Swiper Container */}
        <div className="w-full hd:w-[70%] 3xl:w-[80%] 2xl:w-[75%] xl:w-[85%] lg:w-[75%] md:w-[75%] xs:w-[80%] mx-auto relative">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            loop={false} // Must be false to properly track edges
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (prevRef.current && nextRef.current) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              });
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            className="rounded-lg overflow-hidden"
          >
            {data?.map((video, index) => (
              <SwiperSlide key={index} className="">
                <div className="relative w-full aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden shadow-lg ">
                  {/* <iframe
                    src={video.link}
                    title={`YouTube Video ${index + 1}`}
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe> */}
                  <ReactPlayer {...options} url={video.link} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Next Button */}
        <button
          ref={nextRef}
          disabled={isEnd}
          className={`bg-white p-2 rounded-full shadow-md transition lg:mr-5 xs:mr-2 ${
            isEnd ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
        >
          <FaChevronRight className="text-blue-700 lg:w-6 lg:h-6 xs:w-4 xs:h-4" />
        </button>
      </div>
    </div>
  );
};

export default YoutubeCarousel;
