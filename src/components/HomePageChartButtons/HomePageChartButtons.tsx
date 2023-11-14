import cs from "~/src/utils/cs";
import { Timescales } from "~/src/utils/ctxTimestamp";
import { FC } from "react";
import styles from "./HomePageChartButtons.module.scss";

interface Props {
  timescale: Timescales;
  setTimescale: (value: Timescales) => void;
}

const timeframes: Array<{ readable: string; value: Timescales }> = [
  { readable: "5 Minute", value: Timescales.FIVE_MIN },
  { readable: "1 Hour", value: Timescales.ONE_HOUR },
  { readable: "1 Day", value: Timescales.ONE_DAY },
];

const HomePageChartButtons: FC<Props> = ({ timescale, setTimescale }) => {
  return (
    <div className="mx-2 my-2 py-1 flex box-border">
      {timeframes.map((x, idx) => (
        <button
          type="button"
          onClick={() => setTimescale(x.value)}
          className={cs([
            styles.updateBtn,
            idx === 1 && styles.midBtn,
            x.value === timescale && "bg-[#f0b310] border-[#f0b310]",
          ])}
          key={idx}
        >
          {x.readable}
        </button>
      ))}
    </div>
  );
};

export default HomePageChartButtons;
