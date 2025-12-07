"use client";

import { useGetData } from "@/utils/api";
import { Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";

const AwardView = () => {
  const { getData, data, totalData, loading } = useGetData();

  const fetchData = async () => {
    try {
      const responseCategory = await getData("/reward/all");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full sm:px-12 md:px-24 2xl:px-36">
      {loading ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton height="300" key={index} />
          ))}
        </>
      ) : (
        data.map((award, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white"
          >
            <Image
              src={`${award.imageHost}${award.picture}`}
              width={300}
              height={300}
              alt={award.name}
              className="mb-4 object-contain h-48 w-48"
            />
            <h3 className="text-2xl font-bold text-blue-700">{award.name}</h3>
            <p className="text-gray-600 mt-2">{award.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AwardView;
