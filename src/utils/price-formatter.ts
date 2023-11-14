import currency from "currency.js";

export default function priceFormatter(n: number) {
  return currency(n).format();
}

// PRICE FORMATTing
// highly used so i made it short
export const pf = (n: number) => priceFormatter(n);
