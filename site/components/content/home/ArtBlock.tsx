import {
  Box,
  Container,
  IconButton,
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
import PostCard from "../posts/PostCard";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 3,
  slidesToScroll: 1,
};

export default function ArtBlock({ posts }: { posts: PostDTO[] }) {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
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
            position="absolute"
            left={"2rem"}
            top={["95%", "95%", "50%"]}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
            bg={bg}
          >
            <ArrowLeftIcon color={color} />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            position="absolute"
            right={"2rem"}
            top={["95%", "95%", "50%"]}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
            bg={bg}
          >
            <ArrowRightIcon color={color} />
          </IconButton>
          {/* Slider */}
          <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
            {posts.map((post, index) => (
              <Box key={index} height={"100vh"} position="relative">
                <VStack height={"100%"} justifyContent={"center"}>
                  <Container>
                    <PostCard post={post} />
                  </Container>
                  {/*<PostCard post={post} />*/}
                </VStack>

                {/*<Image*/}
                {/*  src={post.content.url}*/}
                {/*  alt={post.content.alternativeText}*/}
                {/*  loader={imageLoader}*/}
                {/*  fill={true}*/}
                {/*  style={{ objectFit: "cover", transform: "scale(1.5)" }}*/}
                {/*  placeholder={"blur"}*/}
                {/*  blurDataURL={blurHashToDataURL(post.content.blurhash)}*/}
                {/*></Image>*/}
                {/*/!* This is the block you need to change, to customize the caption *!/*/}
                {/*<Container*/}
                {/*  size="container.lg"*/}
                {/*  height="100%"*/}
                {/*  position="relative"*/}
                {/*  display={"flex"}*/}
                {/*>*/}
                {/*  <Stack*/}
                {/*    spacing={6}*/}
                {/*    maxW={"lg"}*/}
                {/*    // position="absolute"*/}
                {/*    // top="50%"*/}
                {/*    // transform="translate(0, -50%)"*/}
                {/*  >*/}
                {/*    <Text*/}
                {/*      fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}*/}
                {/*      fontFamily={headerFont.style.fontFamily}*/}
                {/*      marginLeft={"-1rem"}*/}
                {/*      padding={"0 .5rem"}*/}
                {/*      display={"inline"}*/}
                {/*      color={bg}*/}
                {/*      bg={color}*/}
                {/*    >*/}
                {/*      {post.title}*/}
                {/*    </Text>*/}
                {/*    <Text*/}
                {/*      fontSize={{ base: "md", lg: "lg" }}*/}
                {/*      padding={"0 .5rem"}*/}
                {/*      display={"inline"}*/}
                {/*      color={color}*/}
                {/*      bg={bg}*/}
                {/*    >*/}
                {/*      {post.message}*/}
                {/*    </Text>*/}
                {/*  </Stack>*/}
                {/*</Container>*/}
              </Box>
            ))}
          </Slider>
        </Box>
      </VStack>
    </>
  );
}
