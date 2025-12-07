import Hero from "@/components/Hero";
import { GET } from "@/utils/apiServerSide";
import BlogDetailView from "@/views/blog/BlogDetailView";
import CareerView from "@/views/career/CareerView";
import Packages from "@/views/home/Packages";
import Image from "next/image";

async function fetchBlog(slug) {
  return await GET(`blogs/${slug}`);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dataBlog = await fetchBlog(slug);

  return {
    title: dataBlog?.data?.title || "Hobi Holidays : Blog",
    description: dataBlog?.data?.excerpt || "Explore our latest blog articles.",
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const dataBlog = await fetchBlog(slug);

  return <BlogDetailView dataBlog={dataBlog} />;
}
