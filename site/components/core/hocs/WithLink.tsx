import React from "react";
import Link from "next/link";

export default function WithLink({
  link,
  children,
  target,
  onClick,
  style,
}: {
  link: string;
  children?: React.ReactNode;
  target?: string | "_self"; // TODO internal links -> self, external links -> blank
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <Link href={link} target={target} onClick={onClick} style={style}>
        {children}
      </Link>
    </>
  );
}
