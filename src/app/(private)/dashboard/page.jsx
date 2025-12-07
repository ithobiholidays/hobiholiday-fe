"use client";
import { useEffect, useState } from "react";

// hooks
import { useGetData } from "@/utils/api";

// components
import { HashLoader } from "react-spinners";

// assets
import { MdOutlineTravelExplore, MdArchive } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiLibreofficewriter } from "react-icons/si";
import { LuCalendarCheck2 } from "react-icons/lu";
import { RiApps2AiFill, RiMapPinUserLine } from "react-icons/ri";
import {
  BsEnvelopeCheck,
  BsEnvelopeArrowDown,
  BsEnvelopeSlash,
} from "react-icons/bs";

function DashboardPage() {
  const { getData, data, totalData, loading } = useGetData();
  const [load, setLoad] = useState(true);

  const fetchData = async () => {
    try {
      await getData("/dashboard/all");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (loading) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [loading]);

  return load ? (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <HashLoader
        css={{
          display: "block",
          borderColor: "red",
        }}
        color="#0022ff"
        size={200}
      />
    </div>
  ) : (
    <div className="w-full">
      <h1 className="text-4xl font-medium">Dashboard</h1>

      <br />
      <br />

      <h2 className="text-3xl">Products availability:</h2>
      <br />
      <div className="w-full grid grid-cols-4 gap-2">
        <div className="relative w-full bg-blue-100 px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1">
          <MdOutlineTravelExplore className="w-20 h-20 absolute -top-5 right-3 text-blue-300" />

          <p className="font-medium text-2xl">{data?.products?.active}</p>

          <p>Active</p>
        </div>

        <div className="relative w-full bg-red-100 px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1">
          <MdArchive className="w-20 h-20 absolute -top-5 right-3 text-red-300" />

          <p className="font-medium text-2xl">{data?.products?.inactive}</p>

          <p>Archived</p>
        </div>
      </div>

      <br />
      <h2 className="text-3xl">Products Category:</h2>
      <br />
      <div className="w-full grid grid-cols-4 gap-2">
        {data?.productCategories?.map((item, index) => (
          <div
            key={index}
            className={`relative w-full ${
              index % 2 === 0 ? "bg-fuchsia-100" : "bg-indigo-100"
            } px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1`}
          >
            <FaMapLocationDot
              className={`w-14 h-14 absolute -top-5 right-3 ${
                index % 2 === 0 ? "text-fuchsia-300" : "text-indigo-300"
              }`}
            />

            <p className="font-medium text-2xl">{item.count}</p>

            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <br />
      <br />
      <h2 className="text-3xl">Blogs Availability:</h2>
      <br />
      <div className="w-full grid grid-cols-4 gap-2">
        <div className="relative w-full bg-blue-100 px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1">
          <SiLibreofficewriter className="w-20 h-20 absolute -top-5 right-3 text-blue-300" />

          <p className="font-medium text-2xl">{data?.blogs?.published}</p>

          <p>Published</p>
        </div>

        <div className="relative w-full bg-red-100 px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1">
          <LuCalendarCheck2 className="w-20 h-20 absolute -top-5 right-3 text-red-300" />

          <p className="font-medium text-2xl">{data?.blogs?.scheduled}</p>

          <p>Scheduled</p>
        </div>
      </div>

      <br />
      <h2 className="text-3xl">Blogs Category:</h2>
      <br />
      <div className="w-full grid grid-cols-4 gap-2">
        {data?.blogCategories?.map((item, index) => (
          <div
            key={index}
            className={`relative w-full ${
              index % 2 === 0 ? "bg-rose-100" : "bg-teal-100"
            } px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1`}
          >
            <RiApps2AiFill
              className={`w-14 h-14 absolute -top-5 right-3 ${
                index % 2 === 0 ? "text-rose-300" : "text-teal-300"
              }`}
            />

            <p className="font-medium text-2xl">{item.count}</p>

            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <br />
      <br />

      <h2 className="text-3xl">Job Applications:</h2>
      <br />
      <div className="w-full grid grid-cols-4 gap-2">
        <div className="relative w-full bg-blue-100 px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1">
          <BsEnvelopeArrowDown className="w-20 h-20 absolute -top-5 right-3 text-blue-300" />

          <p className="font-medium text-2xl">{data?.cv?.Received}</p>

          <p>Received</p>
        </div>

        <div className="relative w-full bg-teal-100 px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1">
          <BsEnvelopeCheck className="w-20 h-20 absolute -top-5 right-3 text-teal-300" />

          <p className="font-medium text-2xl">{data?.cv?.Approved}</p>

          <p>Approved</p>
        </div>

        <div className="relative w-full bg-red-100 px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1">
          <BsEnvelopeSlash className="w-20 h-20 absolute -top-5 right-3 text-red-300" />

          <p className="font-medium text-2xl">{data?.cv?.Rejected}</p>

          <p>Rejected</p>
        </div>
      </div>

      <br />
      <h2 className="text-3xl">Job Positions Application Available:</h2>
      <br />
      <div className="w-full grid grid-cols-4 gap-2">
        {data?.job?.map((item, index) => (
          <div
            key={index}
            className={`relative w-full ${
              index % 2 === 0 ? "bg-cyan-100" : "bg-sky-100"
            } px-5 py-4 rounded-xl flex flex-col items-start justify-center gap-1`}
          >
            <RiMapPinUserLine
              className={`w-14 h-14 absolute -top-5 right-3 ${
                index % 2 === 0 ? "text-cyan-300" : "text-sky-300"
              }`}
            />

            <p className="font-medium text-2xl">{item.count}</p>

            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
