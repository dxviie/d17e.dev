import { Box, Flex, keyframes, useMediaQuery, VStack } from "@chakra-ui/react";
import { bodyFont, headerFont } from "../../../styles/fonts";
import D17eLogo from "../../icons/D17eLogo";
import useThemeColors, { ThemeColors } from "../../../styles/useThemeColors";
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "../../icons/ArrowDownIcon";
import WithLink from "../../core/hocs/WithLink";

const DELAY_MILLIS = 700;

export default function IntroBlock() {
  const colors = useThemeColors();
  const bounce = keyframes`
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(15px)
    }
  `;
  const bounceAnimation = `${bounce} infinite .8s ease-in-out alternate`;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 4 * DELAY_MILLIS);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const [isPhone] = useMediaQuery("(max-width: 480px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  return (
    <>
      <VStack
        height={"100vh"}
        justifyContent={"center"}
        scrollSnapAlign={"start"}
      >
        <Flex
          width={"80vw"}
          maxWidth={["20rem", "25rem", "35rem"]}
          direction={"column"}
          align={"center"}
          fontFamily={bodyFont.style.fontFamily}
        >
          <D17eLogo />
          <Box
            fontSize={["xx-large", "xx-large", "xxx-large"]}
            fontFamily={headerFont.style.fontFamily}
            display={"flex"}
          >
            {isPhone ? (
              <>
                {IntroBox("code.", colors, 1, isPhone)}
                {IntroBox("art.", colors, 2, isPhone)}
                {IntroBox("ideas.", colors, 3, isPhone)}
              </>
            ) : (
              <>
                <WithLink link={"#code"}>
                  {IntroBox("code.", colors, 1, isPhone)}
                </WithLink>
                <WithLink link={"#art"}>
                  {IntroBox("art.", colors, 2, isPhone)}
                </WithLink>
                <WithLink link={"#ideas"}>
                  {IntroBox("ideas.", colors, 3, isPhone)}
                </WithLink>
              </>
            )}
          </Box>
          <Box
            marginTop={"2rem"}
            animation={bounceAnimation}
            opacity={visible ? 1 : 0}
            transition="opacity 0.8s"
          >
            <ArrowDownIcon />
          </Box>
        </Flex>
      </VStack>
    </>
  );
}

const IntroBox = (
  text: string,
  colors: ThemeColors,
  index: number,
  isPhone: boolean
) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * DELAY_MILLIS);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  return (
    <Box
      opacity={visible ? 1 : 0}
      transition="opacity 0.5s"
      paddingLeft={".3rem"}
      paddingRight={".3rem"}
      marginLeft={"2px"}
      borderBottomWidth={"1px"}
      borderBottomStyle={"dashed"}
      color={colors.color}
      borderBottomColor={colors.color}
      sx={
        isPhone
          ? {}
          : {
              _hover: {
                borderBottomWidth: "1px",
                borderBottomStyle: "dashed",
                borderBottomColor: colors.accentColor,
                color: colors.accentColor,
              },
            }
      }
    >
      {text}
    </Box>
  );
};
