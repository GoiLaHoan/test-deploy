import { useQuery } from "react-query";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { ContentWrapper } from "~/src/components-news/ContentWrapper/ContentWrapper.component";
import { NewsVideosPagesCategoryAndDetailHeader } from "~/src/components-news/NewsPagesHeaders/NewsVideosPagesHeaders.component";
import { Playlist } from "~/src/components-news/Playlist/Playlist.component";
import { VideoPagesTopSection } from "~/src/components-news/VideoPagesTopSection/VideoPagesTopSection.component";
import { vcms } from "~/src/lib/vcms-factory.lib";
import { useRouter } from "next/router";

const VideoByAliasPage = () => {
  const r = useRouter();
  const urlAlias = `/news/video/${r.query.date}/${r.query.alias}`;

  const { data } = useQuery(
    vcms.videoByAlias({
      variables: { urlAlias },
    }),
  );

  const catVids = data?.VideoExternalGetVideoByAlias?.categoryVideos;
  return (
    <LayoutNewsLanding title="Videos" enableDarkBG={true}>
      <div className="bg-[#192732] pt-14 text-white">
        <ContentWrapper>
          <NewsVideosPagesCategoryAndDetailHeader
            routeLabel={data?.VideoExternalGetVideoByAlias?.category?.name}
          />
        </ContentWrapper>
      </div>
      <VideoPagesTopSection
        featuredVideo={data?.VideoExternalGetVideoByAlias?.featured}
        upNextVideos={data?.VideoExternalGetVideoByAlias?.upNext}
      />
      <div>
        <ContentWrapper className="pb-10 border-b border-b-white/10">
          <Playlist.Row className="pt-12">
            {!catVids?.length
              ? Array.from(Array(8).keys()).map((_, idx) => (
                  <Playlist.TeaserItemLoading key={idx} />
                ))
              : catVids
                  ?.slice(1, 5)
                  .map((x) => (
                    <Playlist.TeaserItem
                      key={x.id}
                      video={x}
                      hidePlaylistLink={false}
                    />
                  ))}
          </Playlist.Row>
          <Playlist.Row className="pt-12">
            {catVids?.slice(6, 10).map((x) => (
              <Playlist.TeaserItem
                key={x.id}
                video={x}
                hidePlaylistLink={false}
              />
            ))}
          </Playlist.Row>
          <Playlist.Row className="py-12">
            {catVids?.slice(11, 15).map((x) => (
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
        <ContentWrapper className="pb-10 border-b border-b-white/10">
          <Playlist.Title>Latest Videos</Playlist.Title>
          <Playlist.Row>
            {data?.VideoExternalGetVideoByAlias?.latest.map((x) => (
              <Playlist.TeaserItem
                key={x.id}
                video={x}
                hidePlaylistLink={false}
              />
            ))}
          </Playlist.Row>
        </ContentWrapper>
      </div>
    </LayoutNewsLanding>
  );
};

export default VideoByAliasPage;
