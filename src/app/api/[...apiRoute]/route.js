import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export async function GET(req, { params }) {
  const { apiRoute } = await params;
  const url = new URL(req.url);
  const queryParams = url.searchParams.toString();

  const BASE_URL = `${BACKEND_URL}/${apiRoute.join("/")}${
    queryParams ? `?${queryParams}` : ""
  }`;

  try {
    const { data } = await axios.get(BASE_URL);

    return NextResponse.json(data);
  } catch (error) {
    const message = error.response.data.message || error.message;
    const status = error.response.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(req, { params }) {
  const { apiRoute } = await params;
  const url = new URL(req.url);
  const queryParams = url.searchParams.toString();

  const BASE_URL = `${BACKEND_URL}/${apiRoute.join("/")}${
    queryParams ? `?${queryParams}` : ""
  }`;

  try {
    let body;
    let headers = {};

    // Check if the request contains FormData
    const contentType = req.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      body = await req.formData(); // Handle file uploads
    } else {
      body = await req.json(); // Handle regular JSON
      headers["Content-Type"] = "application/json";
    }

    const { data } = await axios.post(BASE_URL, body, { headers });

    return NextResponse.json(data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(req, { params }) {
  const { apiRoute } = await params;
  const url = new URL(req.url);
  const queryParams = url.searchParams.toString();

  const BASE_URL = `${BACKEND_URL}/${apiRoute.join("/")}${
    queryParams ? `?${queryParams}` : ""
  }`;

  try {
    let body;
    let headers = {};

    // Check if the request contains FormData
    const contentType = req.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      body = await req.formData(); // Handle file uploads
    } else {
      body = await req.json(); // Handle regular JSON
      headers["Content-Type"] = "application/json";
    }

    const { data } = await axios.put(BASE_URL, body, { headers });

    return NextResponse.json(data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(req, { params }) {
  const { apiRoute } = await params;
  const url = new URL(req.url);
  const queryParams = url.searchParams.toString();

  const BASE_URL = `${BACKEND_URL}/${apiRoute.join("/")}${
    queryParams ? `?${queryParams}` : ""
  }`;

  try {
    const { data } = await axios.delete(BASE_URL, { headers });

    return NextResponse.json(data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}
