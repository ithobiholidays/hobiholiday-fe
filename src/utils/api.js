"use client";

import { useState, useCallback } from "react";
import axiosInstance from "./constant/axiosinstance";

export function useGetData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const getData = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(endpoint);

      setData(response.data);

      return response.data;
    } catch (err) {
      console.error("GET request failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data: data?.data || [],
    totalData: data?.total,
    getData,
    loading,
    error,
  };
}

export function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (endpoint, payload, headers) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(endpoint, payload, {
        headers,
      });

      setData(response?.data);
      return response.data;
    } catch (err) {
      // console.error("POST request failed:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data: data?.data, totalData: data?.total, postData, loading, error };
}

export function useUpdateData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateData = async (endpoint, payload, headers) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.patch(endpoint, payload, {
        headers,
      });

      setData(response?.data);
      return response.data;
    } catch (err) {
      // console.error("POST request failed:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data: data?.data,
    totalData: data?.total,
    updateData,
    loading,
    error,
  };
}

export function useDeleteData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (endpoint, headers) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.delete(endpoint, headers);

      return response.data;
    } catch (err) {
      // console.error("POST request failed:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteData,
    loading,
    error,
  };
}
