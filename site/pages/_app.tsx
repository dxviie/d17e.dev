import "../styles/globals.css";
import "../styles/markdown.css";
import type {AppProps} from "next/app";
import {ChakraProvider, Flex, Spacer} from "@chakra-ui/react";
import Head from "next/head";
import Footer from "../components/core/layout/Footer";
import d17eTheme from "../styles/d17eTheme";
import Navigation from "../components/core/interactive/Navigation";
import React from "react";
import {isAtHomePage} from "../services/RouterUtils";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  const scrollSnapping = isAtHomePage(router.asPath) ? "start" : "none";
  setTimeout(() => {
    // console.clear();
    console.log(
      "   _ ___ ___         _\n" +
      " _| |_  |_  |___   _| |___ _ _\n" +
      "| . |_| |_| | -_|_| . | -_| | |\n" +
      "|___|_____|_|___|_|___|___|\\_/",
    );
    console.log("Welcome behind the scenes of d17e.dev!");
    console.log("This site is built with Next.js and Chakra UI.");
    console.log(
      "The source code is available at https://github.com/dxviie/d17e.dev",
    );
    console.log(
      "Feel free to reach out to me at https://forms.d17e.dev/contact",
    );
  }, 1000);
  return (
    <>
      {/* umami anonymous traffic tracker */}
      {/*<Script*/}
      {/*  async={true}*/}
      {/*  strategy="afterInteractive"*/}
      {/*  data-website-id="fefcc6cd-205e-4632-940b-cdea83a38ac8"*/}
      {/*  src={"https://umami.d17e.dev/script.js"}*/}
      {/*/>*/}
      <React.StrictMode>
        <ChakraProvider theme={d17eTheme} resetCSS={true}>
          {/* headers */}
          <Head>
            <title>d17e.dev - code. art. ideas.</title>
            <meta name="description" content="d17e.dev - code. art. ideas."/>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/d17e-favicon.ico"/>
          </Head>
          <Flex
            width={"100%"}
            height={"3.5rem"}
            scrollSnapAlign={scrollSnapping}
          >
            <Navigation></Navigation>
          </Flex>
          <Flex
            direction={"column"}
            align={"center"}
            minH={"calc(100vh - 3.5rem)"}
            width={"100%"}
          >
            <Component {...pageProps} />
            <Spacer/>
            <Footer/>
          </Flex>
        </ChakraProvider>
      </React.StrictMode>
    </>
  );
}

export default MyApp;
