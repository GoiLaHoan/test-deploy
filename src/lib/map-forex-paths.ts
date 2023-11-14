export interface ForexPath {
  [id: string]: {
    name: string;
    symbol: string;
  };
}

const CURRENCIES = {
  USD: "US Dollar",
  AUD: "Australian Dollar",
  GBP: "British Pound",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  EUR: "Euro",
  JPY: "Japanese Yen",
  CNY: "Chinese Yuan",
  HKD: "Hong Kong Dollar",
  BRL: "Brazilian Real",
  INR: "Indian Rupee",
  MXN: "Mexican Peso",
  RUB: "Russian Ruble",
  ZAR: "South African Rand",
};

const INVALID_CURRENCY_COMBOS = [
  "CNYMXN",
  "HKDRUB",
  "BRLCAD",
  "INRMXN",
  "MXNCNY",
  "MXNINR",
  "MXNRUB",
  "RUBCAD",
  "RUBHKD",
  "RUBINR",
  "RUBMXN",
];

function isInvalidCurrencyCombo(a, b) {
  return (
    INVALID_CURRENCY_COMBOS.includes(`${a}${b}`) ||
    INVALID_CURRENCY_COMBOS.includes(`${b}${a}`)
  );
}

function generatePaths(currency) {
  const paths = {};
  const keys = Object.keys(CURRENCIES);

  for (let i = 0; i < keys.length; i++) {
    const current = keys[i];

    if (current !== currency && !isInvalidCurrencyCombo(current, currency)) {
      paths[`${currency.toLowerCase()}-to-${current.toLowerCase()}`] = {
        title: `${CURRENCIES[currency]} vs ${CURRENCIES[current]}`,
        name: `${currency}/${current}`,
        symbol: `${currency}${current}`,
      };
    }
  }

  return paths;
}

export const FOREX_USD_PATHS = generatePaths("USD");
export const FOREX_AUD_PATHS = generatePaths("AUD");
export const FOREX_GBP_PATHS = generatePaths("GBP");
export const FOREX_CAD_PATHS = generatePaths("CAD");
export const FOREX_CHF_PATHS = generatePaths("CHF");
export const FOREX_EUR_PATHS = generatePaths("EUR");
export const FOREX_JPY_PATHS = generatePaths("JPY");
export const FOREX_CNY_PATHS = generatePaths("CNY");
export const FOREX_HKD_PATHS = generatePaths("HKD");
export const FOREX_BRL_PATHS = generatePaths("BRL");
export const FOREX_INR_PATHS = generatePaths("INR");
export const FOREX_MXN_PATHS = generatePaths("MXN");
export const FOREX_RUB_PATHS = generatePaths("RUB");
export const FOREX_ZAR_PATHS = generatePaths("ZAR");

export const FOREX_PATHS_MAP = {
  ...FOREX_USD_PATHS,
  ...FOREX_AUD_PATHS,
  ...FOREX_GBP_PATHS,
  ...FOREX_CAD_PATHS,
  ...FOREX_CHF_PATHS,
  ...FOREX_EUR_PATHS,
  ...FOREX_JPY_PATHS,
  ...FOREX_CNY_PATHS,
  ...FOREX_HKD_PATHS,
  ...FOREX_BRL_PATHS,
  ...FOREX_INR_PATHS,
  ...FOREX_MXN_PATHS,
  ...FOREX_RUB_PATHS,
  ...FOREX_ZAR_PATHS,
};

export function getLinksfromPaths(paths: ForexPath) {
  return Object.entries(paths).map(([key, value]) => ({
    name: value?.name,
    url: key,
  }));
}
