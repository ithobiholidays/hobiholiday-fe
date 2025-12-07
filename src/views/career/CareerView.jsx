"use client";
import { useGetData, usePostData } from "@/utils/api";
import { useCustomToast } from "@/utils/toast";
import { Button, useToast } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

const CareerView = () => {
  const { getData, data, totalData, loading } = useGetData();
  const { postData } = usePostData();

  const toast = useToast();
  const { showToast } = useCustomToast();

  const [job, setJob] = useState("");
  const [cv, setCv] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileRef = useRef();

  const fetchData = async () => {
    try {
      await getData("/jobpos/all");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    if (!job) {
      setErrorMessage("Please select a job position.");
      return;
    }

    if (!cv) {
      setErrorMessage("Please upload your CV.");
      return;
    }

    if (cv.type !== "application/pdf") {
      setErrorMessage("Only PDF files are allowed.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("positionId", job);
      formData.append("document", cv);
      setIsSubmitting(true);
      await postData("/cv/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast({ message: "Application Submitted!", type: "success" });
    } catch (error) {
      showToast({ message: "Failed Submitting Application", type: "error" });
    } finally {
      setIsSubmitting(false);
      setJob("");
      setCv("");
      setErrorMessage("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full sm:px-6 md:px-12 xl:px-24 2xl:px-48">
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004FC0] mb-4">
          Bergabung dan Maju Bersama Kami
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg md:text-lg">
          Kami adalah perusahaan travel yang terus berkembang & Dinamis dimana
          kami menerima semua orang yang ingin berkembang dan maju menggapai
          cita-citanya.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg md:text-lg">
          Saat ini kami membuka peluang untuk beberapa lowongan pekerjaan
          sebagai berikut:
        </p>
        <ul className="list-disc pl-5 text-gray-700 text-base sm:text-lg md:text-xl">
          {data?.map((career) => (
            <li key={career.id}>{career.name}</li>
          ))}
        </ul>
      </div>

      {/* Right Content (Image + Form) */}
      <div className="flex flex-col items-center">
        <Image
          src="/image6.png"
          width={500}
          height={500}
          alt="Team"
          className="rounded-lg shadow-lg mb-6"
        />
        <p className="text-gray-700 text-center mb-4">
          Apabila Anda memiliki kualifikasi yang kami butuhkan, Silakan kirimnya
          CV Anda sekarang.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="bg-[#FFA80F] text-white py-2 rounded-2xl w-full text-center border-r-8 border-transparent  text-sm "
          >
            <option disabled value={""}>
              POSISI YANG DILAMAR
            </option>
            {data?.map((career) => (
              <option key={career.id} value={career.id}>
                {career.name}
              </option>
            ))}
          </select>
          <button
            className="bg-[#FFA80F] text-white px-4 py-2 rounded-2xl w-full flex items-center justify-center gap-2"
            onClick={() => fileRef.current.click()}
          >
            {cv ? (
              <span className="flex items-center">
                {cv.name}
                <IoMdClose
                  className="ml-4 cursor-pointer border rounded-full bg-transparent text-lg hover:bg-slate-500"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering file input
                    setCv(null);
                  }}
                />
              </span>
            ) : (
              "UPLOAD CV (PDF)"
            )}
          </button>

          <input
            type="file"
            className="hidden"
            ref={fileRef}
            accept=".pdf"
            onChange={(e) => setCv(e.target.files[0])}
          />
        </div>
        <span className="text-sm text-red-500 mt-2">{errorMessage}</span>
        <button
          className={`bg-[#004FC0] text-white px-12 py-2 rounded-2xl mt-4 font-semibold flex items-center justify-center gap-2 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "SUBMIT"
          )}
        </button>
      </div>
    </div>
  );
};

export default CareerView;
