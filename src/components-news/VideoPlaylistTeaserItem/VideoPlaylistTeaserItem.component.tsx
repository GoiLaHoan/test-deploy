import type { VideoSnippet } from "~/src/generated";
import Link from "next/link";
import Image from "next/image";
import { CategoryTeaserLink } from "../CategoryTeaserLink/CategoryTeaserLink.component";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";

const bucket = "https://storage.googleapis.com/kitco-video-dev";

export function VideoPlaylistTeaserItem({
  video,
  hidePlaylistLink,
}: {
  video: VideoSnippet;
  hidePlaylistLink?: boolean;
}) {
  return (
    <div className="relative flex flex-col">
      <div className="w-full aspect-video flex relative mb-2">
        <Link href={video?.frontendPath || "/"} className="">
          <Image
            src={`${bucket}/${video?.uuid}/${video?.thumbnailUuid}_poster.jpeg`}
            alt={`${video?.headline} teaser image`}
            fill
            priority={true}
            className="relative aspect-video w-full h-full rounded-md"
          />
        </Link>
      </div>
      {hidePlaylistLink ? null : (
        <CategoryTeaserLink urlAlias="/" text={video?.category?.name} />
      )}

      <Link href={video?.frontendPath || "/"} className="relative">
        <h3 className="sm:!text-white text-base">{video?.headline}</h3>
        <time
          className="opacity-60 text-white"
          dateTime={teaserTimestamp(video?.createdAt)}
        >
          {teaserTimestamp(video?.createdAt)}
        </time>
      </Link>
    </div>
  );
}
