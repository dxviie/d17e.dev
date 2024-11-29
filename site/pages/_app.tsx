import "../styles/globals.css";
import "../styles/markdown.css";
import type {AppProps} from "next/app";
import {ChakraProvider, Flex, Spacer} from "@chakra-ui/react";
import Footer from "../components/core/layout/Footer";
import d17eTheme from "../styles/d17eTheme";
import Navigation from "../components/core/interactive/Navigation";
import React from "react";
import Script from "next/script";
import Head from "next/head";

let count = 0;

function MyApp({Component, pageProps}: AppProps) {
  const dev = process.env.NODE_ENV === "development";
  setTimeout(() => {
    if (count > 0) return;
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
    count++;
  }, 1000);
  return (
    <>
      {/* headers */}
      <Head>
        <title>d17e.dev - code. art. ideas.</title>
        <meta name="description" content="d17e.dev - code. art. ideas."/>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico"/>
        <link rel="alternate" type="application/rss+xml" title="d17e's RSS feed" href="/rss.xml"/>
      </Head>
      {/* umami anonymous traffic tracker */}
      {dev ? <></> :
        <Script
          async={true}
          strategy="afterInteractive"
          data-website-id="fefcc6cd-205e-4632-940b-cdea83a38ac8"
          src={"https://umami.d17e.dev/script.js"}
        />}
      <React.StrictMode>
        <div className={"scanlines"}></div>
        <div className={"scanline"}></div>
        <div className={"flicker"}></div>
        <ChakraProvider theme={d17eTheme} resetCSS={true}>

          <Flex
            width={"100%"}
            height={"3.5rem"}
          >
            <Navigation></Navigation>
          </Flex>
          <Flex
            direction={"column"}
            align={"center"}
            minH={"calc(100svh - 3.5rem)"}
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
