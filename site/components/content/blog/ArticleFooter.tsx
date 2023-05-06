import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ArticleDTO } from "../../../services/ContentTypes";
import Image from "next/image";
import { imageLoader } from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import { COLOR_DARK, COLOR_LIGHT } from "../../../styles/d17eTheme";

export default function ArticleFooter({ article }: { article: ArticleDTO }) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <>
      <HStack justifyContent={"flex-end"}>
        <HStack>
          <Box
            borderRadius={"50%"}
            position={"relative"}
            height={"4rem"}
            width={"4rem"}
            overflow={"hidden"}
            filter={"grayscale(50%)"}
            borderWidth={"1px"}
            borderColor={color}
            borderStyle={"dashed"}
          >
            <Image
              loader={imageLoader}
              src={article.author.avatar.url}
              alt={article.author.avatar.alternativeText}
              fill={true}
              style={{ objectFit: "cover" }}
              placeholder={"blur"}
              blurDataURL={blurHashToDataURL(article.author.avatar.blurhash)}
            />
          </Box>
          <Text>
            by <b>{article.author.name}</b>
          </Text>
        </HStack>
      </HStack>
    </>
  );
}
