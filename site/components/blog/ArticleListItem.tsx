import { ArticleDTO } from "../../services/ContentTypes";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { bodyFont, headerFont } from "../../styles/fonts";
import WithLink from "../core/hocs/WithLink";
import { formatReadingTime } from "../../services/ContentDetailFormatter";
import { formatDate } from "../../services/DateTimeFormatter";

export default function ArticleListItem({ article }: { article: ArticleDTO }) {
  return (
    <>
      <WithLink key={article.slug} link={"/blog/" + article.slug}>
        <VStack
          alignItems={"flex-start"}
          fontFamily={headerFont.style.fontFamily}
        >
          <VStack alignItems={"flex-start"} lineHeight={".8"} width={"100%"}>
            <Text fontSize={"xx-large"} fontWeight={"bold"}>
              {article.title}
            </Text>
            <HStack
              padding={".5rem"}
              width={"100%"}
              justifyContent={"space-between"}
              bgColor={"black"}
              color={"white"}
            >
              <Text fontSize={"small"}>{formatReadingTime(article.body)}</Text>
              {/*<Text>{" - "}</Text>*/}
              <Text
                fontSize={"small"}
                display={"flex"}
                alignSelf={"flex-end"}
                // fontWeight={"bold"}
              >
                {formatDate(article.publishDtm || article.createdAt)}
              </Text>
            </HStack>
          </VStack>
          <Text fontFamily={bodyFont.style.fontFamily} marginTop={"2rem"}>
            {article.description}
          </Text>
        </VStack>
      </WithLink>
    </>
  );
}
