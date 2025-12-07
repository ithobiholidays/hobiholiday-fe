import React from "react";

const CustomButton = ({ className, children, ...props }) => {
  return (
    <button
      className={`px-6 py-1.5 border bg-[#ECECEC] border-black rounded hover:bg-gray-200 ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
