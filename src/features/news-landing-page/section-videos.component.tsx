import Carousel, { ScrollMode } from "nuka-carousel";
import { useRef, type FC, useEffect } from "react";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { NewsContentWrapperWithOverflow } from "~/src/components/news-content-wrapper/news-content-wrapper.component";
import cs from "~/src/utils/cs";

import { useQuery } from "react-query";
import { vcms } from "~/src/lib/vcms-factory.lib";
import styles from "./section-videos.module.scss";
import { Playlist } from "~/src/components-news/Playlist/Playlist.component";
import useElementSize from "~/src/utils/useElementSize";

// used in desktop version and tablet version
export const VideosSection: FC<{
  slidesToShow: number;
}> = ({ slidesToShow = 1.5 }) => {
  const { data } = useQuery(
    vcms.listVideos({
      variables: {
        limit: 10,
        offset: 0,
      },
    }),
  );
  const sliderButtonsClasses = "text-white";
  const btnPreRef = useRef(null);
  const btnNext = useRef(null);
  const { ref, size } = useElementSize();

  const handlePositionControls = () => {
    const withOneImage = (size.width - 12 * 4) / slidesToShow; // withOneImage = (with frame - gap * gap number) / image number
    const heightOnceImage = Math.ceil((9 / 16) * withOneImage); // Use the 16/9 ratio to calculate image height

    btnPreRef.current.style.top = `${heightOnceImage / 2 + 16}px`; // top = (image height / 2) + height icon / 2
    btnNext.current.style.top = `${heightOnceImage / 2 + 16}px`;
  };

  useEffect(() => {
    handlePositionControls();
  }, [size, btnPreRef, btnNext]);

  return (
    <div className="py-10 lg:py-12 bg-[#232323] overflow-hidden xl:py-14">
      <NewsContentWrapperWithOverflow>
        <h2
          className={cs([
            "text-[24px] md:text-[32px] font-mulish leading-[132%]",
          ])}
          style={{ color: "white" }}
        >
          <span>Video News</span>
        </h2>
      </NewsContentWrapperWithOverflow>

      <div
        className={cs(["px-5 mx-auto w-auto max-w-[1240px] md:px-10 2xl:px-0"])}
        ref={ref}
      >
        <Carousel
          animation="fade"
          className="py-6"
          swiping={true}
          scrollMode={ScrollMode.remainder}
          slidesToShow={slidesToShow}
          cellSpacing={12}
          dragging={true}
          defaultControlsConfig={{
            pagingDotsClassName: "p-2 relative",
            pagingDotsContainerClassName: styles.carouselBullets,
            pagingDotsStyle: {
              fill: "white",
              width: "12",
              height: "12",
            },
          }}
          renderTopCenterControls={() => <></>}
          renderCenterLeftControls={({ previousSlide }) => (
            <button
              className={sliderButtonsClasses}
              onClick={previousSlide}
              ref={btnPreRef}
            >
              <BsChevronLeft size={32} strokeWidth={1} />
            </button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button
              className={sliderButtonsClasses}
              onClick={nextSlide}
              ref={btnNext}
            >
              <BsChevronRight size={32} strokeWidth={1} />
            </button>
          )}
        >
          {data?.VideoSearchSnippets?.snippets?.map((x: any) => {
            return (
              <div className="" key={x.id}>
                <Playlist.TeaserItem
                  key={x.id}
                  video={x}
                  hidePlaylistLink={false}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
