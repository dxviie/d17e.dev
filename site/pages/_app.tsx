import "../styles/globals.css";
import "../styles/markdown.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex, Spacer } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "../components/core/layout/Footer";
import d17eTheme from "../styles/d17eTheme";
import Navigation from "../components/core/interactive/Navigation";
import Script from "next/script";
import React from "react";
import { isAtHomePage } from "../services/RouterUtils";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const scrollSnapping = isAtHomePage(router.asPath) ? "start" : "none";
  return (
    <>
      {/* umami anonymous traffic tracker */}
      <Script
        strategy="afterInteractive"
        data-website-id="fefcc6cd-205e-4632-940b-cdea83a38ac8"
        src={"https://umami.d17e.dev/umami.js"}
      />
      <React.StrictMode>
        <ChakraProvider theme={d17eTheme} resetCSS={true}>
          {/* headers */}
          <Head>
            <title>d17e.dev - code. art. ideas.</title>
            <meta name="description" content="d17e.dev - code. art. ideas." />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/d17e-favicon.ico" />
          </Head>
          <Flex
            width={"100%"}
            height={"3.5rem"}
            scrollSnapAlign={scrollSnapping}
          >
            <Navigation></Navigation>
          </Flex>
          {/*<Box height={"4rem"}></Box> /!* navigation spacer *!/*/}
          {/* content */}
          <Flex
            direction={"column"}
            align={"center"}
            minH={"100vh"}
            width={"100%"}
            // scrollSnapType={"y mandatory"}
          >
            {/*<Box height={"5rem"}></Box> /!* navigation spacer *!/*/}
            <Component {...pageProps} />
            <Spacer />
            <Footer />
          </Flex>
        </ChakraProvider>
      </React.StrictMode>
    </>
  );
}

export default MyApp;
