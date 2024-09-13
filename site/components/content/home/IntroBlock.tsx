import {Box, Flex, keyframes, VStack} from "@chakra-ui/react";
import {bodyFont, headerFont} from "../../../styles/fonts";
import D17eLogo from "../../icons/D17eLogo";
import useThemeColors, {ThemeColors} from "../../core/hooks/useThemeColors";
import {useEffect, useState} from "react";
import {ArrowDownIcon} from "../../icons/ArrowDownIcon";
import WithLink from "../../core/hocs/WithLink";
import useIsPhone from "../../core/hooks/useIsPhone";

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
  const isPhone = useIsPhone();
  return (
    <>
      <VStack height={"calc(100vh - 3.5rem)"} justifyContent={"center"} paddingTop={"7rem"}
              paddingBottom={"4rem"}>
        <Flex
          width={"80vw"}
          maxWidth={["20rem", "25rem", "35rem"]}
          direction={"column"}
          align={"center"}
          fontFamily={bodyFont.style.fontFamily}
        >
          <D17eLogo/>
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
            <ArrowDownIcon/>
          </Box>
          <Box height={"7rem"}/>
        </Flex>
      </VStack>
    </>
  );
}

const IntroBox = (
  text: string,
  colors: ThemeColors,
  index: number,
  isPhone: boolean,
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
      className={"push-button"}
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
