import { miningIndices } from "~/src/lib/miningIndices";
import useSWR from "swr";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import Layout from "~/src/components/Layout/Layout";
import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import { QuoteObj } from "~/src/types";
import type { NextPage } from "next";

export const getServerSideProps = ({ query }) => {
  return {
    props: {
      name: query.name,
    },
  };
};

const useData = (name: string) => {
  const whichIndex = miningIndices.filter((x) => x.symbol === name);
  const { data } = useSWR(`/api/getQuote/${whichIndex[0].symbols}`);

  let topFive: QuoteObj[] = [];

  if (data) {
    topFive =
      data.results.length >= 1 &&
      data.results
        .map((val) => val)
        .sort((a, b) =>
          a.percentChange < b.percentChange
            ? 1
            : a.percentChange > b.percentChange
            ? -1
            : 0,
        )
        .slice(0, 5);
  }

  const about = whichIndex[0].about;
  return { data, about, topFive };
};

const MiningIndexPage: NextPage<{ name: string }> = ({ name }) => {
  const { data, about, topFive } = useData(name);

  return (
    <Layout title={name}>
      <div className="grid gap-8 px-4 lg:grid-cols-layout-2 lg:px-0 sm:grid-cols-1 sm:px-8">
        <div className="left">
          <h1 className="mb-8 text-lg">{about}</h1>
          <div className="mb-8">
            <QuotesTable title={name} section="stocks" data={data?.results} />
          </div>
          <div className="mb-8">
            <QuotesTable
              title={`${name} Top Five`}
              section="stocks"
              data={topFive}
            />
          </div>
        </div>

        <div>
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default MiningIndexPage;
