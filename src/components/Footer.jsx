import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full">
      <div className=" py-8 lg:px-24 px-12 text-gray-800 border-t border-b border-black w-full -mt-16">
        <Image src={"/logo2.png"} width={120} height={120} alt="Logo" />

        <div className=" grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12 mt-12">
          <div className="place-self-end self-start">
            {/* Company Info */}
            <div>
              <h2 className="font-bold text-lg">PT SEMESTA HOBI WISATA</h2>
              <p className="leading-relaxed 3xl:text-base sm:text-sm">
                Ruko Jatiwaringin Junction Blok A, Jl Raya Jatiwaringin No 24 RT
                5/RW 5, Cipinang Melayu, Makassar Jakarta Timur 13620
              </p>
              {/* <p>Ruko Jatiwaringin Junction Blok A</p>
              <p>Jl Raya Jatiwaringin No 24 RT 5/RW 5</p>
              <p>Cipinang Melayu, Makassar Jakarta Timur 13620</p> */}
              <p className="3xl:text-base sm:text-sm">T: 021 - 86330199</p>
              <p className="3xl:text-base sm:text-sm">WA: +62823-1070-2343</p>
              <p className="3xl:text-base sm:text-sm">
                Email: halo@hobiholidays.com
              </p>
            </div>

            {/* Branches */}
            <div className="mt-6">
              <h2 className="font-bold text-lg">BRANCHES</h2>
              <p className="3xl:text-base sm:text-sm">
                Yogyakarta - +62 813-1732-4545
              </p>
              <p className="3xl:text-base sm:text-sm">
                Bandung - +62 813-1277-7988
              </p>
              <p className="3xl:text-base sm:text-sm">
                Senayan - +62 877-8078-3371
              </p>
              <div className="flex space-x-1 mt-6">
                <a
                  href="https://www.youtube.com/@hobiholidaystour"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <Image
                      src="/social-media/youtube.png"
                      width={25}
                      height={25}
                      alt="Youtube"
                    />
                  </button>
                </a>
                <a
                  href="https://www.instagram.com/hobiholidaystour/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <Image
                      src="/social-media/instagram.png"
                      width={25}
                      height={25}
                      alt="Instagram"
                    />
                  </button>
                </a>
                <a
                  href="https://x.com/Hobiholidays_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <Image
                      src="/social-media/twitter.png"
                      width={25}
                      height={25}
                      alt="Twitter"
                    />
                  </button>
                </a>
                <a
                  href="https://web.facebook.com/kelilingduniahobiholidays"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <Image
                      src="/social-media/facebook.png"
                      width={25}
                      height={25}
                      alt="Facebook"
                    />
                  </button>
                </a>
                <a
                  href="https://www.tiktok.com/@hobiholidaystour"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <Image
                      src="/social-media/tiktok.png"
                      width={25}
                      height={25}
                      alt="Tiktok"
                    />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Member & Partner Airlines */}
          <div className="xl:place-self-end xl:self-start">
            <h2 className="font-bold text-lg">MEMBER OF</h2>
            <Image
              src="/company/company1.webp"
              width={200}
              height={200}
              alt="Company 1"
            />

            <h2 className="font-bold text-lg mt-8">PARTNER AIRLINES</h2>
            <Image
              src="/company/company2.webp"
              width={200}
              height={200}
              alt="Company 2"
              className="mt-2"
            />
          </div>

          {/* Links */}
          <div className="">
            <h2 className="font-bold text-lg">COMPANY</h2>
            <Link
              href="/home"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              About Hobi Holidays
            </Link>
            <Link
              href="/tour-schedule"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              Tour Schedule
            </Link>
            <Link
              href="/contact"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              Contact
            </Link>

            <h2 className="font-bold text-lg mt-4">OPENING HOURS</h2>
            <p className="3xl:text-base sm:text-sm">
              Mon - Fri: 09.00 - 18.00 WIB
            </p>
            <p className="3xl:text-base sm:text-sm">
              Saturday: 09.00 - 13.00 WIB
            </p>

            <h2 className="font-bold text-lg mt-4 xs:hidden xl:block 2xl:hidden">
              INFORMATION
            </h2>
            <Link
              href="/terms-and-conditions"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm xs:hidden xl:block 2xl:hidden`}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-and-policy"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm xs:hidden xl:block 2xl:hidden`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/investor"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm xs:hidden xl:block 2xl:hidden`}
            >
              Investor
            </Link>
            <Link
              href="/home#blog-section"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm xs:hidden xl:block 2xl:hidden`}
            >
              News
            </Link>

            <Link
              href="/faq"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm xs:hidden xl:block 2xl:hidden`}
            >
              Frequently Asked Question
            </Link>
            <Link
              href="/home#testimony-section"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm xs:hidden xl:block 2xl:hidden`}
            >
              Testimony
            </Link>
          </div>

          <div className="xl:place-self-end xl:self-start xl:hidden 2xl:block">
            <h2 className="font-bold text-lg">INFORMATION</h2>
            <Link
              href="/terms-and-conditions"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-and-policy"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/investor"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              Investor
            </Link>
            <Link
              href="/home#blog-section"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              News
            </Link>

            <Link
              href="/faq"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              Frequently Asked Question
            </Link>
            <Link
              href="/home#testimony-section"
              className={`hover:underline hover:cursor-pointer block 3xl:text-base sm:text-sm`}
            >
              Testimony
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center mt-6 pt-6  border-black">
        &copy; {year} Hobi Holidays. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
