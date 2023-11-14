import React, { FC } from "react";

import useFuturesIndices from "~/src/components-markets/FuturesCell/indicesDataCell";

import BarchartChartGrid from "~/src/components-markets/BarchartChartGrid/BarchartChartGrid";
import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
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

const FuturesIndices: FC = () => {
  const [indices] = useFuturesIndices();

  return (
    <FuturesCategoryPageWrapper category="Indices">
      <>
        {indices.length && (
          <BarchartChartGrid columns={2}>
            <Barcharts
              symbol={indices[0].symbol}
              title={indices[0].name}
              href={`/markets/futures/${indices[0].symbol}`}
            />
            <div className="hidden md:block lg:block">
              <Barcharts
                symbol={indices[1].symbol}
                title={indices[1].name}
                href={`/markets/futures/${indices[1].symbol}`}
              />
            </div>
          </BarchartChartGrid>
        )}
        <div className="mb-8">
          <QuotesTable title={"Indices"} section={"indices"} data={indices} />
        </div>
      </>
    </FuturesCategoryPageWrapper>
  );
};

export default FuturesIndices;
