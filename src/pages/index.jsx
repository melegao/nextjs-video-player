import styles from "../styles/Index.module.css";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { db } from "../db/db";

export default function Home() {
  return (
    <>
      <Head>
        <title>Direção Concursos - Teste técnico</title>
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
