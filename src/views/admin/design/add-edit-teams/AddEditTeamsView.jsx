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
import { useRouter } from "next/navigation";
import Link from "next/link";

const paths = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Design",
    href: "/dashboard/design/add-edit-teams",
  },
  {
    title: "Add Edit Team",
    href: "/",
  },
];

const AddEditTeamsView = () => {
  const router = useRouter();

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

  const columns = [
    { key: "name", label: "Category Name" },
    { key: "position", label: "Position" },
    {
      key: "actions",
      label: "Action",
      render: (row) => (
        <div className="flex gap-2">
          <Link
            className="bg-[#1E91CF] hover:bg-[#1779a8] text-white px-2 py-1 rounded flex items-center gap-2 transition-colors"
            href={`/dashboard/design/add-edit-teams/${row?.id}`}
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
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      await postData("/team/alls", {
        p: page,
        limit: perPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = () => {};

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Add/Edit Team</p>
        <Breadcrumbs paths={paths} />
      </div>

      <div className="flex justify-between items-center mt-8">
        <CustomButton
          onClick={() => router.push("/dashboard/design/add-edit-teams/create")}
        >
          Add New Team
        </CustomButton>
        <SearchBar onSearch={onSearch} />
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
          title="Team"
          url={`/team/${selectedItem?.id}`}
          refetch={fetchData}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
};

export default AddEditTeamsView;
