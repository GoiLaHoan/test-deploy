import { FC } from "react";
import useSWR from "swr";

// TODO: PLEASE FINISH this is very half baked at the moment
const useData = () => {
  const { data: quotes } = useSWR(
    "/api/getQuote/$DOWI,$NASX,$SPX,$NYA,$GVZ,$DXY,^USDAUD,^USDCAD,^USDCNY,^USDEUR,^USDGBP,^USDJPY,GCZ20,SIZ20,HGZ20,GCG21,PLF21,HGH21",
  );

  const data = [];

  if (quotes) {
    for (const x of quotes.results) {
      const getSymbol = x.symbol.split("");
      console.warn(getSymbol);

      data.push({ ...x });
    }
  }

  return [data];
};

const TickerTape: FC = () => {
  const test = useData();
  console.warn(test);

  return (
    <div className="bg-[#232323] py-4">
      <h1>test</h1>
    </div>
  );
};

export default TickerTape;
