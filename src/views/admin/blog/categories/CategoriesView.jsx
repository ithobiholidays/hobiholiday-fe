"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CustomButton from "@/components/ui/CustomButton";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import SearchBar from "@/components/ui/SearchBar";
import { useGetData, usePostData } from "@/utils/api";
import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CategoriesModal from "./component/CategoriesModal";
import DeleteAlert from "@/components/ui/DeleteAlert";
import { MdDelete, MdEdit, MdOutlineEdit } from "react-icons/md";

const paths = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Blog",
    href: "/dashboard/blog/categories",
  },
  {
    title: "Add Edit Post",
    href: "/",
  },
];

const AdminCategoriesView = () => {
  const { postData, data, totalData, loading } = usePostData();
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const columns = [
    { key: "name", label: "Category Name" },
    { key: "blogsCount", label: "No Of Post" },
    {
      key: "actions",
      label: "Action",
      render: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-[#1E91CF] hover:bg-[#1779a8] text-white px-2 py-1 rounded flex items-center gap-2 transition-colors"
            onClick={() => {
              setSelectedItem(row);
              onOpen();
            }}
          >
            <MdOutlineEdit />
            Edit
          </button>
          <button
            className="bg-red-600/80 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-2 transition-colors"
            onClick={() => {
              setSelectedItem(row);
              onOpenDelete();
            }}
          >
            <MdDelete /> Delete
          </button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      await postData(`/cat/alls?q=${searchValue}`, {
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
        <p className="text-3xl font-medium">Categories</p>
        <Breadcrumbs paths={paths} />
      </div>

      <div className="flex justify-between items-center mt-8">
        <CustomButton onClick={onOpen}>Add New Category</CustomButton>
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

      {isOpen && (
        <CategoriesModal
          isOpen={isOpen}
          onClose={onClose}
          refetch={fetchData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      {isOpenDelete && (
        <DeleteAlert
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          cancelRef={cancelRef}
          title="Category"
          url={`/cat/${selectedItem?.id}`}
          refetch={fetchData}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
};

export default AdminCategoriesView;
