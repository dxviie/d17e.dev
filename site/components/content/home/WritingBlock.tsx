import {Box, Container, HStack, Text, VStack} from "@chakra-ui/react";
import {ArticleDTO} from "../../../services/ContentTypes";
import useThemeColors from "../../core/hooks/useThemeColors";
import {headerFont} from "../../../styles/fonts";
import ArrowLink from "../../core/interactive/ArrowLink";
import React from "react";
import SliderWrapper from "../../core/hocs/SliderWrapper";
import ArticleCard from "../blog/ArticleCard";
import Markdown from "../../core/elements/Markdown";
import {motion} from "framer-motion";
import BlogIcon from "../../icons/BlogIcon";

export default function WritingBlock({
                                       description,
                                       articles,
                                     }: {
  description: string;
  articles: ArticleDTO[];
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
        color={colors.bgColor}
        bgColor={colors.color}
        id={"ideas"}
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
              <BlogIcon color={colors.bgColor}/>
            </MotionBox>
            <Text
              fontFamily={headerFont.style.fontFamily}
              fontSize={"3rem"}
              bgColor={colors.bgColor}
              color={colors.color}
              padding={"0 1rem"}
              marginLeft={"4rem"}
            >
              Blog
            </Text>
          </HStack>
          <Markdown markdown={description}/>
        </VStack>

        {/* Slider */}
        <SliderWrapper invertedColors={true}>
          {articles.map((article, index) => (
            <Box
              key={article.slug}
              position="relative"
              padding={"1rem"}
            >
              <VStack justifyContent={"center"}>
                <Container>
                  <ArticleCard article={article}/>
                </Container>
              </VStack>
            </Box>
          ))}
        </SliderWrapper>

        <HStack paddingTop={"2rem"} paddingBottom={"3rem"}>
          <ArrowLink
            link={"/blog"}
            description={"View all articles"}
            arrow={"right"}
            invertColors={true}
          ></ArrowLink>
        </HStack>
      </VStack>
    </>
  );
}
