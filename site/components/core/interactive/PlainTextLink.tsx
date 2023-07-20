import {Box, ResponsiveValue, Text} from "@chakra-ui/react";
import Link from "next/link";
import useThemeColors from "../hooks/useThemeColors";
import {Property} from "csstype";
import TextAlign = Property.TextAlign;

export default function PlainTextLink({
  link,
  description,
  textAlign = "start"
}: {
  link: string;
  description: string;
  textAlign?: ResponsiveValue<TextAlign>;
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
          <Text noOfLines={1} textAlign={textAlign}>{description ? description : link}</Text>
        </Link>
      </Box>
    </>
  );
}
