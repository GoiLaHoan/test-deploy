import { GraphQLClient } from "graphql-request";
import type { UseQueryOptions } from "react-query";
import { z } from "zod";

export interface Args<TResult, TVariables> {
  variables?: TVariables;
  options?: UseQueryOptions<TResult>;
}

const GRAPHCDN = "https://kitco.graphcdn.app";
const KDB = "https://kdb-gw.dev.kitco.com/graphql";

// please do not export this, we need handle errors silently because
// we can't trust drupal editor input to always be correct
const pricesClient = new GraphQLClient(GRAPHCDN);
const contentClient = new GraphQLClient(KDB);

function validateUrlAlias(path: string): boolean {
  const validate = z
    .string()
    .url({ message: "Invalid URL" })
    .safeParse(`${KDB}${path}`);
  if (validate.success) return true;
  return false;
}

export const graphs = {
  pricesFetch: async (query, variables) => {
    try {
      const res: any = await pricesClient.rawRequest(query, variables);
      if (res?.error?.response?.data) return res.error.response.data;
      if (res?.data) return res.data;
      return res;
    } catch (err) {
      return err.response.data;
    }
  },
  contentFetch: async (query, variables) => {
    if (variables?.urlAlias) {
      const isPathValid = validateUrlAlias(variables.urlAlias);
      if (!isPathValid) {
        throw new Error("Invalid URL");
      }
    }

    try {
      // console.time(JSON.stringify(variables));
      const res = await contentClient.rawRequest(query, variables);
      // if (res?.errors?.response?.data) return res.errors?.response.data;
      // if (res?.data) return res.data;
      // console.timeEnd(JSON.stringify(variables));

      return {
        ...res?.data,
        cacheTagsHeader: res?.headers.get("cache-tags"),
      };
    } catch (err) {
      return err.response.data;
    }
  },
};
