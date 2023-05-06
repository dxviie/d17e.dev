import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";

export default function DLink({
  link,
  description,
}: {
  link: string;
  description: string;
}) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  return (
    <>
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
          <Text noOfLines={1}>{description ? description : link}</Text>
        </Link>
      </Box>
    </>
  );
}
