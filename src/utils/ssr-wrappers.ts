import type { NextPageContext } from "next";
import { dehydrate, QueryClient } from "react-query";

interface SSRArgs {
  queries: Array<
    never | { queryKey: Array<any>; queryFn: (args: any) => Promise<unknown> }
  >;
  ctxRes?: NextPageContext["res"];
}

const qc = new QueryClient();

export async function ssrQueries({ queries, ctxRes }: SSRArgs) {
  try {
    await Promise.allSettled(
      queries.map((query) => qc.prefetchQuery(query.queryKey, query.queryFn)),
    );
  } catch (err) {
    console.error("error in utils/ssrQueries\n", err);
  }

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(qc)));

  const cache = qc.getQueryCache();
  const combineCacheTags = cache
    .getAll()
    .map((query) => {
      const state = query.state.data as unknown as any;
      // the cacheTagsHeader is created in the fetch function
      if (state?.cacheTagsHeader) {
        return state?.cacheTagsHeader;
      }
    })
    .join(" ");

  // dedupe and join cache tags
  // @ts-ignore
  const allCacheTags = [...new Set(combineCacheTags.split(" "))].join(" ");

  ctxRes?.setHeader("Surrogate-Key", allCacheTags);

  return {
    dehydratedState,
  };
}
