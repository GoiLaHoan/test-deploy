import type { ArticleTeaserFragmentFragment } from "~/src/generated";
import * as Teaser from "~/src/components-news/Teasers/Teasers";

export const LatestItem: React.FC<{
  data: ArticleTeaserFragmentFragment;
}> = ({ data }) => (
  <Teaser.CtxProvider node={data}>
    <Teaser.Category />
    <div className="flex flex-col">
      <Teaser.TitleLink className="text-[16px] leading-[130%] mb-2 pt-1" />
      <Teaser.DateTime className="pt-2" />
    </div>
  </Teaser.CtxProvider>
);
