import React, { FC } from "react";

import useFuturesMeats from "~/src/components-markets/FuturesCell/meatsDataCell";

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

const FuturesMeats: FC = () => {
  const [meats] = useFuturesMeats();

  return (
    <FuturesCategoryPageWrapper category="Meats">
      <>
        {meats.length && (
          <BarchartChartGrid columns={2}>
            <Barcharts
              symbol={meats[0].symbol}
              title={meats[0].name}
              href={`/markets/futures/${meats[0].symbol}`}
            />
            <div className="hidden md:block lg:block">
              <Barcharts
                symbol={meats[1].symbol}
                title={meats[1].name}
                href={`/markets/futures/${meats[1].symbol}`}
              />
            </div>
          </BarchartChartGrid>
        )}
        <div className="mb-8">
          <QuotesTable title={"Meats"} section={"futures"} data={meats} />
        </div>
      </>
    </FuturesCategoryPageWrapper>
  );
};

export default FuturesMeats;
