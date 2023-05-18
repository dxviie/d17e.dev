import { Box, HStack, Text } from "@chakra-ui/react";
import { ArticleDTO } from "../../../services/ContentTypes";
import Image from "next/image";
import { imageLoader } from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import useThemeColors from "../../../styles/useThemeColors";

export default function ArticleFooter({ article }: { article: ArticleDTO }) {
  const colors = useThemeColors();
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <>
      <HStack justifyContent={"flex-end"}>
        {article.author.name && article.author.avatar ? (
          <>
            <HStack>
              <Box
                borderRadius={"50%"}
                position={"relative"}
                height={"4rem"}
                width={"4rem"}
                overflow={"hidden"}
                filter={"grayscale(50%)"}
                borderWidth={"1px"}
                borderColor={colors.color}
                borderStyle={"dashed"}
              >
                <Image
                  loader={imageLoader}
                  src={article.author.avatar.url}
                  alt={article.author.avatar.alternativeText}
                  fill={true}
                  style={{ objectFit: "cover" }}
                  placeholder={"blur"}
                  blurDataURL={blurHashToDataURL(
                    article.author.avatar.blurhash
                  )}
                />
              </Box>
              <Text>
                by <b>{article.author.name}</b>
              </Text>
            </HStack>
          </>
        ) : (
          <></>
        )}
      </HStack>
    </>
  );
}
