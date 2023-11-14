import dayjs from "dayjs";
import type { FC } from "react";
import type { BarchartsQuotesQuery } from "~/src/generated";

import Icon from "~/src/components/Icon/Icon";
import { Socials } from "~/src/components/socials/Socials";
import cs from "~/src/utils/cs";

import styles from "./IndexDetailTitleBlock.module.scss";

const IndexDetailTitleBlock: FC<{ data: BarchartsQuotesQuery }> = ({
  data,
}) => {
  if (!data) {
    return <h2>loading</h2>;
  }

  const { format } = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const isUp = () => {
    if (data) {
      for (const x of data?.GetBarchartQuotes?.results) {
        const stringifyValue = x.netChange.toString();
        if (stringifyValue.charAt(0) === "-") {
          return false;
        }
        return true;
      }
    }
  };

  const styleUpOrDown = !isUp() ? styles.down : styles.up;

  const index = data?.GetBarchartQuotes?.results[0];
  return (
    <div>
      <div className={styles.titleContainer}>
        <h1 className="lg:text-5xl font-semibold sm:text-3xl">{index?.name}</h1>
        <Socials
          email={null}
          facebook={"KitcoNews"}
          linkedIn={"company/kitconews"}
          twitter={"KitcoNewsNOW"}
        />
      </div>
      <h1 className="lg:text-5xl font-semibold sm:text-3xl">
        {format(index?.lastPrice)}
        <span className="text-sm font-normal text-gray-600 ml-4">LAST</span>
      </h1>
      <div className="flex text-base divide-x divide-gray-400 mt-2">
        <h3 className="font-semibold pr-2">USD</h3>
        <span className={cs([styleUpOrDown, "pl-2 pr-2"])}>
          <Icon
            icon={!isUp() ? "arrow-down" : "arrow-up"}
            color={!isUp() ? "red" : "green"}
            size="16px"
            margin="0px 6px 2px 0"
          />
          {index?.netChange.toFixed(2)}
          &nbsp; ({index?.percentChange}&#37;)
        </span>
        <span className="pl-2">{dayjs().format("MMM D, YYYY")}</span>
      </div>
    </div>
  );
};

export default IndexDetailTitleBlock;
