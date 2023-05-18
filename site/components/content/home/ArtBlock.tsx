import { Box, Container, IconButton, VStack } from "@chakra-ui/react";
import { PostDTO } from "../../../services/ContentTypes";
import React from "react";
import { ArrowLeftIcon } from "../../icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
// @ts-ignore
import Slider from "react-slick";
import PostCard from "../posts/PostCard";
import useThemeColors from "../../../styles/useThemeColors";
import WithLink from "../../core/hocs/WithLink";

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
      >
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
            bg={colors.buttonBgColor}
          >
            <ArrowLeftIcon color={colors.color} />
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
            bg={colors.buttonBgColor}
          >
            <ArrowRightIcon color={colors.color} />
          </IconButton>
          {/* Slider */}
          <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
            {posts.map((post, index) => (
              <Box key={index} height={"100vh"} position="relative">
                <VStack height={"100%"} justifyContent={"center"}>
                  <Container>
                    <WithLink link={"posts/" + post.slug}>
                      <PostCard post={post} />
                    </WithLink>
                  </Container>
                </VStack>
              </Box>
            ))}
          </Slider>
        </Box>
      </VStack>
    </>
  );
}
