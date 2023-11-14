import Link from "next/link";
import { FC } from "react";
import { useQuery } from "react-query";
import { Tag } from "~/src/generated";
import { news } from "~/src/lib/news-factory.lib";
import cs from "~/src/utils/cs";

export const TrendingTags: FC = () => {
  const { data } = useQuery(
    news.trendingTags({
      options: { enabled: true },
    }),
  );
  return (
    <div className="bg-kitco-black pb-10 pt-[30px]">
      <h4
        className={cs(["text-center uppercase text-2xl pb-4"])}
        style={{ color: "white" }}
      >
        <span className="text-[21px] leading-[27px]">Trending Tags</span>
      </h4>
      <div className="px-10 max-w-[1240px] mx-auto flex justify-center flex-wrap gap-2 lg:px-0">
        {data?.trendingTags?.map((x: Tag) => (
          <TagItem key={x.id} tag={x} />
        ))}
      </div>
    </div>
  );
};

const TagItem: FC<{ tag: Tag }> = ({ tag }) => {
  return (
    <Link
      className="px-3.5 py-px rounded border border-white border-opacity-40 leading-7"
      href={tag.urlAlias}
    >
      <span className="text-white text-[12px]">{tag.name}</span>
    </Link>
  );
};
