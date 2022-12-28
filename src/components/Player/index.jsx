import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from 'react-icons/fa'
import { RiFullscreenLine } from 'react-icons/ri'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'



// const videoURL =
//   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const videoURL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"

function usePlayerState($videoPlayer) {

    const [playerState, setPlayerState] = useState({
        playing: false,
        percentage: 0,
        muted: false,
        volumePercentage: 100,
        fullscreen: false
      });

    useEffect(() => {

        playerState.playing ? $videoPlayer.current.play() : $videoPlayer.current.pause();
        playerState.muted ? $videoPlayer.current.muted = true : $videoPlayer.current.muted = false;
        playerState.fullscreen ? $videoPlayer.current.webkitEnterFullscreen() : $videoPlayer.current.webkitExitFullscreen();
        

    }, [
        $videoPlayer,
        playerState.playing,
        playerState.muted,
        playerState.fullscreen
    ])

    function toogleVideoPlay() {
        setPlayerState({
            ...playerState,
            playing: !playerState.playing,
        });
    }

    function toogleVolumeMute() {
        setPlayerState({
            ...playerState,
            muted: !playerState.muted,
        });
    }

    function toogleFullscreen() {
        setPlayerState({
            ...playerState,
            fullscreen: !playerState.fullscreen,
        });
    }

    function handleTimeUpdate() {
        const currentPercentage = ($videoPlayer.current.currentTime / $videoPlayer.current.duration) * 100
        setPlayerState({
            ...playerState,
            percentage: currentPercentage,
        });
    }
    
    function handleChangeViewPercentage(event) {
        const currentPercentageValue = event.target.value
        $videoPlayer.current.currentTime = $videoPlayer.current.duration / 100 * currentPercentageValue
        setPlayerState({
            ...playerState,
            percentage: currentPercentageValue,
        });
    }
    
    function handleVolumeUpdate() {
        const currentPercentage = $videoPlayer.current.volume * 100
        
        setPlayerState({
            ...playerState,
            percentage: currentPercentage,
        });
    }

    
    function handleChangeVolumePercentage(event) {
        const currentPercentage = event.target.value / 100
        $videoPlayer.current.volume = currentPercentage
        console.log(currentPercentage * 100)
        setPlayerState({
            ...playerState,
            volumePercentage: currentPercentage,
        });
    }


    

    

    return {
        playerState,
        toogleVideoPlay,
        handleTimeUpdate,
        handleChangeViewPercentage,
        toogleVolumeMute,
        handleChangeVolumePercentage,
        handleVolumeUpdate,
        toogleFullscreen
    }

}

export default function Player() {

    const $videoPlayer = useRef(null)

    const {
        playerState,
        toogleVideoPlay,
        handleTimeUpdate,
        handleChangeViewPercentage,
        toogleVolumeMute,
        handleChangeVolumePercentage,
        handleVolumeUpdate,
        toogleFullscreen
    } = usePlayerState($videoPlayer)

    
    // const duration = ($videoPlayer.current.duration / 60)
    // const current = (($videoPlayer.current.currentTime / 100) / 60) * 100

    function msToTime(duration) {

        
        let milliseconds = Math.floor((duration % 10) / 100),
          seconds = Math.floor((duration ) % 60),
          minutes = Math.floor((duration / 60) % 60),
          hours = Math.floor((duration / (60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds;
      }
      
    
      

  return (
    <>
      <div>
        <video
            ref={$videoPlayer}
            src={videoURL}
            onTimeUpdate={handleTimeUpdate}
            onVolumeChange={handleVolumeUpdate}
            width="750"
            height="500"
            controls
        />
        <div className="controls" >
            <button onClick={toogleVideoPlay}>
                {playerState.playing ? <FaPause /> : <FaPlay />}
            </button>
            <input type="range" min="0" max="100" value={playerState.percentage} onChange={handleChangeViewPercentage}/>
            {/* <p>{msToTime($videoPlayer.current.currentTime)}</p>
            <p>{msToTime($videoPlayer.current.duration)}</p> */}
            <div >
                <button onClick={toogleFullscreen}><RiFullscreenLine/></button>
            </div>
            <div>
                <button onClick={toogleVolumeMute}>
                    {playerState.muted ? <HiVolumeOff /> : <HiVolumeUp />} 


                </button>
                <input type="range" min="0" max="100" value={playerState.volumePercentage * 100} onChange={handleChangeVolumePercentage}/>

            </div>
            <select>
                <option>0.25</option>
                <option>0.5</option>
                <option>0.75</option>
                <option>Normal</option>
                <option>1.25</option>
                <option>1.5</option>
                <option>1.75</option>
            </select>
        </div>
      </div>
    </>
  );
}
