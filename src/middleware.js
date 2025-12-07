import { NextResponse } from "next/server";
import { authOptions } from "@/utils/hooks/authOptions";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const session = await authOptions(req);

  if (!session) {
    const redirectRes = NextResponse.redirect(new URL("/login", url));

    redirectRes.cookies.set("message", "You must login to access the page.", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(Date.now() + 60000),
    });

    redirectRes.cookies.set("user", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    redirectRes.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    return redirectRes;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/test"],
};
