import Image from "next/image";
import { imageLoader } from "../../services/ContentApi";
import { Box } from "@chakra-ui/react";

export default function Cover({
  url,
  alternativeText,
}: {
  url: string;
  alternativeText: string;
}) {
  if (!url) {
    // don't try to render non-images
    return <></>;
  }
  return (
    <>
      <Box width={"100%"} height={"20rem"} position={"relative"}>
        <Image
          src={url}
          alt={alternativeText}
          loader={imageLoader}
          layout={"fill"}
          objectFit={"contain"}
        ></Image>
      </Box>
    </>
  );
}
