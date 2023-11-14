import { useQuery } from "react-query";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { ContentWrapper } from "~/src/components-news/ContentWrapper/ContentWrapper.component";
import { NewsVideosPagesCategoryAndDetailHeader } from "~/src/components-news/NewsPagesHeaders/NewsVideosPagesHeaders.component";
import { Playlist } from "~/src/components-news/Playlist/Playlist.component";
import { VideoPagesTopSection } from "~/src/components-news/VideoPagesTopSection/VideoPagesTopSection.component";
import { vcms } from "~/src/lib/vcms-factory.lib";
import { useRouter } from "next/router";

const NewsVideoCategoryPage = () => {
  const r = useRouter();
  const urlAlias = `/${r.query.date}`;
  const { data } = useQuery(
    vcms.allVideosByPlaylistUrlAlias({
      variables: { urlAlias },
    }),
  );

  const catVids = data?.VideoGetAllByCategoryUrlAlias?.videos;

  // function to convert urlAlias to human readable strin
  function routeLabel() {
    const strippedString = r.asPath.replace("/news/video/", "");
    const decodedString = strippedString.replace(/^\//, "").replace(/-/g, " ");

    // Capitalize the first letter of each word
    const humanReadableCategoryName = decodedString.replace(/\b\w/g, (match) =>
      match.toUpperCase(),
    );

    return (
      data?.VideoGetAllByCategoryUrlAlias?.category?.name ??
      humanReadableCategoryName
    );
  }

  return (
    <LayoutNewsLanding title="Videos" enableDarkBG={true}>
      <div className="bg-[#192732] pt-14 text-white">
        <ContentWrapper>
          <NewsVideosPagesCategoryAndDetailHeader routeLabel={routeLabel()} />
        </ContentWrapper>
      </div>
      <VideoPagesTopSection
        featuredVideo={data?.VideoGetAllByCategoryUrlAlias?.videos?.[0]}
        upNextVideos={data?.VideoGetAllByCategoryUrlAlias?.upNext}
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
            {data?.VideoGetAllByCategoryUrlAlias?.latest.map((x) => (
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

export default NewsVideoCategoryPage;
