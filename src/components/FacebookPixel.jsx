"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
