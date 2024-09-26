import {Box, Container, HStack, Text, VStack} from "@chakra-ui/react";
import {PostDTO} from "../../../services/ContentTypes";
import React from "react";
import useThemeColors from "../../core/hooks/useThemeColors";
import {headerFont} from "../../../styles/fonts";
import ArrowLink from "../../core/interactive/ArrowLink";
import SliderWrapper from "../../core/hocs/SliderWrapper";
import PostCard from "../posts/PostCard";
import WithLink from "../../core/hocs/WithLink";
import Markdown from "../../core/elements/Markdown";
import PostsIcon from "../../icons/PostsIcon";
import {motion} from "framer-motion";

export default function ArtBlock({
                                   description,
                                   posts,
                                 }: {
  description: string;
  posts: PostDTO[];
}) {
  const colors = useThemeColors();
  const MotionBox = motion(Box);
  return (
    <>
      <VStack
        paddingTop={"4rem"}
        paddingBottom={"4rem"}
        minHeight={"110svh"}
        width={"100%"}
        justifyContent={"center"}
        bg={colors.bgColor}
        color={colors.color}
        id={"art"}
      >
        <VStack
          width={"80vw"}
          maxWidth={"40rem"}
          fontSize={"large"}
          alignItems={"flex-start"}
        >
          <HStack marginLeft={"-1rem"} marginBottom={"1rem"} width={"75%"} justifyContent={"center"} position={"relative"}>
            <MotionBox
              position={"absolute"}
              left={["-2.5rem", "3%", "15%"]}
              top={"-1.5rem"}
              animate={{
                rotate: [0, 15, -15, 10, -10, 5, -5, 0],
              }}
              transition={{
                duration: 15,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }} width={"7rem"} aspectRatio={"1"} transform={"rotateX(12)"}>
              <PostsIcon color={colors.color}/>
            </MotionBox>
            <Text
              fontFamily={headerFont.style.fontFamily}
              fontSize={"3rem"}
              bgColor={colors.color}
              color={colors.bgColor}
              padding={"0 1rem"}
              marginLeft={"4rem"}
            >
              Posts
            </Text>
          </HStack>


          <Markdown markdown={description}/>
        </VStack>

        <Box width={["75vw", "100%"]}>
          {/* Slider */}
          <SliderWrapper>
            {posts.map((post, index) => (
              <Box key={post.slug} position="relative">
                <VStack
                  justifyContent={"center"}
                  padding={["0rem", "1rem"]}
                >
                  <Container>
                    <WithLink link={"posts/" + post.slug}>
                      <PostCard post={post}/>
                    </WithLink>
                  </Container>
                </VStack>
              </Box>
            ))}
          </SliderWrapper>
        </Box>

        <HStack paddingTop={"2rem"} paddingBottom={"3rem"}>
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
