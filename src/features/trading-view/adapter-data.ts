/* eslint-disable */
import axios from "axios";
import Debounce from "lodash/debounce";
import Each from "lodash/each";
import Filter from "lodash/filter";
import Includes from "lodash/includes";
import Map from "lodash/map";

// import PolygonWebsockets from "./websockets.js";

const BASE_URL = `https://api.polygon.io`;
const POLL_INTERVAL = 15; // seconds

const SUPPORTED_RESOLUTIONS = [
  "1",
  "3",
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

class DataAdapter {
  subscriptions: any[];
  apikey: string;
  realtimeEnabled: boolean;
  searchSymbols: any;

  constructor(params) {
    this.subscriptions = [];
    this.apikey = params.apikey;
    this.realtimeEnabled = params.realtimeEnabled || true;
    this.searchSymbols = Debounce(this._searchSymbols, 250, { trailing: true });
    return this;
  }

  onReady(cb): null | void {
    // console.log("Polygon Adapter Ready");
    // if (this.realtimeEnabled) {
    //   this.wsListeners();
    // } else {
    setInterval(this.onInterval.bind(this), POLL_INTERVAL * 1000);
    // }
    cb();
  }

  onInterval(): void {
    console.log("anything");
    let now = Date.now();
    Each(this.subscriptions, (sub) => {
      console.log("sub:", sub);
      this.getBars(
        sub.symbolInfo,
        sub.interval,
        (now - 120 * 1000) / 1000,
        now / 1000,
        (ticks) => {
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
    cb: Function,
  ): void {
    axios({
      url: `${BASE_URL}/v2/reference/tickers?search=${input}&apikey=${this.apikey}`,
    })
      .then((res) => {
        // console.log("search results:", res);
        cb(
          Map(res.data.tickers, (item) => {
            return {
              symbol: item.ticker,
              ticker: item.ticker,
              full_name: item.name,
              description: `${item.name}`,
              exchange: item.primaryExch,
              type: item.market,
              locale: item.locale,
            };
          }),
        );
      })
      .catch((err) => {
        console.log("not found:", err);
        cb([]);
      });
  }

  resolveSymbol(symbol: string, cb: Function, cberr: Function): void {
    let TickerTypeMap = {
      STOCKS: "stock",
      FX: "forex",
      CRYPTO: "bitcoin",
    };
    axios
      .get(
        `${BASE_URL}/v1/meta/symbols/${symbol}/company?apiKey=${this.apikey}`,
      )
      .then((data) => {
        // console.log('resolve symbol:', data)
        let c = data.data;
        let intFirst = false;
        let dayFirst = false;
        cb({
          name: c.name,
          ticker: c.symbol,
          type: TickerTypeMap[c.type] || "stocks",
          exchange: c.exchange,
          timezone: "America/New_York",
          first_intraday: intFirst,
          has_intraday: true,
          first_daily: dayFirst,
          has_daily: true,
          supported_resolutions: SUPPORTED_RESOLUTIONS,
        });
      });
  }

  // /**
  // *  Get aggregate bars for our symbol
  // *  @param  {Object}   symbolInfo   Object returned from `resolveSymbol`
  // *  @param  {String}   resolution   Interval size for request ( `1`, `1D`, etc )
  // *  @param  {Int}   from         Unix timestamp to search from
  // *  @param  {Int}   to           Unix timestamp to search to
  // *  @param  {Function} cb           Callback with resolved bars
  // *  @param  {Function}   cberr        Callback for errors
  // *  @param  {Boolean}   firstRequest If this is the first request for this symbol
  // *  @return {null}
  // */
  getBars(
    symbolInfo: any,
    resolution: string,
    fromts: number,
    to: number,
    cb: Function,
    cberr?: any,
    firstRequest?: boolean,
  ): void {
    let multiplier = 1;
    let timespan = "minute";
    if (resolution == "D" || resolution == "1D") timespan = "day";
    if (Includes(["1", "3", "5", "15", "30", "45"], resolution)) {
      multiplier = parseInt(resolution);
      timespan = "minute";
    }
    if (Includes(["60", "120", "180", "240"], resolution)) {
      timespan = "hour";
      multiplier = parseInt(resolution) / 60;
    }
    axios({
      url: `${BASE_URL}/v2/aggs/ticker/${
        symbolInfo.ticker
      }/range/${multiplier}/${timespan}/${fromts * 1000}/${to * 1000}`,
      params: { apikey: this.apikey },
    })
      .then((data) => {
        // console.log("bars:", data);
        let bars = [];
        bars = Map(data.data.results, (t) => {
          return {
            time: t.t,
            close: t.c,
            open: t.o,
            high: t.h,
            low: t.l,
            volume: t.v,
          };
        });
        console.log("bars", bars);
        return cb(bars, {
          noData: false /* ( bars.length == 0 && timespan != 'minute' ) */,
        });
      })
      .catch(cberr);
  }

  // /**
  //  *  Subscribe to future updates for this symbol
  //  *  @param  {Object}   symbolInfo Object returned from `resolveSymbol`
  //  *  @param  {String}   interval   Interval size for request
  //  *  @param  {Function} cb         Callback when we have new bars
  //  *  @param  {String}   key        Unique key for this subscription
  //  *  @return {null}
  //  */
  subscribeBars(
    symbolInfo: any,
    interval: string,
    cb: Function,
    key: string,
  ): void {
    let sub = {
      key: `${key}`,
      symbolInfo: symbolInfo,
      interval: interval,
      callback: cb,
    };
    // Currently only allow minute subscriptions:
    if (sub.interval != "1") return;
    // if (this.realtimeEnabled) this.ws.subscribe(`AM.${symbolInfo.ticker}`);
    this.subscriptions.push(sub);
  }

  // /**
  //  *  Unsubscribe from future updates for a symbol
  //  *  @param  {String} key Unique key for this subscription
  //  *  @return {null}
  //  */
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

export default DataAdapter;
