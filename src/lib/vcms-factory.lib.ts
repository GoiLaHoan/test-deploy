import { type Args, graphs } from "./react-query-fetcher";

import { gql } from "graphql-request";

import type {
  AllVideosByPlaylistUrlAliasQuery,
  AllVideosByPlaylistUrlAliasQueryVariables,
  AllVideosPageQuery,
  AllVideosPageQueryVariables,
  ListVideosQuery,
  ListVideosQueryVariables,
  VideoByAliasQuery,
  VideoByAliasQueryVariables,
  VideoGetCategoriesQuery,
  VideoGetCategoriesQueryVariables,
} from "~/src/generated";
import { videoSnippetFragment } from "./news-fragments.graphql";

export const vcms = {
  listVideos: (args?: Args<ListVideosQuery, ListVideosQueryVariables>) => {
    return {
      ...args?.options,
      queryKey: ["listVideos", args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query ListVideos($limit: Int, $offset: Int) {
              VideoSearchSnippets(
                categoryId: null
                dateStart: null
                dateEnd: null
                isArchived: false
                isChild: false
                isParent: true
                limit: $limit
                offset: $offset
                sort: dateDesc
                status: 1
                textFields: ["headline", "tags"]
                query: ""
              ) {
                snippets {
                  createdAt
                  headline
                  id
                  thumbnailUuid
                  uuid
                  source
                  frontendPath
                  guests {
                    id
                    name
                  }
                  tags {
                    id
                    name
                  }
                  video {
                    id
                    uuid
                  }
                }
                total
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  allVideosPage: (
    args?: Args<AllVideosPageQuery, AllVideosPageQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["allVideosPage", args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${videoSnippetFragment}
            query AllVideosPage {
              VideoVideosListPageExternal {
                featured {
                  ...VideoSnippetFragment
                }

                upNext {
                  ...VideoSnippetFragment
                }

                latest {
                  ...VideoSnippetFragment
                }

                categories {
                  id
                  name
                  snippets {
                    ...VideoSnippetFragment
                  }
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  allVideosByPlaylistUrlAlias: (
    args?: Args<
      AllVideosByPlaylistUrlAliasQuery,
      AllVideosByPlaylistUrlAliasQueryVariables
    >,
  ) => {
    return {
      ...args?.options,
      queryKey: ["allVideosByPlaylistUrlAlias", args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${videoSnippetFragment}
            query AllVideosByPlaylistUrlAlias($urlAlias: String) {
              VideoGetAllByCategoryUrlAlias(urlAlias: $urlAlias) {
                category {
                  id
                  name
                  urlAlias
                }
                videos {
                  ...VideoSnippetFragment
                }
                upNext {
                  ...VideoSnippetFragment
                }
                latest {
                  ...VideoSnippetFragment
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  videoByAlias: (
    args?: Args<VideoByAliasQuery, VideoByAliasQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["videoByAlias", args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${videoSnippetFragment}
            query VideoByAlias($urlAlias: String!) {
              VideoExternalGetVideoByAlias(urlAlias: $urlAlias) {
                category {
                  id
                  name
                  urlAlias
                }
                categoryVideos {
                  ...VideoSnippetFragment
                }
                upNext {
                  ...VideoSnippetFragment
                }
                latest {
                  ...VideoSnippetFragment
                }
                featured {
                  ...VideoSnippetFragment
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  listPlaylists: (
    args?: Args<VideoGetCategoriesQuery, VideoGetCategoriesQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["listPlaylists", args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query VideoGetCategories {
              VideoGetCategories {
                id
                name
                urlAlias
              }
            }
          `,
          args?.variables,
        ),
    };
  },
};
