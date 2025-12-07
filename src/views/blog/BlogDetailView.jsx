"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import DOMPurify from "dompurify";
import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";

const BlogDetailView = ({ dataBlog }) => {
  const sanitizedContent = useMemo(() => {
    if (dataBlog?.data?.content) {
      return DOMPurify.sanitize(dataBlog?.data?.content || "");
    }

    return "";
  }, [dataBlog]);

  return (
    <div className="flex flex-col gap-y-6 w-full items-center 2xl:px-72 xl:px-56 lg:px-44 md:px-24 sm:px-12">
      <Link href={"/"} className="self-start">
        <Button variant={"ghost"}>&laquo; Back</Button>
      </Link>
      <p className="text-4xl font-semibold self-start">
        {dataBlog?.data?.title}
      </p>
      <div className="md:flex justify-between w-full gap-8">
        <p className="text-xl">Tuesday, 24 October 2024</p>
        <p className="text-xl">{dataBlog?.data?.author}</p>
      </div>
      <Image
        src={`${dataBlog.data.imageHost}${dataBlog.data.picture}`}
        width={900}
        height={900}
        className="rounded-lg shadow-lg w-full h-auto"
        alt={dataBlog?.data?.title || "Blog Image"}
      />
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        className=" self-start text-justify"
      ></div>
    </div>
  );
};

export default BlogDetailView;
