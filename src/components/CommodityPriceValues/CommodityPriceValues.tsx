import type { MetalQuoteQuery } from "~/src/generated";
import dayjs from "dayjs";

import { convert } from "~/src/utils/price-conversion";

import CommodityTitle from "~/src/components/CommodityTitle/CommodityTitle";
import cs from "~/src/utils/cs";
import { pf } from "~/src/utils/priceFormatter";
import { usePriceAnimator } from "~/src/utils/usePriceAnimator";

import styles from "./CommodityPriceValues.module.scss";

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

function CommodityPageHeroValues({
  currency,
  commodity,
  data,
}: {
  commodity: string;
  currency: any;
  data: MetalQuoteQuery;
}) {
  // const [previous, setPrevious] = useState<GetMetalQuoteQuery | null>(!data ? null : data)

  const { direction } = usePriceAnimator(
    data?.GetMetalQuote?.results[0]?.bid,
    data?.GetMetalQuote?.results[0]?.ask,
  );

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

  const animationClass = () => {
    if (direction === "down") {
      return cs([styles.bidStyle, styles.animatedDown]);
    }

    if (direction === "up") {
      return cs([styles.bidStyle, styles.animatedUp]);
    }

    return cs([styles.bidStyle]);
  };

  return (
    <>
      <CommodityTitle commodity={commodity} />
      <div className={styles.priceFlexSb}>
        <div className={styles.bidAskContainer}>
          <h1 className={animationClass()}>
            {displayNullOrValue("bid")}
            <span>BID</span>
          </h1>
          <h1 className={styles.askStyle}>
            {displayNullOrValue("ask")}
            <span>ASK</span>
          </h1>
          <div className={styles.currencyChangeDate}>
            <span className={styleUpOrDown}>
              {isUp() ? "+" : ""}
              {displayNullOrValue("change")}&nbsp;
            </span>
            <span className={styleUpOrDown}>
              ({isUp() ? "+" : ""}
              {displayNullOrValue("change_percentage")})
            </span>
            <span className={styles.currencyText}>{currency.symbol}</span>
            <span>{dayjs().format("MMM D, YYYY")}</span>
          </div>
        </div>

        <ul className={styles.spotPriceGrid}>
          <li>
            <h4 className={styles.alignLeft}>{commodity} Spot Price</h4>
            <h4>{commodity} Price Today</h4>
            <h4>Change</h4>
          </li>
          <li>
            <p className={styles.alignLeft}>Price per ounce</p>
            <p>{displayNullOrValue("bid")}</p>
            <p className={styleUpOrDown}>
              {isUp() && "+"}
              {displayNullOrValue("change")}
            </p>
          </li>
          <li>
            <p className={styles.alignLeft}>Price per gram</p>
            <p>{displayNullOrValue("convert_price_gram")}</p>
            <p className={styleUpOrDown}>
              {isUp() && "+"}
              {displayNullOrValue("convert_change_gram")}
            </p>
          </li>
          <li>
            <p className={styles.alignLeft}>Price per kilo</p>
            <p>{displayNullOrValue("convert_price_kilo")}</p>
            <p className={styleUpOrDown}>
              {isUp() && "+"}
              {displayNullOrValue("convert_change_kilo")}
            </p>
          </li>
          <li>
            <p className={styles.alignLeft}>Price per pennyweight</p>
            <p>{displayNullOrValue("convert_price_penny")}</p>
            <p className={styleUpOrDown}>
              {isUp() && "+"}
              {displayNullOrValue("convert_change_penny")}
            </p>
          </li>
          <li>
            <p className={styles.alignLeft}>Price per tola</p>
            <p>{displayNullOrValue("convert_price_tola")}</p>
            <p className={styleUpOrDown}>
              {isUp() && "+"}
              {displayNullOrValue("convert_change_tola")}
            </p>
          </li>
          <li>
            <p className={styles.alignLeft}>Price per TAEL (hk)</p>
            <p>{displayNullOrValue("convert_price_tael")}</p>
            <p className={styleUpOrDown}>
              {isUp() && "+"}
              {displayNullOrValue("convert_change_tael")}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default CommodityPageHeroValues;
