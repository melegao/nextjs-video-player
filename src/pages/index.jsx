import styles from "../styles/Index.module.css";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { db } from "../db/db";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Tube - Video Player in Next.js</title>
      </Head>

      <div className={styles.container}>
        <Link href={`/video/1`}>
          <div>
            <img
              src="/images/logo.svg"
              alt="Direção Concursos"
              className={styles.logo}
            />
          </div>
        </Link>
        <Link href={`/video/1`}>
          <button className={styles.button}>Iniciar</button>
        </Link>
      </div>
    </>
  );
}
