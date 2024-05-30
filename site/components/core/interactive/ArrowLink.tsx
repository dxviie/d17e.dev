import {Box, HStack} from "@chakra-ui/react";
import Link from "next/link";
import {headerFont} from "../../../styles/fonts";
import {ArrowLeftIcon} from "../../icons/ArrowLeftIcon";
import useThemeColors from "../hooks/useThemeColors";
import {ArrowRightIcon} from "../../icons/ArrowRightIcon";

export default function ArrowLink({
                                    link,
                                    description,
                                    arrow,
                                    invertColors = false,
                                    arrowOnly = false
                                  }: {
  link: string;
  description?: string;
  arrow: "right" | "left";
  invertColors?: boolean;
  arrowOnly?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <>
      <HStack
        fontFamily={headerFont.style.fontFamily}
        className={"push-button"}
      >
        {arrow && arrow === "left" ?
          <Link href={link}>{arrowOnly ? <ArrowLeftIcon height={"20rem"} width={"1.5rem"}/> : <ArrowLeftIcon/>}</Link> : <></>}
        {arrowOnly ?
          <></>
          :
          <Box
            borderBottomWidth={"1px"}
            borderStyle={"dashed"}
            borderColor={invertColors ? colors.color : colors.bgColor}
            sx={{
              _hover: {
                borderBottomWidth: "1px",
                borderStyle: "dashed",
                borderColor: invertColors ? colors.bgColor : colors.color,
              },
            }}
          >
            <Link href={link}>{description ? description : link}</Link>
          </Box>}
        {arrow && arrow === "right" ?
          <Link href={link}>{arrowOnly ? <ArrowRightIcon height={"20rem"} width={"1.5rem"}/> : <ArrowRightIcon/>}</Link> : <></>}
      </HStack>
    </>
  );
}
