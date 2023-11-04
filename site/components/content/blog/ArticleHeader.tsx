import {Box, HStack, Text, useMediaQuery, VStack} from "@chakra-ui/react";
import {ArticleDTO} from "../../../services/ContentTypes";
import {formatReadingTime, usePublishedDetails,} from "../../../services/ContentDetailFormatter";
import {headerFont} from "../../../styles/fonts";
import useThemeColors from "../../core/hooks/useThemeColors";

export default function ArticleHeader({article}: { article: ArticleDTO }) {
  const colors = useThemeColors();
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
  const publishedDetails = usePublishedDetails(
    article.createdAt,
    article.updatedAt,
    isSmallerThan500,
  );
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <>
      <VStack
        lineHeight={".8"}
        alignItems={"flex-start"}
        fontFamily={headerFont.style.fontFamily}
      >
        <Box marginBottom={"1rem"}>
          <Text
            fontSize={["xx-large", "xxx-large"]}
            lineHeight={["2.3rem", "3.5rem"]}
            marginTop={"3rem"}
            marginLeft={"-1rem"}
            padding={"0 .5rem"}
            display={"inline"}
            color={colors.bgColor}
            bg={colors.color}
          >
            {article.title}
          </Text>
        </Box>
        <HStack padding={".5rem"} width={"100%"}>
          <Text
            fontSize={"small"}
            noOfLines={1}
            fontWeight={"bold"}
            overflow={"visible"}
          >
            {formatReadingTime(article.body)}
          </Text>
          <Text>{" - "}</Text>
          <Text fontSize={"small"} noOfLines={1} overflow={"visible"}>
            {publishedDetails}
          </Text>
        </HStack>
      </VStack>
    </>
  );
}
