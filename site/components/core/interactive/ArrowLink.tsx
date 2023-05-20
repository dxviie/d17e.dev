import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { headerFont } from "../../../styles/fonts";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
import { ArrowLeftIcon } from "../../icons/ArrowLeftIcon";
import useThemeColors from "../../../styles/useThemeColors";

export default function ArrowLink({
  link,
  description,
  arrow,
  invertColors = false,
}: {
  link: string;
  description?: string;
  arrow: "right" | "left";
  invertColors?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <>
      <HStack fontFamily={headerFont.style.fontFamily}>
        {arrow && arrow === "left" ? <ArrowLeftIcon /> : <></>}
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
        </Box>
        {arrow && arrow === "right" ? <ArrowRightIcon /> : <></>}
      </HStack>
    </>
  );
}
