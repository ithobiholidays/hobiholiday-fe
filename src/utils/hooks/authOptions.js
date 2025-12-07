import { cookies } from "next/headers";
import axios from "axios";

export const authOptions = async (req = null) => {
  let sessionToken;

  if (req) {
    sessionToken = req.cookies.get("token")?.value;
  } else {
    sessionToken = cookies().get("token")?.value;
  }

  if (!sessionToken) return null;

  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/verify`,
      {
        headers: { Authorization: `Bearer ${sessionToken}` },
      }
    );

    if (result.data.status === "Failed") {
      await axios.get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/logout`);
      return null;
    }

    return { user: result.data.user, token: sessionToken };
  } catch (error) {
    console.error("Auth verification failed:", error);
    return null;
  }
};
