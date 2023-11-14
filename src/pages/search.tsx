import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { Suspense } from "react";
import clsx from "clsx";

import hrefMatcher from "~/src/utils/hrefMatcher";
import priceFormatter from "~/src/utils/priceFormatter";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import Layout from "~/src/components/Layout/Layout";

import Table from "~/src/components/Table/Table";

import {
  SearchCriteria,
  useSearchAsyncFetch,
  useSearchStateAndEvents,
} from "../utils/use-search.hook";
import { kitcoCryptos } from "~/src/utils/kitcoDatas";
import { type SectionItems } from "../types";
import { colorize } from "~/src/utils/colorize-change.util";
import styles from "~/src/styles/pages/SearchPage.module.scss";

export default function SearchPage(): JSX.Element {
  const { state, handlers } = useSearchStateAndEvents();

  return (
    <Layout title="Search">
      <div className="px-6 grid grid-cols-1 lg:layout-cols-2 xl:px-0">
        <div className="">
          <div className={styles.inputWrapper}>
            <input
              type="text"
              onChange={handlers.onInputChange}
              onKeyDown={handlers.onKeyDown}
              value={state.criteria.inputTerm}
              placeholder="Search..."
              className={styles.searchBox}
            />

            <button
              type="button"
              onClick={handlers.onSearchButtonClick}
              className={styles.submitSearchButton}
            >
              Search
            </button>
          </div>
          {!state.criteria.inputTerm && (
            <EmptyResults>
              <span>Search for articles, metals, and pages.</span>
            </EmptyResults>
          )}
          {state.possiblePages?.length > 0 && (
            <PossiblePages possiblePages={state.possiblePages} />
          )}
          <Suspense fallback="Loading">
            <AsyncResults criteria={state.criteria} />
          </Suspense>
        </div>
        <div className="">
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
}

const EmptyResults = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center my-16">
    <h1 className="text-xl font-semibold text-gray-700">
      {children || "No results found"}
    </h1>
  </div>
);

function AsyncResults({ criteria }: { criteria: SearchCriteria }) {
  const { data } = useSearchAsyncFetch(criteria);
  return (
    <>
      {data?.metalData && (
        <div className="my-8">
          <CommodityItem commodity={data?.metalData} />
        </div>
      )}
      {data?.cryptoData && (
        <div className="my-8">
          <CryptoItem crypto={data?.cryptoData} />
        </div>
      )}
      <ul>
        {criteria.inputTerm && (
          <>
            {!data?.searchData?.length ? (
              <EmptyResults>
                <span>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  We couldn't find any articles matching '{criteria.inputTerm}',
                  try to be a little more specific
                </span>
              </EmptyResults>
            ) : (
              data?.searchData?.map((x) => (
                <ResultItem
                  key={x.id}
                  title={x.title}
                  description={x.excerpt}
                  urlAlias={x.urlAlias}
                />
              ))
            )}
          </>
        )}
      </ul>
    </>
  );
}

function PossiblePages({
  possiblePages,
}: {
  possiblePages: Array<SectionItems>;
}) {
  return (
    <div className="my-8 p-4 rounded-md bg-ktc-date-gray/10 overflow-hidden">
      <h4 className="font-semibold pb-2">
        Were you looking for one of these pages?
      </h4>
      <div className="relative pb-4">
        <ul className="absolute flex items-center gap-6">
          {possiblePages?.map((x, idx) => (
            <li key={idx}>
              <Link
                href={x.href}
                as={x.as}
                className="flex items-center whitespace-nowrap"
              >
                <span className="pr-2">{x.name}</span> <FiExternalLink />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ResultItem = ({ title, description, urlAlias }) => {
  return (
    <li className="my-2 py-4 color-black border-t border-ktc-date-gray/20">
      <Link className="text-black" href={hrefMatcher(urlAlias)} as={urlAlias}>
        <>
          <h4 className="font-semibold text-base">{title}</h4>
          <div
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </>
      </Link>
    </li>
  );
};

const CommodityItem = ({ commodity }) => {
  const prices = commodity.results[0];
  const priceClass = "text-md font-semibold md:text-lg";

  return (
    <Table title={`${commodity.name} Price Now`}>
      <div className="grid grid-cols-3 sm:grid-cols-5 px-6 py-2 border-b border-gray-200">
        <h5>BID</h5>
        <h5>ASK</h5>
        <h5 className="hidden sm:block">HIGH</h5>
        <h5 className="hidden sm:block">LOW</h5>
        <h5>CHANGE</h5>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 p-6">
        <h3 className={priceClass}>{priceFormatter(prices.bid)}</h3>
        <h3 className={priceClass}>{priceFormatter(prices.ask)}</h3>
        <h3 className={clsx(priceClass, "hidden sm:block")}>
          {priceFormatter(prices.high)}
        </h3>
        <h3 className={clsx(priceClass, "hidden sm:block")}>
          {priceFormatter(prices.low)}
        </h3>
        <h3
          className={clsx(priceClass, colorize(commodity.results[0]?.change))}
        >
          {commodity.results[0].change.toFixed(2)} (
          {commodity.results[0].changePercentage.toFixed(2)}
          %)
        </h3>
      </div>
    </Table>
  );
};

const CryptoItem = ({ crypto }) => {
  const prices = crypto.results[0];
  const priceClass = "text-lg font-semibold";

  return (
    <Table
      title={`${
        kitcoCryptos.find((x) => x.symbol === crypto.symbol).name
      } Price Now`}
    >
      <div className="grid grid-cols-3 sm:grid-cols-5 px-6 py-2 border-b border-gray-200">
        <h5>HIGH</h5>
        <h5>LOW</h5>
        <h5 className="hidden sm:block">OPEN</h5>
        <h5 className="hidden sm:block">CLOSE</h5>
        <h5>CHANGE</h5>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 p-6">
        <h3 className={priceClass}>{priceFormatter(prices.high)}</h3>
        <h3 className={priceClass}>{priceFormatter(prices.low)}</h3>
        <h3 className={clsx(priceClass, "hidden sm:block")}>
          {priceFormatter(prices.open)}
        </h3>
        <h3 className={clsx(priceClass, "hidden sm:block")}>
          {priceFormatter(prices.close)}
        </h3>
        <h3 className={clsx(priceClass, colorize(crypto.results[0]?.change))}>
          {crypto.results[0].change.toFixed(2)} (
          {crypto.results[0].changePercentage.toFixed(2)}
          %)
        </h3>
      </div>
    </Table>
  );
};
