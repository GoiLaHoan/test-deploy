import { Fragment, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { atom, useAtom, useAtomValue } from "jotai";
import clsx from "clsx";

import { IoChevronDownSharp } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";

import { metals } from "~/src/utils/useMetalSelect";

// this component tends to get really nested so global state :/
const metalAtom = atom(metals.find((x) => x.symbol === "AU"));
const metalAtomReadOnly = atom((get) => get(metalAtom));
// this hook is for getting the metal symbol state
// in places where you query and pass the symbol as a variable,
// grab it from the returned value of this hook
export const useMetalReadOnlyAtom = () => useAtomValue(metalAtomReadOnly);

export const MetalSelect = ({
  hideNames,
  alignment,
}: {
  hideNames?: boolean;
  alignment: "right" | "left";
}) => {
  const [read, write] = useAtom(metalAtom);

  const setAtom = useCallback(
    (e: string) => {
      write(metals.find((x) => x.symbol === e));
    },
    [read],
  );

  return (
    <div className="relative">
      <Listbox value={read.symbol ?? "USD"} onChange={(val) => setAtom(val)}>
        <div
          className={clsx(
            "relative mt-1 w-full",
            "border border-ktc-gray/20 rounded-sm",
          )}
        >
          <Listbox.Button
            className={clsx(
              "px-2 h-7 w-full",
              "flex items-center justify-between gap-1",
            )}
          >
            <span className="block truncate">{read.symbol}</span>
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
                alignment === "right" ? "right-0" : "left-0",
              )}
            >
              {metals.map((x, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    clsx(
                      "block relative cursor-pointer select-none py-2 px-4",
                      active ? "bg-blue-200/30 text-blue-800" : "text-gray-900",
                    )
                  }
                  value={x.symbol}
                >
                  {({ selected }) => {
                    return (
                      <div className="flex items-center gap-2 flex-nowrap">
                        <span className="block w-5 h-4">
                          {selected ? <HiCheck /> : <></>}
                        </span>
                        <span className={clsx("block font-semibold basis-12")}>
                          {x.symbol}
                        </span>
                        {hideNames ? (
                          <></>
                        ) : (
                          <span
                            className={clsx(
                              "block opacity-70 whitespace-nowrap basis-5/6",
                            )}
                          >
                            {x.name}
                          </span>
                        )}
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
};
