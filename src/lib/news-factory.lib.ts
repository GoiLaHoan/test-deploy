import type {
  ArticleByAliasQuery,
  ArticleByAliasQueryVariables,
  AuthorByUrlAliasQuery,
  AuthorByUrlAliasQueryVariables,
  BreakingNewsQuery,
  BreakingNewsQueryVariables,
  DrupalSearchQuery,
  DrupalSearchQueryVariables,
  GuestByUrlAliasQuery,
  GuestByUrlAliasQueryVariables,
  MarketNewsHomePageQuery,
  MarketNewsHomePageQueryVariables,
  NewsByCategoryGenericQuery,
  NewsByCategoryGenericQueryVariables,
  NewsCategoriesTreeQuery,
  NewsCategoriesTreeQueryVariables,
  NewsCategoryChildrenQuery,
  NewsCategoryChildrenQueryVariables,
  NewsGenericByTagQuery,
  NewsGenericByTagQueryVariables,
  NewsGenericCommentariesQuery,
  NewsGenericCommentariesQueryVariables,
  NewsGenericPressReleasesQuery,
  NewsGenericPressReleasesQueryVariables,
  NewsHomePageCommentariesMobileQuery,
  NewsHomePageCommentariesMobileQueryVariables,
  NewsIndexPageQueryQuery,
  NewsIndexPageQueryQueryVariables,
  NewsOffTheWireQuery,
  NewsOffTheWireQueryVariables,
  NewsOpinionsGenericQuery,
  NewsOpinionsGenericQueryVariables,
  NewsTopContributorsQuery,
  NewsTopContributorsQueryVariables,
  NewsTrendingGenericQuery,
  NewsTrendingGenericQueryVariables,
  NewsTrendingTagsQuery,
  NewsTrendingTagsQueryVariables,
  NodeListByAuthorQuery,
  NodeListByAuthorQueryVariables,
  NodeListByGuestQuery,
  NodeListByGuestQueryVariables,
  NodeListBySponsorQuery,
  NodeListBySponsorQueryVariables,
  NodeListByTagQuery,
  NodeListByTagQueryVariables,
  NodeListQueueQuery,
  NodeListQueueQueryVariables,
  ReportersQuery,
  ReportersQueryVariables,
  SponsorByUrlAliasQuery,
  SponsorByUrlAliasQueryVariables,
  SponsoredContentQuery,
  SponsoredContentQueryVariables,
  StreetNewsHomePageQuery,
  StreetNewsHomePageQueryVariables,
  TagByUrlAliasQuery,
  TagByUrlAliasQueryVariables,
  NewsLeadGenQueryQuery,
  NewsLeadGenQueryQueryVariables,
} from "~/src/generated";
import { type Args, graphs } from "./react-query-fetcher";

import { gql } from "graphql-request";
import {
  articleTeaserFragment,
  authorFragment,
  categoryFragment,
  commentaryTeaserFragment,
  imageFragment,
  offTheWireFragment,
  sourceFragment,
} from "./news-fragments.graphql";
import { metalFragment, metalQuoteFragment } from "./metals-fragments.graphql";

export const news = {
  newsByCategoryGeneric: (
    args: Args<NewsByCategoryGenericQuery, NewsByCategoryGenericQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsByCategoryGeneric", args.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${articleTeaserFragment}
            ${offTheWireFragment}
            ${imageFragment}
            query NewsByCategoryGeneric(
              $urlAlias: String!
              $limit: Int
              $offset: Int
              $includeRelatedCategories: Boolean
              $includeEntityQueues: Boolean
            ) {
              nodeListByCategory(
                limit: $limit
                offset: $offset
                urlAlias: $urlAlias
                includeRelatedCategories: $includeRelatedCategories
                includeEntityQueues: $includeEntityQueues
              ) {
                total
                items {
                  ... on NewsArticle {
                    ...ArticleTeaserFragment
                  }

                  ... on OffTheWire {
                    ...OffTheWireFragment
                  }
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },
  newsOffTheWire: (
    args: Args<NewsOffTheWireQuery, NewsOffTheWireQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsOffTheWire", args.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query NewsOffTheWire(
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
                  ... on OffTheWire {
                    id
                    title
                    teaserHeadline
                    urlAlias
                    createdAt
                    updatedAt
                    author {
                      email
                      name
                      imageUrl
                      urlAlias
                    }
                    source {
                      id
                      description
                      name
                    }
                    teaserSnippet
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
  newsTrending: (
    args?: Args<NewsTrendingGenericQuery, NewsTrendingGenericQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsTrending", args?.variables?.limit],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${articleTeaserFragment}
            ${imageFragment}
            query NewsTrendingGeneric($limit: Int) {
              nodeListTrending(
                bundles: [NewsArticle]
                sort: Week
                limit: $limit
              ) {
                ... on NewsArticle {
                  ...ArticleTeaserFragment
                }
              } # end trending query
            }
          `,
          args?.variables,
        ),
    };
  },

  newsOpinionsList: (
    args: Args<NewsOpinionsGenericQuery, NewsOpinionsGenericQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsOpinionsList"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${commentaryTeaserFragment}
            ${imageFragment}
            query NewsOpinionsGeneric($limit: Int, $offset: Int) {
              opinions: nodeList(
                limit: $limit
                offset: $offset
                bundles: [Commentary]
              ) {
                items {
                  ... on Commentary {
                    ...CommentaryTeaserFragment
                  }
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  nodeListPressReleases: (
    args: Args<
      NewsGenericPressReleasesQuery,
      NewsGenericPressReleasesQueryVariables
    >,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["nodeListPressReleases", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query NewsGenericPressReleases($limit: Int, $offset: Int) {
              nodeList(
                limit: $limit
                offset: $offset
                bundles: [PressRelease]
              ) {
                items {
                  ... on PressRelease {
                    id
                    title
                    teaserHeadline
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
  nodeListQueue: (
    args: Args<NodeListQueueQuery, NodeListQueueQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["nodeListQueue", args.variables?.queueId],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${articleTeaserFragment}
            ${imageFragment}
            # renamed from NewsQueueGeneric
            query NodeListQueue($limit: Int, $offset: Int, $queueId: String!) {
              nodeListQueue(
                limit: $limit
                offset: $offset
                queueId: $queueId
                bundles: [NewsArticle]
              ) {
                total
                items {
                  ... on NewsArticle {
                    ...ArticleTeaserFragment
                  }
                }
              }

              ids: nodeIdsInQueue(queueId: $queueId)
            }
          `,
          args.variables,
        ),
    };
  },

  nodeListQueueCommentaries: (
    args: Args<
      NewsHomePageCommentariesMobileQuery,
      NewsHomePageCommentariesMobileQueryVariables
    >,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["nodeListQueueCommentaries"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${commentaryTeaserFragment}
            ${imageFragment}
            ${authorFragment}
            query NewsHomePageCommentariesMobile($limit: Int, $offset: Int) {
              commentaries: nodeListQueue(
                limit: $limit
                offset: $offset
                queueId: "commentaries"
                bundles: [Commentary]
              ) {
                total
                items {
                  ... on Commentary {
                    ...CommentaryTeaserFragment
                  }
                }
              }
              ids: nodeIdsInQueue(queueId: "commentaries")
            }
          `,
          args.variables,
        ),
    };
  },

  marketNews: (
    args: Args<MarketNewsHomePageQuery, MarketNewsHomePageQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["marketNews"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${sourceFragment}
            query MarketNewsHomePage($limit: Int, $offset: Int) {
              marketNews(limit: $limit, offset: $offset) {
                total
                items {
                  ... on NewsArticle {
                    id
                    title
                    teaserHeadline
                    urlAlias
                    source {
                      ...SourceFragment
                    }
                    createdAt
                    updatedAt
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
  newsByTag: (
    args: Args<NewsGenericByTagQuery, NewsGenericByTagQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsByTag"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${articleTeaserFragment}
            query NewsGenericByTag(
              $limit: Int
              $offset: Int
              $urlAlias: String!
            ) {
              nodeListByTag(
                limit: $limit
                offset: $offset
                urlAlias: $urlAlias
              ) {
                items {
                  ... on NewsArticle {
                    ...ArticleTeaserFragment
                  }
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  newsCommentaries: (
    args: Args<
      NewsGenericCommentariesQuery,
      NewsGenericCommentariesQueryVariables
    >,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsCommentaries", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${sourceFragment}
            ${imageFragment}
            query NewsGenericCommentaries($limit: Int, $offset: Int) {
              commentaries: nodeListQueue(
                limit: $limit
                offset: $offset
                queueId: "commentaries"
                bundles: [Commentary]
              ) {
                items {
                  ... on Commentary {
                    __typename
                    id
                    createdAt
                    updatedAt
                    source {
                      ...SourceFragment
                    }
                    title
                    teaserHeadline
                    image {
                      ...ImageFragment
                    }
                    category {
                      id
                      urlAlias
                      name
                    }
                    teaserSnippet
                    urlAlias
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
                    legacyThumbnailImageUrl
                  }
                }
                total
              }

              ids: nodeIdsInQueue(queueId: "commentaries")
            }
          `,
          args.variables,
        ),
    };
  },

  nodeByUrlAlias: (
    args: Args<ArticleByAliasQuery, ArticleByAliasQueryVariables>,
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
            ${categoryFragment}
            ${imageFragment}
            query ArticleByAlias($urlAlias: String!, $auHash: String) {
              nodeByUrlAlias(urlAlias: $urlAlias, auHash: $auHash) {
                __typename
                createdAt
                updatedAt
                id
                published
                title

                ... on NewsArticle {
                  author {
                    authorWebsite
                    body
                    email
                    contactEmail
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
                  featuredContent {
                    type
                    assetUuid
                    snippetUuid
                    status
                    startTime
                    endTime
                    thumbnailUuid
                  }
                  summaryBullets
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
                  urlAlias
                  source {
                    id
                    name
                    description
                    subtitle
                  }
                  teaserSnippet
                  category {
                    ...CategoryFragment
                  }
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
                  legacyThumbnailImageUrl
                }
                ... on Sponsored {
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
                }
                ... on OffTheWire {
                  urlAlias
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
                  source {
                    name
                    subtitle
                    description
                  }
                  imageUrl
                  featured
                  body
                  legacyThumbnailImageUrl
                }
                
                ... on LeadGen {
                  body
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  nodeListByAuthor: (
    args: Args<NodeListByAuthorQuery, NodeListByAuthorQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      queryKey: ["nodeListByAuthor", args.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${articleTeaserFragment}
            ${imageFragment}
            ${sourceFragment}
            ${offTheWireFragment}
            query NodeListByAuthor(
              $limit: Int
              $offset: Int
              $urlAlias: String!
            ) {
              nodeListByAuthor(
                limit: $limit
                offset: $offset
                urlAlias: $urlAlias
              ) {
                total
                items {
                  id
                  title
                  createdAt
                  updatedAt
                  __typename
                  ... on NewsArticle {
                    ...ArticleTeaserFragment
                  }
                  ... on Commentary {
                    id
                    category {
                      id
                      name
                      urlAlias
                    }
                    teaserSnippet
                    source {
                      ...SourceFragment
                    }
                    title
                    urlAlias
                    author {
                      id
                      name
                    }
                    image {
                      ...ImageFragment
                    }
                    legacyThumbnailImageUrl
                  }
                  ... on OffTheWire {
                    ...OffTheWireFragment
                  }
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  authorByUrlAlias: (
    args: Args<AuthorByUrlAliasQuery, AuthorByUrlAliasQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      queryKey: ["authorByUrlAlias", args.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query AuthorByUrlAlias($urlAlias: String!) {
              authorByUrlAlias(urlAlias: $urlAlias) {
                authorWebsite
                body
                email
                contactEmail
                facebookId
                name
                hidden
                id
                imageUrl
                linkedInId
                title
                authorType
                twitterId
                roles
              }
            }
          `,
          args.variables,
        ),
    };
  },

  // used for mobile nav on /news/index
  newsCategoriesTree: (
    args?: Args<NewsCategoriesTreeQuery, NewsCategoriesTreeQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsCategoriesTree"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query NewsCategoriesTree {
              categoriesTree {
                id
                name
                urlAlias
                status
                children {
                  id
                  name
                  urlAlias
                  status
                  children {
                    id
                    name
                    urlAlias
                    status
                    children {
                      id
                    }
                  }
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  sponsorByUrlAlias: (
    args: Args<SponsorByUrlAliasQuery, SponsorByUrlAliasQueryVariables>,
  ) => {
    const q = gql`
      query SponsorByUrlAlias($urlAlias: String!) {
        sponsor: sponsorByUrlAlias(urlAlias: $urlAlias) {
          id
          name
        }
      }
    `;
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["sponsorByUrlAlias"],
      queryFn: async () => await graphs.contentFetch(q, args.variables),
    };
  },

  sponsoredContent: (
    args: Args<SponsoredContentQuery, SponsoredContentQueryVariables>,
  ) => {
    const q = gql`
      ${imageFragment}
      query SponsoredContent($limit: Int, $offset: Int) {
        nodeList(bundles: [Sponsored], limit: $limit, offset: $offset) {
          total
          items {
            ... on Sponsored {
              id
              title
              teaserHeadline
              teaserSnippet
              urlAlias
              bodyWithEmbeddedMedia {
                value
              }
              createdAt
              image {
                ...ImageFragment
              }
              author {
                id
                name
                urlAlias
              }
              legacyThumbnailImageUrl
            }
          }
        }
      }
    `;
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["sponsoredContent", args?.variables],
      queryFn: async () => await graphs.contentFetch(q, args.variables),
    };
  },

  reporters: (args?: Args<ReportersQuery, ReportersQueryVariables>) => {
    const query = gql`
      query Reporters {
        reporters {
          id
          name
          imageUrl
          urlAlias
          hidden
        }
      }
    `;
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["reporters"],
      queryFn: async () => await graphs.contentFetch(query, args?.variables),
    };
  },

  topContributors: (
    args?: Args<NewsTopContributorsQuery, NewsTopContributorsQueryVariables>,
  ) => {
    const query = gql`
      query NewsTopContributors {
        topContributors {
          id
          name
          imageUrl
          urlAlias
          hidden
        }
      }
    `;
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["topContributors"],
      queryFn: async () => await graphs.contentFetch(query, args?.variables),
    };
  },

  nodeListBySponsor: (
    args: Args<NodeListBySponsorQuery, NodeListBySponsorQueryVariables>,
  ) => {
    const q = gql`
      ${imageFragment}
      query NodeListBySponsor($limit: Int, $offset: Int, $urlAlias: String!) {
        nodeListBySponsor(limit: $limit, offset: $offset, urlAlias: $urlAlias) {
          total
          items {
            ... on Sponsored {
              id
              createdAt
              updatedAt
              title
              urlAlias
              teaserSnippet
              sponsor {
                id
                name
              }
              author {
                id
                name
                urlAlias
              }
              image {
                ...ImageFragment
              }
              legacyThumbnailImageUrl
            }
          }
        }
      }
    `;
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["nodeListBySponsor", args.variables],
      queryFn: async () => await graphs.contentFetch(q, args.variables),
    };
  },

  trendingTags: (
    args?: Args<NewsTrendingTagsQuery, NewsTrendingTagsQueryVariables>,
  ) => {
    const q = gql`
      query NewsTrendingTags {
        trendingTags {
          id
          urlAlias
          name
        }
      }
    `;
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsTrendingTags"],
      queryFn: async () => await graphs.contentFetch(q, args?.variables),
    };
  },

  // ENTER THE ONE OFF ZONE
  // ENTER THE ONE OFF ZONE
  // ENTER THE ONE OFF ZONE
  // ENTER THE ONE OFF ZONE
  newsLandingPage: (
    args: Args<NewsIndexPageQueryQuery, NewsIndexPageQueryQueryVariables>,
  ) => {
    return {
      enabled: false,
      ...args?.options,
      queryKey: ["newsLandingPage"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query NewsIndexPageQuery($limit: Int, $offset: Int) {
              queue: nodeListQueue(
                limit: $limit
                offset: $offset
                bundles: [NewsArticle, OffTheWire]
                queueId: "latest_news"
              ) {
                total
                items {
                  ... on NewsArticle {
                    id
                    title
                    __typename
                    category {
                      id
                      name
                      urlAlias
                    }
                    teaserSnippet
                    teaserHeadline
                    title
                    urlAlias
                    source {
                      name
                      subtitle
                      description
                    }
                    audioTts {
                      isPublished
                      assetUuid
                    }
                    createdAt
                    updatedAt
                    image {
                      detail {
                        default {
                          srcset
                        }
                      }
                    }
                    legacyThumbnailImageUrl
                  }
                  ... on OffTheWire {
                    id
                    title
                    __typename
                    body
                    category {
                      id
                      name
                      urlAlias
                    }
                    title
                    urlAlias
                    source {
                      name
                      subtitle
                      description
                    }
                    createdAt
                    updatedAt
                    imageUrl
                    featured
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
  breakingNews: (args: Args<BreakingNewsQuery, BreakingNewsQueryVariables>) => {
    return {
      ...args?.options,
      queryKey: ["breakingNews"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query BreakingNews {
              nodeList(bundles: [BreakingNews]) {
                total
                items {
                  ... on BreakingNews {
                    id
                    title
                    createdAt
                    updatedAt
                    category
                    # body # why or where did this field get deprecated upstream?
                    byline
                    url
                  }
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  leadGen: (
    args: Args<NewsLeadGenQueryQuery, NewsLeadGenQueryQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["leadGen"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query NewsLeadGenQuery {
              queue: nodeListQueue(
                bundles: [LeadGen],
                queueId: "leadgen"
              ) {
                items {
                  ... on LeadGen {
                    id
                    title
                    urlAlias
                    featured
                  }
                }
                total
              }
            }
          `,
          args.variables,
        ),
    };
  },

  streetNews: (
    args: Args<StreetNewsHomePageQuery, StreetNewsHomePageQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["streetNews", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query StreetNewsHomePage($limit: Int, $offset: Int) {
              nodeList(limit: $limit, offset: $offset, bundles: [StreetTalk]) {
                total
                items {
                  ... on StreetTalk {
                    id
                    title
                    teaserHeadline
                    source
                    createdAt
                    updatedAt
                    url
                  }
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  categoryChildrenByUrlAlias: (
    args: Args<NewsCategoryChildrenQuery, NewsCategoryChildrenQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["categoryChildrenByUrlAlias"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query NewsCategoryChildren($urlAlias: String!) {
              categoryChildrenByUrlAlias(urlAlias: $urlAlias) {
                id
                urlAlias
                name
              }
            }
          `,
          args.variables,
        ),
    };
  },

  tagByUrlAlias: (
    args: Args<TagByUrlAliasQuery, TagByUrlAliasQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["tagByUrlAlias"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query TagByUrlAlias($urlAlias: String!) {
              tagByUrlAlias(urlAlias: $urlAlias) {
                id
                name
                urlAlias
              }
            }
          `,
          args.variables,
        ),
    };
  },

  nodeListByTag: (
    args: Args<NodeListByTagQuery, NodeListByTagQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["nodeListByTag", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${articleTeaserFragment}
            ${imageFragment}
            ${authorFragment}
            ${commentaryTeaserFragment}
            query NodeListByTag($limit: Int, $offset: Int, $urlAlias: String!) {
              nodeListByTag(
                limit: $limit
                offset: $offset
                urlAlias: $urlAlias
              ) {
                total
                items {
                  ... on NewsArticle {
                    ...ArticleTeaserFragment
                  }

                  ... on Commentary {
                    ...CommentaryTeaserFragment
                  }
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  guestByUrlAlias: (
    args: Args<GuestByUrlAliasQuery, GuestByUrlAliasQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["guestByUrlAlias"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query GuestByUrlAlias($urlAlias: String!) {
              guest: guestByUrlAlias(urlAlias: $urlAlias) {
                id
                fullName
                urlAlias
              }
            }
          `,
          args.variables,
        ),
    };
  },

  nodeListByGuest: (
    args: Args<NodeListByGuestQuery, NodeListByGuestQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["nodeListByGuest"],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${articleTeaserFragment}
            ${commentaryTeaserFragment}
            query NodeListByGuest(
              $limit: Int
              $offset: Int
              $urlAlias: String!
            ) {
              guestNodes: nodeListByGuest(
                limit: $limit
                offset: $offset
                urlAlias: $urlAlias
              ) {
                total
                items {
                  ... on NewsArticle {
                    ...ArticleTeaserFragment
                  }
                  ... on Commentary {
                    ...CommentaryTeaserFragment
                  }
                  ... on Sponsored {
                    title
                    teaserHeadline
                    id
                    urlAlias
                    createdAt
                    updatedAt
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

  searchDrupal: (args: Args<DrupalSearchQuery, DrupalSearchQueryVariables>) => {
    return {
      ...args?.options,
      queryKey: ["searchDrupal", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            ${metalFragment}
            ${metalQuoteFragment}
            query DrupalSearch(
              $query: String!
              $symbol: String!
              $currency: String!
              $timestamp: Int!
            ) {
              searchData: search(query: $query) {
                excerpt
                id
                relevance
                title
                urlAlias
              }
              metalData: GetMetalQuote(
                symbol: $symbol
                currency: $currency
                timestamp: $timestamp
              ) {
                ...MetalFragment
              }
              cryptoData: GetCryptoQuote(
                symbol: $symbol
                currency: $currency
                timestamp: $timestamp
              ) {
                symbol
                currency
                results {
                  ask
                  bid
                  high
                  low
                  open
                  close
                  change
                  changePercentage
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },
};
