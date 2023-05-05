import { ArticleDTO } from "../../services/ContentTypes";
import { HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { bodyFont, headerFont } from "../../styles/fonts";
import WithLink from "../core/hocs/WithLink";
import { formatReadingTime } from "../../services/ContentDetailFormatter";
import { formatDate } from "../../services/DateTimeFormatter";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../styles/d17eTheme";
import { ArrowIcon } from "../icons/ArrowIcon";

export default function ArticleListItem({ article }: { article: ArticleDTO }) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  return (
    <>
      <VStack
        alignItems={"flex-start"}
        fontFamily={headerFont.style.fontFamily}
      >
        <VStack alignItems={"flex-start"} lineHeight={".8"} width={"100%"}>
          <Text
            fontSize={"xx-large"}
            fontWeight={"bold"}
            padding={".5rem"}
            borderWidth={".2rem"}
            borderColor={color}
            borderStyle={"solid"}
            marginLeft={"-1rem"}
            marginBottom={"-.5rem"}
          >
            {article.title}
          </Text>
          <HStack
            padding={".5rem"}
            width={"100%"}
            justifyContent={"space-between"}
            borderWidth={".1rem"}
            borderTop={"0"}
            borderRight={"0"}
            borderLeft={".1rem"}
            borderBottom={".1rem"}
            borderColor={color}
            borderStyle={"dashed"}
          >
            <Text fontSize={"small"}>{formatReadingTime(article.body)}</Text>
            <Text fontSize={"small"} display={"flex"} alignSelf={"flex-end"}>
              {formatDate(article.publishDtm || article.createdAt)}
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
              noOfLines={3}
            >
              {article.description}
            </Text>
            <ArrowIcon alignSelf={"flex-end"} />
          </HStack>
        </WithLink>
      </VStack>
    </>
  );
}
