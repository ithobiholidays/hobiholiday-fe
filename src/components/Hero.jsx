import Image from "next/image";
import React from "react";

const Hero = ({ title, image, position = "object-top" }) => {
  return (
    <div>
      <Image
        src={image}
        className={`object-cover ${position} aspect-square max-w-full h-auto w-full max-h-[150px] lg:hidden block`}
        width={300}
        height={300}
        alt="Travel 3"
      />

      <div className=" bg-[#004FC0] text-white shadow-lg flex items-center gap-16 p-8 lg:p-0">
        <Image
          src={image}
          className="object-fill aspect-square max-w-full h-auto sm:w-48 lg:w-72 xl:w-80 lg:block hidden"
          width={300}
          height={300}
          alt="Travel 3"
        />

        <div>
          <div className="xl:w-72 md:w-60 w-48 h-2 bg-white mb-3"></div>

          <h2 className="xl:text-4xl md:text-3xl text-2xl font-bold leading-normal">
            {title}
          </h2>
        </div>

        <Image
          src="/logo1.png"
          className="object-fill opacity-20 max-w-full h-auto sm:w-36 md:w-48 xl:w-56 ml-auto hidden xl:block mr-12 self-center"
          width={300}
          height={300}
          alt="Logo 1"
        />
      </div>
    </div>
  );
};

export default Hero;
