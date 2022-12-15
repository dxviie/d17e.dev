import type { NextPage } from 'next'
import Head from 'next/head'
import About from "../components/About";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>d17e.dev - code. art. ideas.</title>
        <meta name="description" content="d17e.dev - code. art. ideas." />
        <link rel="icon" href="/d17e-favicon.ico" />
      </Head>

      <main>
          <About />
      </main>
    </div>
  )
}

export default Home
