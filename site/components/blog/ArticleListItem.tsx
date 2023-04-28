import { ArticleDTO } from "../../services/ContentTypes";
import { Text, VStack } from "@chakra-ui/react";
import { Poppins } from "@next/font/google";

const poppinsBold = Poppins({
  weight: "600",
  variable: "--f-poppins-bold",
  subsets: ["latin"],
});
export default function ArticleListItem({ article }: { article: ArticleDTO }) {
  return (
    <>
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"xx-large"} fontFamily={"var(--f-poppins-bold)"}>
          {article.title}
        </Text>
        <Text>{article.description}</Text>
      </VStack>
    </>
  );
}
