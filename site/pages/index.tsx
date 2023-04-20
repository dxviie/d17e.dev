import type {NextPage} from 'next'
import About from "../components/About";
import Script from "next/script"

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

export default Home
