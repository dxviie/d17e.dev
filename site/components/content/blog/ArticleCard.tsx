import {ArticleDTO} from "../../../services/ContentTypes";
import {Card, CardBody, CardHeader, Heading, Stack, Text,} from "@chakra-ui/react";
import WithLink from "../../core/hocs/WithLink";
import useThemeColors from "../../core/hooks/useThemeColors";
import {bodyFont, headerFont} from "../../../styles/fonts";
import {formatReadingTime} from "../../../services/ContentDetailFormatter";
import {useFormattedDate} from "../../../services/useFormattedDate";
import {imageLoader} from "../../../services/ContentApi";

export default function ArticleCard({article}: { article: ArticleDTO }) {
  const colors = useThemeColors();
  const formattedDate = useFormattedDate(article.createdAt);
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
          className={"push-button"}
          size={"lg"}
          borderRadius={"0"}
          borderWidth={"1px"}
          borderColor={colors.color}
          borderStyle={"none"}
          style={{
            backgroundImage: `url(${imageLoader({src: article.cover.url, width: 300, quality: 75})})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          sx={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.2s ease-in-out",
            _hover: {
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          <CardHeader position={"relative"} height={"4rem"}>
          </CardHeader>
          <CardBody
            fontFamily={bodyFont.style.fontFamily}
          >
            <Stack spacing={"3"}>
              <Heading
                size={["sm", "lg"]}
                fontFamily={headerFont.style.fontFamily}
                padding={[".2rem", ".5rem"]}
                bg={colors.bgColor}
              >
                {article.title}
              </Heading>
              <Text noOfLines={3} bg={colors.bgColor} padding={".3rem"}>{article.description}</Text>
              <Text fontSize={"small"} display={"flex"} alignSelf={"flex-end"} bg={colors.bgColor} padding={".2rem"}>
                {formatReadingTime(article.body)} - {formattedDate}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </WithLink>
    </>
  );
}
