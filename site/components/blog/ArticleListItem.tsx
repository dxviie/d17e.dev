import { ArticleDTO } from "../../services/ContentTypes";
import { Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { bodyFont, headerFont } from "../../styles/fonts";

export default function ArticleListItem({ article }: { article: ArticleDTO }) {
  return (
    <>
      {/*  TODO make HOC for the Link wrapper */}
      <Link
        key={article.slug}
        href={"/blog/" + encodeURIComponent(article.slug)}
      >
        <VStack alignItems={"flex-start"}>
          <Text fontFamily={headerFont.style.fontFamily} fontSize={"xx-large"}>
            {article.title}
          </Text>
          <Text fontFamily={bodyFont.style.fontFamily}>
            {article.description}
          </Text>
        </VStack>
      </Link>
    </>
  );
}
