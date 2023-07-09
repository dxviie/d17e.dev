import styles from "./404.module.css";
import { Box, Center, Spacer, useColorMode, VStack } from "@chakra-ui/react";
import { bodyFont, headerFont } from "../styles/fonts";
import ArrowLink from "../components/core/interactive/ArrowLink";

export default function Custom404() {
  const colorModeContext = useColorMode();
  const imgResource =
    colorModeContext.colorMode === "light"
      ? "/tumbleweed-black.png"
      : "/tumbleweed-white.png";
  return (
    <>
      <Center>
        <VStack width={"100vw"} height={"50vh"}>
          <VStack>
            <Box fontFamily={bodyFont.style.fontFamily} fontSize={"6rem"}>
              404
            </Box>
            <Box
              fontFamily={headerFont.style.fontFamily}
              paddingBottom={"2rem"}
            >
              Nothing to see here...
            </Box>
          </VStack>
          <Box height={"1rem"} />
          <div className={styles.container}>
            <div className={styles.traveller}>
              <div className={styles.bouncingBall}>
                <img
                  src={imgResource}
                  alt={"tumbleweed"}
                  className={styles.tumbleweed}
                />
              </div>
            </div>
          </div>
          <Box height={"1rem"} />
          <ArrowLink
            link={"/"}
            arrow={"right"}
            description={"Let's go home?"}
          />
        </VStack>
      </Center>

      <Spacer />
    </>
  );
}
