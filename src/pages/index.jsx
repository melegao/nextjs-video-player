import Link from "next/link"
import Header from "../components/Header"
import { db } from "../db/db"


export default function Home () {

  return (
    <>
      <Header />
      {db.map((elem) => (
        <Link href={`/video/${elem.id}`} key={elem.id} video={elem}>
          <p>{elem.title}</p>
        </Link>
        ))}
      
    </>
  )

}