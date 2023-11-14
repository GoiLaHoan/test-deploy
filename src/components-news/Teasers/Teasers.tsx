import type { FC, PropsWithChildren } from "react";
import type {
  ArticleTeaserFragmentFragment as ArticleTeaser,
  CommentaryTeaserFragmentFragment,
} from "~/src/generated";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";

const TeaserCtx = React.createContext<ArticleTeaser | null>(null);
const useTeaserCtx = () => React.useContext(TeaserCtx);

const safeUrl = (url: string | undefined) => url || "/error";

const CtxProvider: FC<
  PropsWithChildren<{
    node: ArticleTeaser | CommentaryTeaserFragmentFragment;
    className?: string;
  }>
> = ({ children, node, className }) => {
  return (
    <TeaserCtx.Provider value={node as any}>
      <div className={clsx(className)}>{children}</div>
    </TeaserCtx.Provider>
  );
};

const Image: FC<{
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  aspectRatio?:
    | "aspect-video"
    | "aspect-square"
    | "aspect-auto"
    | "aspect-[4/3]";
}> = (props) => {
  const node = useTeaserCtx();

  return (
    <Link
      className={clsx("block aspect-video", props?.className)}
      href={safeUrl(node?.urlAlias)}
    >
      {node?.legacyThumbnailImageUrl ? (
        <img
          src={node?.legacyThumbnailImageUrl}
          alt={`${node?.title} teaser image`}
          width={props.width}
          height={props.height}
          className={clsx(
            "rounded-lg object-cover",
            "block w-full",
            !props.aspectRatio ? "aspect-video" : props.aspectRatio,
            props?.imageClassName,
          )}
        />
      ) : (
        <ImageMS
          src={node?.image?.detail?.default?.srcset}
          alt={`${node?.title} teaser image`}
          priority={true}
          width={props.width}
          height={props.height}
          service="icms"
          className={clsx(
            "rounded-lg object-cover",
            "block w-full",
            !props.aspectRatio ? "aspect-video" : props.aspectRatio,
            props?.imageClassName,
          )}
        />
      )}
    </Link>
  );
};

const Category: FC<{ className?: string }> = ({ className }) => {
  const node = useTeaserCtx();
  return (
    <div className={clsx("leading-[0]", className)}>
      <Link
        className={clsx(
          "relative mb-[2px]",
          "text-ktc-category uppercase font-extrabold !text-[11px] leading-none tracking-[0.15em]",
        )}
        href={safeUrl(node?.category?.urlAlias)}
      >
        {node?.category?.name}
      </Link>
    </div>
  );
};

const A: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const node = useTeaserCtx();
  return (
    <Link href={safeUrl(node?.urlAlias)} className={clsx("flex", className)}>
      {children}
    </Link>
  );
};

const Title: FC<{ className?: string }> = ({ className }) => {
  const node = useTeaserCtx();
  return (
    <h3 className={clsx("line-clamp-2", className)}>
      {node?.teaserHeadline ?? node?.title}
    </h3>
  );
};

const TitleLink: FC<{ className?: string }> = ({ className }) => {
  const node = useTeaserCtx();
  return (
    <Link
      href={safeUrl(node?.urlAlias)}
      className={clsx(
        "!font-lato font-[700] line-clamp-2  link-hover ",
        "text-[#373737]",
        className,
      )}
    >
      <span>{node?.teaserHeadline ?? node?.title}</span>
    </Link>
  );
};

const Summary: FC<{ className?: string }> = ({ className }) => {
  // this any fixes the possiblity of missing the bodyWithEmbeddedMedia field
  const node = useTeaserCtx() as any;

  return (
    <div
      className={clsx("summary", className)}
      dangerouslySetInnerHTML={{
        __html: node?.teaserSnippet ?? node?.bodyWithEmbeddedMedia?.value,
      }}
    />
  );
};

const DateTime: FC<{ className?: string }> = ({ className }) => {
  const node = useTeaserCtx();
  return (
    <time
      dateTime={node?.updatedAt ?? node?.createdAt}
      className={clsx("text-xs text-ktc-date-gray font-medium", className)}
    >
      {node?.updatedAt && teaserTimestamp(node?.updatedAt || node?.createdAt)}
    </time>
  );
};

// NOTE: Beware of danger, when composing this components, do not wrap with this <A>
const AuthorDates: FC = () => {
  // i believe typecasting is safe here as this component really only used for opinions
  const node = useTeaserCtx() as unknown as CommentaryTeaserFragmentFragment;
  return (
    <div className="flex items-center pb-1">
      <Link
        className="block flex-shrink max-w-[30px]"
        href={safeUrl(node?.urlAlias)}
      >
        <img
          src={node?.author?.imageUrl ?? "/default-avatar.svg"}
          alt={`${node?.title} teaser image`}
          width={30}
          height={30}
          className="rounded-full w-[30px] h-[30px] object-cover bg-[#f7f7f7]"
        />
      </Link>
      <div className="block pl-3">
        <Link
          href={node?.author?.urlAlias}
          className="transition decoration-ktc-borders hover:underline"
        >
          <span className="text-ktc-category font-bold leading-5">
            {node?.author?.name}
          </span>
        </Link>
        <time
          dateTime={node?.updatedAt}
          className={clsx("block text-xs text-ktc-date-gray font-medium !pt-0")}
        >
          {node?.updatedAt && teaserTimestamp(node?.updatedAt)}
        </time>
      </div>
    </div>
  );
};

export {
  CtxProvider,
  Image,
  Category,
  A,
  Title,
  TitleLink,
  Summary,
  DateTime,
  AuthorDates,
};
