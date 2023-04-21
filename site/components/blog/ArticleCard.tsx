import { ArticleDTO } from "../../services/ContentTypes";
import Image from "next/image";
import { Box, Card, CardBody, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { imageLoader } from "../../services/ContentApi";
import blurHashToDataURL from "../../services/BlurHashTransformer";

export default function ArticleCard({ article }: { article: ArticleDTO }) {
  return (
    <>
      <Link key={article.slug} href={"/blog/" + article.slug}>
        <Card maxW="sm" cursor={"pointer"}>
          <CardBody>
            <Box position={"relative"} width={"100%"} height={"3rem"}>
              <Image
                src={article.cover.url}
                alt={article.cover.alternativeText}
                loader={imageLoader}
                layout={"fill"}
                objectFit={"cover"}
                placeholder={"blur"}
                blurDataURL={blurHashToDataURL(article.cover.blurhash)}
              ></Image>
            </Box>
            <Stack mt="6" spacing="3">
              <Heading size="md">{article.title}</Heading>
              <Text>{article.description}</Text>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    </>
  );
}
