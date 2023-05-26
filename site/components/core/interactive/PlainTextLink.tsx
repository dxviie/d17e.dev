import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import useThemeColors from "../hooks/useThemeColors";

export default function PlainTextLink({
  link,
  description,
}: {
  link: string;
  description: string;
}) {
  const colors = useThemeColors();
  return (
    <>
      <Box
        borderBottomWidth={"1px"}
        borderStyle={"dashed"}
        borderColor={colors.bgColor}
        sx={{
          _hover: {
            borderBottomWidth: "1px",
            borderStyle: "dashed",
            borderColor: colors.color,
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
