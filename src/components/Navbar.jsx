"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";

import {
  FaInstagramSquare,
  FaLongArrowAltRight,
  FaTiktok,
  FaYoutube,
  FaYoutubeSquare,
} from "react-icons/fa";

import { FaSquareXTwitter, FaSquareFacebook } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { Squash as Hamburger } from "hamburger-react";

function Navbar() {
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  const pathname = usePathname();
  const hamburgerRef = useRef(null);

  const triggerClick = () => {
    if (hamburgerRef.current) {
      hamburgerRef.current.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    }
  };

  const navbarList = [
    { label: "Home", href: "/home" },
    {
      label: "About Us",
      href: "/about",
      component: (
        <li
          className="relative flex items-center"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Link
            href="#"
            className={`cursor-pointer uppercase transition-colors duration-300 py-4 px-3 border-b-2 flex items-center gap-2 font-medium text-sm mt-[3.5px]  ${
              pathname === "/history" ||
              pathname === "/why-us" ||
              pathname === "/management" ||
              pathname === "/awards" ||
              pathname === "/career"
                ? // pathname === "/terms-and-conditions" ||
                  // pathname === "/privacy-and-policy" ||
                  // pathname === "/investor" ||
                  // pathname === "/faq"
                  "text-sky-700 border-sky-700"
                : "border-transparent hover:text-sky-500 hover:bg-sky-200/20 hover:border-sky-700"
            }`}
          >
            ABOUT US <IoMdArrowDropdown />
          </Link>

          {isOpen && (
            <div className="absolute left-0 top-14 bg-white border border-gray-200 shadow-2xl rounded-md min-w-[250px]">
              <Link
                href="/history"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/history" ? "text-sky-700 border-sky-700" : ""
                }`}
              >
                History
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>

              <Link
                href="/why-us"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/why-us" ? "text-sky-700 border-sky-700" : ""
                }`}
              >
                Why Us
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>

              <Link
                href="/management"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/management"
                    ? "text-sky-700 border-sky-700"
                    : ""
                }`}
              >
                Management
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>

              <Link
                href="/awards"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/awards" ? "text-sky-700 border-sky-700" : ""
                }`}
              >
                Awards
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>

              <Link
                href="/career"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/career" ? "text-sky-700 border-sky-700" : ""
                }`}
              >
                Career
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>

              {/* <Link
                href="/terms-and-conditions"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/terms-and-conditions"
                    ? "text-sky-700 border-sky-700"
                    : ""
                }`}
              >
                Terms And Conditions
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
                            
              <Link
                href="/privacy-and-policy"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/privacy-and-policy"
                    ? "text-sky-700 border-sky-700"
                    : ""
                }`}
              >
                Privacy Policy
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <Link
                href="/faq"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/faq" ? "text-sky-700 border-sky-700" : ""
                }`}
              >
                Frequently Asked Question
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <Link
                href="/investor"
                className={`px-4 py-2 text-black hover:bg-sky-200/20 hover:text-sky-500 flex justify-between items-center group ${
                  pathname === "/investor" ? "text-sky-700 border-sky-700" : ""
                }`}
              >
                Investor
                <MdKeyboardArrowRight className="transition-all duration-300 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link> */}
            </div>
          )}
        </li>
      ),
    },
    { label: "Tour Schedule", href: "/tour-schedule/category/1" },
    { label: "Private Trip", href: "/private-trip" },
    { label: "Mastervisa", href: "/mastervisa", exception: true },
    { label: "Contact", href: "/contact" },
  ];

  const handleOpenMasterVisa = () => {
    window.open("https://mastervisaku.com", "_blank");
  };

  useEffect(() => {
    if (!toggleHamburger) {
      setOpenAbout(false);
    }
  }, [toggleHamburger]);

  return (
    <div className="flex justify-between w-full">
      <div className="fixed top-0 py-2 2xl:px-0 xl:px-5 lg:px-6 xs:px-5 w-screen max-w-[1920px] flex 2xl:justify-around xs:justify-between items-center bg-white z-[999]">
        <Link href={"/"}>
          {/* <Image src="/logo2.png" width={120} height={120} alt="Logo" /> */}
          <Image
            src="/logo2.png"
            width={150}
            height={150}
            alt="Logo"
            className="h-auto w-28"
          />
        </Link>

        {/* Desktop Navbar */}
        <ul className="2xl:flex items-center text-md xs:hidden gap-1">
          {navbarList.map((item) => (
            <Fragment key={item.label}>
              {item.component ? (
                item.component
              ) : item.exception ? (
                <li
                  className={`cursor-pointer uppercase transition-colors duration-300 py-4 mt-[2.5px] px-3 border-b-2 font-medium text-sm ${
                    pathname === item.href
                      ? "text-sky-700 border-sky-700"
                      : "border-transparent hover:text-sky-500 hover:border-sky-700"
                  }`}
                  onClick={handleOpenMasterVisa}
                >
                  {item.label}
                </li>
              ) : (
                <li>
                  <Link
                    href={item.href}
                    className={`cursor-pointer uppercase transition-colors duration-300 py-4 px-3 border-b-2 font-medium text-sm ${
                      pathname === item.href
                        ? "text-sky-700 border-sky-700"
                        : "border-transparent hover:text-sky-500 hover:border-sky-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )}
            </Fragment>
          ))}
        </ul>

        {/* Social Media Icons */}
        <div className="hidden 2xl:flex gap-1 cursor-pointer text-[24px] items-center">
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
            href="https://www.facebook.com/hobiholidays/"
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

        {/* Mobile Menu Button */}

        <div className="border rounded bg-[#004FC0]/80 2xl:hidden z-50 text-white">
          <Hamburger
            toggled={toggleHamburger}
            size={20}
            distance="sm"
            toggle={setToggleHamburger}
            className="2xl:hidden z-50"
          />
        </div>

        {/* Mobile Navbar */}
        <div
          className={`bg-[#004FC0] fixed z-40 top-0 left-0 flex w-full h-screen justify-center items-center transition-all ease-out duration-300 ${
            toggleHamburger ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul className=" flex flex-col gap-4 text-xl font-semibold text-white w-[90%] sm:w-[70%] max-h-[400px]">
            {navbarList.map((item) =>
              item.component ? (
                <li
                  key={item.label}
                  className={` transition-all duration-300 rounded-lg`}
                  onClick={() => setOpenAbout((x) => !x)}
                >
                  <p
                    className={`cursor-pointer md:px-20 sm:px-8 px-4 py-4 transition-colors duration-300 flex justify-between rounded-lg ${
                      pathname === "/history" ||
                      pathname === "/why-us" ||
                      pathname === "/management" ||
                      pathname === "/awards" ||
                      pathname === "/career"
                        ? "text-[#004FC0] font-bold bg-white"
                        : ""
                    }`}
                  >
                    About{" "}
                    {openAbout ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                  </p>

                  {openAbout && (
                    <>
                      <Link
                        onClick={(e) => {
                          setToggleHamburger(false);
                          // setTimeout(() => {
                          //   setOpenAbout(false);
                          // }, 100);
                        }}
                        href={"/history"}
                        className={`cursor-pointer md:px-20 sm:px-8 px-4 py-4 transition-colors duration-300 flex mt-4 gap-4`}
                      >
                        &bull; History
                      </Link>
                      <Link
                        onClick={(e) => {
                          setToggleHamburger(false);
                          // setTimeout(() => {
                          //   setOpenAbout(false);
                          // }, 100);
                        }}
                        href={"/why-us"}
                        className={`cursor-pointer md:px-20 sm:px-8 px-4 py-4 transition-colors duration-300 flex mt-4 gap-4`}
                      >
                        &bull; Why Us
                      </Link>
                      <Link
                        onClick={(e) => {
                          setToggleHamburger(false);
                          // setTimeout(() => {
                          //   setOpenAbout(false);
                          // }, 100);
                        }}
                        href={"/management"}
                        className={`cursor-pointer md:px-20 sm:px-8 px-4 py-4 transition-colors duration-300 flex mt-4 gap-4`}
                      >
                        &bull; Management
                      </Link>
                      <Link
                        onClick={(e) => {
                          setToggleHamburger(false);
                          setOpenAbout(false);
                        }}
                        href={"/awards"}
                        className={`cursor-pointer md:px-20 sm:px-8 px-4 py-4 transition-colors duration-300 flex mt-4 gap-4`}
                      >
                        &bull; Awards
                      </Link>
                      <Link
                        onClick={(e) => {
                          setToggleHamburger(false);
                          // setTimeout(() => {
                          //   setOpenAbout(false);
                          // }, 100);
                        }}
                        href={"/career"}
                        className={`cursor-pointer md:px-20 sm:px-8 px-4 py-4 transition-colors duration-300 flex mt-4 gap-4`}
                      >
                        &bull; Career
                      </Link>
                    </>
                  )}
                </li>
              ) : item.exception ? (
                <li
                  key={item.label}
                  className={`cursor-pointer block md:px-20 sm:px-8 px-4 py-4 transition-colors duration-300 `}
                  onClick={() => {
                    handleOpenMasterVisa();
                    {
                      setToggleHamburger(false);
                      // setTimeout(() => {
                      //   setOpenAbout(false);
                      // }, 500);
                    }
                  }}
                >
                  {item.label}
                </li>
              ) : (
                <li
                  key={item.label}
                  className={`${
                    pathname === item.href ? "bg-white" : ""
                  } transition-all duration-300 rounded-lg`}
                >
                  <Link
                    href={item.href}
                    className={`cursor-pointer block md:px-20 sm:px-8 px-4 py-4 transition-colors duration-300 ${
                      pathname === item.href
                        ? "text-[#004FC0] font-bold"
                        : "hover:bg-white hover:text-[#004FC0]"
                    }`}
                    onClick={(e) => {
                      setToggleHamburger(false);
                      // setTimeout(() => {
                      //   setOpenAbout(false);
                      // }, 500);
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* logo */}
          <div className="absolute top-4 left-8 xl:left-16 sm:block hidden">
            <Link href={"/"}>
              <Image
                src="/logo1.png"
                width={150}
                height={150}
                alt="Logo"
                className=" h-auto w-24 lg:w-28 xl:w-36"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
