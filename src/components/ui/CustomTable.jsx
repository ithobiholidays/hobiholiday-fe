import { Skeleton } from "@chakra-ui/react";
import React from "react";

const CustomTable = ({
  columns,
  data,
  totalData,
  page,
  perPage,
  setPage,
  setPerPage,
  loading = true,
}) => {
  const totalPages = totalData && perPage ? Math.ceil(totalData / perPage) : 1;

  const generatePagination = () => {
    const pages = [];
    const lastPage = Math.ceil(totalData / perPage);

    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show first page

      if (page > 3) {
        pages.push("dots-prev"); // Use a string to indicate dots
      }

      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(lastPage - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (page < lastPage - 2) {
        pages.push("dots-next"); // Use a string to indicate dots
      }

      pages.push(lastPage); // Always show last page
    }

    return pages;
  };

  return (
    <div>
      <div className="relative overflow-x-auto mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
          <thead className="text-sm text-gray-700 bg-gray-50">
            <tr className="border border-gray-400">
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 font-medium ${
                    index === 0 || index === columns.length - 1
                      ? "border-x"
                      : "border-x"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: perPage }).map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-white border-b border-gray-200"
                >
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <Skeleton height="20px" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-white border-b border-gray-200"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 ${
                        colIndex === 0 || colIndex === columns.length - 1
                          ? "border-x"
                          : "border-x"
                      }`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-end mt-4">
        <div className="flex items-center gap-2">
          {generatePagination().map((item, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-lg ${
                item === page
                  ? "bg-black text-white"
                  : item === "dots-prev" || item === "dots-next"
                  ? "pointer-events-none"
                  : "cursor-pointer hover:bg-black hover:text-white"
              }`}
              onClick={() => typeof item === "number" && setPage(item)}
            >
              <p className="text-sm">
                {item === "dots-prev" || item === "dots-next" ? "..." : item}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm">
          Showing {Math.min((page - 1) * perPage + 1, totalData)} to{" "}
          {Math.min(page * perPage, totalData)} of {totalData} ({totalPages}{" "}
          Pages)
        </p>
      </div>
    </div>
  );
};

export default CustomTable;
