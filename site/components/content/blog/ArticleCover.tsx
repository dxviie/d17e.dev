import Image from "next/image";
import { imageLoader } from "../../../services/ContentApi";
import { Box } from "@chakra-ui/react";
import { ArticleDTO } from "../../../services/ContentTypes";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import useThemeColors from "../../../styles/useThemeColors";

export default function ArticleCover({ article }: { article: ArticleDTO }) {
  const colors = useThemeColors();
  if (!article || !article.cover || !article.cover.url) {
    // don't try to render non-images
    return <></>;
  }
  return (
    <>
      <Box
        height={"20rem"}
        position={"relative"}
        margin={"0 -1rem 1rem -1rem"}
        borderWidth={"1px"}
        borderColor={colors.color}
        borderStyle={"dashed"}
      >
        <Image
          src={article.cover.url}
          alt={article.cover.alternativeText}
          loader={imageLoader}
          fill={true}
          sizes={"100%"}
          style={{ objectFit: "cover" }}
          placeholder={"blur"}
          blurDataURL={blurHashToDataURL(article.cover.blurhash)}
        ></Image>
      </Box>
    </>
  );
}
