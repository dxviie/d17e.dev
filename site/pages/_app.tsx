import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex, Spacer } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Footer from "../components/layout/Footer";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // application wrappers
    <RecoilRoot>
      <ChakraProvider>
        {/* headers */}
        <Head>
          <title>d17e.dev - code. art. ideas.</title>
          <meta name="description" content="d17e.dev - code. art. ideas." />
          <link rel="icon" href="/d17e-favicon.ico" />
        </Head>

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
