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
    <div className="flex flex-col w-full">
      <Hero title="Perjalanan Kami" image={"/perjalanan-kami.png"} />

      {/* Main Content Section */}
      <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Hero Section - Image on Top, Text Below */}
          <div className="flex flex-col items-center mb-12 sm:mb-16 lg:mb-20">
            
            {/* Image Section - Top */}
            <div className="relative group w-full max-w-4xl mb-8 sm:mb-10 md:mb-12">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#004FC0] to-[#FFA80F] rounded-2xl sm:rounded-3xl opacity-20 blur-xl sm:blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/about.jpg"
                  className="object-cover w-full h-auto"
                  width={900}
                  height={600}
                  alt="Hobi Holidays Team"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Text Section - Bottom */}
            <div className="w-full max-w-5xl px-2 sm:px-4">
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-100 text-[#004FC0] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-xs sm:text-sm">Sejak 2017</span>
                </div>

                {/* Title */}
                <h2 className="text-[#004FC0] font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6 px-2">
                  Awal 2017 adalah Langkah Kecil
                  <span className="block text-[#FFA80F] mt-2">PT Semesta Hobi Wisata</span>
                </h2>

                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                  Berdiri di sebuah kantor kecil berlokasi di timur kota Jakarta. 
                  Sejak awal kami mendedikasikan diri untuk melayani pelanggan 
                  berlibur ke luar negeri dengan ragam destinasi di lima benua. 
                  Hingga saat ini kami telah melayani lebih dari
                  <span className="font-bold text-[#004FC0]"> 15.000 pelanggan</span> di seluruh 
                  Indonesia dari Timur hingga Barat.
                </p>
              </div>

              {/* Key Features */}
              <div className="flex flex-col min-[650px]:flex-row gap-3 sm:gap-4 max-w-3xl mx-auto justify-center">
                <div className="flex items-start gap-3 bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-[650px]:flex-1">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#004FC0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-0.5 sm:mb-1">5 Benua</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Destinasi di seluruh dunia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-[650px]:flex-1">
                  <div className="bg-orange-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFA80F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-0.5 sm:mb-1">15.000+</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Pelanggan puas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
            
            {/* Vision Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#004FC0]">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="bg-gradient-to-br from-[#004FC0] to-[#0066FF] p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#004FC0]">Visi</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">Pandangan Masa Depan</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 bg-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="bg-[#004FC0] rounded-full p-1 mt-0.5 sm:mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg">IPO di 2028</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Menjadi perusahaan publik yang terpercaya di industri travel Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#FFA80F]">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="bg-gradient-to-br from-[#FFA80F] to-[#FF9500] p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#FFA80F]">Misi</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">Target & Komitmen</p>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {[
                  "Menambah cabang di berbagai tempat di Indonesia",
                  "Terintegrasi dengan sistem yang terpadu",
                  "Semakin diperhitungkan menjadi travel agent terpercaya dengan pelayanan terbaik"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-orange-50 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-orange-100 transition-colors">
                    <div className="bg-[#FFA80F] rounded-full p-1 mt-0.5 sm:mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-12 max-w-3xl mx-auto w-full">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#004FC0] mb-3 sm:mb-4 px-2">
                Siap Memulai Petualangan Anda?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-2">
                Mari bersama kami wujudkan impian liburan Anda ke destinasi impian
              </p>
              <div className="flex flex-col min-[650px]:flex-row gap-3 sm:gap-4 justify-center px-2">
                <a
                  href="/tour-schedule/category/1"
                  className="bg-gradient-to-r from-[#004FC0] to-[#0066FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:from-[#0066FF] hover:to-[#004FC0] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
                >
                  Lihat Paket Tour
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="bg-white border-2 border-[#004FC0] text-[#004FC0] px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-[#004FC0] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
                >
                  Hubungi Kami
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}