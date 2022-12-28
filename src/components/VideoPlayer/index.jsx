import styles from "../../styles/VideoPlayer.module.css";
import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import {
  BsFillVolumeUpFill,
  BsFillVolumeOffFill,
  BsPlayFill,
  BsFillPauseFill,
  BsFillSkipForwardFill,
  BsFillSkipBackwardFill,
  BsGearFill,
  BsFullscreen,
} from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import screenfull from "screenfull";
import { Slider } from "@mui/material";
import { db } from "../../db/db";
import { useRouter } from "next/router";


export default function VideoPlayer({setVideoInfo}) {
  // const videoURL = "https://www.youtube.com/watch?v=BRzi0rDhhCc";
  // const videoURL = "http://media.w3.org/2010/05/bunny/movie.mp4";

  const videoId = useRouter();
  // console.log(videoId.query.id);

  const videoSelected = db.find((elem) => elem.id == videoId.query.id)
  
    

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  const [playerState, setPlayerState] = useState({
    playing: false,
    timePercentage: 0,
    muted: false,
    volume: 1,
    played: 0,
    playedSeconds: 0,
  });

  const { playing, muted, volume, timePercentage, played, playedSeconds } =
    playerState;

  const handlePlayPause = () => {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  };

  const handleMuteOnOff = () => {
    setPlayerState({
      ...playerState,
      muted: !playerState.muted,
      volume: playerState.muted && 0,
    });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleVolumeUpdate = (e) => {
    const currentVolume = e.target.value / 100;
    playerRef.current.volume = currentVolume;
    setPlayerState({
      ...playerState,
      volume: currentVolume,
      muted: currentVolume === 0 ? true : false,
    });
  };

  const toogleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleTimeUpdate = (changeState) => {
    setPlayerState({
      ...playerState,
      played: changeState.played,
      playedSeconds: changeState.playedSeconds,
    });
  };

  const handleChangeTime = (e) => {
    const currentTime = e.target.value / 100;
    playerRef.current.seekTo(currentTime);
    setPlayerState({
      ...playerState,
      played: currentTime,
    });
  };

  function msToTime(duration) {
    let milliseconds = Math.floor((duration % 10) / 100),
      seconds = Math.floor(duration % 60),
      minutes = Math.floor((duration / 60) % 60),
      hours = Math.floor((duration / (60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (hours <= 0) {
      return minutes + ":" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds;
  }

  return (
    <div className={styles.container}>
      <div
        ref={playerContainerRef}
        className={styles.playerContainer}
        onClick={handlePlayPause}
      >
        <ReactPlayer
          ref={playerRef}
          volume={volume}
          url={videoSelected.url}
          muted={muted}
          playing={playing}
          onProgress={handleTimeUpdate}
          width="100%"
          height="100%"
        />
      </div>
      <div className={styles.control}>
        <div className={styles.playerButtonsContainer}>
          <Slider
            size="small"
            sx={{ color: "#FF0000" }}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={handleChangeTime}
            value={played * 100}
            valueLabelFormat={msToTime(playedSeconds)}
          />
        </div>
        <div className={styles.playerButtonsContainer}>
          <div className={styles.playerButtons}>
            {playing ? (
              <BsFillPauseFill
                onClick={handlePlayPause}
                className={styles.playPauseBtn}
              />
            ) : (
              <BsPlayFill
                onClick={handlePlayPause}
                className={styles.playPauseBtn}
              />
            )}
            {muted ? (
              <BsFillVolumeOffFill
                onClick={handleMuteOnOff}
                className={styles.button}
              />
            ) : (
              <BsFillVolumeUpFill
                onClick={handleMuteOnOff}
                className={styles.button}
              />
            )}
            <div className={styles.slider}>
              <Slider
                size="small"
                sx={{ color: "#E5EBF0" }}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={volume * 100}
                onChange={handleVolumeUpdate}
              />
            </div>
            <p className={styles.time}>{msToTime(playedSeconds)}</p>
          </div>
          <div className={styles.playerButtons}>
            <BsFillSkipBackwardFill
              onClick={handleRewind}
              className={styles.button}
            />
            <BsFillSkipForwardFill
              onClick={handleFastForward}
              sx={{ fontSize: 28, color: "#E5EBF0" }}
              className={styles.button}
            />
            <BsGearFill className={styles.button} />
            <BiFullscreen
              onClick={toogleFullScreen}
              className={styles.button}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
