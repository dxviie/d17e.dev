import { ArticleDTO } from "../../services/ContentTypes";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { imageLoader } from "../../services/ContentApi";
import blurHashToDataURL from "../../services/BlurHashTransformer";

export default function ArticleCard({ article }: { article: ArticleDTO }) {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Link key={article.slug} href={"/blog/" + article.slug}>
        <Card
          maxW="sm"
          cursor={"pointer"}
          variant={"elevated"}
          bg={bgColor}
          className={"floating-card"}
          sx={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.2s ease-in-out",
            _hover: {
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <CardHeader position={"relative"}>
            {/*<Box position={"relative"} width={"100%"} height={"3rem"}>*/}
            <Image
              src={article.cover.url}
              alt={article.cover.alternativeText}
              loader={imageLoader}
              layout={"fill"}
              objectFit={"cover"}
              placeholder={"blur"}
              blurDataURL={blurHashToDataURL(article.cover.blurhash)}
            ></Image>
            {/*</Box>*/}
          </CardHeader>
          <CardBody>
            <Stack spacing="3">
              <Heading size="md">{article.title}</Heading>
              <Text>{article.description}</Text>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    </>
  );
}
