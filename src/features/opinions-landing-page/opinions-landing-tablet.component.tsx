import type { FC } from "react";
import type { Commentary } from "~/src/generated";

import { TeaserTextOnlyWithAuthor } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";

import cs from "~/src/utils/cs";
import React from "react";
import { useParams, useInfinite } from "~/src/utils/infiniteScroll";
import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import { NewsCategoryTitle } from "~/src/components/news-category/news-category.component";
import { GenericNewsListWithAuthor } from "~/src/components/generic-news-list/generic-news-list.component";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import clsx from "clsx";
import Link from "next/link";

export const OpinionsLandingTablet: FC<any> = () => {
  const { params, incrementParams } = useParams(10);
  const { data } = useQuery(
    news.newsCommentaries({
      variables: { ...params },
      options: { enabled: true },
    }),
  );
  const { ref, items, loading } = useInfinite({
    items: data?.commentaries?.items,
    incrementParams,
    total: data?.commentaries?.total,
  });

  const fetched = items as Commentary[];

  // Fetch only the first one
  const heroOpinion = fetched?.[0];

  // Fetch the next 3
  const otherOpinions = fetched?.slice(1, 4);

  return (
    <LayoutNewsLanding title="Opinions">
      <ContentWrapper>
        <NewsCategoryTitle />
      </ContentWrapper>

      <div>
        <ContentWrapper>
          <FirstSectionTablet
            heroOpinion={heroOpinion}
            topSectionOpinions={otherOpinions}
          />
        </ContentWrapper>
        <ContentWrapper>
          <GenericNewsListWithAuthor data={fetched?.slice(4)} />
          <div ref={ref}>{loading && <div>Loading...</div>}</div>
        </ContentWrapper>
      </div>
    </LayoutNewsLanding>
  );
};

const ContentWrapper: FC<{
  children: any;
  className?: string;
}> = ({ children, className }) => (
  <div className={cs([className, "px-4 mx-auto w-auto md:px-10 lx:px-0"])}>
    {children}
  </div>
);

const FirstSectionTablet: FC<{
  heroOpinion: Commentary;
  topSectionOpinions: Commentary[];
}> = ({ heroOpinion, topSectionOpinions }) => {
  return (
    <div className="flex flex-col pb-10 border-b border-ktc-borders lg:flex-row">
      <div className="w-full border-0 border-ktc-borders lg:w-[53.4%] lg:pr-[40px] md:pb-[40px] lg:pb-0 md:border-b lg:border-0">
        <div className="mb-2 overflow-hidden">
          <Link href={heroOpinion?.urlAlias ?? "/"}>
            <ImageMS
              src={
                heroOpinion?.image?.detail?.default?.srcset ??
                heroOpinion?.legacyThumbnailImageUrl
              }
              alt={`${heroOpinion?.title} teaser image`}
              priority={true}
              width={1202}
              height={676}
              service="icms"
              className={clsx(
                "w-full",
                "relative",
                "rounded-lg aspect-video mb-2.5",
              )}
            />
          </Link>
        </div>
        <TeaserTextOnlyWithAuthor
          node={heroOpinion as any}
          size="xxl"
          hideCategory={true}
          hideSummary={false}
        />
      </div>
      <div className="w-full pl-0 mt-10 flex flex-col lg:w-[calc(100%_-_53.4%_+_40px)] lg:pl-[40px] lg:mt-0 border-l-ktc-borders lg:border-l">
        <div className="flex flex-col gap-10">
          {topSectionOpinions.map((x) => (
            <TeaserTextOnlyWithAuthor
              node={x as any}
              size="md"
              hideCategory={true}
              hideSummary={false}
              key={x?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
