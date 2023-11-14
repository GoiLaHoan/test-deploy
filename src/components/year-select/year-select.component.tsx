import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import dayjs from "dayjs";
import { atom, useAtom } from "jotai";
import cs from "~/src/utils/cs";

function produceHistoricalDates(thisManyYearsBack: number) {
  return {
    endTime: dayjs()
      .subtract(thisManyYearsBack, "year")
      .month(12)
      .date(1)
      .unix(),
    startTime: dayjs()
      .subtract(thisManyYearsBack, "year")
      .month(0)
      .date(1)
      .unix(),
    humanReadable: dayjs().subtract(thisManyYearsBack, "year").format("YYYY"),
  };
}

const initState = {
  selectedKey: 0,
  all: {
    0: {
      endTime: dayjs().unix(),
      startTime: dayjs().month(0).date(1).unix(),
      humanReadable: dayjs().format("YYYY"),
    },
    1: produceHistoricalDates(1),
    2: produceHistoricalDates(2),
    3: produceHistoricalDates(3),
    4: produceHistoricalDates(4),
    5: produceHistoricalDates(5),
  },
};

const yearAtom = atom(initState);
const yearWriteAtom = atom(
  (g) => g(yearAtom),
  (get, set, update: number) => {
    const atom = get(yearAtom);
    set(yearAtom, { selectedKey: update, all: atom.all });
  },
);
export const yearReadAtom = atom((g) => g(yearAtom));

export function TimeSelect() {
  const [read, setter] = useAtom(yearWriteAtom);
  return (
    <div className="relative mb-1">
      <Listbox
        value={read.all[read.selectedKey]}
        onChange={(val) => setter(val)}
      >
        <Listbox.Button
          className={cs([
            "relative px-2",
            "flex items-center justify-center gap-1",
            "border-2 border-ktc-black",
          ])}
        >
          {read.all[read.selectedKey].humanReadable}
          <FiChevronDown />
        </Listbox.Button>

        <Listbox.Options
          className={cs([
            "absolute mt-1 w-full py-3",
            "bg-white border border-ktc-black/60",
          ])}
        >
          {Object.values(read.all).map((x, idx) => (
            <Listbox.Option
              value={idx}
              key={idx}
              className={cs([
                "text-center cursor-pointer",
                "hover:bg-ktc-gold",
              ])}
            >
              {x.humanReadable}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
