import Link from "next/link";
import styles from "../../styles/CardAside.module.css";

export default function CardAside({video}) {
   
    const {
        title,
        thumb,
        author,
        views,
        id,
    } = video
  
    return (
    <div className={styles.card}>
      <Link href={`/video/${id}`}>
      <img
        src={thumb}
        alt={title}
        className={styles.image}
      />
      </Link>
      <div className={styles.cardDetails}>
        <Link href={`/video/${id}`}>
          <h4 className={styles.title}>
            {title}
          </h4>
        </Link>
        <div className={styles.subInfo}>
          <p>{author}</p>
          <p>{views} mil</p>
        </div>
      </div>
    </div>
  );
}
