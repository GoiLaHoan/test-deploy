import type {
  MiningPressReleaseQuery,
  MiningPressReleaseQueryVariables,
} from "~/src/generated";
import { type Args, graphs } from "./react-query-fetcher";

import { gql } from "graphql-request";

export const mining = {
  nodeListPressRelease: (
    args: Args<MiningPressReleaseQuery, MiningPressReleaseQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: ["nodeListPressRelease", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query MiningPressRelease($limit: Int, $offset: Int) {
              nodeList(
                limit: $limit
                offset: $offset
                bundles: [PressRelease]
              ) {
                total
                items {
                  ... on PressRelease {
                    id
                    title
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
};
