import styles from "../../styles/Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <Link href="/">
      <div className={styles.container}>
        <img
          src="/images/logo.svg"
          alt="Direção Concursos"
          className={styles.logo}
        />
      </div>
    </Link>
  );
}
