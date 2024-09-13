import {Box, Container, HStack, Text, VStack} from "@chakra-ui/react";
import {ArticleDTO} from "../../../services/ContentTypes";
import useThemeColors from "../../core/hooks/useThemeColors";
import {headerFont} from "../../../styles/fonts";
import ArrowLink from "../../core/interactive/ArrowLink";
import React from "react";
import SliderWrapper from "../../core/hocs/SliderWrapper";
import ArticleCard from "../blog/ArticleCard";
import Markdown from "../../core/elements/Markdown";

export default function WritingBlock({
                                       description,
                                       articles,
                                     }: {
  description: string;
  articles: ArticleDTO[];
}) {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        minHeight={"110vh"}
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
          <Text
            fontFamily={headerFont.style.fontFamily}
            fontSize={"3rem"}
            bgColor={colors.bgColor}
            color={colors.color}
            padding={"0 1rem"}
            marginLeft={"-1rem"}
            marginBottom={"1rem"}
          >
            ideas.
          </Text>
          <Markdown markdown={description}/>
        </VStack>

        {/* Slider */}
        <SliderWrapper invertedColors={true}>
          {articles.map((article, index) => (
            <Box
              key={article.slug}
              height={"100%"}
              position="relative"
              padding={"1rem"}
            >
              <VStack justifyContent={"center"} height={"100%"}>
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
