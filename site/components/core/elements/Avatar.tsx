import {Box, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import useThemeColors from "../hooks/useThemeColors";

export default function Avatar({
                                 size = "4rem",
                                 withName = false,
                                 invertedColors = false,
                               }: {
  size?: string | object;
  withName?: boolean;
  invertedColors?: boolean;
}) {
  const colors = useThemeColors();
  return (
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
          sizes={"10rem"}
          style={{objectFit: "cover"}}
        />
      </Box>
      {withName ? (
        <>
          <Text>
            <b>David</b>
          </Text>
        </>
      ) : (
        <> </>
      )}
    </VStack>
  );
}
