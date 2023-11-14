import dynamic from "next/dynamic";

import { TradingViewCalendar } from "./trading-view-calendar.component";
import { TradingViewCryptoNews } from "./trading-view-crypto-news.component";
import { TradingViewCryptoQuotes } from "./trading-view-crypto-quotes.component";
import { TradingViewCryptoVersus } from "./trading-view-crypto-versus.component";
import { TradingViewForexChart } from "./trading-view-forex-chart.component";
import { TradingViewForexMajorRates } from "./trading-view-forex-major-rates.component";
import { TradingViewForexQuotes } from "./trading-view-forex-quotes.component";

const TradingViewCalendarLazy = dynamic(
  async () =>
    await import("~/src/components/trading-view-iframes").then(
      (mod) => mod.TradingViewCalendar,
    ),
  { ssr: false },
);

const TradingViewForexChartLazy = dynamic(
  async () =>
    await import("./trading-view-forex-chart.component").then(
      (mod) => mod.TradingViewForexChart,
    ),
  { ssr: false },
);

export {
  TradingViewCalendar,
  TradingViewCalendarLazy,
  TradingViewCryptoNews,
  TradingViewCryptoQuotes,
  TradingViewCryptoVersus,
  TradingViewForexChart,
  TradingViewForexChartLazy,
  TradingViewForexMajorRates,
  TradingViewForexQuotes,
};
