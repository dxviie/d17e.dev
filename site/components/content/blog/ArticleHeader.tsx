import {
  Box,
  HStack,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { ArticleDTO } from "../../../services/ContentTypes";
import {
  formatPublishedDetails,
  formatReadingTime,
} from "../../../services/ContentDetailFormatter";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";
import { headerFont } from "../../../styles/fonts";

export default function ArticleHeader({ article }: { article: ArticleDTO }) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
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
        <Box marginBottom={"-.5rem"}>
          <Text
            fontSize={["xx-large", "xxx-large"]}
            lineHeight={["2.3rem", "3.5rem"]}
            marginTop={"3rem"}
            marginLeft={"-1rem"}
            padding={"0 .5rem"}
            display={"inline"}
            color={bg}
            bg={color}
          >
            {article.title}
          </Text>
        </Box>
        <HStack
          padding={".5rem"}
          width={"100%"}
          display={"inline-flex"}
          justifyContent={"space-between"}
          borderWidth={".1rem"}
          borderTop={"0"}
          borderRight={"0"}
          borderLeft={"1px"}
          borderBottom={"1px"}
          borderColor={color}
          borderStyle={"dashed"}
        >
          <Text fontSize={"small"} noOfLines={1}>
            {formatReadingTime(article.body)}
          </Text>
          <Text
            fontSize={"small"}
            display={"flex"}
            alignSelf={"flex-end"}
            noOfLines={1}
          >
            {formatPublishedDetails(
              article.createdAt,
              article.updatedAt,
              article.publishDtm,
              isSmallerThan500
            )}
          </Text>
        </HStack>
      </VStack>
    </>
  );
}
