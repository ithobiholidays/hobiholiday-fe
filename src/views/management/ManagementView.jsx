"use client";

import { useGetData } from "@/utils/api";
import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";

const ManagementView = () => {
  const { getData, data, totalData, loading } = useGetData();

  const fetchData = async () => {
    try {
      const responseCategory = await getData("/team/all");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-12 lg:mx-24 md:mx-12 mx-8 xl:max-w-[80%]">
      {loading ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Flex gap={4} key={index}>
              <SkeletonCircle size="100" />
              <SkeletonText
                mt={3}
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
                width={"full"}
                maxWidth={1000}
              />
            </Flex>
          ))}
        </>
      ) : (
        data.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center gap-6"
          >
            {/* <div className="bg-gray-200 p-4 rounded-full"> */}
            <Image
              src={`${feature.imageHost}${feature.picture}`}
              width={300}
              height={300}
              className="rounded-full object-cover shadow-lg aspect-[7/9] max-w-[200px]"
              alt={`${feature.name} - ${feature.position}`}
            />
            {/* </div> */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#004FC0]">
                {feature.position}
              </h3>
              <h3 className="text-xl md:text-2xl  mt-2">{feature.name}</h3>
              {/* <p className="text-gray-600 mt-2 text-lg">
                {feature.description}
              </p> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManagementView;
