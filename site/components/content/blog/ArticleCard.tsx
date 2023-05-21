import { ArticleDTO } from "../../../services/ContentTypes";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { imageLoader } from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import WithLink from "../../core/hocs/WithLink";
import useThemeColors from "../../../styles/useThemeColors";
import { bodyFont, headerFont } from "../../../styles/fonts";

export default function ArticleCard({ article }: { article: ArticleDTO }) {
  const colors = useThemeColors();
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
          size={"lg"}
          borderRadius={"0"}
          borderWidth={"1px"}
          borderColor={colors.color}
          borderStyle={"none"}
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
          <CardBody
            fontFamily={bodyFont.style.fontFamily}
            bg={colors.buttonColor}
            color={colors.bgColor}
          >
            <Stack spacing="3">
              <Heading size="lg" fontFamily={headerFont.style.fontFamily}>
                {article.title}
                {/*<Text fontSize={"small"}>*/}
                {/*  {formatReadingTime(article.body)}*/}
                {/*</Text>*/}
              </Heading>
              <Text noOfLines={3}>{article.description}</Text>
              {/*<Text fontSize={"small"} display={"flex"} alignSelf={"flex-end"}>*/}
              {/*  {formatDate(article.publishDtm || article.createdAt)}*/}
              {/*</Text>*/}
            </Stack>
          </CardBody>
        </Card>
      </WithLink>
    </>
  );
}
