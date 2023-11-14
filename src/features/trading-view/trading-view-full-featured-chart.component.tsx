import { Component } from "react";
import {
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
  widget,
} from "../../../public/charting_library";
import DataAdapter from "./adapter-data";
import KitcoAdapter from "./adapter-kitco";

import styles from "./trading-view-full-featured-chart.module.scss";

// OKAY OKAY LISTEN UP
// So this component really has 3 main parts
// 1. The component / UI - responsible for rendering and creating the instance
// 2. The 'Adapter' is responsible for handling the data and calling a fetch and then appropriately forming that data
// 3. theres a fetch resolver in the adapter that has the fetch code.
//
// The kitco adapter is kinda the key here as its responsible for handling all kitco data

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions["symbol"];
  interval: ChartingLibraryWidgetOptions["interval"];

  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl?: string;
  libraryPath?: ChartingLibraryWidgetOptions["library_path"];
  chartsStorageUrl?: ChartingLibraryWidgetOptions["charts_storage_url"];
  chartsStorageApiVersion?: ChartingLibraryWidgetOptions["charts_storage_api_version"];
  clientId?: ChartingLibraryWidgetOptions["client_id"];
  userId?: ChartingLibraryWidgetOptions["user_id"];
  fullscreen?: ChartingLibraryWidgetOptions["fullscreen"];
  autosize?: ChartingLibraryWidgetOptions["autosize"];
  studiesOverrides?: ChartingLibraryWidgetOptions["studies_overrides"];
  containerId?: ChartingLibraryWidgetOptions["container_id"];
}

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// interface Props {
//   symbol: string
//   adapter: 'external' | 'kitco'
//   interval?: ResolutionString
//   containerId?: 'tv_chart_container'
//   datafeedUrl?: 'https://api.polygon.io'
//   libraryPath?: '/charting_library/'
//   chartsStorageUrl?: 'https://saveload.tradingview.com'
//   chartsStorageApiVersion?: '1.1'
//   clientId?: 'tradingview.com'
//   userId?: 'public_user_id'
//   fullscreen?: false
//   autosize?: true
//   studiesOverrides?: {}
// }

class TVFullChart extends Component<any, any> {
  static defaultProps: ChartContainerProps = {
    symbol: "AAPL",
    interval: "5" as ResolutionString,
    containerId: "tv_chart_container",
    datafeedUrl: "https://api.polygon.io",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  tvWidget = null;

  componentDidMount() {
    let client;

    if (this.props.adapter === "kitco") {
      client = new KitcoAdapter({
        apikey: "PzvNPJj1MsBdlmpHoAi14q4oQout6o7I",
        realtimeEnabled: false,
      });
    } else {
      client = new DataAdapter({
        apikey: "PzvNPJj1MsBdlmpHoAi14q4oQout6o7I",
        realtimeEnabled: false,
      });
    }
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this.props.symbol,
      datafeed: client,
      // @ts-ignore
      interval: "1D",
      container_id: this.props
        .containerId as ChartingLibraryWidgetOptions["container_id"],
      library_path: this.props.libraryPath as string,
      locale: (getLanguageFromURL() as LanguageCode) || ("en" as LanguageCode),
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      logo: { image: "/logo_kitco.png" },
    };

    const tvWidget = new widget(widgetOptions);

    this.tvWidget = tvWidget;

    // TODO: Lets keep this around as an example in case we need to
    // add some functionality. PEWPEW
    // tvWidget.onChartReady(() => {
    //  tvWidget.headerReady().then(() => {
    //    const button = tvWidget.createButton()
    //    button.setAttribute('title', 'Click to show a notification popup')
    //    button.classList.add('apply-common-tooltip')
    //    button.addEventListener('click', () =>
    //      tvWidget.showNoticeDialog({
    //        title: 'Notification',
    //        body: 'TradingView Charting Library API works correctly',
    //        callback: () => {
    //          console.log('Noticed!') // eslint-disable-line
    //        },
    //      })
    //    )
    //    button.innerHTML = 'Check API'
    //  })
    // })
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.symbol !== this.props.symbol) {
  //   }
  // }

  render() {
    return (
      <div id={this.props.containerId} className={styles.TVChartContainer} />
    );
  }
}

export default TVFullChart;
