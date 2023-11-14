import useFuturesCurrencies from "~/src/components-markets/FuturesCell/currenciesDataCell";
import useFuturesEnergies from "~/src/components-markets/FuturesCell/energiesDataCell";
import useFuturesGrains from "~/src/components-markets/FuturesCell/grainsDataCell";
import useFuturesIndices from "~/src/components-markets/FuturesCell/indicesDataCell";
import useFuturesMeats from "~/src/components-markets/FuturesCell/meatsDataCell";
import useFuturesMetals from "~/src/components-markets/FuturesCell/metalsDataCell";
import useFuturesSofts from "~/src/components-markets/FuturesCell/softsDataCell";
import React, { FC } from "react";

import BarchartChartGrid from "~/src/components-markets/BarchartChartGrid/BarchartChartGrid";
import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import FuturesCategoryPageWrapper from "~/src/components/futures-category-page-wrapper/futures-category-page-wrapper.component";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

const FuturesLanding: FC<any> = () => {
  const [metals] = useFuturesMetals();
  const [energies] = useFuturesEnergies();
  const [grains] = useFuturesGrains();
  const [softs] = useFuturesSofts();
  const [indices] = useFuturesIndices();
  const [meats] = useFuturesMeats();
  const [currencies] = useFuturesCurrencies();

  return (
    <FuturesCategoryPageWrapper category="All">
      <>
        <BarchartChartGrid columns={2}>
          <Barcharts
            symbol="$DOWI"
            title="Dow Jones Industrial Average "
            href="/markets/indices/$DOWI"
          />
          <div className="hidden md:block lg:block">
            <Barcharts
              symbol="$SPX"
              title="S&P 500"
              href="/markets/indices/$SPX"
            />
          </div>
        </BarchartChartGrid>
        <div className="mb-8">
          <QuotesTable title={"Metals"} section={"futures"} data={metals} />
        </div>
        <div className="mb-8">
          <QuotesTable title={"Energies"} section={"futures"} data={energies} />
        </div>
        <div className="mb-8">
          <QuotesTable title={"Grains"} section={"futures"} data={grains} />
        </div>
        <div className="mb-8">
          <QuotesTable title={"Softs"} section={"futures"} data={softs} />
        </div>
        <div className="mb-8">
          <QuotesTable title={"Indices"} section={"futures"} data={indices} />
        </div>
        <div className="mb-8">
          <QuotesTable title={"Meats"} section={"futures"} data={meats} />
        </div>
        <div className="mb-8">
          <QuotesTable
            title={"Currencies"}
            section={"futures"}
            data={currencies}
          />
        </div>
      </>
    </FuturesCategoryPageWrapper>
  );
};

export default FuturesLanding;
