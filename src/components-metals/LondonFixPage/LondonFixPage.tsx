import dayjs from "dayjs";

import priceFormatter from "~/src/utils/priceFormatter";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import { CurrencySelect } from "~/src/components/CurrencySelect/CurrencySelect";
import Layout from "~/src/components/Layout/Layout";
import Table from "~/src/components/Table/Table";
import type { LondonFixDynamicQuery } from "~/src/generated";
import cs from "~/src/utils/cs";

interface Props {
  data: LondonFixDynamicQuery;
  isLoading: boolean;
}

const row = "grid grid-cols-5 border-b border-gray-200 text-center";
const ColumnTitles = () => {
  const span = "text-sm text-gray-600 font-normal";
  return (
    <>
      <div className={`${row} text-base font-semibold`}>
        <div />
        <h4>
          Gold <br /> <span className={span}>AM/PM</span>
        </h4>
        <h4>
          Silver <br /> <span className={span}>NOON</span>
        </h4>
        <h4>
          Platinum <br /> <span className={span}>AM/PM</span>
        </h4>
        <h4>
          Palladium <br /> <span className={span}>AM/PM</span>
        </h4>
      </div>
    </>
  );
};

export default function LondonFixPage({ data, isLoading }: Props) {
  return (
    <Layout title="London Fix">
      <div className="layout-cols-1 md:layout-cols-1 lg:layout-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold mr-2">Latest London Fix</h1>
            <div>
              <CurrencySelect />
            </div>
          </div>

          <Table title="London Fix Today">
            <ColumnTitles />
            {data &&
              data?.GetLondonFix?.results
                ?.slice(0, 1)
                .map((x: any, idx: number) => (
                  <div
                    className={cs([
                      `${row} py-4 border-[rgba(0,0,0,0)]`,
                      !isLoading ? "" : "opacity-25",
                    ])}
                    key={idx}
                  >
                    <div>{dayjs.unix(x.timestamp).format("MMMM DD, YYYY")}</div>
                    <div>
                      {priceFormatter(x.goldAM) || "-"}&nbsp;/&nbsp;
                      {priceFormatter(x.goldPM) || "-"}
                    </div>
                    <div>{priceFormatter(x.silver) || "-"}</div>
                    <div>
                      {priceFormatter(x.platinumAM) || "-"}&nbsp;/&nbsp;
                      {priceFormatter(x.platinumPM) || "-"}
                    </div>
                    <div>
                      {priceFormatter(x.palladiumAM) || "-"}&nbsp;/&nbsp;
                      {priceFormatter(x.palladiumPM) || "-"}
                    </div>
                  </div>
                ))}
          </Table>
          <div className="mt-12">
            <Table title="London Fix History">
              <ColumnTitles />
              {data &&
                data?.GetLondonFix?.results
                  ?.slice(1, 1000)
                  .map((x: any, idx: number) => (
                    <div
                      className={cs([
                        `${row} py-4 ${idx % 2 ? "bg-[#f5f5f5]" : ""}`,
                        !isLoading ? "" : "opacity-25",
                      ])}
                      key={idx}
                    >
                      <div>
                        {dayjs.unix(x.timestamp).format("MMMM DD, YYYY")}
                      </div>
                      <div>
                        {priceFormatter(x.goldAM) || "-"}&nbsp;/&nbsp;
                        {priceFormatter(x.goldPM) || "-"}
                      </div>
                      <div>{priceFormatter(x.silver) || "-"}</div>
                      <div>
                        {priceFormatter(x.platinumAM) || "-"}&nbsp;/&nbsp;
                        {priceFormatter(x.platinumPM) || "-"}
                      </div>
                      <div>
                        {priceFormatter(x.palladiumAM) || "-"}&nbsp;/&nbsp;
                        {priceFormatter(x.palladiumPM) || "-"}
                      </div>
                    </div>
                  ))}
            </Table>
          </div>
        </div>
        <aside>
          <LatestNewsCell />
        </aside>
      </div>
    </Layout>
  );
}
