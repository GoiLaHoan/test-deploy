import { FC, useState } from "react";
import { useEffect, useRef } from "react";
import videojs from "video.js";

import styles from "./ArticleAudioPlayer.module.scss";
import { IoPlaySharp, IoPauseSharp, IoReloadSharp } from "react-icons/io5";

type Src = Array<{ src: string; type: string }>;
interface VideoJSPlayer {
  dispose: () => void;
  on: any;
  poster: (arg: string) => void;
  src: (arg: Src) => void;
  duration: any;
  currentTime: any;
}

const ArticleAudioPlayer: FC<{
  assetSnippetUuid: any;
  error?: any;
}> = ({
  // thumbnail,
  // thumbnailPrefix,
  assetSnippetUuid,
  error,
}) => {
  const playerRef = useRef<HTMLAudioElement>();
  const timerRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [audioPlay, setAudioPlay] = useState(false);
  const [audioReload, setAudioReload] = useState(false);
  const assetBaseUrl = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_AUDIO_BUCKET}`;

  if (error) {
    console.error(`AudioPlayer ${error}`);
  }

  const assetUuid: string | null = assetSnippetUuid ?? null;

  useEffect(() => {
    const player: VideoJSPlayer = videojs(playerRef.current, {
      controls: true,
    });

    // Update the timer display on every timeupdate event
    player.on("timeupdate", () => {
      handleTimeUpdate(player, timerRef, setAudioReload);
    });

    player.on("loadedmetadata", () => {
      setDuration(player.duration());
    });

    player.src([
      {
        src: `${assetBaseUrl}/${assetUuid}/asset.m4a`,
        type: "audio/mp4",
      },
    ]);

    return () => {
      player.dispose();
    };
  }, []);

  // Update the player's src and thumbnail when changes are made to the snippet uuid,
  // asset uuid and thumbnail uuid.
  useEffect(() => {
    const p = videojs.getPlayer(playerRef.current.getAttribute("id"));
    p?.src([
      {
        src: `${assetBaseUrl}/${assetUuid}/asset.m4a`,
        type: "audio/mp4",
      },
    ]);
  }, [assetBaseUrl, assetUuid, playerRef, assetUuid]);

  // Wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856

  // const containerClasses = classNames([styles.container], {
  //   [styles.containerNoPoster]: !showPoster,
  // })
  // const playerClasses = classNames('video-js', [styles.player], {
  //   [styles.playerNoPoster]: !showPoster,
  // })

  const ButtonControlAudio = () => {
    const handlePlayAudio = () => {
      playerRef.current.play();
      setAudioPlay(true);
      setAudioReload(false);
    };

    const handlePauseAudio = () => {
      playerRef.current.pause();
      setAudioPlay(false);
    };

    if (audioReload) {
      return (
        <button onClick={handlePlayAudio} className="mr-1">
          <IoReloadSharp size={18} />
        </button>
      );
    }
    if (!audioPlay) {
      return (
        <button onClick={handlePlayAudio} className="mr-1">
          <IoPlaySharp size={18} />
        </button>
      );
    }

    return (
      <button onClick={handlePauseAudio} className="mr-1">
        <IoPauseSharp size={18} />
      </button>
    );
  };

  return (
    <div>
      <div className={styles.container}>
        <div className="hidden">
          <div data-vjs-player>
            <audio
              className={`video-js ${styles.playerNoPoster}`}
              ref={playerRef}
            />
          </div>
        </div>
        <div className="flex bg-black text-white justify-between px-2 py-3">
          <div className="flex items-center">
            <ButtonControlAudio />
            Listen
          </div>
          <div ref={timerRef}>{formatDuration(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleAudioPlayer;

const handleTimeUpdate = (player, timerRef, setAudioReload) => {
  const remainingTime = player.duration() - player.currentTime();
  const remainingTimeFormated = isNaN(remainingTime) ? 0 : remainingTime;

  if (remainingTime == 0) {
    setAudioReload(true);
  }

  return (timerRef.current.innerHTML = formatDuration(remainingTimeFormated));
};

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
