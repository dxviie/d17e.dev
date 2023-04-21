import Image from "next/image";
import { imageLoader } from "../../services/ContentApi";
import { Box } from "@chakra-ui/react";
import { ArticleDTO } from "../../services/ContentTypes";
import blurHashToDataURL from "../../services/BlurHashTransformer";

export default function ArticleCover({ article }: { article: ArticleDTO }) {
  if (!article || !article.cover || !article.cover.url) {
    // don't try to render non-images
    return <></>;
  }
  return (
    <>
      <Box width={"100%"} height={"20rem"} position={"relative"}>
        <Image
          src={article.cover.url}
          alt={article.cover.alternativeText}
          loader={imageLoader}
          layout={"fill"}
          objectFit={"contain"}
          placeholder={"blur"}
          blurDataURL={blurHashToDataURL(article.cover.blurhash)}
        ></Image>
      </Box>
    </>
  );
}
