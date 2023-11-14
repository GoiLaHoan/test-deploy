import React, { FC } from "react";

import useFuturesMetals from "~/src/components-markets/FuturesCell/metalsDataCell";

import BarchartChartGrid from "~/src/components-markets/BarchartChartGrid/BarchartChartGrid";
import FutureForexTable from "~/src/components/FutureForexTable/FutureForexTable";
import FuturesCategoryPageWrapper from "~/src/components/futures-category-page-wrapper/futures-category-page-wrapper.component";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

// chasing barcharts gcdn err. this page is good
// export async function getServerSideProps() {
//   const apollo = initializeApollo()
//
//   await apollo.query({
//     query: componentData.query,
//     variables: componentData.variables,
//   })
//
//   return addApolloState(apollo, {
//     props: {},
//   })
// }

const FuturesMetals: FC = () => {
  const [metals] = useFuturesMetals();

  return (
    <FuturesCategoryPageWrapper category="Metals">
      <>
        {metals.length && (
          <BarchartChartGrid columns={2}>
            <Barcharts
              symbol={metals[0].symbol}
              title={metals[0].name}
              href={`/markets/futures/${metals[0].symbol}`}
            />
            <div className="hidden md:block lg:block">
              <Barcharts
                symbol={metals[1].symbol}
                title={metals[1].name}
                href={`/markets/futures/${metals[1].symbol}`}
              />
            </div>
          </BarchartChartGrid>
        )}
        <div className="mb-8">
          <FutureForexTable data={metals} title={"Metals"} />
        </div>
        <h4>
          Data provided by{" "}
          <a
            href="https://www.barchart.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Barchart
          </a>
        </h4>
      </>
    </FuturesCategoryPageWrapper>
  );
};

export default FuturesMetals;
