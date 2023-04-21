import { Link, Button } from "@chakra-ui/react";
import ColorModeToggle from "./ColorModeToggle";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  console.log(router.asPath, router.basePath);
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
      <ColorModeToggle></ColorModeToggle>
    </>
  );
}
