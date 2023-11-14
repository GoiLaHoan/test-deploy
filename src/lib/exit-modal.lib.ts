import { type Args, graphs } from "./react-query-fetcher";

import { gql } from "graphql-request";

import type { ExitModalQuery, ExitModalQueryVariables } from "~/src/generated";

export const exitModal = {
  query: (args?: Args<ExitModalQuery, ExitModalQueryVariables>) => {
    return {
      ...args?.options,
      queryKey: ["exitModal", args?.variables],
      queryFn: async () =>
        await graphs.contentFetch(
          gql`
            query ExitModal {
              exitModal {
                __typename
                active
                backgroundImage
                buttonColor
                subTitle
                subTitleColor
                title
                titleColor
              }
            }
          `,
          args?.variables,
        ),
    };
  },
};
