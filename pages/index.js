import Head from 'next/head'
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import About from "../components/About";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

export default function Home() {
  return (
      <div>
        <Head>
          <title>Tom BP - Fullstack Developer</title>
          <meta name="description" content="Portfolio website for Tom BP, showcasing their skills as a fullstack developer." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <main>
          <HeroBanner />
          <About />
          <Projects />
        </main>

        <Footer />
      </div>
  )
}
