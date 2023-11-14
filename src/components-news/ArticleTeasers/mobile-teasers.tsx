import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import type { FC } from "react";

import { Category } from "~/src/generated";

import ImageWithFallback from "~/src/components/ImageWithFallback/ImageWithFallback";

import cs from "~/src/utils/cs";
import css from "./article-teasers.module.scss";

dayjs.extend(relativeTime);
dayjs.extend(isToday);

export const dateFormatter = function (date: string) {
  let formatted: string = dayjs(date).format("MMM DD");
  if (dayjs(date).isToday()) {
    formatted = dayjs(date).format("HH:mm");
  }
  return formatted;
};

const CategoryAndTimeLink: FC<{
  category: Category;
  date: string;
}> = ({ category, date }) => {
  return (
    <Link className={css.desc} href={category?.urlAlias ?? "/"}>
      <>
        <span className="text-ktc-category text-sm mr-4">
          {category?.name ?? "Uncategorized"}
        </span>
        <time dateTime={date} className="text-ktc-date-gray text-xs">
          {dateFormatter(date)}
        </time>
      </>
    </Link>
  );
};

export const SectionTitle: FC<{ text: string; enableDarkMode?: boolean }> = ({
  text,
  enableDarkMode,
}) => (
  <div className={css.titles}>
    <h2
      className={cs([
        "text-2xl text-center",
        enableDarkMode ? "text-white" : "text-black",
      ])}
    >
      {text}
    </h2>
  </div>
);

export const FeaturedArticleMobileNewsLanding: FC<{
  title: string;
  imgSrc: string;
  date: string;
  category: Category;
  href: string;
}> = ({ title, imgSrc, date, category, href }) => {
  return (
    <div>
      <Link href={href}>
        <>
          <ImageWithFallback
            src={imgSrc}
            height="40"
            width="100"
            layout="responsive"
            className="rounded"
            objectFit="cover"
            alt="Cover"
          />
        </>
      </Link>
      <div className="py-2">
        <CategoryAndTimeLink category={category} date={date} />
      </div>
      <Link className={css.titles} href={href}>
        <h3 className="text-2xl line-clamp-3 leading-6">{title}</h3>
      </Link>
    </div>
  );
};

export const LeftImageTeaserMobile: FC<{
  title: string;
  imgSrc: string;
  date: string;
  category: Category;
  href: string;
  enableWhiteText?: boolean;
}> = ({ title, imgSrc, date, category, href, enableWhiteText }) => {
  return (
    <div className="flex relative py-6 items-center">
      <div className="w-1/3 mr-4">
        <Link className="w-full" href={href}>
          <ImageWithFallback
            src={imgSrc}
            height="70"
            width="100"
            layout="responsive"
            className="rounded"
            objectFit="cover"
            alt="Cover"
          />
        </Link>
      </div>
      <div className="w-2/3">
        <CategoryAndTimeLink category={category} date={date} />
        <Link className={css.titles} href={href}>
          <h3
            className={
              !enableWhiteText
                ? "text-base line-clamp-3 leading-5"
                : "text-base line-clamp-3 leading-5 text-white"
            }
          >
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export const TextTeaserMobile: FC<{
  title: string;
  href: string;
  category: Category;
  date: string;
}> = ({ title, href, category, date }) => {
  return (
    <div className="flex relative py-6 items-center">
      <div className="w-full">
        <CategoryAndTimeLink category={category} date={date} />
        <Link className={css.titles} href={href}>
          <h3 className="text-base line-clamp-3 leading-5">{title}</h3>
        </Link>
      </div>
    </div>
  );
};

export const TeaserWithIndexMobile: FC<{
  category?: Category;
  title?: string;
  date?: string;
  href?: string;
  source?: string;
  index?: number;
}> = (props) => {
  const source = props.source ? (
    <span className="text-ktc-date-gray text-xs">{`${props.source} | `}</span>
  ) : (
    ""
  );

  return (
    <div className="flex">
      <div className="flex items-center mr-6">
        <h3 className="text-3xl text-[#BABCBE]">{props.index}</h3>
      </div>
      <div>
        <Link className={css.dec} href={props.category?.urlAlias ?? "/"}>
          <span className="text-ktc-category text-sm mr-4">
            {props.category?.name ?? "Uncategorized"}
          </span>
        </Link>

        <Link className={cs([css.titles, "w-full my-6"])} href={props.href}>
          <h3 className="text-lg line-clamp-3">{props.title}</h3>
        </Link>

        {source}

        <time dateTime={props.date} className="text-ktc-date-gray text-xs">
          {dateFormatter(props.date)}
        </time>
      </div>
    </div>
  );
};
