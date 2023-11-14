import { Fragment, useCallback } from "react";
import { atom, useAtom } from "jotai";
import { convert } from "~/src/utils/price-conversion";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";

import { IoChevronDownSharp } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";

const weightHash = {
  oz: {
    label: "OZ",
    renderFn: (val: number) => {
      return convert.priceToOz(val);
    },
  },
  gram: {
    label: "GRAM",
    renderFn: (val: number) => {
      return convert.priceToGram(val);
    },
  },
  tola: {
    label: "TOLA",
    renderFn: (val: number) => {
      return convert.priceToTola(val);
    },
  },
  kilo: {
    label: "KILO",
    renderFn: (val: number) => {
      return convert.priceToKilo(val);
    },
  },
};

const weightAtom = atom(weightHash["oz"]);

export function useWeightAtomRead() {
  const [weight] = useAtom(weightAtom);
  return weight;
}

export function WeightSelect() {
  const [read, write] = useAtom(weightAtom);

  const setAtom = useCallback(
    (e: string) => {
      write(weightHash[e.toLowerCase()]);
    },
    [read],
  );

  return (
    <div className="relative">
      <Listbox value={read.label ?? "USD"} onChange={setAtom}>
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "px-2 h-7",
              "flex items-center gap-1",
              "border border-ktc-gray/20 rounded-sm",
            )}
          >
            <span className="block truncate">{read.label}</span>
            <span className="pl-1">
              <IoChevronDownSharp />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={clsx(
                "z-[2000] absolute mt-1 h-auto py-1",
                "rounded-md bg-white w-auto",
                "text-base shadow-lg ring-1 ring-black/20 focus:outline-none sm:text-sm",
              )}
            >
              {Object.values(weightHash).map((x, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    clsx(
                      "block relative cursor-pointer select-none py-2 px-4",
                      active ? "bg-blue-200/30 text-blue-800" : "text-gray-900",
                    )
                  }
                  value={x.label}
                >
                  {({ selected }) => {
                    return (
                      <div className="flex items-center gap-2 flex-nowrap">
                        <span className="block w-5 h-4">
                          {selected ? <HiCheck /> : <></>}
                        </span>
                        <span className={clsx("block font-semibold basis-12")}>
                          {x.label}
                        </span>
                      </div>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
