import { FC } from "react";

import BaseMetalsQuoteCell from "~/src/components-metals/BaseMetalsQuotesCell/BaseMetalsQuotesCell";
import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import AllMetalQuotesCell from "~/src/components-metals/AllMetalQuotesCell/AllMetalQuotesCell";

import Layout from "~/src/components/Layout/Layout";
import PageLayoutTwoColumns from "~/src/components/PageLayoutTwoColumns/PageLayoutTwoColumns";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

// TODO: add queries from AllMetalQuotesCell
// export const getServerSideProps = async () =>
//   await ssrToState({
//     queries: [
//       ssrQuery({
//         fn: useAllMetalQuotesQuery,
//         variables: {
//           currency: 'USD',
//           timestamp: currentTimestamp(),
//         },
//       }),
//
//       ssrQuery({
//         fn: useGetBaseMetalsQuery,
//         variables: {
//           currency: 'USD',
//           timestamp: currentTimestamp(),
//         },
//       }),
//     ],
//   })

const KitcoGoldIndex: FC = () => {
  return (
    <Layout title="Kitco Gold Index">
      <PageLayoutTwoColumns>
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Kitco Gold Index (KGX)</h1>
            <p className="text-base text-gray-700">
              Shows how US dollar fluctuations impact the value of gold.
            </p>
          </div>
          <div className="mb-8">
            <AllMetalQuotesCell componentAlias="kitcoTable" />
          </div>
          <div className="mb-8">
            <BaseMetalsQuoteCell />
          </div>
          {/* placeholder text */}
          <div className="mb-8">
            <h3 className="text-lg font-bold">
              US Dollar Strength, Weakness and the Price of Gold: A Primer
            </h3>
            <p>
              When the US Dollar gets stronger, it takes fewer dollars to buy
              any commodity that is priced in $USD. When the US Dollar gets
              weaker it takes more dollars to purchase the same commodity.
              <br />
              <br />
              The price of all US Dollar denominated commodities, like gold,
              will change to reflect the fact that it will take fewer or more
              dollars to buy that commodity. So it’s quite possible, in fact
              it’s almost always the case that a portion of the change in the
              price of gold is really just a reflection of a change in the value
              of the US Dollar. Sometimes that portion is insignificant. But
              often the opposite is true where the entire change in the gold
              price is simply a mathematical recalculation of an ever-changing
              US Dollar value.
              <br />
              <br />
              When the dollar gets strong, gold appears to go down, and vice
              versa. That accounts for part of the fluctuations that we see in
              the value of gold.
              <br />
              <br />
              The other part is an actual increase in the supply or demand for
              gold. If the price is higher when being measured not only in US
              Dollars, but also in Euros, Pounds Sterling, Japanese Yen, and
              every other major currency, then we know the gold demand is higher
              and it has actually increased in value.
              <br />
              <br />
              Consequently, if gold is higher in US Dollars while at the same
              time cheaper in every other currency, then we can conclude that
              the US Dollar has weakened, and that gold has actually lost value
              in all other currencies. But the price, because it is being quoted
              in $USD will be higher and give the illusion of gold becoming more
              valuable. In such a case the devaluation of gold, due to increased
              supply on the market, is camouflaged by a weakened US Dollar.
              <br />
              <br />
              Our feature on kitco.com breaks the change of the price of gold
              into 2 components. One part shows you how much of that change can
              be attributed to US Dollar strength, or lack of it. The other
              portion is indicative of how much the price changed as a result of
              normal trading. Interestingly whatever changes happen to the price
              of gold as a result of US Dollar strength/weakness also occurs to
              every other US Dollar denominated commodity by the exact same
              proportion.
              <br />
              <br />
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-bold">
              About the Kitco Gold Index: What is it and why is it relevant?
            </h3>
            <p>
              The Kitco Gold Index has one purpose, that is to determine whether
              the value of gold is actual, a reflection of changes in the US
              Dollar value, or a combination of both.
              <br /> <br />
              The U.S. Dollar Index® represents the value of the US Dollar in
              terms of a basket of six major foreign currencies: Euro (57.6%),
              Japanese Yen (13.6%), UK Pound (11.9%), Canadian Dollar (9.1%),
              Swedish Krona (4.2%) and Swiss Franc (3.6%). It is an exchange
              traded (FINEX) index and has become a standard used worldwide.
              <br /> <br />
              The Kitco Gold Index is the price of gold measured not in terms of
              US Dollars, but rather in terms of the same weighted basket of
              currencies that determine the US Dollar Index®.
              <br /> <br />
              Since the Kitco Gold Index has no US Dollar component it needs to
              be compared to the actual US Dollar price to give it some
              perspective. In all of the historical and live charts that we are
              displaying here we’re showing both trend lines for the purposes of
              making this comparison. Here are a few possible situations that
              you may see and what the meaning could be:
            </p>
            <Barcharts symbol="^XAUUSD" />
          </div>
          <div className="mb-6">
            <h4 className="text-base font-bold">
              The Kitco Gold Index is up and the USD price of gold is up even
              more:
            </h4>
            <p>
              This would definitely mean that gold has increased in value. It
              also means that the USD has weakened and so the degree of the gold
              value increase will be exaggerated when examined strictly in terms
              of the US Dollar. This is the exact scenario that we’ve witnessed
              over the span of the early years of the 21st century.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-base font-bold">
              The Kitco Gold Index is down and the USD price of gold is down
              even more:
            </h4>
            <p>
              This would definitely mean that gold value has declined in value.
              But not by as much as it may appear in USD terms.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-base font-bold">
              The Kitco Gold Index is up and the USD price of gold is down:
            </h4>
            <p>
              This would indicate that the USD has strengthened relative to the
              other major currencies, but that gold has gained in value.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-base font-bold">
              The Kitco Gold Index is down and the USD price of gold is up:
            </h4>
            <p>
              This would indicate that the USD has weakened relative to the
              other major currencies, and that gold is really not up as it may
              appear.
            </p>
          </div>
        </div>
        <div>
          <LatestNewsCell />
        </div>
      </PageLayoutTwoColumns>
    </Layout>
  );
};

export default KitcoGoldIndex;
