import type {GetStaticProps, NextPage} from 'next'
import About from "../components/About";
import Script from "next/script"
import {getAllArticles} from "../services/ContentApi";

const Home: NextPage = () => {

  return (
      <>
          <Script strategy="afterInteractive" data-website-id="fefcc6cd-205e-4632-940b-cdea83a38ac8" src="https://umami.d17e.dev/umami.js" />
          <main>
              <About />
          </main>
      </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    // Fetch data from an API or database
    const data = await getAllArticles();
    console.log(data);

    // Return the data as props
    return {
        props: { data }
    };
};

export default Home
