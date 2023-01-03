import styles from "../../styles/VideoPage.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import Header from "../../components/Header";
import CardAside from "../../components/CardAside";
import { db } from "../../db/db";
import CardCategory from "../../components/CardCategory";
import { useRouter } from "next/router";
import Head from "next/head";

const VideoPlayer = dynamic(() => import("../../components/VideoPlayer"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const id = context.query.id;

  const movie = db.filter((elem) => elem.id == id);

  return {
    props: {
      id: id,
      movie: movie,
    },
  };
}

export default function Video(props) {
  const videoId = useRouter();

  const [catFiltered, setCatFilteres] = useState("Tudo");

  let categories = ["Tudo"];

  for (let i = 0; i < db.length; i++) {
    const filtered = categories.find((elem) => {
      return elem === db[i].category;
    });

    if (filtered === undefined) {
      categories.push(db[i].category);
    }
  }

  return (
    <>
      <Head>
        <title>My Tube - {props.movie[0].title}</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <div>
          <VideoPlayer movie={props.movie}/>
          <h3 className={styles.title}>{props.movie[0].title}</h3>
          <div className={styles.videoResume}>
            <p className={styles.videoResumeViews}>
              {props.movie[0].views} mil visualizações
            </p>
            <p className={styles.videoResumeDescription}>
              {props.movie[0].description}
            </p>
          </div>
        </div>

        <div className={styles.relatedVideos}>
          <div className={styles.categoryCard}>
            {categories.map((elem, index) => (
              <CardCategory
                key={index}
                category={elem}
                setCatFilteres={setCatFilteres}
              />
            ))}
          </div>
          {catFiltered === "Tudo"
            ? db.map((elem, index) => <CardAside key={elem.id} video={elem} />)
            : db.map(
                (elem, index) =>
                  catFiltered === elem.category && (
                    <CardAside key={elem.id} video={elem} />
                  )
              )}
        </div>
      </div>
    </>
  );
}
