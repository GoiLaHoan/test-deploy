import clsx from "clsx";
import currency from "currency.js";
import { useQuery } from "react-query";

import type { CryptoComparePriceFull } from "~/src/generated";
import { colorize } from "~/src/utils/colorize-change.util";
import { cryptos } from "~/src/lib/cryptos-factory.lib";

import * as Tables from "~/src/components/Tables/Tables";

const items = [
  { id: 0, name: "Bitcoin", symbol: "BTC" },
  { id: 1, name: "Ethereum", symbol: "ETH" },
  { id: 2, name: "Tether", symbol: "USDT" },
  { id: 3, name: "XRP", symbol: "XRP" },
  { id: 4, name: "Binance Coin", symbol: "BNB" },
  { id: 5, name: "USD Coin", symbol: "USDC" },
  { id: 6, name: "Solana", symbol: "SOL" },
  { id: 7, name: "Cardano", symbol: "ADA" },
  { id: 8, name: "Dogecoin", symbol: "DOGE" },
  { id: 9, name: "Tron", symbol: "TRX" },
];

function formatCurrency(value: number): string {
  const oneBillion = 1000000000;
  const oneMillion = 1000000;
  // check if value is greater than 1 billion
  if (value >= oneBillion) {
    return `${currency(value).divide(oneBillion).format()}B`;
  }

  // check if value is greater than 1 million and less than 1 billion
  if (value >= oneMillion && value < oneBillion) {
    return `${currency(value).divide(oneMillion).format()}M`;
  }

  return currency(value).format();
}

interface Item
  extends Pick<
    CryptoComparePriceFull,
    | "fromSymbol"
    | "changePct24HourCalculated"
    | "changePctHourCalculated"
    | "changePct7DayCalculated"
    | "mktCap"
    | "volumeDay"
    | "imageUrl"
    | "price"
  > {
  name: string;
}

// scaffold a nextjs page
export function CryptosTable() {
  const { data } = useQuery(
    cryptos.cryptosTable({
      variables: {
        symbols: items.map((item) => item.symbol).join(","),
        currency: "USD",
      },
      options: {
        // @ts-ignore
        select: (res) => {
          const hashMap = new Map(
            items.map((item) => [item.symbol, item.name]),
          );

          const transformedResults = res?.GetCryptoComparePriceFull?.map(
            (item) => ({
              ...item,
              name: hashMap.get(item.fromSymbol),
            }),
          );

          return transformedResults;
        },
      },
    }),
  );

  // typescript is mega upset about the transformation above, so let's just alias
  const transformedItems = data as Item[];

  const headerColumns = [
    { id: 1, name: "Coin" },
    { id: 2, name: "Price" },
    { id: 3, name: "1h%" },
    { id: 4, name: "24h%" },
    { id: 5, name: "7d%" },
    { id: 6, name: "Volume (24h)" },
    { id: 7, name: "Market Cap" },
  ];

  return (
    <Tables.Root label="Cryptocurrencies data">
      <Tables.Header>
        {headerColumns.map((x, idx) => (
          <Tables.ColumnHeader key={x.id} index={x.id}>
            <span
              className={clsx(
                "whitespace-nowrap",
                idx === headerColumns.length - 1 ? "px-2" : "",
              )}
            >
              {x.name}
            </span>
          </Tables.ColumnHeader>
        ))}
      </Tables.Header>
      <Tables.Body>
        {transformedItems?.map((x, idx) => (
          <Tables.Row index={idx} key={x.fromSymbol}>
            <Tables.RowLabelCell index={idx}>
              <img
                src={`https://cryptocompare.com/${x.imageUrl}`}
                alt={x.name}
                className="w-6 h-6 mx-2"
              />
              <div>
                <p className="font-semibold">{x.name}</p>
                <p className="text-black/40">{x.fromSymbol}</p>
              </div>
            </Tables.RowLabelCell>
            <Tables.NumberCell>
              <span className="font-bold">{currency(x.price).format()}</span>
            </Tables.NumberCell>
            <Tables.NumberCell>
              <ColorSpan value={x.changePctHourCalculated} />
            </Tables.NumberCell>
            <Tables.NumberCell>
              <ColorSpan value={x.changePct24HourCalculated} />
            </Tables.NumberCell>
            <Tables.NumberCell>
              <ColorSpan value={x.changePct7DayCalculated} />
            </Tables.NumberCell>
            <Tables.NumberCell>
              <span>{formatCurrency(x?.volumeDay)}</span>
            </Tables.NumberCell>
            <Tables.NumberCell>
              <span>{formatCurrency(x?.mktCap)}</span>
            </Tables.NumberCell>
          </Tables.Row>
        ))}
      </Tables.Body>
    </Tables.Root>
  );
}

const ColorSpan = (props: { value: number }) => (
  <span className={clsx(colorize(props.value))}>{props.value.toFixed(2)}</span>
);
