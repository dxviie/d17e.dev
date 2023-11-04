import {Box, Text} from "@chakra-ui/react";
import Link from "next/link";
import useThemeColors from "../hooks/useThemeColors";

export default function PlainTextLink({
                                        link,
                                        description,
                                        textAlign = "start",
                                      }: {
  link: string;
  description: string;
  textAlign?: string;
}) {
  const colors = useThemeColors();
  return (
    <>
      <Box
        borderBottomWidth={"1px"}
        borderStyle={"dashed"}
        borderColor={colors.bgColor}
        className={"push-button"}
        sx={{
          _hover: {
            borderBottomWidth: "1px",
            borderStyle: "dashed",
            borderColor: colors.color,
          },
        }}
      >
        <Link href={link}>
          {/*@ts-ignore*/}
          <Text noOfLines={1} textAlign={textAlign}>
            {description ? description : link}
          </Text>
        </Link>
      </Box>
    </>
  );
}
