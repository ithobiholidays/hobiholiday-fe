"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CustomButton from "@/components/ui/CustomButton";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import SearchBar from "@/components/ui/SearchBar";
import { useGetData, usePostData } from "@/utils/api";
import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import DeleteAlert from "@/components/ui/DeleteAlert";
import { MdDelete, MdEdit, MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import { useCustomToast } from "@/utils/toast";

const paths = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Blog",
    href: "/dashboard/blog/add-edit-post",
  },
  {
    title: "Add Edit Post",
    href: "/",
  },
];

const AddEditPostView = () => {
  const { postData, data, totalData, loading } = usePostData();
  const { showToast } = useCustomToast();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const cancelRef = useRef(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [selectedItem, setSelectedItem] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const copyToClipboard = async (slug) => {
    try {
      const currentDomain = window.location.origin; // Get current domain dynamically
      const fullUrl = `${currentDomain}/blog/${slug}`;

      await navigator.clipboard.writeText(fullUrl);

      showToast({
        message: "URL Copied!",
        type: "success",
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "status", label: "Status" },
    {
      key: "actions",
      label: "Action",
      render: (row) => (
        <div className="flex gap-2">
          <Link
            className="bg-[#1E91CF] hover:bg-[#1779a8] text-white px-2 py-1 rounded flex items-center gap-2 transition-colors"
            href={`/dashboard/blog/add-edit-post/${row?.slug}`}
          >
            <MdOutlineEdit />
            Edit
          </Link>
          <button
            className="bg-red-600/80 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-2 transition-colors"
            onClick={() => {
              setSelectedItem(row);
              onOpenDelete();
            }}
          >
            <MdDelete /> Delete
          </button>
          <button
            className="bg-[#8FBB6C] hover:bg-[#7aa35c] text-white px-2 py-1 rounded flex items-center transition-colors"
            onClick={() => copyToClipboard(row?.slug)}
          >
            📋 URL
          </button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      await postData(`/blogs/alls?q=all&search=${searchValue}`, {
        p: page,
        limit: perPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (query) => {
    setSearchValue(query);
  };

  useEffect(() => {
    fetchData();
  }, [page, searchValue]);

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Add/Edit Post</p>
        <Breadcrumbs paths={paths} />
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link href={"/dashboard/blog/add-edit-post/create"}>
          <CustomButton>Add New Post</CustomButton>
        </Link>
        <SearchBar onSearch={handleSearch} />
      </div>

      <CustomTable
        columns={columns}
        data={data || []}
        totalData={totalData}
        page={page}
        perPage={perPage}
        setPage={setPage}
        setPerPage={setPerPage}
        loading={loading}
      />

      {isOpenDelete && (
        <DeleteAlert
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          cancelRef={cancelRef}
          title="Post"
          url={`/blogs/${selectedItem?.id}`}
          refetch={fetchData}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
};

export default AddEditPostView;
