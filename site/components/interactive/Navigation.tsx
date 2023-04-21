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
        <Button>
          <Link href={"/"}>home</Link>
        </Button>
      )}
      {"/blog" === router.asPath ? (
        <></>
      ) : (
        <Button>
          <Link href={"/blog"}>blog</Link>
        </Button>
      )}
      <ColorModeToggle></ColorModeToggle>
    </>
  );
}
