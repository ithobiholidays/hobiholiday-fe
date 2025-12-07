"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { authStore } from "@/utils/redux/user";

import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdArrowRight } from "react-icons/md";
import { ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Tour Packages",
    stateKey: "isTourOpen",
    links: [
      { label: "Categories", href: "/dashboard/tour-packages/categories" },
      {
        label: "Add/Edit Packages",
        href: "/dashboard/tour-packages/add-edit-packages",
      },
    ],
  },
  {
    label: "Blog",
    stateKey: "isBlogOpen",
    links: [
      { label: "Categories", href: "/dashboard/blog/categories" },
      { label: "Add/Edit Post", href: "/dashboard/blog/add-edit-post" },
    ],
  },
  {
    label: "Testimonials",
    href: "/dashboard/testimonials",
  },
  {
    label: "Teams",
    href: "/dashboard/design/add-edit-teams",
  },
  {
    label: "Awards",
    href: "/dashboard/design/add-edit-awards",
  },
  // {
  //   label: "Design",
  //   stateKey: "isDesignOpen",
  //   links: [
  //     { label: "Add/Edit Teams", href: "/dashboard/design/add-edit-teams" },
  //     { label: "Add/Edit Awards", href: "/dashboard/design/add-edit-awards" },
  //   ],
  // },
  {
    label: "CV",
    href: "/dashboard/cv",
  },
  // {
  //   label: "Settings",
  //   stateKey: "isSettingsOpen",
  //   links: [{ label: "Categories" }, { label: "Add/Edit Packages" }],
  // },
];

export default function LayoutAdmin({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openStates, setOpenStates] = useState({});

  const { removeUser } = authStore();
  const handleLogout = async () => {
    await removeUser(router);
  };

  const toggleMenu = (key) => {
    setOpenStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ChakraProvider>
      <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-gray-100 bg-[#454545]">
        <div className="p-2.5 mt-1 flex items-center px-6 gap-4 mb-4">
          <FaUserCircle size={30} />
          <div>
            <h1 className="font-semibold text-lg">User Name</h1>
            <h1 className="text-sm">Administrator</h1>
          </div>
        </div>

        {menuItems.map(({ label, stateKey, links, href }) => (
          <div
            key={label}
            className={`px-2.5 py-4 border-b border-gray-100/20 cursor-pointer hover:text-sky-500 `}
            onClick={stateKey ? () => toggleMenu(stateKey) : undefined}
          >
            <div
              className={`flex items-center gap-2 justify-between ${
                stateKey && openStates[stateKey] ? "text-sky-500" : ""
              }`}
            >
              {href ? (
                <Link href={href} className="ml-4 w-full">
                  {label}
                </Link>
              ) : (
                <span className="ml-4">{label}</span>
              )}
              {stateKey &&
                (openStates[stateKey] ? (
                  <FiChevronDown size={16} />
                ) : (
                  <FiChevronRight size={16} />
                ))}
            </div>
            {stateKey && openStates[stateKey] && (
              <div className="mt-3">
                {links.map(({ label, href }, index) => (
                  <Link
                    key={index}
                    className="p-2 cursor-pointer hover:text-sky-500 text-white flex gap-2 items-center mt-3 first:mt-0"
                    href={href}
                  >
                    <MdArrowRight />

                    <span className="text-sm">{label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="px-2.5 py-4 w-full flex items-center justify-center duration-300 cursor-pointer absolute bottom-0 left-0">
          <button
            className="w-full flex items-center justify-center gap-2 py-2 text-lg border border-white rounded-lg hover:border-blue-400 hover:text-blue-400"
            onClick={handleLogout}
          >
            Log Out <RiLogoutCircleRLine />
          </button>
        </div>
      </div>
      <div className="ml-[300px] p-8">{children}</div>
    </ChakraProvider>
  );
}
