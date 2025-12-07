"use client";

import { usePostData } from "@/utils/api";
import { Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const Blog = () => {
  const router = useRouter();

  const { postData, loading } = usePostData();

  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);

  const fetchData = async (newPage) => {
    try {
      const response = await postData("/blogs/alls?q=p", {
        p: newPage,
        limit: 3,
      });

      if (response) {
        setBlogs((prevBlogs) => [...prevBlogs, ...response?.data]); // Append new data
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  useEffect(() => {
    return () => {
      setBlogs([]);
    };
  }, []);

  useEffect(() => {
    if (router?.asPath?.includes("#")) {
      const id = router.asPath.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        const offset = 500; // Adjust this based on your navbar height
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      }
    }
  }, [router?.asPath]);

  return (
    <div className="xl:px-24 lg:px-16 md:px-8 sm:px-4" id="blog-section">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700">
        Inspirasi Menarik untuk Perjalanan Anda
      </h2>

      <div className="mt-8 grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton height="500" key={index} />
            ))
          : blogs?.map((blog, index) => (
              <Link
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 hover:cursor-pointer hover:shadow-xl"
                href={`/blog/${blog.slug}`}
              >
                <Image
                  src={`${blog.imageHost}${blog.picture}`}
                  width={500}
                  height={500}
                  className="w-full hd:h-[400px] 3xl:h-[275px] 2xl:h-[250px] xl:h-[250px] lg:h-[200px] md:h-[175px] xs:h-[175px] object-cover bg-center rounded-md"
                  alt={blog?.title}
                />
                <h3 className=" text-lg font-semibold">{blog?.title}</h3>
                <p
                  className=" text-gray-600 text-sm line-clamp-4 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: blog?.content }}
                ></p>

                <div className="mt-auto text-sky-600 font-bold">
                  Read more &gt;&gt;
                </div>
              </Link>
            ))}
      </div>

      <div className="mt-6 text-center">
        <button
          className="text-blue-700 font-semibold"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Baca Lebih Banyak"}
        </button>
      </div>
    </div>
  );
};

export default Blog;
