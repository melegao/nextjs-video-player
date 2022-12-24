import styles from "../../styles/VideoPlayer.module.css";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { RiFullscreenLine } from "react-icons/ri";
import { useRef, useState } from "react";
import screenfull from "screenfull";

export default function VideoPlayer() {
  const videoURL = "http://media.w3.org/2010/05/bunny/movie.mp4";

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  const [playerState, setPlayerState] = useState({
    playing: false,
    muted: false,
    volume: 1,
  });

  const { playing, muted, volume } = playerState;

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
      volume: playerState.muted && 0
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

  return (
    <div>
      <div ref={playerContainerRef} className={styles.playerContainer}>
        <ReactPlayer
          ref={playerRef}
          volume={volume}
          url={videoURL}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
        />
      </div>
      <div className={styles.control}>
        <input
            type="range"
            min="0"
            max="100"
            defaultValue="20"
            className={styles.range}
          />
        <div className={styles.playerButtonsContainer}>
          <div className={styles.playerButtons}>
            <button onClick={handlePlayPause}>
              {playing ? <FaPause size={15} /> : <FaPlay size={15} />}
            </button>
            <button onClick={handleMuteOnOff}>
              {muted ? <HiVolumeOff size={16} /> : <HiVolumeUp size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeUpdate}
            />
            <p>05:05</p>
          </div>
          <div className={styles.playerButtons}>
            <button onClick={handleRewind}>-10</button>
            <button onClick={handleFastForward}>+10</button>
            <select name="teste" id="1">
              {["1X", "2X", "3X"].map((elem) => (
                <option key={elem}>{elem}</option>
              ))}
            </select>
            <button onClick={toogleFullScreen}>
              <RiFullscreenLine size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
