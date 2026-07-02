"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CustomTable from "@/components/ui/CustomTable";
import { usePostData } from "@/utils/api";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const paths = [
  { title: "Home", href: "/dashboard" },
  { title: "Customer Leads", href: "/dashboard/customer-leads" },
];

const AdminCustomerLeadsView = () => {
  const { postData, data, totalData, loading } = usePostData();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const columns = [
    { key: "name", label: "Nama" },
    { key: "phone", label: "No HP" },
    { key: "pax", label: "Jumlah Pax" },
    { key: "categoryName", label: "Kategori" },
    {
      key: "productUrl",
      label: "Produk",
      render: (row) =>
        row?.productUrl ? (
          <a
            href={row.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            {row?.productTitle || "Lihat Produk"}
          </a>
        ) : (
          "-"
        ),
    },
    {
      key: "createdAt",
      label: "Tanggal",
      render: (row) =>
        row?.createdAt
          ? format(new Date(row.createdAt), "dd MMM yyyy HH:mm")
          : "-",
    },
  ];

  const fetchData = async () => {
    try {
      await postData("/customer-lead/alls", {
        p: page,
        limit: perPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Customer Leads</p>
        <Breadcrumbs paths={paths} />
      </div>

      <div className="mt-8">
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
      </div>
    </div>
  );
};

export default AdminCustomerLeadsView;