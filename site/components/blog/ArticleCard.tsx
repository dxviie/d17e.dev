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
import { formatReadingTime } from "../../services/ContentDetailFormatter";
import { formatDate } from "../../services/DateTimeFormatter";

export default function ArticleCard({ article }: { article: ArticleDTO }) {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Link
        key={article.slug}
        href={"/blog/" + encodeURIComponent(article.slug)}
      >
        <Card
          maxW="sm"
          cursor={"pointer"}
          variant={"elevated"}
          bg={bgColor}
          className={"floating-card"}
          sx={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.2s ease-in-out",
            _hover: {
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          <CardHeader position={"relative"}>
            <Image
              src={article.cover.url}
              alt={article.cover.alternativeText}
              loader={imageLoader}
              layout={"fill"}
              objectFit={"cover"}
              placeholder={"blur"}
              blurDataURL={blurHashToDataURL(article.cover.blurhash)}
            ></Image>
          </CardHeader>
          <CardBody>
            <Stack spacing="3">
              <Heading size="md">
                {article.title}
                <Text fontSize={"x-small"}>
                  {formatReadingTime(article.body)}
                </Text>
              </Heading>
              <Text noOfLines={3}>{article.description}</Text>
              <Text fontSize={"small"} display={"flex"} alignSelf={"flex-end"}>
                {formatDate(article.publishDtm || article.createdAt)}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    </>
  );
}
