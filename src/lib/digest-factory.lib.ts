import { gql } from "graphql-request";
import type {
  DigestStreetTalkQuery,
  DigestStreetTalkQueryVariables,
  DigestLatestNewsQuery,
  DigestLatestNewsQueryVariables,
} from "~/src/generated";
import { type Args, graphs } from "./react-query-fetcher";

export const digest = {
  streetTalk: (
    args: Args<DigestStreetTalkQuery, DigestStreetTalkQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["digestStreetTalk", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query DigestStreetTalk($limit: Int, $offset: Int) {
              nodeList(limit: $limit, offset: $offset, bundles: [StreetTalk]) {
                total
                items {
                  ... on StreetTalk {
                    id
                    title
                    source
                    createdAt
                    updatedAt
                    url
                  }
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  latestNews: (
    args: Args<DigestLatestNewsQuery, DigestLatestNewsQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["digestLatestNews", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query DigestLatestNews($limit: Int, $offset: Int) {
              nodeListQueue(
                limit: $limit
                offset: $offset
                queueId: "latest_news"
                bundles: [NewsArticle, StreetTalk, OffTheWire]
              ) {
                total
                items {
                  ... on NewsArticle {
                    id
                    source {
                      id
                      name
                    }
                    title
                    urlAlias
                    createdAt
                    updatedAt
                    legacyThumbnailImageUrl
                  }

                  ... on StreetTalk {
                    id
                    sourceText: source
                    title
                    url
                    createdAt
                    updatedAt
                  }

                  ... on OffTheWire {
                    id
                    source {
                      id
                      name
                    }
                    title
                    urlAlias
                    createdAt
                    updatedAt
                    legacyThumbnailImageUrl
                  }
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },
};
