import currency from "currency.js";
import { pf } from "./price-formatter";

// T_OUNCE = troy ounce
// a troy ounce is a measurement for precious metals and equals 31.1034768

const T_OUNCE_TO = {
  GRAM: 31.1035,
  KILO: 0.0311035, // Old value: 32.1507
  PENNYWEIGHT: 20,
  TOLA: 2.6666646776086, // Old value: 2.66666,
  TAEL: 0.822857, // Old value: 1.21528,
} as const;

const opts = { symbol: "" };

function priceToOz(bid: number): string {
  return currency(bid, opts).format();
}

function priceToGram(bid: number): string {
  return currency(bid, opts).divide(T_OUNCE_TO.GRAM).format();
}

function priceToKilo(bid: number): string {
  return currency(bid, opts).divide(T_OUNCE_TO.KILO).format();
}

function priceToPennyweight(bid: number): string {
  return currency(bid, opts).divide(T_OUNCE_TO.PENNYWEIGHT).format();
}

function priceToTola(bid: number): string {
  return currency(bid, opts).divide(T_OUNCE_TO.TOLA).format();
}

function priceToTael(bid: number): string {
  return currency(bid, opts).divide(T_OUNCE_TO.TAEL).format();
}

function priceChangeKilo(bid: number, change: number): string {
  const start = (bid - change) * T_OUNCE_TO.KILO;
  const now = bid * T_OUNCE_TO.KILO;

  const answer = now - start;
  return pf(answer);
}

function priceChangeGram(bid: number, change: number): string {
  const start = (bid - change) / T_OUNCE_TO.GRAM;
  const now = bid / T_OUNCE_TO.GRAM;

  const answer = now - start;
  return pf(answer);
}

function priceChangePenny(bid: number, change: number): string {
  const start = (bid - change) / T_OUNCE_TO.PENNYWEIGHT;
  const now = bid / T_OUNCE_TO.PENNYWEIGHT;

  const answer = now - start;
  return pf(answer);
}

function priceChangeTola(bid: number, change: number): string {
  const start = (bid - change) * T_OUNCE_TO.TOLA;
  const now = bid * T_OUNCE_TO.TOLA;
  const answer = now - start;
  return pf(answer);
}

function priceChangeTael(bid: number, change: number): string {
  const start = (bid - change) * T_OUNCE_TO.TAEL;
  const now = bid * T_OUNCE_TO.TAEL;
  const answer = now - start;
  return pf(answer);
}

export const convert = {
  priceToOz,
  priceToGram,
  priceToKilo,
  priceToPennyweight,
  priceToTola,
  priceToTael,
  priceChangeKilo,
  priceChangeGram,
  priceChangePenny,
  priceChangeTola,
  priceChangeTael,
};

export type TConvertPrice = typeof convert;
