import Image from "next/image";
import Link from "next/link";
import { FC, Fragment } from "react";

// internal
import cs from "~/src/utils/cs";

import { ArticlesUnion } from "~/src/types/types";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import clsx from "clsx";

const aspectRatioCSS = {
  "16x9": "aspect-video",
  "1x1": "aspect-square",
};

/*
 *
 * naming convention for components according to figma
 * Teaser[Style] and size as a prop
 *
 * */

/*
 *
 * default styles below
 *
 * */

const CategoryLink: FC<{ urlAlias: string; text: string }> = ({
  urlAlias,
  text,
}) => (
  <>
    <div className="leading-[0]">
      <Link
        className={cs([
          "relative text-ktc-category uppercase font-extrabold !text-[11px] leading-none tracking-[0.15em]",
        ])}
        href={urlAlias ?? "/_error"}
      >
        {text}
      </Link>
    </div>
  </>
);

const DateStamp: FC<{ stamp: string; classNames?: string }> = ({
  stamp,
  classNames,
}) => (
  <Fragment>
    <time
      className={cs([classNames, "text-xs text-ktc-date-gray font-medium"])}
    >
      {stamp && teaserTimestamp(stamp)}
    </time>
  </Fragment>
);

interface Props {
  node: ArticlesUnion;
  size: "sm" | "md" | "lg" | "xl" | "xxl";
  hideCategory?: boolean;
  hideSummary?: boolean;
  sizeImg?: "sm" | "md" | "lg" | "xl" | "xxl";
  lineClampTitle?: string;
  classTitle?: string;
}

export const TeaserCard: FC<Props> = ({
  node,
  size,
  hideCategory,
  hideSummary,
  sizeImg,
  lineClampTitle = "",
}) => {
  const sizeCSS = {
    sm: "text-[16px] leading-[130%]",
    md: "text-[20px] leading-[130%]",
    lg: "text-[24px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
  };

  const summaryCSS = {
    sm: "",
    md: "",
    lg: "text-[16px] leading-[135%]",
    xl: "",
  };

  const sizeImgCSS = {
    sm: "",
    md: "max-w-[200px] max-h-[130px] object-cover mb-2.5",
    lg: "",
    xl: "",
  };

  const imgDimensions = {
    sm: { width: 304, height: 170 },
    md: { width: 304, height: 170 },
    lg: { width: 304, height: 170 },
    xl: { width: 1203, height: 676 },
  };

  return (
    <div className="w-full">
      <Link className="aspect-video" href={node?.urlAlias ?? "/"}>
        <ImageMS
          src={
            node?.image?.detail?.default?.srcset ??
            node?.legacyThumbnailImageUrl
          }
          alt={`${node?.title} teaser image`}
          priority={true}
          width={imgDimensions[size].width}
          height={imgDimensions[size].height}
          service="icms"
          className={clsx(
            sizeImgCSS[sizeImg],
            "rounded-lg aspect-video object-cover",
            "w-full",
          )}
        />
      </Link>
      <div className="h-2"></div>
      {!hideCategory ? (
        <>
          <CategoryLink
            urlAlias={node?.category?.urlAlias}
            text={node?.category?.name}
          />
          <div className="h-2 bg-transparent" />
        </>
      ) : (
        <Spacer className="h-2" />
      )}
      <Link href={node?.urlAlias ?? "/"}>
        <>
          <h3 className={cs([sizeCSS[size], lineClampTitle])}>
            {node?.teaserHeadline ?? node?.title}
          </h3>
          {hideSummary ? null : (
            <div className="pt-2">
              <div
                className={cs(["summary", summaryCSS[size]])}
                dangerouslySetInnerHTML={{
                  __html:
                    node?.teaserSnippet ?? node?.bodyWithEmbeddedMedia?.value,
                }}
              ></div>
            </div>
          )}
          <Spacer className="h-2" />
          <DateStamp stamp={node?.createdAt} />
        </>
      </Link>
    </div>
  );
};

interface PropsForNewLanding {
  node: ArticlesUnion;
  hideCategory?: boolean;
  hideSummary?: boolean;
}
export const TeaserCardForNewLanding: FC<PropsForNewLanding> = ({
  node,
  hideCategory,
  hideSummary,
}) => {
  return (
    <div className="w-full">
      <Link
        className="block relative aspect-video"
        href={node?.urlAlias ?? "/"}
      >
        <ImageMS
          src={
            node?.image?.detail?.default?.srcset ??
            node?.legacyThumbnailImageUrl
          }
          alt={`${node?.title} teaser image`}
          priority={true}
          width={808}
          height={508}
          service="icms"
          className="relative w-full rounded-lg"
        />
      </Link>
      <div className="h-4"></div>
      {!hideCategory ? (
        <>
          <CategoryLink
            urlAlias={node?.category?.urlAlias}
            text={node?.category?.name}
          />
          <div className="h-1 bg-transparent" />
        </>
      ) : (
        <Spacer className="h-2" />
      )}
      <Link href={node?.urlAlias ?? "/"}>
        <>
          <h3 className="text-[20px] leading-[130%]">
            {node?.teaserHeadline ?? node?.title}
          </h3>
          {hideSummary ? null : (
            <div className="pt-2">
              <div
                className="summary"
                dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
              ></div>
            </div>
          )}
          <Spacer className="h-2" />
          <DateStamp stamp={node?.createdAt} />
        </>
      </Link>
    </div>
  );
};

interface PropsTeaserCardForNewParent {
  node: ArticlesUnion;
  size: "sm" | "md" | "lg" | "xl" | "xxl";
  hideCategory?: boolean;
  hideSummary?: boolean;
  sizeImg?: "sm" | "md" | "lg" | "xl" | "xxl";
  lineClamp?: string;
}
export const TeaserCardForNewParent: FC<PropsTeaserCardForNewParent> = ({
  node,
  size,
  hideCategory,
  hideSummary,
  lineClamp,
}) => {
  const sizeCSS = {
    sm: "text-[16px] leading-[130%]",
    md: "text-[20px] leading-[130%] line-clamp-3",
    lg: "text-[24px] leading-[130%]",
    xl: "text-[34px] leading-[115%] tracking-[-0.0035em]",
  };

  const summaryCSS = {
    sm: "",
    md: "",
    lg: "text-[16px] leading-[135%]",
    xl: "text-[18px] leading-[135%]",
  };

  const spaceCSS = {
    sm: "h-1",
    md: "h-1",
    lg: "h-1",
    xl: "h-1",
  };

  const imgDimensions = {
    sm: { width: 304, height: 170 },
    md: { width: 774, height: 434 },
    lg: { width: 1540, height: 860 },
    xl: { width: 1543, height: 868 },
  };

  const heightImage = {
    sm: "",
    md: "xl:h-[242px]",
    lg: "",
    xl: "",
  };

  return (
    <div className="w-full">
      <Link href={node?.urlAlias ?? "/"}>
        <ImageMS
          src={
            node?.image?.detail?.default?.srcset ??
            node?.legacyThumbnailImageUrl
          }
          alt={`${node?.title} teaser image`}
          priority={true}
          width={imgDimensions[size].width}
          height={imgDimensions[size].height}
          service="icms"
          className={cs([
            heightImage[size],
            "relative w-full rounded-lg aspect-video object-cover",
          ])}
        />
      </Link>
      <div className="h-4"></div>
      {!hideCategory && (
        <>
          <CategoryLink
            urlAlias={node?.category?.urlAlias}
            text={node?.category?.name}
          />
          <div className={cs(["bg-transparent", spaceCSS[size]])} />
        </>
      )}
      <Link href={node?.urlAlias ?? "/"}>
        <>
          <h3 className={sizeCSS[size]}>
            {node?.teaserHeadline ?? node?.title}
          </h3>
          {hideSummary ? null : (
            <div className="pt-2">
              <div
                className={cs(["summary", summaryCSS[size], lineClamp])}
                dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
              ></div>
            </div>
          )}
          <Spacer className="h-2" />
          <DateStamp stamp={node?.createdAt} />
        </>
      </Link>
    </div>
  );
};

export const TeaserCardForCategorySection: FC<Props> = ({
  node,
  size,
  hideCategory,
  hideSummary,
}) => {
  const sizeCSS = {
    sm: "",
    md: "leading-[130%] line-clamp-2",
    lg: "",
    xl: "",
  };

  return (
    <div className="w-full">
      <Link
        className="relative block aspect-video"
        href={node?.urlAlias ?? "/"}
      >
        <ImageMS
          src={
            node?.image?.detail?.default?.srcset ??
            node?.legacyThumbnailImageUrl
          }
          alt={`${node?.title} teaser image`}
          priority={true}
          width={304}
          height={170}
          service="icms"
          className="rounded-lg aspect-video object-cover"
        />
      </Link>
      {!hideCategory ? (
        <>
          <CategoryLink
            urlAlias={node?.category?.urlAlias}
            text={node?.category?.name}
          />
          <div className="h-2 bg-transparent" />
        </>
      ) : (
        <Spacer className="h-3" />
      )}
      <Link href={node?.urlAlias ?? "/"}>
        <>
          <h3
            className={cs([
              "md:min-h-[44px] text-[20px] md:text-[17px]",
              sizeCSS[size],
            ])}
          >
            {node?.teaserHeadline ?? node?.title}
          </h3>
          {hideSummary ? null : (
            <div className="pt-2">
              <div
                className="summary md:min-h-[60px]"
                dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
              ></div>
            </div>
          )}
          <Spacer className="h-2" />
          <DateStamp stamp={node?.createdAt} classNames="" />
        </>
      </Link>
    </div>
  );
};

export const TeaserCardMobile: FC<Props> = ({ node, size, hideCategory }) => {
  const sizeCSS = {
    sm: "text-[16px] leading-[130%]",
    md: "text-[20px] leading-[130%]",
    lg: "text-[24px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
  };
  return (
    <div className="w-full flex">
      <Link className="aspect-video w-[120px]" href={node?.urlAlias ?? "/"}>
        <ImageMS
          src={
            node?.image?.detail?.default?.srcset ??
            node?.legacyThumbnailImageUrl
          }
          alt={`${node?.title} teaser image`}
          priority={true}
          width={304}
          height={170}
          service="icms"
          className="rounded-lg"
        />
      </Link>
      <div className="pl-3.5 w-[calc(100%_-_120px)]">
        {!hideCategory ? (
          <CategoryLink
            urlAlias={node?.category?.urlAlias}
            text={node?.category?.name}
          />
        ) : null}
        <Link href={node?.urlAlias ?? "/"}>
          <>
            <h3
              className={cs([sizeCSS[size], "overflow-hidden", "line-clamp-3"])}
            >
              {node?.teaserHeadline ?? node?.title}
            </h3>
            <Spacer className="h-1" />
            <DateStamp stamp={node?.createdAt} />
          </>
        </Link>
      </div>
    </div>
  );
};

interface TeaserTextOnlyProps extends Props {
  lineClamp?: string;
}

export const TeaserTextOnly: FC<TeaserTextOnlyProps> = ({
  node,
  size,
  hideCategory,
  hideSummary,
  // lineClamp = 'line-clamp-3',
}) => {
  const sizeCSS = {
    sm: "text-[16px] leading-[130%]",
    md: "text-[20px] leading-[130%]",
    lg: "text-[24px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
  };

  return node ? (
    <div className="w-full">
      {!hideCategory && (
        <>
          <CategoryLink
            urlAlias={node?.category?.urlAlias}
            text={node?.category?.name}
          />
          <div className="h-1 bg-transparent" />
        </>
      )}
      <Link href={node?.urlAlias ?? "/"}>
        <>
          <h3 className={cs([sizeCSS[size]])}>
            {node?.teaserHeadline ?? node?.title}
          </h3>
          {!hideSummary ? (
            <>
              <Spacer className="h-2" />
              <div
                className="summary"
                dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
              ></div>
            </>
          ) : null}
          <Spacer className="h-2" />
          <DateStamp stamp={node?.createdAt} />
        </>
      </Link>
    </div>
  ) : null;
};

export const TeaserTextOnlyNewPage: FC<TeaserTextOnlyProps> = ({
  node,
  size,
  hideCategory,
  hideSummary,
}) => {
  const sizeCSS = {
    sm: "text-[16px] leading-[130%]",
    md: "text-[20px] leading-[130%]",
    lg: "text-[24px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
  };

  return node ? (
    <div className="w-full">
      {!hideCategory && (
        <>
          <CategoryLink
            urlAlias={node?.category?.urlAlias}
            text={node?.category?.name}
          />
          <div className="h-1 bg-transparent" />
        </>
      )}
      <Link href={node?.urlAlias ?? "/"}>
        <>
          <h3
            className={cs([
              sizeCSS[size],
              "line-clamp-2 text-[20px] md:text-[17px] md:min-h-[44px]",
            ])}
          >
            {node?.teaserHeadline ?? node?.title}
          </h3>
          {!hideSummary ? (
            <>
              <Spacer className="h-2" />
              <div
                className="summary"
                dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
              ></div>
            </>
          ) : null}
          <Spacer className="h-2" />
          <DateStamp stamp={node?.createdAt} />
        </>
      </Link>
    </div>
  ) : null;
};

interface TeaserWideProps extends Props {
  aspectRatio: "16x9" | "1x1" | "auto";
  hideCategory?: boolean;
  spaceBottom?: string;
}

export const TeaserWide: FC<TeaserWideProps> = ({
  node,
  size,
  aspectRatio,
  hideCategory,
  spaceBottom = "mb-5",
  lineClampTitle = "line-clamp-3",
}) => {
  const sizeCSS = {
    sm: "text-[14px] leading-[142%]",
    md: "text-[16px] leading-[130%]",
    lg: "text-[20px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
  };

  const imgContainerCSS = {
    sm: "w-[120px]",
    md: "w-[120px]",
    lg: "w-1/6 relative",
    xl: "w-5/12",
  };

  const bodyContainerCSS = {
    sm: "block pl-[14px] pl-4 w-[calc(100%_-_120px)]",
    md: "block pl-[14px] pl-4 w-[calc(100%_-_120px)]",
    lg: "block pl-5 w-5/6",
    xl: "block pl-5 w-7/12",
  };

  const spacerCSS = {
    sm: "h-1",
    md: "h-1",
    lg: "h-2",
    xl: "h-2",
  };

  const heightCSS = {
    sm: "",
    md: "h-[90px] object-cover",
    lg: "",
    xl: "",
  };

  return (
    <div className={clsx("w-full flex", spaceBottom)}>
      <div className="block relative aspect-video">
        <Link
          className={clsx(imgContainerCSS[size], "relative block aspect-video")}
          href={node?.urlAlias ?? "/"}
        >
          <ImageMS
            src={
              node?.image?.detail?.default?.srcset ??
              node?.legacyThumbnailImageUrl
            }
            alt={`${node?.title} teaser image`}
            priority={true}
            width={304}
            height={170}
            service="icms"
            className={clsx(
              aspectRatioCSS[aspectRatio],
              heightCSS[size],
              "relative rounded-lg",
              "w-full",
            )}
          />
        </Link>
      </div>
      <div className={bodyContainerCSS[size]}>
        {!hideCategory ? (
          <>
            <CategoryLink
              urlAlias={node?.category?.urlAlias}
              text={node?.category?.name}
            />
            <div className="h-[2px] bg-transparent" />
          </>
        ) : null}
        <Link href={node?.urlAlias || "/"}>
          <>
            <h3 className={cs([sizeCSS[size], lineClampTitle])}>
              {node?.teaserHeadline ?? node?.title}
            </h3>
            <div className={cs([spacerCSS[size]])} />
            {(size === "lg" || size === "xl") && (
              <Fragment>
                <div
                  className="summary"
                  dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
                ></div>
                <Spacer className="h-2" />
              </Fragment>
            )}
            <DateStamp stamp={node?.createdAt} />
          </>
        </Link>
      </div>
    </div>
  );
};

export const TeaserWideForNewParent: FC<TeaserWideProps> = ({
  node,
  size,
  aspectRatio,
  hideCategory,
  classTitle,
}) => {
  const sizeCSS = {
    sm: "text-[14px] leading-[142%]",
    md: "text-[16px] leading-[130%]",
    lg: "text-[20px] leading-[130%]",
    xl: "text-[34px] leading-[115%]",
  };

  const imgContainerCSS = {
    sm: "w-[120px]",
    md: "w-[120px]",
    lg: "w-[150px] relative",
    xl: "w-6/12 pr-[10px]",
  };

  const bodyContainerCSS = {
    sm: "block pl-[14px] pl-4 w-[calc(100%_-_120px)]",
    md: "block pl-[14px] pl-4 w-[calc(100%_-_120px)]",
    lg: "block pl-5 w-[calc(100%_-_150px)] mt-[-1px]",
    xl: "block pl-[10px] w-6/12",
  };

  const spacerCSS = {
    sm: "h-1",
    md: "h-1",
    lg: "h-2",
    xl: "h-2",
  };

  const sumaryCSS = {
    sm: "",
    md: "",
    lg: "",
    xl: "text-lg leading-[135%]",
  };

  const mbBlockCSS = {
    sm: "mb-[18px]",
    md: "mb-[40px]",
    lg: "mb-[40px]",
    xl: "mb-[42px]",
  };

  return (
    <div className={cs(["w-full flex", mbBlockCSS[size]])}>
      <Link className={imgContainerCSS[size]} href={node?.urlAlias ?? "/"}>
        <ImageMS
          src={
            node?.image?.detail?.default?.srcset ??
            node?.legacyThumbnailImageUrl
          }
          alt={`${node?.title} teaser image`}
          priority={true}
          width={304}
          height={170}
          service="icms"
          className={clsx(
            aspectRatioCSS[aspectRatio],
            "rounded aspect-video object-cover",
            "w-full",
          )}
        />
      </Link>
      <div className={bodyContainerCSS[size]}>
        {!hideCategory ? (
          <>
            <CategoryLink
              urlAlias={node?.category?.urlAlias}
              text={node?.category?.name}
            />
            <div className="h-[2px] bg-transparent" />
          </>
        ) : null}
        <Link href={node?.urlAlias || "/"}>
          <>
            <h3 className={cs([sizeCSS[size], classTitle, "line-clamp-3"])}>
              {node?.teaserHeadline ?? node?.title}
            </h3>
            <div className={cs([spacerCSS[size]])} />
            {(size === "lg" || size === "xl") && (
              <Fragment>
                <div
                  className={cs(["summary", sumaryCSS[size]])}
                  dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
                ></div>
                <Spacer className="h-2" />
              </Fragment>
            )}
            <DateStamp stamp={node?.createdAt} />
          </>
        </Link>
      </div>
    </div>
  );
};

export const TeaserWideForSubCategory: FC<TeaserWideProps> = ({
  node,
  size,
  aspectRatio,
  hideCategory,
  classTitle,
}) => {
  const sizeCSS = {
    sm: "",
    md: "",
    lg: "text-[20px] leading-[130%] line-clamp-2",
    xl: "text-[34px] leading-[115%] line-clamp-4",
  };

  const imgContainerCSS = {
    sm: "",
    md: "",
    lg: "w-[150px] relative",
    xl: "w-[410px] pr-2.5",
  };

  const bodyContainerCSS = {
    sm: "",
    md: "",
    lg: "block pl-5 w-[calc(100%_-_150px)] mt-[-1px]",
    xl: "block pl-2.5 w-[calc(100%_-_410px)]",
  };

  const summaryCSS = {
    sm: "",
    md: "",
    lg: "text-[14px] leading-5 line-clamp-2",
    xl: "text-[18px] leading-6 line-clamp-4",
  };

  const maxHeightCSS = {
    sm: "",
    md: "",
    lg: "max-h-[100px] h-[100px]",
    xl: "max-h-[250px]",
  };

  return (
    <div className="w-full flex mb-[30px] md:mb-10 last:mb-0">
      <Link className={imgContainerCSS[size]} href={node?.urlAlias ?? "/"}>
        <ImageMS
          src={
            node?.image?.detail?.default?.srcset ??
            node?.legacyThumbnailImageUrl
          }
          alt={`${node?.title} teaser image`}
          priority={true}
          width={600}
          height={340}
          service="icms"
          className={cs([
            aspectRatioCSS[aspectRatio],
            maxHeightCSS[size],
            "block rounded-lg",
            "w-full object-cover",
          ])}
        />
      </Link>
      <div className={bodyContainerCSS[size]}>
        {!hideCategory ? (
          <>
            <CategoryLink
              urlAlias={node?.category?.urlAlias}
              text={node?.category?.name}
            />
            <div className="h-1 bg-transparent" />
          </>
        ) : null}
        <Link href={node?.urlAlias || "/"}>
          <>
            <h3 className={cs([sizeCSS[size], classTitle])}>
              {node?.teaserHeadline ?? node?.title}
            </h3>
            <div className="h-2" />
            {(size === "lg" || size === "xl") && (
              <Fragment>
                <div
                  className={cs(["summary", summaryCSS[size]])}
                  dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
                ></div>
                <Spacer className="h-2" />
              </Fragment>
            )}
            <DateStamp stamp={node?.createdAt} />
          </>
        </Link>
      </div>
    </div>
  );
};

export const TeaserBigWide: FC<TeaserWideProps> = ({
  node,
  size,
  aspectRatio,
  hideCategory,
}) => {
  const sizeCSS = {
    sm: "",
    md: "",
    lg: "text-[24px] leading-[130%]",
    xl: "text-[34px] leading-[115%]",
  };

  const imgContainerCSS = {
    sm: "",
    md: "",
    lg: "w-[325px]",
    xl: "w-[400px]",
  };

  const bodyContainerCSS = {
    sm: "",
    md: "",
    lg: "block pl-5 w-[calc(100%_-_325px)]",
    xl: "block pl-5 w-[calc(100%_-_400px)]",
  };

  const summaryCSS = {
    sm: "",
    md: "",
    lg: "",
    xl: "text-[18px] leading-6",
  };

  return (
    <div className="w-full flex mb-5">
      <Link
        className={clsx(imgContainerCSS[size], "relative block")}
        href={node?.urlAlias ?? "/"}
      >
        <ImageMS
          src={
            node?.image?.detail?.default?.srcset ??
            node?.legacyThumbnailImageUrl
          }
          alt={`${node?.title} teaser image`}
          priority={true}
          width={600}
          height={340}
          service="icms"
          className={cs([
            aspectRatioCSS[aspectRatio],
            "block rounded-lg",
            "w-full object-cover",
          ])}
        />
      </Link>
      <div className={bodyContainerCSS[size]}>
        {!hideCategory ? (
          <>
            <CategoryLink
              urlAlias={node?.category?.urlAlias}
              text={node?.category?.name}
            />
            <div className="h-1 bg-transparent" />
          </>
        ) : null}
        <Link href={node?.urlAlias || "/"}>
          <>
            <h3 className={cs([sizeCSS[size], "line-clamp-3"])}>
              {node?.teaserHeadline ?? node?.title}
            </h3>
            <div className="h-2" />
            {(size === "lg" || size === "xl") && (
              <Fragment>
                <div
                  className={cs(["summary", summaryCSS[size]])}
                  dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
                ></div>
                <Spacer className="h-2" />
              </Fragment>
            )}
            <DateStamp stamp={node?.createdAt} />
          </>
        </Link>
      </div>
    </div>
  );
};

export const TeaserLabelTitleDate: FC<Props> = ({ node, size }) => {
  const sizeCSS = {
    sm: "text-[14px] leading-[142%]",
    md: "text-[16px] leading-[130%]",
    lg: "text-[24px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
  };
  return (
    <div className="w-full">
      <>
        <CategoryLink
          urlAlias={node?.category?.urlAlias}
          text={node?.category?.name}
        />
        <div className="h-1 bg-transparent" />
      </>
      <Link href={node?.urlAlias ?? "/"}>
        <>
          <h3 className={cs([sizeCSS[size], "line-clamp-2"])}>
            {node?.teaserHeadline ?? node?.title}
          </h3>
          <div className="h-2 bg-transparent" />
          <DateStamp stamp={node?.createdAt} />
        </>
      </Link>
    </div>
  );
};

export const TeaserWideNoLabel: FC<Props> = ({ node, size }) => {
  const sizeCSS = {
    sm: "text-[14px] leading-[142%]",
    md: "text-[16px] leading-[130%]",
    lg: "text-[20px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
  };
  return (
    <div className="w-full flex">
      <Link href={node?.urlAlias ?? "/"}>
        <>
          {size !== "sm" && (
            <ImageMS
              src={
                node?.image?.detail?.default?.srcset ??
                node?.legacyThumbnailImageUrl
              }
              alt={`${node?.title} teaser image`}
              priority={true}
              width={600}
              height={340}
              service="icms"
              className="rounded aspect-video"
            />
          )}
          <div className="block">
            <h3 className={sizeCSS[size]}>
              {node?.teaserHeadline ?? node?.title}
            </h3>
            <div
              className="summary"
              dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
            ></div>
            <DateStamp stamp={node?.createdAt} />
          </div>
        </>
      </Link>
    </div>
  );
};

export const TeaserTextWithAuthor: FC<TeaserWideProps> = ({ node, size }) => {
  const sizeCSS = {
    sm: "text-[20px] leading-[130%] line-clamp-3",
    md: "",
    lg: "text-[20px] leading-[130%] line-clamp-2 !text-[#232323]",
    xl: "",
  };

  const imgContainerCSS = {
    sm: "w-1/12 relative",
    md: "",
    lg: "w-1/12 relative",
    xl: "",
  };

  const bodyContainerCSS = {
    sm: "block pl-[15px] ml-[15px] w-11/12 border-l border-ktc-borders",
    md: "",
    lg: "block pl-[15px] ml-[15px] w-11/12 border-l border-ktc-borders",
    xl: "",
  };

  const summaryCSS = {
    sm: "text-[14px] leading-5 line-clamp-2 font-normal text-[#838383]",
    md: "",
    lg: "text-[14px] leading-5 line-clamp-2 font-normal text-[#838383]",
    xl: "",
  };

  return (
    <div className="w-full flex mb-[45px] last:mb-0">
      <Link
        className={imgContainerCSS[size]}
        href={node?.author.urlAlias ?? "/"}
      >
        <div id="authorContainer" className="flex flex-col items-center">
          <div>
            <Image
              src={node?.author?.imageUrl ?? "/default-avatar.svg"}
              alt={`Photo of ${node?.author?.name}`}
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
          <div className="block">
            <p className="font-normal py-2.5 text-sm leading-5 text-[#232323] text-center">
              {node?.author?.name}
            </p>
          </div>
        </div>
      </Link>
      <div className={bodyContainerCSS[size]}>
        <Link href={node?.urlAlias || "/"}>
          <>
            <h2 className={cs([sizeCSS[size]])}>
              {node?.teaserHeadline ?? node?.title}
            </h2>
            <div className="h-2" />
            {(size === "lg" || size === "xl") && (
              <Fragment>
                <div
                  className={cs(["summary", summaryCSS[size]])}
                  dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
                ></div>
                <Spacer className="h-2" />
              </Fragment>
            )}
            <time className={cs(["text-sm font-normal text-[#cccccc]"])}>
              {node?.createdAt && teaserTimestamp(node?.createdAt)}
            </time>
          </>
        </Link>
      </div>
    </div>
  );
};

export const TeaserTextWithAuthorNoSummary: FC<TeaserWideProps> = ({
  node,
  size,
}) => {
  const sizeCSS = {
    sm: "",
    md: "",
    lg: "text-[16px] leading-[21px] line-clamp-1 !text-[#232323]",
    xl: "",
  };

  const bodyContainerCSS = {
    sm: "",
    md: "",
    lg: "block w-full mt-[-1px]",
    xl: "",
  };

  return (
    <div className="w-full flex mb-[30px] md:mb-10 last:mb-0">
      <div className={bodyContainerCSS[size]}>
        <Link href={node?.urlAlias || "/"}>
          <>
            <h2 className={cs([sizeCSS[size]])}>
              {node?.teaserHeadline ?? node?.title}
            </h2>
            <div className="h-2" />
            <time className={cs(["text-sm font-normal text-[#CCCCCC]"])}>
              {node?.author?.name} - {teaserTimestamp(node?.createdAt)}
            </time>
          </>
        </Link>
      </div>
    </div>
  );
};

export const TeaserTextOnlyWithAuthor: FC<Props> = ({
  node,
  size,
  hideCategory,
  hideSummary,
  classTitle,
}) => {
  const sizeCSS = {
    sm: "text-[16px] leading-[130%]",
    md: "text-[20px] leading-[130%]",
    lg: "text-[24px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
    xxl: "text-[34px] leading-[110%]",
  };

  return (
    <div className="w-full cursor-pointer">
      {!hideCategory && (
        <>
          <CategoryLink
            urlAlias={node?.category?.urlAlias}
            text={node?.category?.name}
          />
          <div className="h-2 bg-transparent" />
        </>
      )}
      <Link href={node?.urlAlias ?? "/"}>
        <h3 className={cs([sizeCSS[size], classTitle, "mb-2"])}>
          {node?.teaserHeadline ?? node?.title}
        </h3>
        {!hideSummary ? (
          <>
            <div
              className="summary"
              dangerouslySetInnerHTML={{
                __html:
                  node?.teaserSnippet ?? node?.bodyWithEmbeddedMedia?.value,
              }}
            ></div>
            <Spacer className="h-2" />
          </>
        ) : null}
      </Link>

      <Link href={node?.author?.urlAlias ?? "/"}>
        <>
          <div id="authorContainer" className="flex md:items-center">
            <div className="mr-3">
              <Image
                src={node?.author?.imageUrl ?? "/default-avatar.svg"}
                alt={`Photo of ${node?.author?.name}`}
                width={30}
                height={30}
                className="rounded-full w-[30px] h-[30px] object-cover bg-[#f7f7f7]"
              />
            </div>
            <div className="block">
              <p className="text-ktc-category font-bold leading-5">
                {node?.author?.name}
              </p>
              <DateStamp stamp={node?.createdAt} />
            </div>
          </div>
        </>
      </Link>
    </div>
  );
};

interface TeaserWideTwoProps extends Props {
  aspectRatio: "16x9" | "1x1";
  hideCategory?: boolean;
  hideImage?: boolean;
}

export const TeaserWideTwo: FC<TeaserWideTwoProps> = ({
  node,
  size,
  aspectRatio,
  hideCategory,
  hideImage,
  hideSummary,
}) => {
  const sizeCSS = {
    sm: "text-[14px] leading-[142%]",
    md: "text-[16px] leading-[130%]",
    lg: "text-[20px] leading-[130%]",
    xl: "text-[24px] leading-[130%]",
  };

  const imgContainerCSS = {
    sm: "w-[120px] md:w-1/3",
    md: "w-[120px] md:w-2/5",
    lg: "w-[152px] relative",
    xl: "w-5/12",
  };

  const bodyContainerCSS = {
    sm: "block pl-4 w-2/3",
    md: "block pl-[14px] md:pl-4 w-3/5",
    lg: !hideImage ? "block pl-5 w-[calc(100%_-_152px)]" : "block w-6/6",
    xl: "block pl-5 w-7/12",
  };

  return (
    <div className="w-full flex mb-[30px] md:mb-5">
      {!hideImage ? (
        <div className="block aspect-video">
          <Link
            className={clsx(imgContainerCSS[size], "block aspect-video")}
            href={node?.urlAlias ?? "/"}
          >
            <ImageMS
              src={
                node?.image?.detail?.default?.srcset ??
                node?.legacyThumbnailImageUrl
              }
              alt={`${node?.title} teaser image`}
              priority={true}
              width={304}
              height={170}
              service="icms"
              className={clsx(
                aspectRatioCSS[aspectRatio],
                "rounded aspect-video object-cover",
                "w-full",
              )}
            />
          </Link>
        </div>
      ) : null}
      <div className={bodyContainerCSS[size]}>
        {!hideCategory ? (
          <>
            <CategoryLink
              urlAlias={node?.category?.urlAlias}
              text={node?.category?.name}
            />
            <div className="h-1 bg-transparent" />
          </>
        ) : null}
        <Link href={node?.urlAlias || "/"}>
          <>
            <h3 className={cs([sizeCSS[size], "line-clamp-3"])}>
              {node?.teaserHeadline ?? node?.title}
            </h3>
            <Spacer className="h-2" />
            {hideSummary ? null : (
              <div
                className="summary line-clamp-2"
                dangerouslySetInnerHTML={{ __html: node?.teaserSnippet }}
              ></div>
            )}
            <Spacer className="h-2" />
            <DateStamp stamp={node?.createdAt} />
          </>
        </Link>
      </div>
    </div>
  );
};
