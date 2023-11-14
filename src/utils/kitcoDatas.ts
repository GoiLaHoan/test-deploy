// TODO: Refactor this to a lib file and to be reused...
import { CURRENCY_ENUM, METAL_SYMBOLS } from "~/src/types/enums";
import { MetalType, TCrypto } from "~/src/types/index";

export const kitcoCryptos: TCrypto[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
  {
    name: "Monero",
    symbol: "XMR",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
  {
    name: "Dash",
    symbol: "DASH",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
  {
    name: "Zcash",
    symbol: "ZEC",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
  {
    name: "Peercoin",
    symbol: "PPC",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
  {
    name: "Namecoin",
    symbol: "NMC",
    currency: CURRENCY_ENUM.USD,
    type: "cryptocurrency",
  },
];

export const kitcoMetals: MetalType[] = [
  {
    name: "Aluminum",
    symbol: METAL_SYMBOLS.ALUMINUM,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Copper",
    symbol: METAL_SYMBOLS.COPPER,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Gold",
    symbol: METAL_SYMBOLS.GOLD,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Lead",
    symbol: METAL_SYMBOLS.LEAD,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Nickel",
    symbol: METAL_SYMBOLS.NICKEL,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Platinum",
    symbol: METAL_SYMBOLS.PLATINUM,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Palladium",
    symbol: METAL_SYMBOLS.PALLADIUM,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Rhodium",
    symbol: METAL_SYMBOLS.RHODIUM,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Silver",
    symbol: METAL_SYMBOLS.SILVER,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
  {
    name: "Zinc",
    symbol: METAL_SYMBOLS.ZINC,
    currency: CURRENCY_ENUM.USD,
    type: "commodity",
  },
];
