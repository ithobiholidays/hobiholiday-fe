"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs = ({ className = "", paths = [] }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className={`flex text-gray-600 ${className}`}>
      {paths && paths?.length
        ? paths.map((path, index, row) => {
            const isLast = index === row.length - 1;

            return (
              <span key={index} className="flex items-center">
                {index !== 0 && <span className="mx-2">/</span>}
                {isLast ? (
                  <p color="textPrimary">{path.title}</p>
                ) : (
                  <Link href={path.href} className=" hover:underline">
                    {path.title}
                  </Link>
                )}
              </span>
            );
          })
        : pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;

            return (
              <span key={href} className="flex items-center capitalize">
                {index !== 0 && <span className="mx-2">/</span>}
                {isLast ? (
                  <p color="textPrimary">{segment.replace(/-/g, " ")}</p>
                ) : (
                  <Link href={href} className=" hover:underline">
                    {segment.replace(/-/g, " ")}
                  </Link>
                )}
              </span>
            );
          })}
    </div>
  );
};

export default Breadcrumbs;
