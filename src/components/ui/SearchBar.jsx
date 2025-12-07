import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced function
  const debouncedSearch = debounce((value) => {
    onSearch(value);
  }, 500); // Adjust delay as needed

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel(); // Cleanup on unmount
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-sm ">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 pr-10 text-gray-600 bg-gray-100 rounded-md outline-none focus:ring-2 focus:ring-gray-300 border border-black/50"
      />
      <button className="absolute inset-y-0 right-0 flex items-center px-3 bg-gray-500 rounded-r-md">
        <IoIosSearch className="text-xl text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
