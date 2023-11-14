import type { VideoSnippetFragmentFragment } from "~/src/generated";
import Link from "next/link";
import { CategoryTeaserLink } from "../CategoryTeaserLink/CategoryTeaserLink.component";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";
import clsx from "clsx";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";

const Title = ({ children }: { children: React.ReactNode }) => (
  <h3 className="uppercase text-xl py-8">{children}</h3>
);

const Row = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      "grid grid-cols-1 gap-4 md:grid-cols-4",
      !className ? undefined : className,
    )}
  >
    {children}
  </div>
);

function TeaserItem({
  video,
  hidePlaylistLink,
}: {
  video: VideoSnippetFragmentFragment;
  hidePlaylistLink?: boolean;
}) {
  return (
    <div className="relative flex flex-col">
      <div className="w-full aspect-video flex relative mb-2">
        <Link href={video?.frontendPath || "/news/video"} className="">
          <ImageMS
            src={`${video?.uuid}/${video?.thumbnailUuid}.jpeg`}
            alt={`${video?.headline} teaser image`}
            priority={true}
            width={400}
            height={340}
            service="vcms"
            className="relative aspect-video w-full h-full rounded-md"
          />
        </Link>
      </div>
      {hidePlaylistLink || !video?.category ? null : (
        <CategoryTeaserLink
          urlAlias={`/news/video${video?.category?.urlAlias}`}
          text={video?.category?.name}
        />
      )}

      <Link href={video?.frontendPath || "/news/video"} className="relative">
        <h3 className="!text-white text-base py-[5px]">{video?.headline}</h3>
        <time
          className="opacity-60 text-white text-xs"
          dateTime={teaserTimestamp(video?.createdAt)}
        >
          {teaserTimestamp(video?.createdAt)}
        </time>
      </Link>
    </div>
  );
}

function TeaserItemLoading() {
  return (
    <div className="relative flex flex-col">
      <div className="w-full aspect-video flex relative mb-2">
        <span className="block h-full w-full animate-loading" />
      </div>
      <span className="block h-4 w-24 mt-4 animate-loading" />

      <span className="block h-6 w-48 my-4 animate-loading" />
    </div>
  );
}

export const Playlist = {
  Title,
  Row,
  TeaserItem,
  TeaserItemLoading,
};
