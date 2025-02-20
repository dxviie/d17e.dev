import {PostDTO} from "../../../services/ContentTypes";
import Image from "next/image";
import {imageLoader} from "../../../services/ContentApi";
import {Box} from "@chakra-ui/react";

export default function PostCover({post}: { post: PostDTO }) {
  let media;
  let boxStyle: object = {aspectRatio: post.content.ratio};
  if (post.content && post.content.url && (post.content.url.endsWith(".mp4") || post.content.url.endsWith(".mov"))) {
    const mediaType = post.content.url.endsWith(".mp4") ? "video/mp4" : "video/quicktime";
    boxStyle = {};
    media = <video
      key={post.slug}
      autoPlay={true}
      muted={true}
      loop={true}
      playsInline={true}
      style={{width: "100%", height: "100%"}}
    >
      <source src={post.content.url} type={mediaType}/>
    </video>;
  } else {
    media = <Image
      loader={imageLoader}
      src={post.content.url}
      fill={true}
      sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      style={{objectFit: "contain"}}
      alt={post.content.alternativeText}
      blurDataURL={post.content.blurhash}
    />;
  }
  return (
    <>
      <Box position={"relative"} width={"100%"} style={boxStyle}>
        {media}
      </Box>
    </>
  );
}
