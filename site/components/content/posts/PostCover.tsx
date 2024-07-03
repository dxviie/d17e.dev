import {PostDTO} from "../../../services/ContentTypes";
import Image from "next/image";
import {imageLoader} from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import {Box} from "@chakra-ui/react";
import {CONTENT_BASE_URL} from "../../../services/Constants";

export default function PostCover({post}: { post: PostDTO }) {
  let media;
  let aspect;
  console.log("-------------", post);
  if (post.content && post.content.url && post.content.url.endsWith(".mp4")) {
    media = <video
      key={post.slug}
      autoPlay={true}
      muted={true}
      loop={true}
      playsInline={true}
      style={{width: "100%", height: "100%"}}
    >
      <source src={CONTENT_BASE_URL + post.content.url} type={"video/mp4"}/>
    </video>;
    aspect = undefined;
  } else {
    media = <Image
      loader={imageLoader}
      src={post.content.url}
      fill={true}
      sizes={"100%"}
      style={{objectFit: "contain"}}
      alt={post.content.alternativeText}
      placeholder={"blur"}
      blurDataURL={blurHashToDataURL(post.content.blurhash)}
    />;
    aspect = "1/1";
  }
  return (
    <>
      <Box position={"relative"} width={"100%"} style={{aspectRatio: aspect}}>
        {media}
      </Box>
    </>
  );
}
