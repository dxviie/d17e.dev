import { PostDTO } from "../../../services/ContentTypes";
import Image from "next/image";
import { imageLoader } from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import { Box } from "@chakra-ui/react";

export default function PostCover({ post }: { post: PostDTO }) {
  return (
    <>
      <Box position={"relative"} width={"100%"} style={{ aspectRatio: "1/1" }}>
        <Image
          loader={imageLoader}
          src={post.content.url}
          fill={true}
          style={{ objectFit: "contain" }}
          alt={post.content.alternativeText}
          placeholder={"blur"}
          blurDataURL={blurHashToDataURL(post.content.blurhash)}
        />
      </Box>
    </>
  );
}
