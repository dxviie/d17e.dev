import {
  Box,
  Container,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PostDTO } from "../../../services/ContentTypes";
import React from "react";
import { ArrowLeftIcon } from "../../icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
// @ts-ignore
import Slider from "react-slick";
import PostCard from "../posts/PostCard";
import useThemeColors from "../../../styles/useThemeColors";
import { headerFont } from "../../../styles/fonts";
import ArrowLink from "../../core/interactive/ArrowLink";

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnDotsHover: true,
};

export default function ArtBlock({ posts }: { posts: PostDTO[] }) {
  const [slider, setSlider] = React.useState<Slider | null>(null);
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
        </VStack>
        <Box position={"relative"} width={"100%"} overflow={"hidden"}>
          {/* CSS files for react-slick */}
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href={
              "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            }
          />
          {/* Slider */}
          <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
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
          </Slider>
        </Box>
        <HStack paddingTop={"1rem"}>
          <IconButton
            aria-label="left-arrow"
            onClick={() => slider?.slickPrev()}
            bg={colors.buttonBgColor}
          >
            <ArrowLeftIcon color={colors.color} />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            onClick={() => slider?.slickNext()}
            bg={colors.buttonBgColor}
          >
            <ArrowRightIcon color={colors.color} />
          </IconButton>
        </HStack>
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
