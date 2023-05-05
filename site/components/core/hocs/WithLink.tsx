import React from "react";
import Link from "next/link";

export default function WithLink({
  link,
  children,
  target,
}: {
  link: string;
  children?: React.ReactNode;
  target?: string | "_self";
}) {
  return (
    <>
      <Link href={link} target={target}>
        {children}
      </Link>
    </>
  );
}
