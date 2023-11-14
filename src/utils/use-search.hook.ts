import { search } from "fast-fuzzy";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { kitcoCryptos, kitcoMetals } from "~/src/utils/kitcoDatas";
import { SectionItems } from "../types";
import { news } from "../lib/news-factory.lib";
import { kitcoRoutes } from "../lib/page-routes.lib";
import { useDebounce } from "./use-debouce.hook";
import { useReduce } from "./use-reduce.hook";

const initialCriteria = {
  inputTerm: "",
  currency: null,
  symbol: null,
  timestamp: currentTimestamp(),
};

export type SearchCriteria = Omit<
  typeof initialCriteria,
  "currency" | "symbol"
> & {
  currency: string | null;
  symbol: string | null;
};

const fuzzySearchForExtraneousData = (term: string) => {
  const metalOrCrypto = search(term, [...kitcoMetals, ...kitcoCryptos], {
    keySelector: (x) => x.name || x.symbol,
  });

  // find possible pages on the site
  const possibles = search(term, kitcoRoutes, {
    keySelector: (x) => x.name,
  });

  return {
    priceSymbolAndCurrency: metalOrCrypto?.[0] || null,
    pages: possibles,
  };
};

export function useSearchStateAndEvents() {
  const r = useRouter();
  const [criteria, setState] = useReduce<SearchCriteria>(initialCriteria);

  const [possiblePages, setPossiblePages] = useState<Array<SectionItems>>([]);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const results = fuzzySearchForExtraneousData(event.target.value);
      setState({
        inputTerm: event.target.value,
        symbol: results?.priceSymbolAndCurrency?.symbol ?? null,
        currency: results?.priceSymbolAndCurrency?.currency ?? null,
      });
      setPossiblePages(results?.pages ?? []);
    },
    [],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [],
  );

  const onSearchButtonClick = useCallback(() => {
    const results = fuzzySearchForExtraneousData(criteria.inputTerm);
    setState({
      symbol: results?.priceSymbolAndCurrency?.symbol ?? null,
      currency: results?.priceSymbolAndCurrency?.currency ?? null,
    });
    setPossiblePages(results?.pages ?? []);
  }, []);

  const onSearchClear = useCallback(() => {
    setState(initialCriteria);
    setPossiblePages([]);
  }, []);

  // on mount handler
  useEffect(() => {
    if (r.query.term?.length > 2) {
      const results = fuzzySearchForExtraneousData(r.query.term as string);
      setState({
        inputTerm: r.query.term as string,
        symbol: results?.priceSymbolAndCurrency?.symbol ?? null,
        currency: results?.priceSymbolAndCurrency?.currency ?? null,
      });
      setPossiblePages(results?.pages ?? []);
    }
  }, [r.query]);

  return {
    state: {
      criteria,
      possiblePages,
    },
    handlers: {
      onInputChange,
      onKeyDown,
      onSearchButtonClick,
      onSearchClear,
    },
  };
}

export function useSearchAsyncFetch(criteria: SearchCriteria) {
  const r = useRouter();

  const debouncedState = useDebounce(criteria, 250);

  return useQuery(
    news.searchDrupal({
      variables: {
        query: debouncedState.inputTerm,
        timestamp: debouncedState.timestamp,
        currency: debouncedState.currency ?? "",
        symbol: debouncedState.symbol ?? "",
      },
      options: {
        enabled: debouncedState.inputTerm.length > 2,
        suspense: true,
        onSettled: () => {
          r.push(
            { pathname: "/search", query: { term: debouncedState.inputTerm } },
            undefined,
            {
              shallow: true,
            },
          );
        },
      },
    }),
  );
}
