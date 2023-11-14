import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ArticleTeaserFragmentFragment,
  NewsArticle,
  Commentary,
  Sponsored,
  CommentaryTeaserFragmentFragment,
} from "~/src/generated";

export type ArticlesUnion = NewsArticle; // | Commentary
export type OpinionsUnion = Commentary;

export type SponsoredUnion = Sponsored;

export type TeasersUnion = ArticleTeaserFragmentFragment;
export type TeasersCommentaryUnion = CommentaryTeaserFragmentFragment;
// | Commentary

export type NextApiRoute = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;
