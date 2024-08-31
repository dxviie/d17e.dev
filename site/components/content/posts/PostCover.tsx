import {PostDTO} from "../../../services/ContentTypes";
import Image from "next/image";
import {imageLoader} from "../../../services/ContentApi";
import {Box} from "@chakra-ui/react";

export default function PostCover({post}: { post: PostDTO }) {
  let media;
  let aspect;
  if (post.content && post.content.url && post.content.url.endsWith(".mp4")) {
    media = <video
      key={post.slug}
      autoPlay={true}
      muted={true}
      loop={true}
      playsInline={true}
      style={{width: "100%", height: "100%"}}
    >
      <source src={post.content.url} type={"video/mp4"}/>
    </video>;
    aspect = undefined;
  } else {
    media = <Image
      loader={imageLoader}
      src={post.content.url}
      fill={true}
      sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      style={{objectFit: "contain"}}
      alt={post.content.alternativeText}
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
