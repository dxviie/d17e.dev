import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { headerFont } from "../../../styles/fonts";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";
import { ArrowLeftIcon } from "../../icons/ArrowLeftIcon";

export default function ArrowLink({
  link,
  description,
  arrow,
}: {
  link: string;
  description?: string;
  arrow: "right" | "left";
}) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  return (
    <>
      <HStack fontFamily={headerFont.style.fontFamily}>
        {arrow && arrow === "left" ? <ArrowLeftIcon /> : <></>}
        <Box
          borderBottomWidth={"1px"}
          borderStyle={"dashed"}
          borderColor={bg}
          sx={{
            _hover: {
              borderBottomWidth: "1px",
              borderStyle: "dashed",
              borderColor: color,
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