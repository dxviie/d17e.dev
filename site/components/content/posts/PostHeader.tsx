import { PostDTO } from "../../../services/ContentTypes";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { headerFont } from "../../../styles/fonts";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";

export default function PostHeader({ post }: { post: PostDTO }) {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  return (
    <>
      <Box paddingTop={"1rem"}>
        <Text
          fontFamily={headerFont.style.fontFamily}
          fontSize={["large", "x-large"]}
          lineHeight={["1rem", "1.9rem"]}
          marginTop={"3rem"}
          marginLeft={"-1rem"}
          padding={"2px .5rem"}
          display={"inline"}
          color={bg}
          bg={color}
        >
          {post.title}
        </Text>
      </Box>
    </>
  );
}
