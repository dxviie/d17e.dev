import {
  Box,
  Container,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";
import { PostDTO } from "../../../services/ContentTypes";
import React from "react";
// import { Slider } from "@chakra-ui/theme/dist/components";
import { ArrowLeftIcon } from "../../icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
// @ts-ignore
import Slider from "react-slick";
import { headerFont } from "../../../styles/fonts";
import { imageLoader } from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import Image from "next/image";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ArtBlock({ posts }: { posts: PostDTO[] }) {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        bg={color}
        color={bg}
        scrollSnapAlign={"start"}
      >
        {/*<Text>I&apos;m an art</Text>*/}
        <Box
          position={"relative"}
          height={"100%"}
          width={"100%"}
          overflow={"hidden"}
        >
          {/* CSS files for react-slick */}
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href={
              "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            }
          />
          <IconButton
            aria-label="left-arrow"
            variant="ghost"
            position="absolute"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <ArrowLeftIcon />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            variant="ghost"
            position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <ArrowRightIcon />
          </IconButton>
          {/* Slider */}
          <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
            {posts.map((post, index) => (
              <Box key={index} height={"6xl"} position="relative">
                <Image
                  src={post.content.url}
                  alt={post.content.alternativeText}
                  loader={imageLoader}
                  fill={true}
                  style={{ objectFit: "cover", transform: "scale(1.5)" }}
                  placeholder={"blur"}
                  blurDataURL={blurHashToDataURL(post.content.blurhash)}
                ></Image>
                {/* This is the block you need to change, to customize the caption */}
                <Container
                  size="container.lg"
                  height="100%"
                  position="relative"
                >
                  <Stack
                    spacing={6}
                    maxW={"lg"}
                    position="absolute"
                    top="50%"
                    transform="translate(0, -50%)"
                  >
                    <Text
                      fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                      fontFamily={headerFont.style.fontFamily}
                      marginLeft={"-1rem"}
                      padding={"0 .5rem"}
                      display={"inline"}
                      color={bg}
                      bg={color}
                    >
                      {post.title}
                    </Text>
                    <Text
                      fontSize={{ base: "md", lg: "lg" }}
                      padding={"0 .5rem"}
                      display={"inline"}
                      color={color}
                      bg={bg}
                    >
                      {post.message}
                    </Text>
                  </Stack>
                </Container>
              </Box>
            ))}
          </Slider>
        </Box>
      </VStack>
    </>
  );
}
