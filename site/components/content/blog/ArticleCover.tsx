import Image from "next/image";
import {imageLoader} from "../../../services/ContentApi";
import {Box} from "@chakra-ui/react";
import {ArticleDTO} from "../../../services/ContentTypes";
import useThemeColors from "../../core/hooks/useThemeColors";

export default function ArticleCover({article}: { article: ArticleDTO }) {
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
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          style={{objectFit: "cover"}}
          blurDataURL={article.cover.blurhash}
        ></Image>
      </Box>
    </>
  );
}
