import axios from "axios";

const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: DATABASE_URL,
  withCredentials: true,
});

// GET function
export async function GET(endpoint) {
  try {
    const response = await api.get(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
}

// POST function with cookies
export async function POST(endpoint, data) {
  try {
    const response = await api.post(`/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
}
