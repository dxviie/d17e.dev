import Image from "next/image";
import { imageLoader } from "../../../services/ContentApi";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { ArticleDTO } from "../../../services/ContentTypes";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";

export default function ArticleCover({ article }: { article: ArticleDTO }) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  if (!article || !article.cover || !article.cover.url) {
    // don't try to render non-images
    return <></>;
  }
  return (
    <>
      <Box
        width={"100%"}
        height={"20rem"}
        position={"relative"}
        marginBottom={"1.5rem"}
        borderWidth={".1rem"}
        borderColor={color}
        borderStyle={"dashed"}
      >
        <Image
          src={article.cover.url}
          alt={article.cover.alternativeText}
          loader={imageLoader}
          fill={true}
          style={{ objectFit: "cover" }}
          placeholder={"blur"}
          blurDataURL={blurHashToDataURL(article.cover.blurhash)}
        ></Image>
      </Box>
    </>
  );
}
