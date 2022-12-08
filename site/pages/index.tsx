import type { NextPage } from 'next'
import Head from 'next/head'
import About from "../components/About";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>d17e.dev - Code. Art. Ideas.</title>
        <meta name="description" content="d17e.dev - Code. Art. Ideas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <About />
      </main>
    </div>
  )
}

export default Home
