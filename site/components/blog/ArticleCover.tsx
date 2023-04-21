import Image from "next/image";
import { blurhashToBase64, imageLoader } from "../../services/ContentApi";
import { Box } from "@chakra-ui/react";
import { ArticleDTO } from "../../services/ContentTypes";

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
          blurDataURL={blurhashToBase64(article.cover.blurhash)}
        ></Image>
      </Box>
    </>
  );
}
