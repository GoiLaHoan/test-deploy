import { env } from "~/src/env/client.mjs";
import styles from "./VideoPlayer.module.scss";
import clsx from "clsx";

type TVideoNode = {
  overlayImageUrl?: string;
  assetUuid: string;
  startTime: number;
  endTime: number;
  snippetUuid: string;
  thumbnailUuid: string;
  assetType: string;
};

const VideoPlayer = ({ videoNode }: { videoNode: TVideoNode }) => {
  const posterUrl = !videoNode.overlayImageUrl
    ? `${env.NEXT_PUBLIC_VCMS_BUCKET}/${videoNode.snippetUuid}/${videoNode.thumbnailUuid}_poster.jpeg`
    : videoNode.overlayImageUrl;

  if (videoNode.assetUuid && videoNode.assetType === "audio") {
    return (
      <div className={styles.containerAudio}>
        <audio
          id={videoNode.snippetUuid}
          className="video-js videoPlayerEmbedded"
          controls
          preload="auto"
          style={{ backgroundColor: "transparent" }}
        >
          <source
            src={`${env.NEXT_PUBLIC_ACMS_BUCKET}/${videoNode.assetUuid}/asset.m4a`}
            type="audio/mp4"
          />
          <p className="vjs-no-js">
            To listen to this audio please enable JavaScript
          </p>
        </audio>
      </div>
    );
  }

  return (
    <div className={clsx("relative aspect-video")}>
      {videoNode.assetUuid && videoNode.assetType === "video" ? (
        <video
          id={videoNode.snippetUuid}
          className="video-js video-js-default videoPlayerEmbedded"
          controls
          preload="auto"
          poster={posterUrl}
        >
          <source
            src={`${env.NEXT_PUBLIC_VCMS_BUCKET}/${videoNode.assetUuid}/video.mp4`}
            type="video/mp4"
          />
          <p className="vjs-no-js">
            To view this video please enable JavaScript
          </p>
        </video>
      ) : (
        <div
          className={clsx("w-full h-full aspect-video", "animate-loading")}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
