import { Button, Link } from "@chakra-ui/react";
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
          <Button>home</Button>
        </Link>
      )}
      {"/blog" === router.asPath ? (
        <></>
      ) : (
        <Link href={"/blog"}>
          <Button>blog</Button>
        </Link>
      )}
      {"/posts" === router.asPath ? (
        <></>
      ) : (
        <Link href={"/posts"}>
          <Button>posts</Button>
        </Link>
      )}
      <ColorModeToggle></ColorModeToggle>
    </>
  );
}
