import dayjs from "dayjs";
import VideoNewsSidebarLoading from "./VideoNewsSidebarLoading";

import Link from "next/link";
import styles from "./VideoNewsSidebar.module.scss";
import { useQuery } from "react-query";
import { vcms } from "~/src/lib/vcms-factory.lib";
import type { VideoSnippet } from "~/src/generated";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import clsx from "clsx";

const VideoNewsSidebar = () => {
  const { data } = useQuery(
    vcms.listVideos({
      variables: {
        limit: 5,
        offset: 0,
      },
    }),
  );

  if (!data) {
    return <VideoNewsSidebarLoading />;
  }

  const v = data?.VideoSearchSnippets?.snippets;

  return (
    <>
      <div className={styles.contentWrapper}>
        {/* big video tile aka first one */}
        <div className={styles.firstVideoContainer}>
          {v?.slice(0, 1)?.map((x: VideoSnippet) => (
            <>
              <Link
                key={x.id}
                href={x.frontendPath || "/"}
                className="relative block aspect-video"
              >
                <ImageMS
                  src={`${x?.uuid}/${x?.thumbnailUuid}.jpeg`}
                  alt={`${x?.headline} teaser image`}
                  priority={true}
                  width={400}
                  height={340}
                  service="vcms"
                  className={clsx("w-full", "relative")}
                />
              </Link>

              <Link key={x.id} href={x.frontendPath || "/"} className="mt-4">
                <span className="text-gray-800">{x.headline}</span>
              </Link>
              <p className="text-gray-600">
                {dayjs(x.createdAt).format("MMM DD")}
              </p>
            </>
          ))}
        </div>

        {/* baby videos aka tile 2 and 3*/}
        <div className={styles.gridTwoColumn}>
          {v?.slice(1, 3).map((x: VideoSnippet) => (
            <div key={x.id}>
              <Link
                key={x.id}
                href={x.frontendPath || "/"}
                className="relative block aspect-video"
              >
                <ImageMS
                  src={`${x?.uuid}/${x?.thumbnailUuid}.jpeg`}
                  alt={`${x?.headline} teaser image`}
                  priority={true}
                  width={400}
                  height={340}
                  service="vcms"
                  className={clsx("w-full", "relative")}
                />
              </Link>

              <Link key={x.id} href={x.frontendPath || "/"} className="mt-4">
                <span className="text-gray-800 line-clamp-3">{x.headline}</span>
              </Link>
              <p className="text-gray-600">
                {dayjs(x.createdAt).format("MMM DD")}
              </p>
            </div>
          ))}
        </div>

        <Link href="/news/video">
          <>
            <button type="button" className={styles.moreVideosBtn}>
              More Videos
            </button>
          </>
        </Link>
      </div>
    </>
  );
};

export default VideoNewsSidebar;
