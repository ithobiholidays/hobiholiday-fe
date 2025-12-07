"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// components
import { useCustomToast } from "@/utils/toast";

// hooks
import { usePostData } from "@/utils/api";
import { authStore } from "@/utils/redux/user";
import { accessStore } from "@/utils/redux/access";
import { checkboxStore } from "@/utils/redux/checkbox";

const Spinner = () => (
  <svg
    className="mr-3 -ml-1 size-5 animate-spin text-white"
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
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const { postData, loading } = usePostData();

  const { addUser } = authStore();
  const { message, addMessage } = accessStore();
  const { checked, setChecked, checkState } = checkboxStore();

  const { showToast } = useCustomToast();

  useEffect(() => {
    if (message) {
      showToast({ message, type: "error" });

      setTimeout(() => {
        Cookies.remove("message", { path: "" });
      }, 5000);
    }
  }, [message]);

  useEffect(() => {
    addMessage(Cookies.get("message"));
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await postData("/auth/login", {
        user: email,
        password,
      }).then((result) => {
        addUser(result.data, result.token);

        setMsg(
          <div className="w-full rounded-md px-3 py-2 mb-2 bg-green-200 text-green-600 text-center">
            {result.message}
          </div>
        );
        setEmail("");
        setPassword("");

        setTimeout(() => {
          setMsg("");
          router.push("/dashboard");
        }, 1000);
      });
    } catch (err) {
      console.error("Login Failed:", err);

      setMsg(
        <div className="w-full rounded-md px-3 py-2 mb-2 bg-red-200 text-red-500 text-center">
          {err.response.data.message}
        </div>
      );

      setTimeout(() => {
        setMsg("");
      }, 5000);
    }
  };
  return (
    <div className="w-full flex justify-center px-3">
      <form className="lg:w-[21rem] sm:w-full px-5 py-6 border border-slate-200 shadow-2xl rounded-lg bg-white">
        <h1 className="text-4xl my-6 text-center font-medium">Login</h1>

        {msg}

        <div className="h-auto flex flex-col items-start gap-1">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="input your email here"
            className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-blue-600 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="h-auto flex flex-col items-start gap-1">
          <label htmlFor="password" className="text-xl">
            Password
          </label>
          <input
            type={checkState}
            id="password"
            placeholder="input your password here"
            className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-blue-600 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="show"
            className="w-4 h-4"
            checked={checked}
            onChange={setChecked}
          />
          <label htmlFor="show" className="text-slate-400">
            Show password
          </label>
        </div>

        <br />

        <button
          type="submit"
          className="w-full flex justify-center bg-blue-600 text-white py-2 rounded-lg text-xl font-medium disabled:cursor-not-allowed items-center"
          disabled={!password || !email}
          onClick={submitForm}
        >
          {loading && <Spinner />}
          SUBMIT
        </button>
      </form>
    </div>
  );
}
