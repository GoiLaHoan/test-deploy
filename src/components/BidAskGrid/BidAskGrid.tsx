import cs from "~/src/utils/cs";
import isNegative from "~/src/utils/isNegative";

import BlockHeader from "~/src/components/BlockHeader/BlockHeader";
import Icon from "~/src/components/Icon/Icon";

import { CurrencySelect } from "../CurrencySelect/CurrencySelect";
import styles from "./BidAskGrid.module.scss";
import {
  WeightSelect,
  useWeightAtomRead,
} from "../WeightSelect/WeightSelect.component";
import dayjs from "dayjs";

interface Props {
  title: string;
  data: any;
  isLoading: boolean;
}

function styleUpOrDown(xue: number) {
  if (isNegative(xue)) {
    return styles.changeDown;
  }
  return styles.changeUp;
}

const handleButtonClick = () => {
  const linkToOpen = "http://alerts.kitco.com/KcastAlertsWeb/";

  window.open(linkToOpen, "_blank");
};

const BidAskGrid = ({ title, data, isLoading }: Props) => {
  return (
    <div>
      <BlockHeader title={title} />
      <div className={styles.flexSpaceBetween}>
        <div className="dropdownsContainer flex items-center">
          <div className="flex items-center gap-4">
            <CurrencySelect defaultValue="USD" />
            <WeightSelect />
          </div>
        </div>
        <div className="openOrClosed">
          <h4>MARKET IS OPEN</h4>
        </div>
        <div
          className="group flex justify-center items-center border border-gray-[#d6d6d6] bg-[#f4f4f7] cursor-pointer"
          onClick={handleButtonClick}
        >
          <img
            className="my-1 mx-2"
            src="/services/images/metals/alert.png"
            alt="Daily Recap"
          />
          <span className="text-[#003871] mr-1 group-hover:text-[#c06a24]">
            Market Alerts
          </span>
        </div>
      </div>
      <div className={styles.gridifier}>
        <p>Metals</p>
        <p>Date</p>
        <p>
          Time <br />
          (EST)
        </p>
        <p>Bid</p>
        <p>Ask</p>
        <p>Change</p>
        <p>Low</p>
        <p>High</p>
      </div>
      <ul
        className={cs([
          styles.listify,
          !isLoading ? "undefined" : "opacity-50",
        ])}
      >
        {data?.map((x, idx) => (
          <ItemRow
            ask={x?.results[0]?.ask}
            bid={x?.results[0]?.bid}
            change={x?.results[0]?.change}
            changePercentage={x?.results[0]?.changePercentage}
            high={x?.results[0]?.high}
            low={x?.results[0]?.low}
            name={x?.name}
            timestamp={x?.results[0]?.originalTime}
            key={idx}
          />
        ))}
      </ul>
    </div>
  );
};

export default BidAskGrid;

const ItemRow = ({
  ask,
  bid,
  change,
  changePercentage,
  high,
  low,
  name,
  timestamp,
}) => {
  const weight = useWeightAtomRead();
  return (
    <li>
      <div className={styles.gridifier}>
        <span className={styles.bold}>
          <Icon icon="barchart" size="12px" />
          {name}
        </span>
        <span>{!timestamp ? "-" : dayjs(timestamp).format("MMM D, YYYY")}</span>
        <span>{!timestamp ? "-" : dayjs(timestamp).format("HH:mm")}</span>
        <span>{!bid ? "-" : weight.renderFn(bid)}</span>
        <span>{!ask ? "-" : weight.renderFn(ask)}</span>
        <div className={styles.changeRow}>
          <div className={cs([styles.change])}>
            <div className={styleUpOrDown(change)}>
              {!change ? "-" : weight.renderFn(change)}
            </div>
          </div>
          <div className={styles.change}>
            <div className={styleUpOrDown(change)}>
              {!changePercentage ? "-" : changePercentage + "%"}
            </div>
          </div>
        </div>
        <span>{!low ? "-" : weight.renderFn(low)}</span>
        <span>{!high ? "-" : weight.renderFn(high)}</span>
      </div>
    </li>
  );
};
