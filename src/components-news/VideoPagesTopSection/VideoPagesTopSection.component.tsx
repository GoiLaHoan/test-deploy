import type { VideoSnippetFragmentFragment } from "~/src/generated";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper.component";
import { FeaturedVideo } from "../FeaturedVideo/FeaturedVideo.component";
import {
  LittleVideoTeaser,
  LittleVideoTeaserLoading,
} from "../LittleVideoTeaser/LittleVideoTeaser.component";

export function VideoPagesTopSection({
  featuredVideo,
  upNextVideos,
}: {
  featuredVideo: VideoSnippetFragmentFragment | undefined;
  upNextVideos: Array<VideoSnippetFragmentFragment>;
}) {
  return (
    <section className="bg-[#192732] py-4 text-white md:py-10">
      <ContentWrapper className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          <FeaturedVideo video={featuredVideo} />
        </div>
        <div className="pt-6 border-t border-t-white/10 md:border-t-0 md:pt-0">
          <h4 className="uppercase text-xl pb-6 leading-none">Up next</h4>
          <ul className="flex flex-col gap-4 mb-8">
            {!upNextVideos?.length
              ? Array.from(Array(5).keys()).map((_, idx: number) => (
                  <LittleVideoTeaserLoading key={idx} />
                ))
              : upNextVideos?.map((video) => (
                  <LittleVideoTeaser video={video as any} key={video.id} />
                ))}
          </ul>
          <div className="w-[300px] h-[250px] bg-ktc-date-gray">
            advert 300x250
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
