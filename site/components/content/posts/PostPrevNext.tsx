import { PostDTO } from "../../../services/ContentTypes";
import ArrowLink from "../../core/interactive/ArrowLink";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import PlainTextLink from "../../core/interactive/PlainTextLink";
import { useEffect, useState } from "react";

export default function PostPrevNext({
  prevPost,
  nextPost,
}: {
  prevPost?: PostDTO;
  nextPost?: PostDTO;
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
              {nextPost ? (
                <VStack alignItems={"flex-end"}>
                  <ArrowLink
                    link={nextPost.slug}
                    description={"next"}
                    arrow={"left"}
                  />
                  <PlainTextLink
                    link={nextPost.slug}
                    description={nextPost.title}
                  />
                </VStack>
              ) : (
                <></>
              )}
            </Box>
            <Text>
              {nextPost && prevPost ? (
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
              {prevPost ? (
                <VStack alignItems={"flex-start"}>
                  <ArrowLink
                    link={prevPost.slug}
                    description={"prior"}
                    arrow={"right"}
                  />
                  <PlainTextLink
                    link={prevPost.slug}
                    description={prevPost.title}
                  />
                </VStack>
              ) : (
                <></>
              )}
            </Box>{" "}
          </>
        ) : (
          <></>
        )}
      </HStack>
    </>
  );
}
