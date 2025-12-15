"use client"
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from 'next/link';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/hero 1.jpg',
      alt: ''
    },
    {
      image: '/hero 2.jpg',
      alt: ''
    },
    {
      image: '/hero 3.jpg',
      alt: ''
    },
    {
      image: '/hero 4.jpg',
      alt: ''
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[540px] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl w-full">
          {/* Logo */}
          {/* <div className="mb-3 sm:mb-4 md:mb-5 animate-fade-in">
            <img 
              src="/logo2.png" 
              alt="Hobi Holidays Tour" 
              className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto mx-auto"
            />
          </div> */}

          {/* Main Heading */}
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight animate-slide-up px-2">
            Rangkai Momen Manis dan
            <span className="block mt-1 sm:mt-1.5">Perjalanan Seru Anda</span>
            <span className="block text-[#FFA80F] mt-1 sm:mt-1.5">dari Sini</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto animate-slide-up-delay px-2">
            Jelajahi destinasi impian Anda bersama kami. Pengalaman tak terlupakan menanti di setiap sudut dunia.
          </p>

          {/* CTA Button */}
          <div className="animate-slide-up-delay-2">
            <Link href="/tour-schedule/category/1">
              <button className="group relative px-5 py-2 sm:px-7 sm:py-2.5 md:px-9 md:py-3 lg:px-10 lg:py-3.5 bg-[#004fc0] text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg rounded-full overflow-hidden transition-all duration-300 hover:bg-[#003a8f] hover:shadow-2xl hover:scale-105">
                <span className="relative z-10">Mulai Petualangan</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#004fc0] to-[#0066ff] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-[#004fc0] transition-all duration-300 border-2 border-white/30 hover:border-[#004fc0] hover:scale-110 z-10 group"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-[#004fc0] transition-all duration-300 border-2 border-white/30 hover:border-[#004fc0] hover:scale-110 z-10 group"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-6 sm:w-7 md:w-8 h-2 sm:h-2.5 bg-[#FFA80F]'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;