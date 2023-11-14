import dayjs from "dayjs";
import { FC } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

import Icon from "~/src/components/Icon/Icon";
import style from "./DateRanger.module.scss";

interface Props {
  first: any;
  second: any;
  setFirstDate: (arg?: any) => void;
  setSecondDate: (arg?: any) => void;
}

const DateRanger: FC<Props> = ({
  first,
  second,
  setFirstDate,
  setSecondDate,
}) => {
  return (
    <div className={style.wrapper}>
      <div className="flex flex-col">
        <label>Start date</label>
        <DayPickerInput
          format={dayjs.unix(first).format("MMM D, YYYY")}
          placeholder={dayjs.unix(first).format("MMM D, YYYY")}
          onDayChange={setFirstDate}
        />
      </div>
      <div className={style.iconContainer}>
        <Icon icon="arrow-right" className="mx-4" color={"#999"} size="18px" />
      </div>
      <div className="flex flex-col">
        <label>End date</label>
        <DayPickerInput
          format={dayjs.unix(second).format("MMM D, YYYY")}
          placeholder={dayjs.unix(second).format("MMM D, YYYY")}
          onDayChange={setSecondDate}
        />
      </div>
    </div>
  );
};

export default DateRanger;
