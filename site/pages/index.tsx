import type {GetStaticProps, NextPage} from 'next'
import About from "../components/About";
import Script from "next/script";
// import useSWR from "swr";
// import request, {GraphQLClient} from "graphql-request";
// import {ArticleEntityResponseCollection} from "../api/graphql/graphql";
// import {GET_ARTICLES_QUERY} from "../api/graphql/queries/articles";

// const API_ENDPOINT = 'http://127.0.0.1:1337/graphql';
// const graphQLClient = new GraphQLClient(API_ENDPOINT);
//
// const fetcher = (query: string) => graphQLClient.request<ArticleEntityResponseCollection>(query);

const Home: NextPage = () => {

    // const {data, error} = useSWR(GET_ARTICLES_QUERY, fetcher);
    //
    // console.log(data, error, typeof data);

  return (
      <>
          <Script strategy="afterInteractive" data-website-id="fefcc6cd-205e-4632-940b-cdea83a38ac8" src="https://umami.d17e.dev/umami.js" />
          <main>
              <About />
          </main>
      </>
  )
}

export default Home
