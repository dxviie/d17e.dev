import { Link, Button } from "@chakra-ui/react";
import ColorModeToggle from "./ColorModeToggle";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  return (
    <>
      {"/" === router.asPath ? (
        <></>
      ) : (
        <Link href={"/"}>
          <Button variant={"outline"}>home</Button>
        </Link>
      )}
      {"/blog" === router.asPath ? (
        <></>
      ) : (
        <Link href={"/blog"}>
          <Button>blog</Button>
        </Link>
      )}
      <ColorModeToggle></ColorModeToggle>
    </>
  );
}