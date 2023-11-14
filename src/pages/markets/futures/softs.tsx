import React, { FC } from "react";

import useFuturesSofts from "~/src/components-markets/FuturesCell/softsDataCell";

import BarchartChartGrid from "~/src/components-markets/BarchartChartGrid/BarchartChartGrid";
import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import FuturesCategoryPageWrapper from "~/src/components/futures-category-page-wrapper/futures-category-page-wrapper.component";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

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

const FuturesSofts: FC = () => {
  const [softs] = useFuturesSofts();

  return (
    <FuturesCategoryPageWrapper category="Softs">
      <>
        {softs.length && (
          <BarchartChartGrid columns={1}>
            <Barcharts
              symbol={softs[0].symbol}
              title={softs[0].name}
              href={`/markets/futures/${softs[0].symbol}`}
            />
          </BarchartChartGrid>
        )}
        <div className="mb-8">
          <QuotesTable title={"Softs"} section={"futures"} data={softs} />
        </div>
      </>
    </FuturesCategoryPageWrapper>
  );
};

export default FuturesSofts;
