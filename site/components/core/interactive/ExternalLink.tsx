import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { headerFont } from "../../../styles/fonts";
import { ArrowIcon } from "../../icons/ArrowIcon";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";

export default function ExternalLink({
  link,
  description,
}: {
  link: string;
  description?: string;
}) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  return (
    <>
      <HStack fontFamily={headerFont.style.fontFamily}>
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
          <Link href={link}>
            {description ? "Link to " + description : link}
          </Link>
        </Box>
        <ArrowIcon />
      </HStack>
    </>
  );
}
