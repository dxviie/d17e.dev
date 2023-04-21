import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, Flex, Spacer } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Footer from "../components/layout/Footer";
import { RecoilRoot } from "recoil";
import theme from "../styles/theme";
import ColorModeToggle from "../components/interactive/ColorModeToggle";
import Navigation from "../components/interactive/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // application wrappers
    <RecoilRoot>
      <ChakraProvider theme={theme} resetCSS={true}>
        {/* headers */}
        <Head>
          <title>d17e.dev - code. art. ideas.</title>
          <meta name="description" content="d17e.dev - code. art. ideas." />
          <link rel="icon" href="/d17e-favicon.ico" />
        </Head>

        <Navigation></Navigation>
        <Box position={"absolute"} top={"5"} right={"5"}>
          <ColorModeToggle></ColorModeToggle>
        </Box>

        {/* content */}
        <Flex direction={"column"} align={"center"} minH={"100vh"}>
          <Component {...pageProps} />
          <Spacer />
          <Footer />
        </Flex>

        {/* analytics, scripts,... */}
        <Analytics />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
