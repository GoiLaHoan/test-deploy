import {
  fixes,
  metals,
  extras,
} from "~/src/components/Nav/QuotesItem/QuotesMenu";
import { charts, forYou } from "~/src/components/Nav/ChartsItem/ChartsMenu";
import * as buy from "~/src/components/Nav/BuySellItem/BuySellMenu";
import * as markets from "~/src/components/Nav/MarketsItem/MarketsMenu";
import * as news from "~/src/components/Nav/NewsItem/NewsMenu";
import * as mining from "~/src/components/Nav/MiningItem/MiningMenu";
import { SectionItems } from "../types";

export const kitcoRoutes = [
  // base path items not listed in the sections
  { name: "Home", href: "/" } as SectionItems,
  { name: "All Metal Quotes", href: "/price/precious-metals" } as SectionItems,
  { name: "News", href: "/news" } as SectionItems,
  { name: "Charts & Data", href: "/charts" } as SectionItems,
  { name: "Markets", href: "/markets" } as SectionItems,
  ...fixes,
  ...metals,
  ...extras,
  ...charts,
  ...forYou,
  ...buy.sectionBuy,
  ...buy.sectionSell,
  ...buy.sectionVault,
  ...buy.sectionStorage,
  ...buy.sectionGold,
  ...buy.sectionSilver,
  ...buy.sectionPlatinum,
  ...buy.sectionSupport,
  ...buy.sectionRefining,
  ...markets.markets,
  ...markets.cryptos,
  ...markets.more,
  ...markets.mining,
  ...markets.futures,
  ...news.news,
  ...news.feed,
  ...news.info,
  ...mining.news,
  ...mining.sector,
  ...mining.stocks,
  ...mining.capital,
];
