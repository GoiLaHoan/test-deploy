export default function priceFormatter(n: number, decimals = 2) {
  return n?.toLocaleString(undefined, { minimumFractionDigits: decimals });
}

// PRICE FORMATTing
// highly used so i made it short
export const pf = (n: number) => priceFormatter(n);
