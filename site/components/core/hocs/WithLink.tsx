import React from "react";
import Link from "next/link";

export default function WithLink({
  link,
  children,
  target,
  onClick,
}: {
  link: string;
  children?: React.ReactNode;
  target?: string | "_self";
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <>
      <Link href={link} target={target} onClick={onClick}>
        {children}
      </Link>
    </>
  );
}
