import clsx from "clsx";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import type { Commentary, NewsArticle } from "~/src/generated";
import VideoPlayer from "../VideoPlayer/VideoPlayer.component";

export function FeaturedMedia({
  articleData,
}: {
  articleData: NewsArticle | Commentary;
}) {
  const fc = articleData?.featuredContent;

  const videoNode = {
    overlayImageUrl: articleData?.image?.detail?.default?.srcset,
    assetUuid: fc?.assetUuid,
    startTime: fc?.startTime,
    endTime: fc?.endTime,
    snippetUuid: fc?.snippetUuid,
    thumbnailUuid: fc?.thumbnailUuid,
    assetType: fc?.type,
  };

  // - If BOTH presentation image + video/audio exist,a play button is overlayed on presentation image
  if (
    articleData?.image?.detail?.default &&
    (fc?.type === "video" || fc?.type === "audio")
  ) {
    return <VideoPlayer videoNode={videoNode} />;
  }
  // - If presentation image does NOT EXIST, display the featured image from video/audio
  // - Playing media will replace presentation image with a video/audio player

  // - If presentation image does NOT EXIST
  if (!articleData?.image?.detail?.default?.srcset) {
    return <></>;
  }

  return (
    <ImageMS
      src={articleData?.image?.detail?.default?.srcset}
      alt={`${articleData?.title} teaser image`}
      priority={true}
      service="icms"
      width={1340}
      height={756}
      className={clsx("rounded-lg aspect-video object-cover", "w-full mb-2.5")}
    />
  );
}
