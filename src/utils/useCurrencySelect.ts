import { useCallback, useState } from "react";
import { currencies, Currency } from "./currencies";
import currency from "currency.js";

// Don't use this component anymore
// Don't use this component anymore
const useCurrencySelect = () => {
  const [currency, changeCurrency] = useState<Currency>(currencies[0]);

  const setCurrency = useCallback(
    (value) => {
      const selectedCurrency = currencies.find((x) => x.symbol === value);
      changeCurrency(selectedCurrency);

      return;
    },
    [changeCurrency],
  );
  return { currencies, currency, setCurrency };
};

export default useCurrencySelect;

export function currencyFmt(val: number | undefined) {
  if (typeof val === "undefined") return "";

  return currency(val).format();
}
