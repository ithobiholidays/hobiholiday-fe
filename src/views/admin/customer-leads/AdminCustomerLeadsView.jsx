"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CustomTable from "@/components/ui/CustomTable";
import DeleteAlert from "@/components/ui/DeleteAlert";
import { usePostData } from "@/utils/api";
import { useCustomToast } from "@/utils/toast";
import { Button, Input, Select, useDisclosure } from "@chakra-ui/react";
import { format, subDays, startOfMonth } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

const paths = [
  { title: "Home", href: "/dashboard" },
  { title: "Customer Leads", href: "/dashboard/customer-leads" },
];

const AdminCustomerLeadsView = () => {
  const { postData, data, totalData, loading } = usePostData();
  const { postData: postExport, loading: exportLoading } = usePostData();
  const { showToast } = useCustomToast();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = useRef(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState("");

  // mode: "date" | "month" | "year"
  const [mode, setMode] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState(""); // format "YYYY-MM"
  const [year, setYear] = useState(""); // format "YYYY"

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
    {
      key: "actions",
      label: "Aksi",
      render: (row) => (
        <button
          className="bg-red-600/80 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-2 transition-colors"
          onClick={() => {
            setSelectedItem(row);
            onOpenDelete();
          }}
        >
          <MdDelete /> Hapus
        </button>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      await postData("/customer-lead/alls", { p: page, limit: perPage });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  // Hitung rentang tanggal berdasarkan mode yang dipilih
  const buildRange = () => {
    if (mode === "date") {
      if (!startDate || !endDate) return null;
      return { startDate, endDate, label: `${startDate}_${endDate}` };
    }
    if (mode === "month") {
      if (!month) return null;
      const [y, m] = month.split("-").map(Number);
      const lastDay = new Date(y, m, 0).getDate(); // hari terakhir bulan itu
      return {
        startDate: `${month}-01`,
        endDate: `${month}-${String(lastDay).padStart(2, "0")}`,
        label: month,
      };
    }
    if (mode === "year") {
      if (!year) return null;
      return {
        startDate: `${year}-01-01`,
        endDate: `${year}-12-31`,
        label: year,
      };
    }
    return null;
  };

  // Preset cepat: isi otomatis mode rentang tanggal
  const applyPreset = (preset) => {
    const today = new Date();
    let start = today;

    if (preset === "today") start = today;
    else if (preset === "last7") start = subDays(today, 6); // 7 hari termasuk hari ini
    else if (preset === "thisMonth") start = startOfMonth(today);

    setMode("date");
    setStartDate(format(start, "yyyy-MM-dd"));
    setEndDate(format(today, "yyyy-MM-dd"));
  };

  const exportToCSV = (rows, label) => {
    const headers = [
      "Nama",
      "No HP",
      "Jumlah Pax",
      "Kategori",
      "Produk",
      "URL Produk",
      "Tanggal Submit",
    ];

    const escape = (val) => {
      const s = val == null ? "" : String(val);
      return `"${s.replace(/"/g, '""')}"`;
    };

    const lines = [headers.join(",")];
    rows.forEach((r) => {
      lines.push(
        [
          r.name,
          r.phone,
          r.pax,
          r.categoryName,
          r.productTitle,
          r.productUrl,
          r.createdAt ? format(new Date(r.createdAt), "yyyy-MM-dd HH:mm") : "",
        ]
          .map(escape)
          .join(",")
      );
    });

    // \uFEFF = BOM agar karakter Indonesia terbaca benar di Excel
    const csv = "\uFEFF" + lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customer-leads_${label}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    const range = buildRange();
    if (!range) {
      showToast({ message: "Lengkapi pilihan tanggal dulu", type: "error" });
      return;
    }

    try {
      const res = await postExport("/customer-lead/export", {
        startDate: range.startDate,
        endDate: range.endDate,
      });
      const rows = res?.data || [];

      if (rows.length === 0) {
        showToast({
          message: "Tidak ada data pada rentang tersebut",
          type: "warning",
        });
        return;
      }

      exportToCSV(rows, range.label);
      showToast({
        message: `Berhasil export ${rows.length} data`,
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error?.response?.data?.message || "Gagal export data",
        type: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Customer Leads</p>
        <Breadcrumbs paths={paths} />
      </div>

      {/* Export by tahun / bulan / rentang tanggal + preset cepat */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Mode</label>
            <Select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              bg="white"
              w="auto"
            >
              <option value="date">Rentang Tanggal</option>
              <option value="month">Per Bulan</option>
              <option value="year">Per Tahun</option>
            </Select>
          </div>

          {mode === "date" && (
            <>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Tanggal Mulai
                </label>
                <Input
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(e) => setStartDate(e.target.value)}
                  bg="white"
                  w="auto"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Tanggal Akhir
                </label>
                <Input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                  bg="white"
                  w="auto"
                />
              </div>
            </>
          )}

          {mode === "month" && (
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Pilih Bulan</label>
              <Input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                bg="white"
                w="auto"
              />
            </div>
          )}

          {mode === "year" && (
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Pilih Tahun</label>
              <Input
                type="number"
                min="2020"
                max="2100"
                placeholder="2026"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                bg="white"
                w="auto"
              />
            </div>
          )}

          <Button
            colorScheme="blue"
            onClick={handleExport}
            isLoading={exportLoading}
            loadingText="Mengekspor..."
          >
            Export CSV
          </Button>
        </div>

        {/* Preset cepat */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Pilih cepat:</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => applyPreset("today")}
          >
            Hari Ini
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => applyPreset("last7")}
          >
            7 Hari Terakhir
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => applyPreset("thisMonth")}
          >
            Bulan Ini
          </Button>
        </div>
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

      {isOpenDelete && (
        <DeleteAlert
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          cancelRef={cancelRef}
          title="Customer Lead"
          url={`/customer-lead/${selectedItem?.id}`}
          refetch={fetchData}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
};

export default AdminCustomerLeadsView;