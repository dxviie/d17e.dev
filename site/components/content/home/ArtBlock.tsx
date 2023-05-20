import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { PostDTO } from "../../../services/ContentTypes";
import React from "react";
import PostCard from "../posts/PostCard";
import useThemeColors from "../../../styles/useThemeColors";
import { headerFont } from "../../../styles/fonts";
import ArrowLink from "../../core/interactive/ArrowLink";
import SliderWrapper from "../../core/hocs/SliderWrapper";

export default function ArtBlock({ posts }: { posts: PostDTO[] }) {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        bg={colors.bgColor}
        color={colors.color}
        scrollSnapAlign={"start"}
        id={"art"}
      >
        <VStack
          width={"80vw"}
          maxWidth={"40rem"}
          fontSize={"large"}
          alignItems={"flex-start"}
        >
          <Text
            fontFamily={headerFont.style.fontFamily}
            fontSize={"3rem"}
            bgColor={colors.color}
            color={colors.bgColor}
            padding={"0 1rem"}
            marginLeft={"-1rem"}
            marginBottom={"1rem"}
          >
            art.
          </Text>
          <Text paddingBottom={"1rem"}>
            I post about my pursuits as a generative artist.
          </Text>
        </VStack>

        {/* Slider */}
        <SliderWrapper>
          {posts.map((post, index) => (
            <Box key={index} height={"50vh"} position="relative">
              <VStack justifyContent={"center"} height={"100%"}>
                <Container>
                  {/*<WithLink link={"posts/" + post.slug}>*/}
                  <PostCard post={post} />
                  {/*</WithLink>*/}
                </Container>
              </VStack>
            </Box>
          ))}
        </SliderWrapper>

        <HStack paddingTop={"2rem"}>
          <ArrowLink
            link={"/posts"}
            description={"View all posts"}
            arrow={"right"}
          ></ArrowLink>
        </HStack>
      </VStack>
    </>
  );
}
