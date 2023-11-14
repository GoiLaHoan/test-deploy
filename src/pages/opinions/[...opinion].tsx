import type { GetServerSideProps } from "next";
import React, {
  FC,
  Fragment,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import { opinions } from "~/src/lib/opinions-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import {
  ArticleTeaserFragmentFragment,
  Author,
  Commentary,
  OpinionsByCategoryGenericQuery,
  Tag,
} from "~/src/generated";
import useScreenSize from "~/src/utils/useScreenSize";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import NewsMeta from "~/src/components/news/meta";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { SocialsKitco } from "~/src/components/socials/socials-kitco.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import { FeaturedMedia } from "~/src/components-news/Article/ArticleFeaturedMedia.component";
import clsx from "clsx";
import { AuthorImage } from "~/src/components/image-with-fallback/image-with-fallback.component";
import { TagLink } from "~/src/components/tag-link/tag-link.component";
import { useVideoPlayer } from "~/src/components-news/VideoPlayer/useVideoPlayer.util";
import { news } from "~/src/lib/news-factory.lib";
import {
  TeaserCard,
  TeaserCardMobile,
  TeaserTextOnly,
  TeaserTextOnlyWithAuthor,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import ArticleAudioPlayer from "~/src/components-news/ArticleAudioPlayer/ArticleAudioPlayer";
import { articleDate } from "~/src/utils/article-date.util";
import ArticleComment from "~/src/components-news/ArticleComment/ArticleComment";
import styles from "./opinion.module.scss";
// import useRecordView from "~/src/utils/useRecordView";
import cs from "~/src/utils/cs";
import Link from "next/link";
import StrippedString from "~/src/utils/strippedString";
import {
  NewsCategoryTitle,
  NewsCategoryTitleDetailPage,
} from "~/src/components/news-category/news-category.component";
import { TeasersUnion } from "~/src/types/types";
import { useInfinite, useParams } from "~/src/utils/infiniteScroll";
import { GenericNewsListWithAuthor } from "~/src/components/generic-news-list/generic-news-list.component";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import AuthorDetails from "~/src/components-news/AuthorDetails/AuthorDetails";
import Script from "next/script";

interface OpinionProps {
  opinionData: Commentary;
  heightTitle?: number;
  refTitle?: LegacyRef<HTMLHeadingElement>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const variablesCategory = {
    urlAlias: `/opinion/${ctx.query.opinion[0]}/${ctx.query.opinion[1]}`,
    limit: 4,
    offset: 0,
  };
  const auHash = ctx?.query?.auHash ?? ("" as any);

  const nodeUrlAlias = `/opinions/${ctx.query.opinion[0]}/${ctx.query.opinion[1]}`;

  const { dehydratedState } = await ssrQueries({
    queries: [
      opinions.nodeByUrlAlias({
        variables: {
          urlAlias: nodeUrlAlias,
          auHash,
        },
      }),
      news.newsTrending({
        variables: { limit: 10 },
      }),
    ],
  });

  for (const x of dehydratedState.queries) {
    const queryKey = x.queryKey.find((item) => item.urlAlias || false);
    if (queryKey?.urlAlias === nodeUrlAlias && !x.state.data.nodeByUrlAlias) {
      return { notFound: true };
    }
  }

  return {
    props: {
      dehydratedState,
      urlAlias: nodeUrlAlias,
      variablesCategory,
      auHash,
    },
  };
};

const listAuthorStr = (data: Commentary) => {
  const authorData = data?.author;
  const supportingAuthors = data?.supportingAuthors || [];
  const unifyAuthors: Array<Author> = [authorData, ...supportingAuthors];

  let listAuthorString = "By ";
  unifyAuthors?.forEach((x, idx) => {
    listAuthorString += `${x?.name}${
      idx !== unifyAuthors?.length - 1 ? " and " : ""
    }`;
  });

  return listAuthorString;
};

const OpinionRouterPage: FC<any> = ({
  urlAlias,
  variablesCategory,
  auHash,
}) => {
  const manipulate = urlAlias
    ?.split("/")
    .filter((x: string) => (x === "opinions" ? false : true));

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const isDate = dateRegex.test(manipulate[1]);

  const { data } = useQuery(
    opinions.nodeByUrlAlias({
      variables: { urlAlias, auHash },
    }),
  );

  const opinionData = data?.nodeByUrlAlias as Commentary;

  if (!opinionData)
    return (
      <LayoutNewsLanding title={`${data?.nodeByUrlAlias?.title} | Kitco News`}>
        <div className="flex mx-auto w-full px-4 max-w-full md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
          <h1 className="text-xl">Not found!</h1>
        </div>
      </LayoutNewsLanding>
    );

  const { isMobile } = useScreenSize();

  // useRecordView(Boolean(opinionData), opinionData?.id);

  const pFirst = StrippedString(
    opinionData?.bodyWithEmbeddedMedia.value,
  )?.replace("&nbsp;", " ");

  if (isDate) {
    return (
      <LayoutNewsLanding title={`${data?.nodeByUrlAlias?.title} | Kitco News`}>
        <NewsMeta
          title={data?.nodeByUrlAlias?.title}
          description={pFirst}
          image={opinionData?.image?.detail?.default?.srcset}
          authorTwitter={opinionData?.author?.twitterId}
        />
        {isMobile && <OpinionMobile opinionData={opinionData} />}
        {!isMobile && <OpinionDesktopAndTablet opinionData={opinionData} />}
      </LayoutNewsLanding>
    );
  }

  return <OpinionsSubcategory urlAlias={variablesCategory?.urlAlias} />;
};

const OpinionDesktopAndTablet: FC<OpinionProps> = ({ opinionData }) => {
  const [heightTitle, setHeightTitle] = useState(0);
  const refTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setHeightTitle(refTitle?.current.clientHeight);
  });

  return (
    <div className="flex mx-auto w-full px-4 max-w-full md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
      <LeftContent opinionData={opinionData} heightTitle={heightTitle} />
      <OpinionContent opinionData={opinionData} refTitle={refTitle} />
    </div>
  );
};

const LeftContent: FC<OpinionProps> = ({ opinionData, heightTitle }) => {
  return (
    <div className="w-[190px]">
      <NewsCategoryTitleDetailPage
        category={"/opinions"}
        heightTitle={heightTitle}
      />
      <AuthorBlock
        authorData={opinionData?.author}
        publishDate={opinionData?.createdAt}
        updateDate={opinionData?.updatedAt}
        supportingAuthors={opinionData?.supportingAuthors}
      />
      {opinionData?.source !== null && (
        <>
          <Spacer className="h-[30px]" />
          <SourceBlock
            name={opinionData?.source?.name}
            description={opinionData?.source?.description}
            subtitle={opinionData?.source?.subtitle}
          />
        </>
      )}
      <AudioPlayer opinionData={opinionData} />
      <Spacer className="h-[30px]" />
      <SocialsKitco
        className="justify-between mx-3"
        hidePrint={true}
        listAuthorStr={listAuthorStr(opinionData)}
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

const OpinionContent: FC<OpinionProps> = ({ opinionData, refTitle }) => {
  return (
    <div className="w-[calc(100%_-_190px)] pl-10">
      <article>
        <h1
          className="text-[34px] leading-[39px] font-bold !font-lato mb-6"
          ref={refTitle}
        >
          {opinionData?.title}
        </h1>
        <div className="flex gap-10 lg:grid-cols-3 justify-items-end">
          <div className="col-span-1 lg:col-span-2">
            <BulletNews summaryBullets={opinionData?.summaryBullets} />
            <FeaturedMedia articleData={opinionData} />
            <BodyBlock
              body={opinionData?.bodyWithEmbeddedMedia}
              exitsPresentationImage={
                !!opinionData?.image?.detail?.default?.srcset
              }
            />
            <Spacer className="h-6" />
            <AuthorDetails
              authorData={opinionData?.author}
              supportingAuthors={opinionData?.supportingAuthors}
            />
            {opinionData?.tags && opinionData.tags.length ? (
              <>
                <Spacer className="h-6" />
                <Tags data={opinionData?.tags} />
              </>
            ) : (
              <></>
            )}
            <Spacer className="h-6" />
            <Disclaimer />
            <Spacer className="h-6" />
            <ArticleComment />
            <Spacer className="h-6" />
            <RelatedArticles
              currentNodeId={opinionData?.id}
              currentNodeCategory={opinionData?.category?.urlAlias}
            />
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

const OpinionMobile: FC<OpinionProps> = ({ opinionData }) => {
  return (
    <div className="flex mx-auto w-full px-5 max-w-full md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
      <div className="w-full">
        <NewsCategoryTitleDetailPage category={"/opinions"} />
        <article>
          <h1 className="text-[34px] leading-[39px] font-bold !font-lato mb-6">
            {opinionData?.title}
          </h1>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="col-span-1 lg:col-span-2">
              <BulletNews summaryBullets={opinionData?.summaryBullets} />
              <AuthorBlockMobile
                authorData={opinionData?.author}
                publishDate={opinionData?.createdAt}
                updateDate={opinionData?.updatedAt}
                supportingAuthors={opinionData?.supportingAuthors}
              />
              {opinionData?.source !== null && (
                <>
                  <Spacer className="h-[30px]" />
                  <SourceBlock
                    name={opinionData?.source?.name}
                    description={opinionData?.source?.description}
                    subtitle={opinionData?.source?.subtitle}
                  />
                </>
              )}
              <Spacer className="h-[30px]" />
              <div className="flex justify-between">
                <AudioPlayer opinionData={opinionData} isMobile={true} />
                <SocialsKitco
                  className={cs([
                    "mx-3",
                    opinionData?.audioTts?.assetUuid
                      ? "w-1/2 justify-between"
                      : "w-full justify-evenly",
                  ])}
                  hidePrint={true}
                  listAuthorStr={listAuthorStr(opinionData)}
                />
              </div>
              <Spacer className="h-[30px]" />
              <FeaturedMedia articleData={opinionData} />
              <BodyBlock
                body={opinionData?.bodyWithEmbeddedMedia}
                exitsPresentationImage={
                  !!opinionData?.image?.detail?.default?.srcset
                }
              />
              <Spacer className="h-6" />
              <AuthorDetails
                authorData={opinionData?.author}
                supportingAuthors={opinionData?.supportingAuthors}
              />
              {opinionData?.tags && opinionData.tags.length ? (
                <>
                  <Spacer className="h-6" />
                  <Tags data={opinionData?.tags} />
                </>
              ) : (
                <></>
              )}
              <Spacer className="h-6" />
              <LowerShareBlock opinionData={opinionData} />
              <Spacer className="h-6" />
              <Disclaimer />
              <Spacer className="h-6" />
              <ArticleComment />
              <Spacer className="h-6" />
              <RelatedArticles
                currentNodeId={opinionData?.id}
                currentNodeCategory={opinionData?.category?.urlAlias}
              />
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
  supportingAuthors = [],
}) => {
  const unifyAuthors: Array<Author> = [authorData, ...supportingAuthors];
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
              urlAlias={x?.urlAlias}
              key={x?.id}
            />
          ))}
        </div>
        <div>
          <h6 className="font-medium tracking-[0.0168em]">
            <span>By&nbsp;</span>
            {unifyAuthors?.map((x, idx) => (
              <Fragment key={idx}>
                <Link
                  href={x?.urlAlias || ""}
                  className="font-bold text-sm text-[#373737]"
                  key={x?.id + idx}
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

const AuthorBlockMobile: FC<AuthorProps> = ({
  authorData,
  publishDate,
  updateDate,
  supportingAuthors = [],
}) => {
  const unifyAuthors: Array<Author> = [authorData, ...supportingAuthors];
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
            urlAlias={x?.urlAlias}
            key={x?.id + idx}
          />
        ))}
        <div className="pl-6">
          <h6 className="text-[16px] leading-[23px] tracking-[0.0168em] font-normal">
            <span>By&nbsp;</span>
            {unifyAuthors?.map((x, idx) => (
              <Fragment key={idx}>
                <Link
                  href={x?.urlAlias || ""}
                  className="font-bold text-[#373737]"
                  key={x?.id + idx}
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

const LowerShareBlock: FC<{ opinionData: Commentary }> = ({ opinionData }) => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h3 className="font-bold text-[16px] underline">Share</h3>
      <SocialsKitco
        className="gap-4"
        listAuthorStr={listAuthorStr(opinionData)}
      />
    </div>
  );
};

function BulletNews({ summaryBullets }: { summaryBullets: Array<string> }) {
  if (!summaryBullets?.length) {
    return null;
  }

  return (
    <ul
      className={clsx(
        "pl-4 pb-6 text-[16px] font-semibold",
        styles.articleBulletNews,
      )}
    >
      {summaryBullets?.map((x, idx) => (
        <li key={idx}>{x}</li>
      ))}
    </ul>
  );
}

const SourceBlock: FC<{
  name: string;
  description: string;
  subtitle: string;
}> = ({ name, description, subtitle }) => (
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
);

interface AuthorProps {
  authorData: Author;
  publishDate: string;
  updateDate: string;
  supportingAuthors: Commentary["supportingAuthors"];
}

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

const RelatedArticles: FC<{
  currentNodeCategory: string;
  currentNodeId: number;
}> = ({ currentNodeCategory, currentNodeId }) => {
  const { data } = useQuery(
    news.newsCommentaries({
      variables: { limit: 4, offset: 0 },
      options: {
        enabled: true,
        select: (d) => {
          const filterItems = d?.commentaries?.items
            // filter current node
            ?.filter(
              (x: ArticleTeaserFragmentFragment) => x.id !== currentNodeId,
            )
            .slice(0, 3);
          const preserve = { ...d?.commentaries, items: filterItems };

          return { ...d, nodeListByCategory: preserve };
        },
      },
    }),
  );

  function filterCurrentFromData() {
    return data?.commentaries?.items
      ?.filter((x: ArticleTeaserFragmentFragment) => x.id !== currentNodeId)
      .slice(0, 3);
  }

  const { isMobile } = useScreenSize();
  const articles = filterCurrentFromData();

  const ShowTeaserCard = () => {
    return (
      <>
        {articles?.map((article: ArticleTeaserFragmentFragment) => {
          if (article.category?.urlAlias.includes("/opinion/")) {
            return !isMobile ? (
              <TeaserCard
                key={article.id}
                node={{
                  ...article,
                  category: {
                    ...article.category,
                    urlAlias: article.category.urlAlias.replace(
                      "/opinion/",
                      "/opinions/",
                    ),
                  },
                }}
                size="sm"
              />
            ) : (
              <TeaserCardMobile
                key={article.id}
                node={{
                  ...article,
                  category: {
                    ...article.category,
                    urlAlias: article.category.urlAlias.replace(
                      "/opinion/",
                      "/opinions/",
                    ),
                  },
                }}
                size="sm"
              />
            );
          }

          return !isMobile ? (
            <TeaserCard key={article.id} node={article} size="sm" />
          ) : (
            <TeaserCardMobile key={article.id} node={article} size="sm" />
          );
        })}
      </>
    );
  };

  return (
    <aside>
      <h3 className="text-2xl border-b border-ktc-borders pb-2.5 mb-5 font-mulish">
        Related Articles
      </h3>
      {!articles?.length ? (
        <NoRelatedArticlesShowLatestOpinions
          currentNodeId={currentNodeId}
          currentNodeCategory={currentNodeCategory}
          classTeaserCard="grid grid-rows-3 gap-10 lg:grid-cols-3 lg:grid-rows-1"
          isMobile={isMobile}
        />
      ) : (
        <div
          className={clsx(
            "grid grid-rows-3 gap-10 lg:grid-cols-3 lg:grid-rows-1",
          )}
        >
          <ShowTeaserCard />
        </div>
      )}
    </aside>
  );
};

function NoRelatedArticlesShowLatestOpinions(props: {
  currentNodeId: number;
  classTeaserCard: string;
  currentNodeCategory: string;
  isMobile: boolean;
}) {
  // NOTE: trending is not a query, it's preserved state from the ssr query
  const { data } = useQuery(
    opinions.opinionsByCategoryGeneric({
      variables: {
        limit: 5,
        offset: 0,
        urlAlias: props.currentNodeCategory,
      },
      options: {
        enabled: true,
        select: (d) => {
          const filterItems = d?.nodeListByCategory?.items
            ?.filter(
              (x: ArticleTeaserFragmentFragment) =>
                x.id !== props.currentNodeId,
            )
            .slice(0, 3);

          // this mostly just preserves the return type of the query
          const preserveDataModel = {
            ...d?.nodeListByCategory,
            items: filterItems,
          };

          return { ...d, nodeListQueue: preserveDataModel };
        },
      },
    }),
  );

  return (
    <div className={props.classTeaserCard}>
      {data?.nodeListByCategory?.items?.map(
        (article: ArticleTeaserFragmentFragment) => {
          return !props.isMobile ? (
            <TeaserCard key={article.id} node={article} size="sm" />
          ) : (
            <TeaserCardMobile key={article.id} node={article} size="sm" />
          );
        },
      )}
    </div>
  );
}

function BodyBlock({
  body,
  exitsPresentationImage,
}: {
  body: Commentary["bodyWithEmbeddedMedia"];
  exitsPresentationImage?: boolean;
}): JSX.Element {
  useVideoPlayer({
    multiple: body?.embeddedMedia?.map((x) => ({
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
        className={cs([
          "text-base relative",
          styles.articleBodyStyles,
          styles.articleWrapper,
          !exitsPresentationImage && styles.exitsPresentationImage,
        ])}
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
      <h3 className="text-[20px] pb-2.5 border-b border-ktc-borders leading-[26px]">
        <span>Trending News</span>
      </h3>
      <div className="flex flex-grow flex-col justify-between">
        {data?.nodeListTrending
          ?.slice(0, 5)
          .map((x: ArticleTeaserFragmentFragment) => {
            return (
              <div className="flex mt-5" key={x?.id}>
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
  opinionData: OpinionProps["opinionData"];
  isMobile?: boolean;
}> = ({ opinionData, isMobile = false }) => {
  if (!opinionData?.audioTts?.assetUuid) return;

  if (isMobile) {
    return (
      <div className="w-1/2">
        <ArticleAudioPlayer
          assetSnippetUuid={opinionData?.audioTts?.assetUuid}
        />
      </div>
    );
  }

  return (
    <>
      <Spacer className="h-[30px]" />
      <ArticleAudioPlayer assetSnippetUuid={opinionData?.audioTts?.assetUuid} />
    </>
  );
};

export default OpinionRouterPage;

const OpinionsSubcategory: FC<any> = ({ urlAlias }) => {
  const { isMobile } = useScreenSize();
  const { params, incrementParams } = useParams(10);
  const { data } = useQuery(
    opinions.opinionsByCategoryGeneric({
      variables: { ...params, urlAlias: urlAlias },
      options: { enabled: true },
    }),
  );

  const { ref, items, loading } = useInfinite({
    items: data?.nodeListByCategory?.items,
    incrementParams,
    total: data?.nodeListByCategory?.total,
  });

  return (
    <LayoutNewsLanding title="Opinions">
      <div className="px-[20px] mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <NewsCategoryTitle />
        <FirstSection isMobile={isMobile} data={items?.slice(0, 4)} />
        <GenericNewsListWithAuthor data={items?.slice(4)} />
        <div ref={ref}>{loading && <div>Loading...</div>}</div>
      </div>
    </LayoutNewsLanding>
  );
};

type Data = OpinionsByCategoryGenericQuery["nodeListByCategory"]["items"];

const FirstSection: FC<{ isMobile: boolean; data: Data }> = ({
  isMobile,
  data,
}) => {
  if (!isMobile) return <FirstSectionDesktop data={data} />;

  return (
    <>
      <Spacer className="h-2.5" />
      <FirstSectionMobile data={data} />
    </>
  );
};

const FirstSectionDesktop: FC<{ data: Data }> = ({ data }) => {
  const oneData = data?.[0] as TeasersUnion;

  return (
    <div className="flex flex-col pb-10 border-b border-ktc-borders lg:flex-row">
      <div className="w-full border-0 border-ktc-borders lg:w-[53.4%] lg:pr-[40px] md:pb-[40px] lg:pb-0 md:border-b lg:border-0">
        <div className="mb-2 overflow-hidden">
          <ImageMS
            src={
              oneData?.image?.detail?.default?.srcset ??
              oneData?.legacyThumbnailImageUrl
            }
            alt={`${oneData?.title} teaser image`}
            priority={true}
            width={1202}
            height={676}
            service="icms"
            className={clsx("rounded-lg aspect-video object-cover", "w-full")}
          />
        </div>
        <TeaserTextOnlyWithAuthor
          node={oneData}
          size="xl"
          hideCategory={true}
          hideSummary={false}
        />
      </div>
      <div className="w-full pl-0 mt-10 flex flex-col lg:w-[calc(100%_-_53.4%_+_40px)] lg:pl-[40px] lg:mt-0 border-l-ktc-borders lg:border-l">
        <div className="flex flex-col gap-10">
          {data
            ?.slice(1, data?.length)
            .map((node: TeasersUnion, idx: number) => (
              <TeaserTextOnlyWithAuthor
                node={node}
                size="md"
                hideCategory={true}
                hideSummary={false}
                key={node.id ?? idx}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const FirstSectionMobile: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="flex flex-col border-t border-t-ktc-borders pt-5">
      <div className="w-full pl-0 flex flex-col lg:w-1/2 lg:pl-[40px] lg:mt-0 border-l-ktc-borders lg:border-l">
        <div className="block">
          {data
            ?.slice(0, data?.length)
            .map((node: TeasersUnion, idx: number) => (
              <div
                className="flex gap-5 border-b border-b-ktc-borders pb-5 mb-5"
                key={node.id ?? idx}
              >
                <div className="flex-initial w-[120px]">
                  <ImageMS
                    src={
                      (node as any)?.image?.detail?.default?.srcset ??
                      (node as any)?.legacyThumbnailImageUrl
                    }
                    alt={`${(node as any)?.title} teaser image`}
                    priority={true}
                    width={304}
                    height={170}
                    service="icms"
                    className={clsx("aspect-video relative rounded-lg w-full")}
                  />
                </div>
                <div className="flex-initial w-[calc(100%_-_140px)]">
                  <TeaserTextOnlyWithAuthor
                    node={node}
                    size="sm"
                    hideCategory={true}
                    hideSummary={true}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <AdvertisingSlot
        id={`banner-0`}
        className={"h-[250px] w-[300px] bg-red-400 mx-auto"}
        viewportsEnabled={{
          mobile: true,
          tablet: false,
          desktop: false,
        }}
      />
    </div>
  );
};
