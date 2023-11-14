/* eslint-disable */

// Information about this API can be found here:
// https://github.com/tradingview/charting_library/wiki/JS-Api

import { kitcoCryptos, kitcoMetals } from "~/src/utils/kitcoDatas";
import { search } from "fast-fuzzy";
import Debounce from "lodash/debounce";
import Each from "lodash/each";
import Filter from "lodash/filter";
import { METAL_SYMBOLS } from "~/src/types/enums";
import { getCryptoBars, getMetalBars } from "./kitco-fetchers";

export type TSymbolInfo = {
  name: string;
  ticker: METAL_SYMBOLS;
  type: "commodity" | "cryptocurrency";
  timezone: "America/New_York";
  first_intraday: boolean;
  has_intraday: boolean;
  first_daily: boolean;
  has_daily: boolean;
  supported_resolutions: string[];
};

type BarData = {
  time: any;
  close: any;
  open: number;
  high: number;
  low: number;
  volume: number;
};

// import PolygonWebsockets from "./websockets.js";

// const BASE_URL = `https://kdb-gw.dev.kitco.com/graphql`
// const POLL_INTERVAL = 15; // seconds
const POLL_INTERVAL = 5; // seconds

const SUPPORTED_RESOLUTIONS = [
  "1",
  // '3',
  "5",
  "15",
  "30",
  "45",
  "60",
  "120",
  "180",
  "240",
  "1D",
  "1W",
  "1M",
  "12M",
];

export default class KitcoAdapter {
  subscriptions: any[];
  apikey: string;
  realtimeEnabled: boolean;
  searchSymbols: any;

  constructor(params) {
    this.subscriptions = [];
    this.apikey = params.apikey;
    this.realtimeEnabled = params.realtimeEnabled || false;
    this.searchSymbols = Debounce(this._searchSymbols, 250, { trailing: true });
    return this;
  }

  onReady(setConfigCallback: (configData?: any) => void): null | void {
    console.log("Kitco Adapter Ready");
    // if (this.realtimeEnabled) {
    //   this.wsListeners();
    // } else {
    setInterval(this.onInterval.bind(this), POLL_INTERVAL * 1000);
    // }
    setTimeout(() => {
      setConfigCallback();
    }, 10);
  }

  onInterval(): void {
    const now = Date.now();
    const endTime = (now - 120 * 1000) / 1000;
    const activeBarTime = Math.floor(now / 1000);

    Each(this.subscriptions, (sub) => {
      this.getBars(
        sub.symbolInfo,
        sub.interval,
        endTime,
        activeBarTime,
        (ticks) => {
          console.log("ticks:", ticks);
          if (ticks.length == 0) return;
          sub.callback(ticks);
        },
      );
    });
  }

  _searchSymbols(
    input: string,
    exchange: string,
    symbolType: string,
    searchCallback: Function,
  ): void {
    const merger = [...kitcoMetals, ...kitcoCryptos];

    let results = [];
    const found = search(input, merger, {
      keySelector: (x) => x.name || x.symbol,
    });

    for (const x of found) {
      results.push({
        symbol: x.symbol,
        ticker: x.symbol,
        full_name: x.name,
        description: `Kitco ${x.name}`,
        exchange: "Forex",
        type: x.type,
        locale: "US",
      });
    }

    return searchCallback(results);
  }

  resolveSymbol(symbol: string, cb: Function, cberr: Function): void {
    const merger = [...kitcoMetals, ...kitcoCryptos];
    const data = merger.find((x) => x.symbol === symbol);
    setTimeout(() => {
      cb({
        name: data?.name,
        ticker: data?.symbol,
        type: data?.type,
        timezone: "America/New_York",
        first_intraday: false,
        has_intraday: true,
        first_daily: false,
        has_daily: true,
        supported_resolutions: SUPPORTED_RESOLUTIONS,
      });
    }, 0);
  }

  async getBars(
    symbolInfo: TSymbolInfo,
    resolution: string, // 1 minte, 1 day etc..
    endTime: number, // unix timestamp
    activeBarTime: number, // unix timestamp
    onHistoryCallback: Function, // resolved bars
    onErrorCallback?: any,
    // firstDataRequest?: boolean
  ): Promise<void> {
    const fetcherArgs = {
      symbol: symbolInfo.ticker,
      activeBarTime,
      groupBy: resolution,
    };

    try {
      let bars = [];
      if (symbolInfo.type === "commodity") {
        const res = await getMetalBars(fetcherArgs);
        bars = res;
      }

      if (symbolInfo.type === "cryptocurrency") {
        const test = await getCryptoBars(fetcherArgs);
        bars = test;
      }

      if (!bars.length) {
        return onHistoryCallback([], {
          noData: false,
        });
      }

      return onHistoryCallback(bars.reverse(), {
        noData: false,
      });
    } catch (err) {
      console.log("err:", err);
    }
  }

  subscribeBars(
    symbolInfo: TSymbolInfo,
    interval: string, // whatever the timeframe is for the chart: i.e. 1D
    onRealtimeCallback: (bar: BarData) => void, // callback when we have new bar
    key: string, // unique key for subscription
  ): void {
    let sub = {
      key: `${key}`,
      symbolInfo: symbolInfo,
      interval: interval,
      callback: onRealtimeCallback,
    };

    // Currently only allow minute subscriptions:
    if (sub.interval != "1") return;
    // if (this.realtimeEnabled) this.ws.subscribe(`AM.${symbolInfo.ticker}`);
    this.subscriptions.push(sub);
  }

  //  *  Unsubscribe from future updates for a symbol
  unsubscribeBars(key: string): void {
    this.subscriptions = Filter(this.subscriptions, (s) => s.key != key);
  }

  // /**
  //  *  Add the websocket listeners and start the connection:
  //  *  @return {null}
  //  */
  // wsListeners(): void {
  //   if (!this.realtimeEnabled) return;
  //   this.ws = new PolygonWebsockets({ apiKey: this.apikey });
  //   this.ws.on("AM", (aggMin) => {
  //     Each(this.subscriptions, (sub) => {
  //       sub.callback({
  //         open: aggMin.o,
  //         close: aggMin.c,
  //         high: aggMin.h,
  //         low: aggMin.l,
  //         volume: aggMin.v,
  //         time: aggMin.s,
  //       });
  //     });
  //   });
  // }
}
