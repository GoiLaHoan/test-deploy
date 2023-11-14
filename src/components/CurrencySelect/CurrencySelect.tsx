import { Fragment, useCallback, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { atom, useAtom, useAtomValue } from "jotai";
import clsx from "clsx";

import { IoChevronDownSharp } from "react-icons/io5";
import { CURRENCY, Currency } from "~/src/utils/currencies";
import styles from "~/src/styles/select-box.module.scss";

const createCurrencySelect = (initialCurrency: Currency) => {
  // this component tends to get really nested so global state :/
  const currencyAtom = atom(initialCurrency);
  const currencyAtomReadOnly = atom((get) => get(currencyAtom));

  // import this to pass to queries, dont forget to '?? "USD"'
  const useCurrencyReadOnlyAtom = () => useAtomValue(currencyAtomReadOnly);

  const CurrencySelect = ({
    defaultValue,
    hideNames = true,
    hideFlags,
    classNamesListbox,
    classNamesItemListbox,
    classNamesIconListbox,
  }: {
    defaultValue?: keyof typeof CURRENCY;
    hideNames?: boolean;
    hideFlags?: boolean;
    classNamesListbox?: string;
    classNamesItemListbox?: string;
    classNamesIconListbox?: string;
  }) => {
    const [read, write] = useAtom(currencyAtom);

    const setAtom = useCallback(
      (e: string) => {
        write(CURRENCY[e]);
      },
      [read],
    );

    useEffect(() => {
      if (defaultValue) {
        setAtom(defaultValue);
      }
    }, []);

    return (
      <Listbox value={read.symbol ?? "USD"} onChange={(val) => setAtom(val)}>
        <div
          className={clsx(
            "relative w-full inline-block",
            "border border-ktc-gray/20 rounded-sm",
            classNamesListbox,
          )}
        >
          <Listbox.Button
            className={clsx(
              "px-2 h-7 w-full",
              "flex items-center justify-between gap-1",
              classNamesItemListbox,
            )}
          >
            <span>
              {!hideFlags ? (
                <img
                  src={read?.image}
                  alt={read?.name}
                  className={styles.flag}
                />
              ) : (
                <></>
              )}
              <span className="block truncate">{read.symbol}</span>
            </span>
            <span className={clsx("pl-1", classNamesIconListbox)}>
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
                "z-[2000] absolute mt-1 h-auto py-1 ",
                "rounded-md bg-white min-w-max w-full",
                "text-base shadow-lg ring-1 ring-black/20 focus:outline-none sm:text-sm",
              )}
            >
              {Object.values(CURRENCY).map((x, idx) => (
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
                  {() => {
                    return (
                      <div className="flex items-center gap-2 flex-nowrap">
                        <img
                          src={x?.image}
                          alt={x?.name}
                          className={styles.flag}
                        />
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
    );
  };

  return { CurrencySelect, useCurrencyReadOnlyAtom };
};

const {
  CurrencySelect: CurrencySelect,
  useCurrencyReadOnlyAtom: useCurrencyReadOnlyAtom,
} = createCurrencySelect(CURRENCY.USD);

const {
  CurrencySelect: CurrencySelectCNY,
  useCurrencyReadOnlyAtom: useCurrencyCNYReadOnlyAtom,
} = createCurrencySelect(CURRENCY.CNY);

export {
  CurrencySelect,
  useCurrencyReadOnlyAtom,
  CurrencySelectCNY,
  useCurrencyCNYReadOnlyAtom,
};
