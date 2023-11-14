export interface Currency {
  image: string;
  symbol: string;
  name: string;
  icon: string;
}

export const CURRENCY = {
  USD: {
    image: "/flags/USD.png",
    symbol: "USD",
    name: "USA Dollar",
    icon: "$",
  },
  AUD: {
    image: "/flags/AUD.png",
    symbol: "AUD",
    name: "Australian Dollar",
    icon: "A$",
  },
  CAD: {
    image: "/flags/CAD.png",
    symbol: "CAD",
    name: "Canadian Dollar",
    icon: "C$",
  },
  EUR: { image: "/flags/EURO.png", symbol: "EUR", name: "Euro", icon: "€" },
  GBP: {
    image: "/flags/GBP.png",
    symbol: "GBP",
    name: "British Pound",
    icon: "£",
  },
  JPY: {
    image: "/flags/JPY.png",
    symbol: "JPY",
    name: "Japanese Yen",
    icon: "$",
  },
  CHF: {
    image: "/flags/CHF.png",
    symbol: "CHF",
    name: "Swiss Franc",
    icon: "'₣'",
  },
  CNY: {
    image: "/flags/CNY.png",
    symbol: "CNY",
    name: "Chinese Yun",
    icon: "¥",
  },
  HKD: {
    image: "/flags/HKD.png",
    symbol: "HKD",
    name: "Hong Kong Dollar",
    icon: "HK$",
  },
  BRL: {
    image: "/flags/BRL.png",
    symbol: "BRL",
    name: "Brazillian Real",
    icon: "R$",
  },
  INR: {
    image: "/flags/INR.png",
    symbol: "INR",
    name: "Indian Rupee",
    icon: "$",
  },
  MXN: {
    image: "/flags/MXN.png",
    symbol: "MXN",
    name: "Mexican Peso",
    icon: "₱",
  },
  RUB: {
    image: "/flags/RUB.png",
    symbol: "RUB",
    name: "Russian Ruble",
    icon: "$",
  },
  ZAR: {
    image: "/flags/ZAR.png",
    symbol: "ZAR",
    name: "South African Rand",
    icon: "$",
  },
  // SEK: {
  //   image: "/flags/SEK.png",
  //   symbol: "SEK",
  //   name: "Swedish Krona",
  //   icon: "$",
  // },
} as const;

export type CURRENCY = keyof typeof CURRENCY;

// to construct a flag image src={`/flags/${symbol.toLowerCase()}.png`}
export const currencies: Currency[] = [
  { image: "/flags/USD.png", symbol: "USD", name: "USA Dollar", icon: "$" },
  {
    image: "/flags/AUD.png",
    symbol: "AUD",
    name: "Australian Dollar",
    icon: "A$",
  },
  {
    image: "/flags/BRL.png",
    symbol: "BRL",
    name: "Brazillian Real",
    icon: "R$",
  },
  {
    image: "/flags/CAD.png",
    symbol: "CAD",
    name: "Canadian Dollar",
    icon: "C$",
  },
  { image: "/flags/CHF.png", symbol: "CHF", name: "Swiss Franc", icon: "₣" },
  { image: "/flags/CNY.png", symbol: "CNY", name: "Chinese Yun", icon: "¥" },
  { image: "/flags/EURo.png", symbol: "EUR", name: "Euro", icon: "€" },
  { image: "/flags/GBP.png", symbol: "GBP", name: "British Pound", icon: "£" },
  {
    image: "/flags/HKD.png",
    symbol: "HKD",
    name: "Hong Kong Dollar",
    icon: "HK$",
  },
  { image: "/flags/INR.png", symbol: "INR", name: "Indian Rupee", icon: "$" },
  { image: "/flags/JPY.png", symbol: "JPY", name: "Japanese Yen", icon: "$" },
  { image: "/flags/MXN.png", symbol: "MXN", name: "Mexican Peso", icon: "₱" },
  { image: "/flags/RUB.png", symbol: "RUB", name: "Russian Ruble", icon: "$" },
  { image: "/flags/SEK.png", symbol: "SEK", name: "Swedish Krona", icon: "$" },
  {
    image: "/flags/ZAR.png",
    symbol: "ZAR",
    name: "South African Rand",
    icon: "$",
  },
];
