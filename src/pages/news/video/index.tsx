import type { NextPage } from "next";
import clsx from "clsx";

import { useQuery } from "react-query";
import { vcms } from "~/src/lib/vcms-factory.lib";

import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { ContentWrapper } from "~/src/components-news/ContentWrapper/ContentWrapper.component";
import { NewsVideosPagesHeader } from "~/src/components-news/NewsPagesHeaders/NewsVideosPagesHeaders.component";
import { VideoPagesTopSection } from "~/src/components-news/VideoPagesTopSection/VideoPagesTopSection.component";
import { Playlist } from "~/src/components-news/Playlist/Playlist.component";

const VideosLandingPage: NextPage = () => {
  return (
    <LayoutNewsLanding title="Videos" enableDarkBG={true}>
      <div className="bg-[#192732] pt-14 text-white">
        <ContentWrapper>
          <NewsVideosPagesHeader />
        </ContentWrapper>
      </div>
      <VideoPage />
    </LayoutNewsLanding>
  );
};

export default VideosLandingPage;

const VideoPage = () => {
  const { data } = useQuery(vcms.allVideosPage());

  const videos = data?.VideoVideosListPageExternal;

  return (
    <>
      <VideoPagesTopSection
        featuredVideo={videos?.featured}
        upNextVideos={videos?.upNext}
      />
      <div>
        <ContentWrapper className="pb-10 border-b border-b-white/10">
          <Playlist.Title>Latest Videos</Playlist.Title>
          <Playlist.Row>
            {!videos?.latest?.length
              ? Array.from(Array(8).keys()).map((_, idx) => (
                  <Playlist.TeaserItemLoading key={idx} />
                ))
              : videos?.latest
                  ?.slice(0, 4)
                  ?.map((x) => (
                    <Playlist.TeaserItem
                      key={x.id}
                      video={x}
                      hidePlaylistLink={false}
                    />
                  ))}
          </Playlist.Row>
        </ContentWrapper>
      </div>
      <div>
        {videos?.categories?.map((cat, idx) => (
          <ContentWrapper
            key={cat.id}
            className={clsx(
              "pb-10",
              idx !== videos?.categories?.length - 1
                ? "border-b border-b-white/10"
                : null,
            )}
          >
            <Playlist.Title>{cat.name}</Playlist.Title>
            <Playlist.Row>
              {cat?.snippets?.slice(0, 4)?.map((x) => (
                <Playlist.TeaserItem
                  key={x.id}
                  video={x}
                  hidePlaylistLink={false}
                />
              ))}
            </Playlist.Row>
          </ContentWrapper>
        ))}
      </div>
    </>
  );
};
