import dynamic from "next/dynamic";
import { useRef } from "react";



export default function Video() {

    const VideoPlayer = dynamic(() => import("../components/VideoPlayer"), {ssr: false});

    const playerRef = useRef();

  return (
    <>  
        
            <VideoPlayer playerRef={playerRef}/>   

    </>
  );
}
