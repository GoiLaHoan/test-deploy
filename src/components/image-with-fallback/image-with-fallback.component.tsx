import { FC, useEffect, useState } from "react";
import {
  ArticlesUnion,
  OpinionsUnion,
  SponsoredUnion,
} from "~/src/types/types";
import cs from "~/src/utils/cs";
import Link from "next/link";
import { env } from "~/src/env/client.mjs";

// we have to pass the full node in here
// because of the differences in object models :/
// TODO: We get to delete VideoArticle and AudioArticle types as they will no longer exist from drupal
// REFACTOR: this

export const ImageWithFallback = ({
  node,
  className,
}: {
  node: ArticlesUnion | OpinionsUnion | SponsoredUnion;
  className?: string;
}) => {
  function produceCDNUrl(url: string | undefined) {
    if (!url) {
      return `/fallbacks/ktc_img_fallback_lg.jpg`;
    }
    const originalUrl = new URL(url);
    const cdnOrigin = originalUrl.origin.replace(
      "https://image-api.dev.kitco.com",
      env.NEXT_PUBLIC_IMAGES_CDN_API,
    );
    const bucketPath = originalUrl.pathname.replace("/image/", "");

    const sizeParams = new URLSearchParams(originalUrl.search);
    sizeParams.delete("token");

    return `${cdnOrigin}/icms/${bucketPath}?${sizeParams.toString()}`;
  }

  const i = node?.image?.detail;

  return (
    <Img
      mediumMedia={i?.sources?.teaser_medium?.media || ""}
      mediumSrc={produceCDNUrl(i?.sources?.teaser_medium?.srcset) || ""}
      smallMedia={i?.sources?.teaser_small?.media || ""}
      smallSrc={produceCDNUrl(i?.sources?.teaser_small?.srcset) || ""}
      defaultSrc={produceCDNUrl(i?.default?.srcset) || ""}
      className={className}
      urlAlias={node?.urlAlias}
    />
  );
};

function fallback(size: "sm" | "md" | "lg") {
  return `/fallbacks/ktc_img_fallback_${size}.jpg`;
}

const Img: FC<{
  smallSrc: string;
  smallMedia: string;
  mediumSrc: string;
  mediumMedia: string;
  defaultSrc: string;
  className?: string;
  urlAlias?: string;
}> = (p) => {
  const [lgSrc, setLgSrc] = useState(p.defaultSrc);
  const [mdSrc, setMdSrc] = useState(p.mediumSrc);
  const [smSrc, setSmSrc] = useState(p.smallSrc);

  return (
    <Link href={p?.urlAlias ?? "/_error"} legacyBehavior>
      <picture className={!p?.className ? "rounded aspect-video" : p.className}>
        <source
          srcSet={mdSrc}
          media={p.mediumMedia}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.srcset = fallback("md");
          }}
        />
        <source
          media={p.smallMedia}
          srcSet={smSrc}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.srcset = fallback("sm");
          }}
        />
        <img
          src={lgSrc}
          srcSet={lgSrc}
          alt="Kitco Media"
          className={cs([p.className, "w-full"])}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping

            currentTarget.src = fallback("lg");
            currentTarget.srcset = fallback("md");
            setSmSrc(fallback("sm"));
            setMdSrc(fallback("md"));
            setLgSrc(fallback("lg"));
          }}
        />
      </picture>
    </Link>
  );
};

export const AuthorImage: FC<{
  src: string | null;
  className?: string;
  style?: unknown;
  urlAlias?: string;
}> = ({ src, className, style, urlAlias }) => {
  const [lgSrc, setLgSrc] = useState(src ?? "/default-avatar.svg");

  useEffect(() => {
    setLgSrc(src ?? "/default-avatar.svg");
  }, [src]);

  if (urlAlias) {
    return (
      <Link href={urlAlias}>
        <img
          src={lgSrc}
          alt="Kitco Media"
          className={className}
          onError={() => {
            setLgSrc("/default-avatar.svg");
          }}
          style={style}
        />
      </Link>
    );
  }

  return (
    <img
      src={lgSrc}
      alt="Kitco Media"
      className={className}
      onError={() => {
        setLgSrc("/default-avatar.svg");
      }}
      style={style}
    />
  );
};
