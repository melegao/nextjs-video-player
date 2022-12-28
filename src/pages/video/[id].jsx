import styles from "../../styles/VideoPage.module.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import CardAside from "../../components/CardAside";
import { db } from "../../db/db";
import CardCategory from "../../components/CardCategory";
import { useRouter } from "next/router";

const VideoPlayer = dynamic(() => import("../../components/VideoPlayer"), {
  ssr: false,
});

export default function Video() {
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
      <Header />
      <div className={styles.container}>
        <div>
          <VideoPlayer />
          <p className={styles.title}>TITULO</p>
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
