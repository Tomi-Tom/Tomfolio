import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import Navbar from '../components/layout/Navbar';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tom Portfolio</title>
        <meta name="description" content="The galery of Tomi-Tom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />

      <main className={styles.main}>
        <h2>
          <Link href={"test"}>Test Link to Test Page</Link>
        </h2>
        <h1 className={styles.title}>
          Welcome to <Link href="">My first Website</Link>
        </h1>

        <p className={styles.description}>
          This is actually a test like a{' '}
          <code className={styles.code}>Hello World</code>
        </p>

        <div className={styles.grid}>
          <a href="https://fr.wikipedia.org/wiki/Jurassic_Park" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Welcome to Jurassic park.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <h1>Tomi-Tom</h1>
      </footer>
    </div>
  )
}
