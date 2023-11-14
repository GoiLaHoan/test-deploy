import React, { FC } from "react";

import useFuturesEnergies from "~/src/components-markets/FuturesCell/energiesDataCell";

import BarchartChartGrid from "~/src/components-markets/BarchartChartGrid/BarchartChartGrid";
import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import FuturesCategoryPageWrapper from "~/src/components/futures-category-page-wrapper/futures-category-page-wrapper.component";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

// TODO: FIX
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

const FuturesEnergies: FC = () => {
  const [data] = useFuturesEnergies();

  return (
    <FuturesCategoryPageWrapper category="Energies">
      <>
        {data.length && (
          <BarchartChartGrid columns={2}>
            <Barcharts
              symbol={data[0].symbol}
              title={data[0].name}
              href={`/markets/futures/${data[0].symbol}`}
            />
            <div className="hidden md:block lg:block">
              <Barcharts
                symbol={data[1].symbol}
                title={data[1].name}
                href={`/markets/futures/${data[1].symbol}`}
              />
            </div>
          </BarchartChartGrid>
        )}
        <div className="mb-8">
          <QuotesTable title={"Energies"} section={"futures"} data={data} />
        </div>
      </>
    </FuturesCategoryPageWrapper>
  );
};

export default FuturesEnergies;
