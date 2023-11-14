import type { ArticleTeaserFragmentFragment } from "~/src/generated";
import { clsx } from "clsx";
import * as Teaser from "~/src/components-news/Teasers/Teasers";

export const FeaturedNext: React.FC<{
  data: ArticleTeaserFragmentFragment;
}> = ({ data }) => (
  <Teaser.CtxProvider
    node={data}
    className={clsx("flex gap-2.5 md:block", "py-2.5 md:px-5 md:first:pl-0")}
  >
    <Teaser.Image
      width={200}
      height={100}
      className="block md:hidden w-[120px] min-w-[120px]"
      imageClassName="!rounded"
    />
    <div className="flex flex-col">
      <Teaser.Category />
      <Teaser.TitleLink className="text-[16px] leading-[130%] mb-2 pt-1" />
      <Teaser.Summary className="line-clamp-2 md:line-clamp-3" />
      <Teaser.DateTime className="pt-[0.375rem] md:pt-2" />
    </div>
  </Teaser.CtxProvider>
);
