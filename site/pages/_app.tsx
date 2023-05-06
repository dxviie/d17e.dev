import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, Flex, HStack, Spacer } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Footer from "../components/core/layout/Footer";
import { RecoilRoot } from "recoil";
import d17eTheme from "../styles/d17eTheme";
import Navigation from "../components/core/interactive/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // application wrappers
    <RecoilRoot>
      <ChakraProvider theme={d17eTheme} resetCSS={true}>
        {/* headers */}
        <Head>
          <title>d17e.dev - code. art. ideas.</title>
          <meta name="description" content="d17e.dev - code. art. ideas." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/d17e-favicon.ico" />
        </Head>

        <HStack zIndex={"1"} position={"absolute"} top={"5"} right={"5"}>
          <Navigation></Navigation>
        </HStack>

        {/* content */}
        <Flex direction={"column"} align={"center"} minH={"100vh"}>
          <Box height={"5rem"}></Box> {/* navigation spacer */}
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
