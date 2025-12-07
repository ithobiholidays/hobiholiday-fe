import axios from "axios";
import Cookies from "js-cookie";

const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const axiosInstance = axios.create({
  baseURL: DATABASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
