import React, {
  FC,
  Fragment,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import type { GetServerSideProps, NextPage } from "next";
import type {
  ArticleTeaserFragmentFragment,
  Author,
  Tag,
  Sponsored,
} from "~/src/generated";

import { useQuery } from "react-query";
import clsx from "clsx";

import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";

import {
  TeaserCardMobile,
  TeaserTextOnly,
  TeaserCard,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import NewsMeta from "~/src/components/news/meta";
import { SocialsKitco } from "~/src/components/socials/socials-kitco.component";
import { news } from "~/src/lib/news-factory.lib";
import { AuthorImage } from "~/src/components/image-with-fallback/image-with-fallback.component";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { TagLink } from "~/src/components/tag-link/tag-link.component";
import { articleDate } from "~/src/utils/article-date.util";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import useRecordView from "~/src/utils/useRecordView";
import { useVideoPlayer } from "~/src/components-news/VideoPlayer/useVideoPlayer.util";
import styles from "./investment-trends-alias.module.scss";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import useScreenSize from "~/src/utils/useScreenSize";
import ArticleComment from "~/src/components-news/ArticleComment/ArticleComment";
import ArticleAudioPlayer from "~/src/components-news/ArticleAudioPlayer/ArticleAudioPlayer";
import cs from "~/src/utils/cs";
import Link from "next/link";
import { NewsCategoryTitleDetailPage } from "~/src/components/news-category/news-category.component";
import StrippedString from "~/src/utils/strippedString";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import AuthorDetails from "~/src/components-news/AuthorDetails/AuthorDetails";
import { NoRelatedArticlesShowLatestNews } from "~/src/components-news/RelatedNews/RelatedNews";
import Script from "next/script";

interface ArticleProps {
  articleData: Sponsored;
  refTitle?: LegacyRef<HTMLHeadingElement>;
  heightTitle?: number;
}

interface AuthorProps {
  authorData: Author;
  publishDate: string;
  updateDate: string;
}

export const getServerSideProps: GetServerSideProps = async (c) => {
  const slugs = c.query.alias as Array<string>;
  const fullSlug = `/opinions/investment-trends/${slugs.join("/")}`;
  const auHash = c?.query?.auHash ?? ("" as any);

  const { dehydratedState } = await ssrQueries({
    queries: [
      news.nodeByUrlAlias({
        variables: { urlAlias: fullSlug, auHash },
      }),
      news.sponsoredContent({
        variables: {
          limit: 4,
          offset: 0,
        },
      }),
      news.newsTrending({
        variables: { limit: 10 },
      }),
    ],
  });

  for (const x of dehydratedState.queries) {
    const queryKey = x.queryKey.find((item) => item.urlAlias || false);
    if (queryKey?.urlAlias === fullSlug && !x.state.data.nodeByUrlAlias) {
      return { notFound: true };
    }
  }

  return {
    props: {
      dehydratedState,
      urlAlias: fullSlug,
      auHash,
    },
  };
};

const listAuthorStr = (data: Sponsored) => {
  const authorData = data?.author;
  const unifyAuthors: Array<Author> = [authorData];

  let listAuthorString = "By ";
  unifyAuthors?.forEach((x, idx) => {
    listAuthorString += `${x?.name}${
      idx !== unifyAuthors?.length - 1 ? " and " : ""
    }`;
  });

  return listAuthorString;
};

const ArticlePage: NextPage<{ urlAlias: string; auHash?: string }> = ({
  urlAlias,
  auHash,
}) => {
  const { data } = useQuery(
    news.nodeByUrlAlias({
      variables: { urlAlias, auHash },
    }),
  );

  useRecordView(Boolean(data), data?.nodeByUrlAlias?.id);

  const articleData = data?.nodeByUrlAlias as Sponsored;

  if (!articleData)
    return (
      <LayoutNewsLanding title={data?.nodeByUrlAlias?.title + " | Kitco News"}>
        <div className="flex mx-auto w-full px-4 max-w-full md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
          <h1 className="text-xl">Not found!</h1>
        </div>
      </LayoutNewsLanding>
    );

  const { isMobile } = useScreenSize();

  const pFirst = StrippedString(
    articleData?.bodyWithEmbeddedMedia.value,
  )?.replace("&nbsp;", " ");

  return (
    <LayoutNewsLanding title={data?.nodeByUrlAlias?.title + " | Kitco News"}>
      <NewsMeta
        title={data?.nodeByUrlAlias?.title}
        image={articleData?.image?.detail?.default?.srcset}
        description={pFirst}
        authorTwitter={articleData?.author?.twitterId}
      />
      {isMobile && <ArticleMobile articleData={articleData} />}
      {!isMobile && <ArticleDesktopAndTablet articleData={articleData} />}
    </LayoutNewsLanding>
  );
};

export default ArticlePage;

const ArticleDesktopAndTablet: FC<ArticleProps> = ({ articleData }) => {
  const [heightTitle, setHeightTitle] = useState(0);
  const refTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setHeightTitle(refTitle?.current.clientHeight);
  });

  return (
    <div className="flex mx-auto w-full px-4 max-w-full md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
      <LeftContent articleData={articleData} heightTitle={heightTitle} />
      <ArticleContent articleData={articleData} refTitle={refTitle} />
    </div>
  );
};

const LeftContent: FC<ArticleProps> = ({ articleData, heightTitle }) => {
  return (
    <div className="w-[190px]">
      <NewsCategoryTitleDetailPage
        category="opinions/investment-trends"
        heightTitle={heightTitle}
      />
      <AuthorBlock
        authorData={articleData?.author}
        publishDate={articleData?.createdAt}
        updateDate={articleData?.updatedAt}
      />
      {!!articleData?.source && (
        <SourceBlock
          name={articleData?.source?.name}
          description={articleData?.source?.description}
          subtitle={articleData?.source?.subtitle}
        />
      )}
      <AudioPlayer articleData={articleData} />
      <Spacer className="h-[30px]" />
      <SocialsKitco
        className="justify-between mx-3"
        hidePrint={true}
        listAuthorStr={listAuthorStr(articleData)}
      />
      <Spacer className="h-[30px]" />
      <AdvertisingSlot
        viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
        id={"right-banner-1"}
        className={"min-h-[600px] w-[160px] mx-auto bg-red-500"}
      />
    </div>
  );
};

const ArticleContent: FC<ArticleProps> = ({ articleData, refTitle }) => {
  return (
    <div className="w-[calc(100%_-_190px)] pl-10">
      <article>
        <h1
          className="text-[34px] leading-[39px] font-bold !font-lato mb-6"
          ref={refTitle}
        >
          {articleData?.title}
        </h1>
        <div className="flex gap-10 justify-items-end">
          <div className="col-span-1 lg:col-span-2">
            <ImageMS
              src={
                articleData?.image?.detail?.default?.srcset ??
                articleData?.legacyThumbnailImageUrl
              }
              alt={`${articleData?.title} teaser image`}
              priority={true}
              width={600}
              height={340}
              service="icms"
              className="rounded-md aspect-video"
            />
            <BodyBlock body={articleData?.bodyWithEmbeddedMedia} />
            <Spacer className="h-6" />
            <AuthorDetails authorData={articleData?.author} />
            {articleData?.tags && articleData?.tags.length ? (
              <>
                <Spacer className="h-6" />
                <Tags data={articleData?.tags} />
              </>
            ) : (
              <></>
            )}
            <Spacer className="h-6" />
            <Disclaimer />
            <Spacer className="h-6" />
            <ArticleComment />
            <Spacer className="h-6" />
            <RelatedArticles currentNodeId={articleData?.id} />
          </div>
          <aside className="hidden lg:col-span-1 lg:block w-[300px]">
            <AdvertisingSlot
              viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
              id={"right-banner-2"}
              className={"min-h-[250px] w-[300px] mx-auto bg-red-500 mb-10"}
            />
            <div className="border border-ktc-borders rounded-md p-5">
              <TrendingNowSection />
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

const ArticleMobile: FC<ArticleProps> = ({ articleData }) => {
  return (
    <div className="flex mx-auto w-full px-5 max-w-full md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
      <div className="w-full">
        <NewsCategoryTitleDetailPage category="opinions/investment-trends" />
        <article>
          <h1 className="text-[34px] leading-[39px] font-bold !font-lato mb-6">
            {articleData?.title}
          </h1>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="col-span-1 lg:col-span-2">
              <AuthorBlockMobile
                authorData={articleData?.author}
                publishDate={articleData?.createdAt}
                updateDate={articleData?.updatedAt}
              />
              {!!articleData?.source && (
                <SourceBlock
                  name={articleData?.source?.name}
                  description={articleData?.source?.description}
                  subtitle={articleData?.source?.subtitle}
                />
              )}
              <Spacer className="h-[30px]" />
              <div className="flex justify-between">
                <AudioPlayer articleData={articleData} isMobile={true} />
                <SocialsKitco
                  className={cs([
                    "mx-3",
                    articleData?.audioTts?.assetUuid
                      ? "w-1/2 justify-between"
                      : "w-full justify-evenly",
                  ])}
                  hidePrint={true}
                  listAuthorStr={listAuthorStr(articleData)}
                />
              </div>
              <Spacer className="h-[30px]" />
              <ImageMS
                src={
                  articleData?.image?.detail?.default?.srcset ??
                  articleData?.legacyThumbnailImageUrl
                }
                alt={`${articleData?.title} teaser image`}
                priority={true}
                width={304}
                height={170}
                service="icms"
                className="rounded-md aspect-video"
              />
              <BodyBlock body={articleData?.bodyWithEmbeddedMedia} />
              <Spacer className="h-6" />
              <AuthorDetails authorData={articleData?.author} />
              {articleData?.tags && articleData?.tags.length ? (
                <>
                  <Spacer className="h-6" />
                  <Tags data={articleData?.tags} />
                </>
              ) : (
                <></>
              )}
              <Spacer className="h-6" />
              <LowerShareBlock articleData={articleData} />
              <Spacer className="h-6" />
              <Disclaimer />
              <Spacer className="h-6" />
              <ArticleComment />
              <Spacer className="h-6" />
              <RelatedArticles currentNodeId={articleData?.id} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

const AuthorBlock: FC<AuthorProps> = ({
  authorData,
  publishDate,
  updateDate,
}) => {
  const unifyAuthors: Array<Author> = [authorData];
  const isMultiAuthor: boolean = unifyAuthors?.length >= 2;

  return (
    <>
      <div className="">
        <div className="flex items-center w-full pb-2.5 -space-x-[0.75em]">
          {unifyAuthors?.map((x, idx) => (
            <AuthorImage
              src={x?.imageUrl}
              className={clsx(
                "rounded-full h-20 w-20 object-cover",
                isMultiAuthor ? "border-2 border-white" : undefined,
              )}
              style={{
                zIndex: 100 - idx,
              }}
              urlAlias={x.urlAlias}
              key={x.id + idx}
            />
          ))}
        </div>
        <div>
          <h6 className="font-medium tracking-[0.0168em]">
            <span>By&nbsp;</span>
            {unifyAuthors?.map((x, idx) => (
              <Fragment key={idx}>
                <Link
                  href={x.urlAlias}
                  className="font-bold text-sm text-[#373737]"
                  key={x.id + idx}
                >
                  {x?.name}
                </Link>
                {idx !== unifyAuthors?.length - 1 ? (
                  <span>&nbsp;and&nbsp;</span>
                ) : null}
              </Fragment>
            ))}
          </h6>
          <Spacer className="h-[30px]" />
          <div>
            <div className="text-ktc-desc-gray font-bold text-xs">
              Published:
            </div>
            <time className="text-ktc-gray text-xs">
              {articleDate(publishDate)}
            </time>
          </div>
          <div>
            <div className="text-ktc-desc-gray font-bold text-xs mt-2">
              Updated:
            </div>
            <time className="text-ktc-gray text-xs">
              {articleDate(updateDate)}
            </time>
          </div>
        </div>
      </div>
    </>
  );
};

const SourceBlock: FC<{
  name: string;
  description: string;
  subtitle: string;
}> = ({ name, description, subtitle }) => {
  if (!name && !description && !subtitle) return null;
  return (
    <>
      <Spacer className="h-[30px]" />
      <div className="text-base leading-5 bg-[#f8f8f8] border border-gray-300 flex flex-col items-start p-2.5">
        <h5>
          <div className="font-bold">{name}</div>
          <div className="font-normal">{subtitle}</div>
        </h5>
        <div
          className="pt-2 text-ktc-desc-gray font-normal text-xs "
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </>
  );
};

const AuthorBlockMobile: FC<AuthorProps> = ({
  authorData,
  publishDate,
  updateDate,
}) => {
  const unifyAuthors: Array<Author> = [authorData];
  const isMultiAuthor: boolean = unifyAuthors?.length >= 2;

  return (
    <div className="flex justify-between">
      <div className="flex w-full -space-x-[0.75em]">
        {unifyAuthors?.map((x, idx) => (
          <AuthorImage
            src={x?.imageUrl}
            className={clsx(
              "rounded-full h-10 w-10 object-cover",
              isMultiAuthor ? "border-2 border-white" : undefined,
            )}
            style={{
              zIndex: 100 - idx,
            }}
            urlAlias={x.urlAlias}
            key={x.id + idx}
          />
        ))}
        <div className="pl-6">
          <h6 className="text-[16px] leading-[23px] tracking-[0.0168em] font-normal">
            <span>By&nbsp;</span>
            {unifyAuthors?.map((x, idx) => (
              <Fragment key={idx}>
                <Link
                  href={x.urlAlias}
                  className="font-bold text-[#373737]"
                  key={x.id + idx}
                >
                  {x?.name}
                </Link>
                {idx !== unifyAuthors?.length - 1 ? (
                  <span>&nbsp;and&nbsp;</span>
                ) : null}
              </Fragment>
            ))}
          </h6>
          <div>
            <span className="text-ktc-date-gray font-normal">
              Published&nbsp;
            </span>
            <time className="text-ktc-date-gray font-normal">
              {articleDate(publishDate)}
            </time>
          </div>
          <div>
            <span className="text-ktc-date-gray font-normal">
              Updated&nbsp;
            </span>
            <time className="text-ktc-date-gray font-normal">
              {articleDate(updateDate)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

const LowerShareBlock: FC<{ articleData: Sponsored }> = ({ articleData }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h3 className="font-bold text-[16px] underline">Share</h3>
      <SocialsKitco
        className="gap-4"
        listAuthorStr={listAuthorStr(articleData)}
      />
    </div>
  );
};

const Tags: FC<{ data: Tag[] }> = ({ data }) => {
  return (
    <div className="p-5 border border-ktc-borders rounded-xl">
      <h3 className="pb-2 font-mulish leading-5">
        <span>Tags:</span>
      </h3>
      <div className="flex gap-2 flex-wrap">
        {data?.map((t, idx) => (
          <TagLink key={idx} href={t.urlAlias} name={t.name} />
        ))}
      </div>
    </div>
  );
};

const Disclaimer = () => {
  return (
    <div className="text-xs text-ktc-gray text-[10px] leading-[14px] mb-10">
      <span className="text-ktc-desc-gray font-bold">Disclaimer:&nbsp;</span>
      The views expressed in this article are those of the author and may not
      reflect those of Kitco Metals Inc. The author has made every effort to
      ensure accuracy of information provided; however, neither Kitco Metals
      Inc. nor the author can guarantee such accuracy. This article is strictly
      for informational purposes only. It is not a solicitation to make any
      exchange in commodities, securities or other financial instruments. Kitco
      Metals Inc. and the author of this article do not accept culpability for
      losses and/ or damages arising from the use of this publication.
    </div>
  );
};

function BodyBlock({
  body,
}: {
  body: Sponsored["bodyWithEmbeddedMedia"];
}): JSX.Element {
  useVideoPlayer({
    multiple: body.embeddedMedia?.map((x) => ({
      assetUuid: x?.assetUuid,
      startTime: x?.startTime,
      endTime: x?.endTime,
      snippetUuid: x?.snippetUuid,
      thumbnailUuid: x?.thumbnailUuid,
      assetType: "video",
      manuallyCreateParentNodes: true,
    })),
  });

  useEffect(() => {
    const parent = document.querySelectorAll("#articleBody p");

    const elementHasImg = Array.from(parent).filter((item) => {
      const img = item.querySelectorAll("img");

      if (img.length === 0) return false;

      return item;
    });

    elementHasImg.forEach((item) => {
      return (item.outerHTML = item.outerHTML.replaceAll("\n", ""));
    });
  }, [body]);

  const [scriptData, setScriptData] = useState<HTMLScriptElement[]>([]);
  //  Sometimes users add script tags in the WYSIWYG editor, for example Twitter Embeds.
  //  ReactHtmlParser will not parse script tags, so we must do that separately.
  //  Traditionally, this was done creating and injecting <script> tags, however this
  //  caused an issue where the script would run before the html was available, even when
  //  respecting the original scripts async and defer properties.  By using nextJS's <Script />
  //  component, we are able to respect React LifeCycles which solves this issue.
  useEffect(() => {
    if (typeof window === "undefined") return;
    //create an element and add the bodyHTML so that we can parse out script tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = body?.value;
    const scripts = tempDiv.querySelectorAll(
      "script",
    ) as unknown as HTMLScriptElement[];

    if (scripts) {
      setScriptData([...scripts]);
    }
  }, [body]);

  return (
    <>
      <div
        className={clsx(
          "text-base relative",
          styles.articleBodyStyles,
          styles.articleWrapper,
        )}
        id="articleBody"
        dangerouslySetInnerHTML={{
          __html: body?.value,
        }}
      />
      {scriptData &&
        scriptData.map((element, index) => {
          //  iterate over each script tag which was found, and create a nextJs <Script/> component instead
          //  note that "lazyOnLoad' strategy works well for Twitter embeds, but if this causes issues with
          //  other use cases, perhaps we should use "afterInteractive" (the default) if the original script
          //  tag has the "defer" property set
          return (
            <Script
              key={`script-${index}`}
              id={element?.id}
              src={element?.src}
              strategy={"lazyOnload"}
            />
          );
        })}
    </>
  );
}

const TrendingNowSection: FC = () => {
  const { data } = useQuery(
    news.newsTrending({
      variables: { limit: 10 },
    }),
  );
  return (
    <div className="flex flex-col">
      <h3 className={"text-[20px] pb-2.5 border-b border-ktc-borders"}>
        <span>Trending News</span>
      </h3>
      <div className="flex flex-grow flex-col justify-between">
        {data?.nodeListTrending
          ?.slice(0, 5)
          .map((x: ArticleTeaserFragmentFragment) => {
            return (
              <div className="flex mt-5" key={x.id}>
                <TeaserTextOnly
                  key={x?.id}
                  node={x}
                  hideSummary={true}
                  size={"sm"}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const AudioPlayer: FC<{
  articleData: ArticleProps["articleData"];
  isMobile?: boolean;
}> = ({ articleData, isMobile = false }) => {
  if (!articleData?.audioTts?.assetUuid) return;

  if (isMobile) {
    return (
      <div className="w-1/2">
        <ArticleAudioPlayer
          assetSnippetUuid={articleData?.audioTts?.assetUuid}
        />
      </div>
    );
  }

  return (
    <>
      <Spacer className="h-[30px]" />
      <ArticleAudioPlayer assetSnippetUuid={articleData?.audioTts?.assetUuid} />
    </>
  );
};

const RelatedArticles: FC<{ currentNodeId: number }> = ({ currentNodeId }) => {
  const { data } = useQuery(
    news.sponsoredContent({
      variables: {
        limit: 4,
        offset: 0,
      },
    }),
  );

  const filterCurrentFromData = () => {
    return data?.nodeList?.items
      ?.filter((x: ArticleTeaserFragmentFragment) => x.id !== currentNodeId)
      .slice(0, 3);
  };

  const { isMobile } = useScreenSize();

  const articles = filterCurrentFromData();
  const ShowTeaserCard = () => {
    return (
      <>
        {articles?.map((article: ArticleTeaserFragmentFragment) => {
          return !isMobile ? (
            <TeaserCard key={article.id} node={article} size="sm" />
          ) : (
            <TeaserCardMobile key={article.id} node={article} size="sm" />
          );
        })}
      </>
    );
  };

  const classTeaserCard = () => {
    if (isMobile) return "grid grid-row-3 gap-10";

    return "grid grid-cols-3 gap-10";
  };

  return (
    <aside>
      <h2 className="text-2xl border-b border-ktc-borders pb-2.5 mb-5 font-mulish">
        Related Articles
      </h2>
      {!articles?.length ? (
        <NoRelatedArticlesShowLatestNews
          currentNodeId={currentNodeId}
          classTeaserCard={classTeaserCard()}
          isMobile={isMobile}
        />
      ) : (
        <div className={classTeaserCard()}>
          <ShowTeaserCard />
        </div>
      )}
    </aside>
  );
};
