import { AuthorDTO } from "../../../services/ContentTypes";
import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { imageLoader } from "../../../services/ContentApi";
import blurHashToDataURL from "../../../services/BlurHashTransformer";
import useThemeColors from "../hooks/useThemeColors";

export default function Avatar({
  author,
  size = "4rem",
  withName = false,
  invertedColors = false,
}: {
  author?: AuthorDTO;
  size?: string | object;
  withName?: boolean;
  invertedColors?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <>
      {author ? (
        <>
          <VStack lineHeight={"1"}>
            <Box
              borderRadius={"50%"}
              position={"relative"}
              height={size}
              width={size}
              overflow={"hidden"}
              filter={"grayscale(50%)"}
              borderWidth={"1px"}
              borderColor={invertedColors ? colors.bgColor : colors.color}
              borderStyle={"dashed"}
            >
              <Image
                loader={imageLoader}
                src={author.avatar.url}
                alt={author.avatar.alternativeText}
                fill={true}
                sizes={"100%"}
                style={{ objectFit: "cover" }}
                placeholder={"blur"}
                blurDataURL={blurHashToDataURL(author.avatar.blurhash)}
              />
            </Box>
            {withName ? (
              <>
                <Text>
                  <b>{author.name}</b>
                </Text>
              </>
            ) : (
              <> </>
            )}
          </VStack>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
