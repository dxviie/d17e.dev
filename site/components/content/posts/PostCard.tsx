import { PostDTO } from "../../../services/ContentTypes";
import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { imageLoader } from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import Image from "next/image";
import { headerFont } from "../../../styles/fonts";
import useThemeColors from "../../core/hooks/useThemeColors";

export default function PostCard({ post }: { post: PostDTO }) {
  const colors = useThemeColors();
  return (
    <>
      <Card
        size={"lg"}
        style={{ aspectRatio: "1/1" }}
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
      >
        <Image
          src={post.content.url}
          alt={post.content.alternativeText}
          loader={imageLoader}
          fill={true}
          sizes={"100%"}
          style={{ objectFit: "cover", transform: "scale(1.5)" }}
          placeholder={"blur"}
          blurDataURL={blurHashToDataURL(post.content.blurhash)}
        ></Image>
        <VStack
          alignItems={"flex-start"}
          justifyContent={"flex-end"}
          height={"100%"}
        >
          <HStack>
            <Box
              zIndex={"1"}
              flexShrink={"1"}
              maxWidth={"100%"}
              margin={"1rem"}
            >
              <Text
                fontFamily={headerFont.style.fontFamily}
                fontSize={"large"}
                color={colors.bgColor}
                background={colors.color}
                display={"inline"}
                lineHeight={"1.9rem"}
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
