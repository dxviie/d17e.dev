import { ArticleDTO } from "../../../services/ContentTypes";
import ArrowLink from "../../core/interactive/ArrowLink";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import PlainTextLink from "../../core/interactive/PlainTextLink";
import { useEffect, useState } from "react";

export default function ArticlePrevNext({
  prevArticle,
  nextArticle,
}: {
  prevArticle?: ArticleDTO;
  nextArticle?: ArticleDTO;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <>
      <HStack width={"100%"} justifyContent={"center"} padding={"3rem 0"}>
        {hydrated ? (
          <>
            <Box width={"50%"}>
              {nextArticle ? (
                <VStack alignItems={"flex-end"}>
                  <ArrowLink
                    link={nextArticle.slug}
                    description={"next"}
                    arrow={"left"}
                  />
                  <PlainTextLink
                    link={nextArticle.slug}
                    description={nextArticle.title}
                  />
                </VStack>
              ) : (
                <></>
              )}
            </Box>
            <Text>
              {nextArticle && prevArticle ? (
                <Box
                  width={"1px"}
                  height={"3rem"}
                  margin={"0 .5rem"}
                  borderColor={"black"}
                  borderLeftWidth={"1px"}
                  borderStyle={"solid"}
                />
              ) : (
                <></>
              )}
            </Text>
            <Box width={"50%"}>
              {prevArticle ? (
                <VStack alignItems={"flex-start"}>
                  <ArrowLink
                    link={prevArticle.slug}
                    description={"prior"}
                    arrow={"right"}
                  />
                  <PlainTextLink
                    link={prevArticle.slug}
                    description={prevArticle.title}
                  />
                </VStack>
              ) : (
                <></>
              )}
            </Box>
          </>
        ) : (
          <></>
        )}
      </HStack>
    </>
  );
}
