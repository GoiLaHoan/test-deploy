import { SectionItems } from "~/src/types";
import SectionList from "../SectionList/SectionList";
import * as Navigation from "./../Composables";

export const markets: SectionItems[] = [
  {
    name: "DOW",
    href: "/markets/indices/[symbol]",
    as: "/markets/indices/$DOWI",
  },
  {
    name: "NASDAQ",
    href: "/markets/indices/[symbol]",
    as: "/markets/indices/$NASX",
  },
  {
    name: "S&P 500",
    href: "/markets/indices/[symbol]",
    as: "/markets/indices/$SPX",
  },
  {
    name: "NYSE",
    href: "/markets/indices/[symbol]",
    as: "/markets/indices/$NYA",
  },
  {
    name: "Gold VIX",
    href: "/markets/indices/[symbol]",
    as: "/markets/indices/$GVZ",
  },
  { name: "Forex Major Rates", href: "/forex" },
  { name: "Kitco Gold Index", href: "/markets/indices/kitcogoldindex" },
  { name: "Most Active Stocks", href: "/markets/stocks/mostactive" },
  {
    name: "Stocks Gainers and Losers",
    href: "/markets/stocks",
  },
];

export const mining: SectionItems[] = [
  { name: "Gold", href: "/markets/mining/-MIGL" },
  { name: "Silver", href: "/markets/mining/-MISI" },
  { name: "Iron", href: "/markets/mining/-MIIR" },
  { name: "Base Metals", href: "/markets/mining/-MEPF" },
  { name: "Non-Ferous", href: "/markets/mining/-MINF" },
];

export const cryptos: SectionItems[] = [
  {
    name: "Bitcoin",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/bitcoin",
  },
  {
    name: "Ethereum",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/ethereum",
  },
  {
    name: "Litecoin",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/litecoin",
  },
  {
    name: "Monero",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/monero",
  },
  {
    name: "Ripple",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/ripple",
  },
  {
    name: "Dash",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/dash",
  },
  {
    name: "Zcash",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/zcash",
  },
  {
    name: "Peercoin",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/peercoin",
  },
  {
    name: "Namecoin",
    href: "/cryptocurrencies/[name]",
    as: "/cryptocurrencies/namecoin",
  },
];

export const futures: SectionItems[] = [
  { name: "Metals", href: "/markets/futures/metals" },
  { name: "Energies", href: "/markets/futures/energies" },
  { name: "Grains", href: "/markets/futures/grains" },
  { name: "Indices", href: "/markets/futures/indices" },
  { name: "Softs", href: "/markets/futures/softs" },
  { name: "Meats", href: "/markets/futures/meats" },
  { name: "Currencies", href: "/markets/futures/currencies" },
];

export const more: SectionItems[] = [
  { name: "Metals", href: "/markets/metals" },
  { name: "Stocks Gainers and Losers", href: "/markets/stocks" },
];

function MarketsMenu() {
  return (
    <Navigation.SubMenuGrid>
      <Navigation.SubMenuColumn>
        <SectionList
          title="Markets Overview"
          titleUrl="/markets"
          items={markets}
        />
        <SectionList title="Mining" titleUrl="/markets/mining" items={mining} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList
          title="Cryptocurrencies"
          titleUrl="/crytocurrencies"
          items={cryptos}
        />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList
          title="Futures"
          titleUrl="/markets/futures"
          items={futures}
        />
        <SectionList title="More" items={more} />
      </Navigation.SubMenuColumn>
    </Navigation.SubMenuGrid>
  );
}

export default MarketsMenu;
