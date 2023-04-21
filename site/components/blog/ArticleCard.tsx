import { ArticleDTO } from "../../services/ContentTypes";
import CardBase from "../elements/CardBase";
import { VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function ArticleCard({ article }: { article: ArticleDTO }) {
  return (
    <>
      <Link key={article.slug} href={"blog/" + article.slug}>
        <CardBase>
          <VStack>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </VStack>
        </CardBase>
      </Link>
    </>
  );
}
