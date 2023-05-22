import { ArticleDTO } from "../../../services/ContentTypes";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { bodyFont, headerFont } from "../../../styles/fonts";
import WithLink from "../../core/hocs/WithLink";
import { formatReadingTime } from "../../../services/ContentDetailFormatter";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
import useThemeColors from "../../../styles/useThemeColors";
import { useFormattedDate } from "../../../services/useFormattedDate";

export default function ArticleListItem({ article }: { article: ArticleDTO }) {
  const colors = useThemeColors();
  const formattedDate = useFormattedDate(
    article.publishDtm || article.createdAt
  );
  return (
    <>
      <VStack
        alignItems={"flex-start"}
        fontFamily={headerFont.style.fontFamily}
      >
        <VStack lineHeight={".8"} width={"100%"} alignItems={"flex-start"}>
          <Box marginBottom={"-.5rem"}>
            <Text
              fontSize={"xx-large"}
              lineHeight={"2.3rem"}
              marginLeft={"-1rem"}
              padding={"0 .5rem"}
              display={"inline"}
              color={colors.bgColor}
              bg={colors.color}
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
            borderColor={colors.color}
            borderStyle={"dashed"}
          >
            <Text fontSize={"small"}>{formatReadingTime(article.body)}</Text>
            <Text fontSize={"small"} display={"flex"} alignSelf={"flex-end"}>
              {formattedDate}
            </Text>
          </HStack>
        </VStack>
        <WithLink key={article.slug} link={"/blog/" + article.slug}>
          <HStack
            sx={{
              _hover: {
                textDecoration: "underline",
              },
            }}
          >
            <Text
              fontFamily={bodyFont.style.fontFamily}
              paddingTop={".1rem"}
              paddingLeft={".5rem"}
              noOfLines={[5, 4, 3]}
            >
              {article.description}
            </Text>
            <ArrowRightIcon alignSelf={"flex-end"} />
          </HStack>
        </WithLink>
      </VStack>
    </>
  );
}
