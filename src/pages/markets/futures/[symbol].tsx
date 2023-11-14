import React, { FC } from "react";

import type { Exchanges, FuturesCategory } from "~/src/types";

import useFuturesContracts from "~/src/components-markets/FuturesCell/contractsDataCell";
import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";

import FutureForexTable from "~/src/components/FutureForexTable/FutureForexTable";
import Layout from "~/src/components/Layout/Layout";

interface ServerProps {
  name: string;
  exchange: Exchanges;
  category: FuturesCategory;
}

export async function getServerSideProps({ query }) {
  const params = query.symbol.split("_");
  return {
    props: {
      name: params[0],
      category: params[1] ?? "",
      exchange: params[2] ?? "CME",
    },
  };
}

const FuturesContracts: FC<ServerProps> = ({ name, category, exchange }) => {
  const [contracts] = useFuturesContracts(category, exchange);

  return (
    <Layout title="title">
      <div className="grid gap-8 lg:grid-cols-layout-2 sm:grid-cols-1">
        <div>
          <h1 className="text-2xl font-semibold mb-8">{name} Futures</h1>
          <div className="mb-8">
            <FutureForexTable data={contracts} title={"Metals"} />
          </div>
        </div>
        <div>
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default FuturesContracts;
