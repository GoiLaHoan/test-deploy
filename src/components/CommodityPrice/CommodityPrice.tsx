import type { MetalQuoteQuery } from "~/src/generated";

import cs from "~/src/utils/cs";
import { pf } from "~/src/utils/priceFormatter";
import "@reach/listbox/styles.css";
import { convert } from "~/src/utils/price-conversion";

import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";

import { CurrencySelect } from "../CurrencySelect/CurrencySelect";
import { Currency } from "~/src/utils/currencies";
import { currentTimestamp } from "~/src/utils/current-timestamp";

import styles from "./CommodityPrice.module.scss";
import clsx from "clsx";

type TPossibleRenders =
  | "ask"
  | "bid"
  | "change"
  | "change_percentage"
  | "changePercentage"
  | "convert_price_gram"
  | "convert_price_kilo"
  | "convert_price_penny"
  | "convert_price_tola"
  | "convert_price_tael"
  | "convert_change_kilo"
  | "convert_change_gram"
  | "convert_change_penny"
  | "convert_change_tola"
  | "convert_change_tael";

function CommodityPrice({
  currency,
  data,
  symbol,
}: {
  currency: Currency;
  data: MetalQuoteQuery;
  symbol: string;
}) {
  const res = data?.GetMetalQuote?.results[0];
  const change = res?.change,
    ask = res?.ask,
    bid = res?.bid,
    changePercentage = res?.changePercentage;

  const isUp = () => {
    if (!change) return;

    const test = change.toString();

    if (test.charAt(0) === "-") {
      return false;
    }
    return true;
  };

  const styleUpOrDown = !isUp() ? cs([styles.down]) : cs([styles.up]);

  // formula for converting
  // 1. get original value per ounce, bid - change
  // 2. take that result multiply or divide by conversion value i.e. 32.15 for kilo
  // 3. get newest bid price conversion
  // do some subraction

  const displayNullOrValue = (val: TPossibleRenders): string => {
    switch (val) {
      case "ask":
        if (!ask) return "-";
        return pf(ask);
      case "bid":
        if (!bid) return "-";
        return pf(bid);
      case "change":
        if (!change) return "-";
        return change?.toFixed(2);
      case "change_percentage":
        if (!changePercentage) return "-";
        return `${changePercentage?.toFixed(2)}%`;
      case "convert_price_gram":
        if (!bid) return "-";
        return convert.priceToGram(bid);
      case "convert_price_kilo":
        if (!bid) return "-";
        return convert.priceToKilo(bid);
      case "convert_price_penny":
        if (!changePercentage) return "-";
        return convert.priceToPennyweight(bid);
      case "convert_price_tola":
        if (!bid) return "-";
        return convert.priceToTola(bid);
      case "convert_price_tael":
        if (!bid) return "-";
        return convert.priceToTael(bid);
      case "convert_change_kilo":
        if (!bid || !change) return "-";
        return convert.priceChangeKilo(bid, change);
      case "convert_change_gram":
        if (!bid || !change) return "-";
        return convert.priceChangeGram(bid, change);
      case "convert_change_penny":
        if (!bid || !change) return "-";
        return convert.priceChangePenny(bid, change);
      case "convert_change_tola":
        if (!bid || !change) return "-";
        return convert.priceChangeTola(bid, change);
      case "convert_change_tael":
        if (!bid || !change) return "-";
        return convert.priceChangeTael(bid, change);
      default:
        return "-";
    }
  };

  const { data: dataAnnual } = useQuery(
    metals.metalMonthAnnual({
      variables: {
        symbol: !symbol ? "AU" : symbol,
        currency: !currency ? "USD" : currency.symbol,
        timestamp: currentTimestamp(),
      },
    }),
  );

  const priceToday = dataAnnual?.GetHistoricalPoints?.now;

  return (
    <>
      <div className="border-b border-ktc-borders">
        <div className="mb-px font-normal text-[13px] ml-0.5">Bid</div>
        <div className="text-right mb-2">
          <h3 className="text-4xl font-mulish font-bold leading-normal tracking-[1px] mr-[7px] mb-[3px]">
            {displayNullOrValue("bid")}
          </h3>
          <div className="mb-2 mt-[-9px]">
            <CurrencySelect
              classNamesListbox={cs([
                styles.listbox,
                "!border-0 font-bold text-xs",
              ])}
              classNamesItemListbox="!gap-0"
              classNamesIconListbox="!pl-0"
              hideFlags
            />
          </div>

          <div className={clsx(styles.currencyChangeDate, "mr-0.5")}>
            <span className={clsx(styleUpOrDown, "text-[15px]")}>
              {isUp() ? "+" : ""}
              {displayNullOrValue("change")}&nbsp;
            </span>
            <span className={clsx(styleUpOrDown, "text-[15px]")}>
              ({isUp() ? "+" : ""}
              {displayNullOrValue("change_percentage")})
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center mb-10">
          <div className="font-normal text-sm">Ask</div>
          <div className="font-normal text-[19px] mr-0.5">
            {displayNullOrValue("ask")}
          </div>
        </div>
        <div className="mb-10">
          <ul className={styles.spotPriceGrid}>
            <Row>
              <RowLabel>ounce</RowLabel>
              <Price>{displayNullOrValue("bid")}</Price>
              <Change styleUpOrDown={styleUpOrDown}>
                {isUp() && "+"}
                {displayNullOrValue("change")}
              </Change>
            </Row>
            <Row>
              <RowLabel>gram</RowLabel>
              <Price>{displayNullOrValue("convert_price_gram")}</Price>
              <Change styleUpOrDown={styleUpOrDown}>
                {isUp() && "+"}
                {displayNullOrValue("convert_change_gram")}
              </Change>
            </Row>
            <Row>
              <RowLabel>Kilo</RowLabel>
              <Price>{displayNullOrValue("convert_price_kilo")}</Price>
              <Change styleUpOrDown={styleUpOrDown}>
                {isUp() && "+"}
                {displayNullOrValue("convert_change_kilo")}
              </Change>
            </Row>
            <Row>
              <RowLabel>pennyweight</RowLabel>
              <Price>{displayNullOrValue("convert_price_penny")}</Price>
              <Change styleUpOrDown={styleUpOrDown}>
                {isUp() && "+"}
                {displayNullOrValue("convert_change_penny")}
              </Change>
            </Row>
            <Row>
              <RowLabel>tola</RowLabel>
              <Price>{displayNullOrValue("convert_price_tola")}</Price>
              <Change styleUpOrDown={styleUpOrDown}>
                {isUp() && "+"}
                {displayNullOrValue("convert_change_tola")}
              </Change>
            </Row>
            <Row>
              <RowLabel>Tael (HK)</RowLabel>
              <Price>{displayNullOrValue("convert_price_tael")}</Price>
              <Change styleUpOrDown={styleUpOrDown}>
                {isUp() && "+"}
                {displayNullOrValue("convert_change_tael")}
              </Change>
            </Row>
          </ul>
        </div>
        {priceToday && (
          <>
            <div className={styles.priceToday}>
              <div>{priceToday?.low?.toFixed(2)}</div>
              <div>{priceToday?.high?.toFixed(2)}</div>
            </div>
            <div className="text-center text-[14px] font-normal leading-[18px] pt-2">
              Day&apos;s Range
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CommodityPrice;

type Props = { children: React.ReactNode };

const Row: React.FC<Props> = ({ children }) => (
  <li className="flex items-center pt-1 pb-[3px]">{children}</li>
);

const RowLabel: React.FC<Props> = ({ children }) => (
  <p className={clsx(styles.priceName, "capitalize")}>{children}</p>
);

const Price: React.FC<Props> = ({ children }) => (
  <p className={clsx(styles.convertPrice, "justify-self-end ml-auto")}>
    {children}
  </p>
);

const Change: React.FC<React.PropsWithChildren<{ styleUpOrDown: any }>> = ({
  children,
  styleUpOrDown,
}) => {
  return (
    <p
      className={cs([
        styleUpOrDown,
        styles.convertPrice,
        "min-w-[82px] justify-self-end",
      ])}
    >
      {children}
    </p>
  );
};
