import { Maybe, Scalars } from "~/src/generated";
import { CURRENCY_ENUM, METAL_SYMBOLS } from "./enums";

export type TMetal = {
  __typename?: "MetalsRates";
  /** The exchange value for metal in currency. Default to USD. */
  currency?: Maybe<Scalars["String"]>;
  /** List of metal rates at timestamp. */
  dataset?: Maybe<Array<Maybe<any>>>;
  /** name of metal */
  metal?: Maybe<Scalars["String"]>;
  /** The metal symbol, one of these: CU, AL, NI, PB, ZN, AU, AG, PT, PD, RH. */
  symbol?: Maybe<Scalars["String"]>;
  /** Unix timestamp of metals rate. */
  timestamp?: Maybe<Scalars["Int"]>;
  /** Number of records. At the moment| only 1 record return. */
  total?: Maybe<Scalars["Int"]>;
};

export interface TCrypto {
  name: string;
  symbol: string;
  currency: CURRENCY_ENUM;
  type: "cryptocurrency";
}

export enum LATEST_NEWS_TABS {
  NEWS,
  MARKET,
  STREET,
  GOLD,
  COMMENTARIES,
  VIDEOS,
}

export enum LATEST_NEWS_LIMIT {
  FIFTEEN = 15,
  THIRTY = 30,
  FOURTY_FIVE = 45,
}

export enum MARKET_VIEWS {
  GOLD = "gold",
  MARKET = "market",
  STREET = "streettalk",
  ALL = "all",
}

export type MetalType = {
  name: string;
  symbol: METAL_SYMBOLS;
  currency: CURRENCY_ENUM;
  type: "commodity";
};

export type FuturesCategory =
  | "Currencies"
  | "Energies"
  | "Grains"
  | "Indices"
  | "Meats"
  | "Metals"
  | "Softs";

export type Exchanges =
  | "LIFFE"
  | "IOM"
  | "CROSS"
  | "CME"
  | "CBOT"
  | "MGEX"
  | "NYMEX"
  | "CASH"
  | "KCBT"
  | "CBOE"
  | "CFE"
  | "ICEUS"
  | "LME"
  | "WCE"
  | "GBLX"
  | "IMM"
  | "BMF"
  | "ROFEX"
  | "EUIDX"
  | "SFE"
  | "ICEFI"
  | "ICE"
  | "SIMEX"
  | "EUREX"
  | "MEFF"
  | "COMEX"
  | "HKFE"
  | "ENDEX"
  | "TIFFE"
  | "MDEX"
  | "SAFEX"
  | "DME"
  | "OMX"
  | "CXMI"
  | "NYMI"
  | "TFEX"
  | "MNTRL"
  | "JPX"
  | "TAIWA"
  | "CBOTM"
  | "MATIF"
  | "LCE"
  | "BSE"
  | "SHFE"
  | "NCDEX"
  | "NZX"
  | "EEX"
  | "CZCE"
  | "DCE"
  | "TURK"
  | "MATBA"
  | "TOCOM"
  | "DGCX"
  | "MCX"
  | "CFFEX"
  | "NSE";

export type MenuTypes =
  | null
  | "buySell"
  | "charts"
  | "markets"
  | "mining"
  | "quotes"
  | "news"
  | "more"
  | "quotes";

export interface SectionItems {
  href: string;
  name: string;
  as?: string;
}

export type Icons =
  | "activity"
  | "arrow-down"
  | "arrow-right"
  | "arrow-up"
  | "barchart"
  | "cart"
  | "chevron-down"
  | "chevron-up"
  | "close"
  | "edit"
  | "facebook"
  | "heart"
  | "instagram"
  | "link"
  | "linkedin"
  | "mail"
  | "menu"
  | "plus"
  | "plus-circle"
  | "refresh"
  | "search"
  | "send"
  | "sliders"
  | "twitter"
  | "twitterx"
  | "usd"
  | "user"
  | "vertical-more"
  | "youtube";

export type StatusRes = {
  status: number;
  message: string;
};

export type QuoteObj = {
  symbol: string;
  name: string;
  dayCode: string;
  serverTimestamp: string;
  mode: string;
  lastPrice: number;
  tradeTimestamp: string;
  netChange: number;
  percentChange: number;
  unitCode: string;
  open: number;
  high: number;
  low: number;
  close: null | number | string;
  numTrades: number;
  dollarVolume: number;
  flag: string;
  volume: number;
  previousVolume: number;
};

export type QuoteRes = {
  code: StatusRes;
  results: QuoteObj[];
};

export type LeaderObj = {
  country: string;
  exchange: string;
  industry: string;
  lastPrice: number;
  previousClose: number;
  previousVolume: number;
  priceNetChange: number;
  pricePercentChange: number;
  sicSector: string;
  standardDeviation: number;
  subIndustry: string;
  symbol: string;
  symbolName: string;
  timestamp: string;
  tradeTimestamp: string;
  volume: number;
};

export type LeaderRes = {
  code: StatusRes;
  results: LeaderObj[];
};

export type MiningIndex = {
  symbol: string;
  symbols: string;
  about: string;
};

export type FutureObj = {
  close: number;
  dayCode: string;
  dollarVolume: number;
  flag: string;
  high: number;
  lastPrice: number;
  low: number;
  mode: string;
  name: string;
  netChange: number;
  numTrades: number;
  open: number;
  percentChange: number;
  previousOpenInterest: number;
  previousVolume: null | number | string;
  symbol: string;
  tradeTimestamp: string;
  unitCode: string;
  volume: number;
};

export interface FuturesRes {
  status: StatusRes;
  results: FutureObj[];
}

export enum ChartConfig {
  FullCandle = "/full.def.json",
  FullArea = "/fullArea.def.json",
  ThumbnailArea = "/thumbnail.def.json",
}

export interface RatioCommodity {
  name: string;
  price: number;
}

export enum DIGEST_NEWS {
  LASTEST = "latest",
  METALS = "metals",
  CRYPTO = "crypto",
  MINING = "mining",
  MARKET = "market",
  STREET_TALK = "streettalk",
}
