import {PostDTO} from "../../../services/ContentTypes";
import {Box, Text, VStack} from "@chakra-ui/react";
import {headerFont} from "../../../styles/fonts";
import useThemeColors from "../../core/hooks/useThemeColors";
import {useFormattedDate} from "../../../services/useFormattedDate";

export default function PostHeader({post}: { post: PostDTO }) {
  const colors = useThemeColors();
  const formattedDate = useFormattedDate(post.createdAt);
  return (
    <>
      <VStack
        lineHeight={".7"}
        alignItems={"flex-start"}
        fontFamily={headerFont.style.fontFamily}
      >
        <Box paddingTop={"1rem"}>
          <Text
            fontFamily={headerFont.style.fontFamily}
            fontSize={["large", "x-large"]}
            lineHeight={["1.5rem", "1.9rem"]}
            marginLeft={"-1rem"}
            padding={"2px .5rem"}
            display={"inline"}
            color={colors.bgColor}
            bg={colors.color}
          >
            {post.title}
          </Text>
        </Box>
        <Text
          fontSize={"small"}
          display={"flex"}
          alignSelf={"flex-start"}
          noOfLines={1}
          overflow={"visible"}
        >
          {formattedDate}
        </Text>
      </VStack>
    </>
  );
}
