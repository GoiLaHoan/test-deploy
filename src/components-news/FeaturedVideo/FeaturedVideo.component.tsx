// this is a dark mode component
// used on /news/video
// the first in your face component

import type { VideoSnippetFragmentFragment } from "~/src/generated";
import { SocialsKitco } from "~/src/components/socials/socials-kitco.component";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";
import { CategoryTeaserLink } from "../CategoryTeaserLink/CategoryTeaserLink.component";
import VideoPlayer from "../VideoPlayer/VideoPlayer.component";

// it's in figma, you cant miss it
export function FeaturedVideo({
  video,
}: {
  video: VideoSnippetFragmentFragment;
}) {
  const videoNode = {
    assetUuid: video?.video?.uuid,
    startTime: video?.startTime,
    endTime: video?.endTime,
    snippetUuid: video?.uuid,
    thumbnailUuid: video?.thumbnailUuid,
    assetType: "video",
  };

  return (
    <div className="w-full relative">
      <div className="w-full aspect-video relative">
        <VideoPlayer videoNode={videoNode} />
      </div>
      {!video?.headline ? (
        <span className="block mt-6 mb-4 h-4 w-32 animate-loading" />
      ) : (
        <CategoryTeaserLink
          urlAlias={`/news/video${video?.category?.urlAlias}`}
          text={video?.category?.name}
          className="py-[10px]"
        />
      )}
      {!video?.headline ? (
        <span className="block h-8 w-48 bg-white/5 animate-pulse rounded-md" />
      ) : (
        <h3 className="sm:!text-white text-2xl leading-[130%]">
          {video?.headline}
        </h3>
      )}
      <time
        className="block opacity-60 pb-[10px]"
        dateTime={teaserTimestamp(video?.createdAt)}
      >
        {teaserTimestamp(video?.createdAt)}
      </time>
      <p className="leading-[142%]">{video?.description}</p>
      <div className="flex flex-col gap-6 md:flex-row md:gap-1 justify-between pt-4">
        <div className="sm:!text-white">
          <h5 className="!font-normal !text-white/50">
            Guests:{" "}
            <span className="!text-white/70">
              {video?.guests?.map((x) => x.name).join(", ")}
            </span>
          </h5>
          <h5 className="!font-normal !text-white/50">
            Source: <span className="!text-white/70">{video?.source}</span>
          </h5>
          <div className="flex gap-2">
            <h5 className="!font-normal !text-white/50">Tags:</h5>
            <span className="!text-white/70">
              {video?.tags?.map((x) => x.name).join(", ")}
            </span>
          </div>
        </div>
        <ShareLinks />
      </div>
    </div>
  );
}

function ShareLinks() {
  return (
    <div className="flex items-center gap-3">
      <h5 className="sm:!text-white underline">Share</h5>
      <SocialsKitco className="sm:!text-white" hidePrint={true} />
    </div>
  );
}
