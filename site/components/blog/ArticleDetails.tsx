import { HStack, Text } from "@chakra-ui/react";
import {
  formatPublishedDetails,
  formatReadingTime,
} from "../../services/ContentDetailFormatter";

export default function ArticleDetails({
  createdAt,
  updatedAt,
  publishedAt,
  content,
}: {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: string;
}) {
  return (
    <>
      <HStack>
        <Text fontWeight={"bold"} fontSize={"small"}>
          {formatReadingTime(content)}
        </Text>
        <Text fontStyle={"italic"} fontSize={"small"}>
          {" - "}
          {formatPublishedDetails(createdAt, updatedAt, publishedAt)}
        </Text>
      </HStack>
    </>
  );
}
