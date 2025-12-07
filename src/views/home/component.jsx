import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const destinations = [
  "Korea",
  "Jepang",
  "Turki & Middle East",
  "Eropa Barat & Timur",
  "UK Scotland",
  "USA & Canada",
  "Scandinavia & Balkan",
  "Russia & China",
  "Afrika",
  "Australia & New Zealand",
  "Spain Portugal",
  "Uzbekistan & 4tan",
  "Other Asia",
  "Other Europe",
  "Premium Trip",
];

export default function DestinationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Destination");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (destination) => {
    setSelected(destination);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-sm font-sans border border-orange-500 rounded overflow-hidden">
      {/* Dropdown Header */}
      <div
        className="bg-yellow-500 text-white px-4 py-3 cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <p className="font-bold text-lg">{selected}</p>
        <FaChevronDown className="ml-2 w-5 h-5" />
      </div>

      {/* Dropdown List (inline, not absolute) */}
      {isOpen && (
        <div className="bg-white max-h-64 overflow-y-auto">
          {destinations.map((dest) => (
            <div
              key={dest}
              onClick={() => handleSelect(dest)}
              className="px-4 py-2 text-blue-700 hover:bg-orange-100 cursor-pointer"
            >
              {dest}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
