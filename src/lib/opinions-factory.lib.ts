import type {
  OpinionByUrlAliasQuery,
  OpinionByUrlAliasQueryVariables,
  OpinionsByCategoryGenericQuery,
  OpinionsByCategoryGenericQueryVariables,
} from "~/src/generated";
import { type Args, graphs } from "./react-query-fetcher";

import { gql } from "graphql-request";
import { categoryFragment, imageFragment } from "./news-fragments.graphql";

export const opinions = {
  nodeByUrlAlias: (
    args: Args<OpinionByUrlAliasQuery, OpinionByUrlAliasQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      queryKey: ["nodeByUrlAlias", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${imageFragment}
            ${categoryFragment}
            query OpinionByUrlAlias($urlAlias: String!, $auHash: String) {
              nodeByUrlAlias(urlAlias: $urlAlias, auHash: $auHash) {
                __typename
                createdAt
                updatedAt
                id
                published
                title

                ... on Commentary {
                  author {
                    authorWebsite
                    body
                    email
                    facebookId
                    name
                    imageUrl
                    linkedInId
                    title
                    twitterId
                    authorType
                    urlAlias
                    roles
                  }
                  bodyWithEmbeddedMedia {
                    value
                    embeddedMedia {
                      assetUuid
                      snippetUuid
                      status
                      startTime
                      endTime
                      type
                      thumbnailUuid
                    }
                  }
                  category {
                    ...CategoryFragment
                  }
                  summaryBullets
                  supportingAuthors {
                    id
                    name
                    urlAlias
                    imageUrl
                    twitterId
                    linkedInId
                    email
                    body
                  }
                  featuredContent {
                    type
                    assetUuid
                    snippetUuid
                    status
                    startTime
                    endTime
                    thumbnailUuid
                  }
                  urlAlias
                  source {
                    id
                    name
                    description
                    subtitle
                  }
                  teaserSnippet
                  image {
                    ...ImageFragment
                  }
                  audioTts {
                    isPublished
                    assetUuid
                    status
                    endTime
                    startTime
                  }
                  tags {
                    id
                    name
                    urlAlias
                  }
                  legacyThumbnailImageUrl
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  opinionsByCategoryGeneric: (
    args: Args<
      OpinionsByCategoryGenericQuery,
      OpinionsByCategoryGenericQueryVariables
    >,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["opinionsByCategoryGeneric", args.variables?.urlAlias],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${imageFragment}
            ${categoryFragment}
            query OpinionsByCategoryGeneric(
              $urlAlias: String!
              $limit: Int
              $offset: Int
            ) {
              nodeListByCategory(
                limit: $limit
                offset: $offset
                urlAlias: $urlAlias
              ) {
                total
                items {
                  ... on Commentary {
                    id
                    __typename
                    category {
                      ...CategoryFragment
                    }
                    teaserSnippet
                    title
                    urlAlias
                    createdAt
                    updatedAt
                    title
                    urlAlias
                    bodyWithEmbeddedMedia {
                      value
                    }
                    image {
                      ...ImageFragment
                    }
                    author {
                      authorWebsite
                      id
                      name
                      urlAlias
                      body
                      email
                      facebookId
                      imageUrl
                      linkedInId
                      title
                      twitterId
                      authorType
                      roles
                    }
                    legacyThumbnailImageUrl
                  }
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },
};
