import {PostDTO} from "../../../services/ContentTypes";
import {Box, Card, HStack, Text, VStack} from "@chakra-ui/react";
import {imageLoader} from "../../../services/ContentApi";
import Image from "next/image";
import {headerFont} from "../../../styles/fonts";
import useThemeColors from "../../core/hooks/useThemeColors";

export default function PostCard({post}: { post: PostDTO }) {
  const colors = useThemeColors();
  let media;
  if (post.content && post.content.url && post.content.url.endsWith(".mp4")) {
    media =
      <video
        autoPlay={false}
        muted={true}
        loop={true}
        playsInline={true}
        style={{objectFit: "cover", position: "absolute"}}
      >
        <source src={post.content.url + "#t=0.1"} type={"video/mp4"}/>
      </video>;
  } else {
    media = <Image
      src={post.content.url}
      alt={post.content.alternativeText}
      loader={imageLoader}
      fill={true}
      sizes={"33vw"}
      style={{objectFit: "cover", transform: "scale(1.5)"}}
      blurDataURL={post.content.blurhash}
    ></Image>;
  }
  return (
    <>
      <Card
        size={"lg"}
        style={{
          aspectRatio: "1/1",
          backgroundColor: colors.buttonBgColor,
        }}
        className={"push-button"}
        overflow={"hidden"}
        position={"relative"}
        borderRadius={"0"}
        sx={{
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
          transition: "box-shadow 0.2s ease-in-out",
          _hover: {
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
          },
        }}
        justifyContent={"flex-end"}
      >
        {media}
        <VStack
          alignItems={"flex-start"}
          justifyContent={"flex-end"}
        >
          <HStack>
            <Box
              zIndex={"1"}
              flexShrink={"1"}
              maxWidth={"100%"}
              margin={"1rem"}
              lineHeight={["1rem", "1rem", "1.9rem"]}
            >
              <Text
                opacity={[0, 1, 1]}
                fontFamily={headerFont.style.fontFamily}
                fontSize={["x-small", "small", "large"]}
                color={colors.bgColor}
                background={colors.color}
                display={"inline"}
                lineHeight={["1px", "1rem", "1.9rem"]}
                padding={".2rem"}
                borderWidth={".15rem"}
                borderColor={colors.color}
                borderStyle={"solid"}
              >
                {post.title}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Card>
    </>
  );
}
