import {AuthorDTO} from "../../../services/ContentTypes";
import {Box, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
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
                src={'/avatar_me_vera_round.png'}
                alt={'stylized selfie'}
                fill={true}
                sizes={"100%"}
                style={{objectFit: "cover"}}
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
