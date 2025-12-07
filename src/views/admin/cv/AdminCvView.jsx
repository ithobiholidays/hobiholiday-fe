"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CustomButton from "@/components/ui/CustomButton";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import SearchBar from "@/components/ui/SearchBar";
import { useGetData, usePostData } from "@/utils/api";
import { IconButton, Select, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import DeleteAlert from "@/components/ui/DeleteAlert";
import { MdDelete, MdEdit, MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa";
import { downloadFileFromUrl } from "@/utils/common";
import ChangeStatusAlert from "./component/ChangeStatusAlert";

const paths = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Career",
    href: "/",
  },
];

const AdminCvView = () => {
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
  const [selectedValue, setSelectedValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const columns = [
    { key: "position", label: "Job Position" },
    {
      key: "order",
      label: "CV",
      render: (row) => (
        <div className="flex gap-4 items-center ">
          <p className="flex-1">{row?.document}</p>

          <button
            className="group relative flex items-center justify-center p-2 border rounded-lg transition duration-300 hover:bg-gray-200 hover:shadow-md"
            onClick={() =>
              downloadFileFromUrl(
                `${row?.documentHost}${row?.document}`,
                row?.document
              )
            }
          >
            <FaDownload className="text-gray-700 text-sm  transition duration-300" />
          </button>
          {/* </IconButton> */}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Select
          value={row?.status}
          w={200}
          bg={"rgb(248, 248, 248)"}
          size={"sm"}
          onChange={(e) => {
            e.preventDefault();
            setSelectedItem(row);
            setSelectedValue(e.target.value);
            onOpenDelete();
          }}
        >
          <option
            value="Received"
            style={{ background: "white", color: "black" }}
          >
            Received
          </option>
          <option
            value="Approved"
            style={{ background: "white", color: "black" }}
          >
            Approved
          </option>
          <option
            value="Rejected"
            style={{ background: "white", color: "black" }}
          >
            Rejected
          </option>
        </Select>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      if (statusFilter === "All Status") {
        await postData(`/cv/alls`, {
          p: page,
          limit: perPage,
        });
      } else {
        await postData(`/cv/stat-pagination`, {
          p: page,
          limit: perPage,
          status: statusFilter,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, statusFilter]);

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Career</p>
        <Breadcrumbs paths={paths} />
      </div>

      <div className="flex justify-end items-center mt-8">
        {/* <SearchBar onSearch={handleSearch} /> */}
        <Select
          value={statusFilter}
          maxW={200}
          bg={"rgb(248, 248, 248)"}
          size={"sm"}
          onChange={(e) => {
            setStatusFilter(e.target.value);
          }}
        >
          <option
            value="All Status"
            style={{ background: "white", color: "black" }}
          >
            All Status
          </option>
          <option
            value="Received"
            style={{ background: "white", color: "black" }}
          >
            Received
          </option>
          <option
            value="Approved"
            style={{ background: "white", color: "black" }}
          >
            Approved
          </option>
          <option
            value="Rejected"
            style={{ background: "white", color: "black" }}
          >
            Rejected
          </option>
        </Select>
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
        <ChangeStatusAlert
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          cancelRef={cancelRef}
          refetch={fetchData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}
    </div>
  );
};

export default AdminCvView;
