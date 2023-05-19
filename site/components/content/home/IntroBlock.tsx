import { Box, Flex, keyframes, Text, VStack } from "@chakra-ui/react";
import { bodyFont, headerFont } from "../../../styles/fonts";
import D17eLogo from "../../icons/D17eLogo";
import useThemeColors, { ThemeColors } from "../../../styles/useThemeColors";
import WithLink from "../../core/hocs/WithLink";
import { ArrowDownIcon } from "../../icons/ArrowDownIcon";
import { useEffect, useState } from "react";

const DELAY_MILLIS = 700;
const IntroBox = (text: string, colors: ThemeColors, index: number) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, (index - 1) * DELAY_MILLIS);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  return (
    <Box
      opacity={visible ? 1 : 0}
      transition="opacity 0.3s"
      paddingLeft={".3rem"}
      paddingRight={".3rem"}
      marginLeft={"2px"}
      borderBottomWidth={"1px"}
      borderBottomStyle={"dashed"}
      color={colors.color}
      borderBottomColor={colors.color}
      sx={{
        _hover: {
          borderBottomWidth: "1px",
          borderBottomStyle: "dashed",
          borderBottomColor: colors.accentColor,
          color: colors.accentColor,
        },
      }}
    >
      {text}
    </Box>
  );
};

export default function IntroBlock() {
  const colors = useThemeColors();
  const bounce = keyframes`
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px)
    }
  `;
  const bounceAnimation = `${bounce} infinite .5s ease-in-out alternate`;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3 * DELAY_MILLIS);
    return () => {
      clearTimeout(timer);
    };
  }, []);
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
          <Text
            fontSize={["x-large", "xx-large", "xxx-large"]}
            fontFamily={headerFont.style.fontFamily}
            display={"flex"}
          >
            <WithLink link={"#code"}>{IntroBox("code.", colors, 1)}</WithLink>
            <WithLink link={"#art"}>{IntroBox("art.", colors, 2)}</WithLink>
            <WithLink link={"#ideas"}>{IntroBox("ideas.", colors, 3)}</WithLink>
          </Text>
          <Box
            marginTop={"2rem"}
            animation={bounceAnimation}
            opacity={visible ? 1 : 0}
            transition="opacity 0.3s"
          >
            <ArrowDownIcon />
          </Box>
        </Flex>
      </VStack>
    </>
  );
}
