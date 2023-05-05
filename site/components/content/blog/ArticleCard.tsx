import { ArticleDTO } from "../../../services/ContentTypes";
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
import { imageLoader } from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import { formatReadingTime } from "../../../services/ContentDetailFormatter";
import { formatDate } from "../../../services/DateTimeFormatter";
import WithLink from "../../core/hocs/WithLink";
import { bodyFont, headerFont } from "../../../styles/fonts";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";

export default function ArticleCard({ article }: { article: ArticleDTO }) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  return (
    <>
      <WithLink
        key={article.slug}
        link={"/blog/" + encodeURIComponent(article.slug)}
      >
        <Card
          maxW="max"
          cursor={"pointer"}
          variant={"elevated"}
          className={"floating-card"}
          borderRadius={"0"}
          borderWidth={".1rem"}
          borderColor={color}
          borderStyle={"dashed"}
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
              fill={true}
              style={{ objectFit: "cover" }}
              placeholder={"blur"}
              blurDataURL={blurHashToDataURL(article.cover.blurhash)}
            ></Image>
          </CardHeader>
          <CardBody fontFamily={bodyFont.style.fontFamily}>
            <Stack spacing="3">
              <Heading size="lg" fontFamily={headerFont.style.fontFamily}>
                {article.title}
                <Text fontSize={"small"}>
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
      </WithLink>
    </>
  );
}
