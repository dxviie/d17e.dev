import React from "react";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon } from "../../icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
import useThemeColors from "../../../styles/useThemeColors";
// @ts-ignore
import Slider from "react-slick";

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

export default function SliderWrapper({
  children,
  invertedColors = false,
}: {
  children?: React.ReactNode;
  invertedColors?: boolean;
}) {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const colors = useThemeColors();
  return (
    <>
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
          {children}
        </Slider>
      </Box>
      <HStack paddingTop={"1rem"}>
        <IconButton
          aria-label="left-arrow"
          onClick={() => slider?.slickPrev()}
          bg={invertedColors ? colors.buttonColor : colors.buttonBgColor}
        >
          <ArrowLeftIcon
            color={invertedColors ? colors.bgColor : colors.color}
          />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          onClick={() => slider?.slickNext()}
          bg={invertedColors ? colors.buttonColor : colors.buttonBgColor}
        >
          <ArrowRightIcon
            color={invertedColors ? colors.bgColor : colors.color}
          />
        </IconButton>
      </HStack>
    </>
  );
}
