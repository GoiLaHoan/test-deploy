import type { ArticleTeaserFragmentFragment } from "~/src/generated";
import { clsx } from "clsx";
import * as Teaser from "~/src/components-news/Teasers/Teasers";

export const FeaturedArticle: React.FC<{
  data: ArticleTeaserFragmentFragment;
}> = ({ data }) => (
  <Teaser.CtxProvider
    node={data}
    className={clsx("flex flex-col md:flex-row mb-10")}
  >
    <Teaser.Image
      width={600}
      height={340}
      className={clsx("w-full md:w-[400px] md:min-w-[400px]")}
    />
    <div className="block pl-0 md:pl-5">
      <Teaser.Category className="mb-1 mt-2 md:mt-0" />
      <div className="flex flex-col mt-2">
        <Teaser.TitleLink
          className={clsx(
            "text-[24px] leading-[130%]",
            "lg:text-[34px] lg:leading-[115%] line-clamp-3",
          )}
        />
        <Teaser.Summary className="summary text-[16px] leading-[135%] my-2 md:text-[18px] md:leading-6" />
        <Teaser.DateTime />
      </div>
    </div>
  </Teaser.CtxProvider>
);
