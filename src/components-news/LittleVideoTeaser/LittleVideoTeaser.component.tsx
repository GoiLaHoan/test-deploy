import type { VideoSnippet } from "~/src/generated";
// import Image from 'next/image'
import { CategoryTeaserLink } from "../CategoryTeaserLink/CategoryTeaserLink.component";
import Link from "next/link";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import clsx from "clsx";

export function LittleVideoTeaser({ video }: { video: VideoSnippet }) {
  return (
    <li className="w-full relative grid grid-cols-3 gap-4">
      <Link
        href={video?.frontendPath || "/news/video"}
        className="block w-full aspect-video relative"
      >
        <ImageMS
          src={`${video?.uuid}/${video?.thumbnailUuid}.jpeg`}
          className="relative aspect-video w-full h-full"
          height={132}
          width={240}
          service="vcms"
          alt={video?.headline}
          priority={true}
        />
        {/* <Image */}
        {/*   src={`${bucket}/${video?.uuid}/${video?.thumbnailUuid}_poster.jpeg`} */}
        {/*   alt={`${video?.headline} teaser image`} */}
        {/*   fill */}
        {/*   priority={true} */}
        {/*   className="relative aspect-video w-full h-full" */}
        {/* /> */}
      </Link>
      <div className="col-span-2">
        <CategoryTeaserLink
          urlAlias={`/news/video${video?.category?.urlAlias}`}
          text={video?.category?.name}
          className="mt-0"
        />
        <Link href={video?.frontendPath || "/news/video"}>
          <h3 className="line-clamp-3">{video?.headline}</h3>
        </Link>
      </div>
    </li>
  );
}

export function LittleVideoTeaserLoading() {
  return (
    <li className="w-full relative grid grid-cols-3 gap-4">
      <span
        className={clsx(
          "block w-full aspect-video relative",
          "animate-loading",
        )}
      />
      <div className="col-span-2">
        <span className="block h-3 w-24 animate-loading" />
        <span className="block h-4 w-48 mt-2 animate-loading" />
      </div>
    </li>
  );
}
