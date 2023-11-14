export const chartCfg = {
  data: {
    aggregation: {
      unit: "Day",
      size: 1,
    },
    maxDataPoints: 300,
  },
  display: {
    density: 92,
    chart: {
      backgroundColor: "#111",
      fontFamily: "Open Sans",
      previous: {
        color: "#b0b0b0",
        dashStyle: "LongDashDot",
        forceVisible: true,
      },
      exportUrl: "/export/image",
      newPaneHeight: 1,
    },
    scrollbar: {
      barColor: "#808083",
      buttonColor: "#606063",
      trackColor: "#404043",
      visible: true,
    },
    scrollBehavior: "wheel",
    tooltip: {
      mode: "standard",
      visible: true,
      backgroundColor: "#000",
      showMainPlot: true,
    },
    xAxis: {
      visible: true,
      gridLines: {
        visible: true,
        color: "#1f1f1f",
      },
      textColor: "#fff",
      crosshair: {
        enabled: true,
        showValue: true,
        color: "#494949",
        dashStyle: "Solid",
        snap: true,
        format: "{value:%m/%d/%Y}",
      },
      minTickInterval: 0,
      equidistant: true,
      marginBars: 5,
    },
    yAxis: {
      visible: true,
      gridLines: {
        visible: true,
        color: "#1f1f1f",
      },
      textColor: "#fff",
      showLastValue: "All",
      crosshair: {
        enabled: true,
        showValue: true,
        color: "#494949",
        dashStyle: "Solid",
        snap: false,
      },
      preventLabelOverlap: false,
      maxPadding: 0.1,
      snapAnnotationsToPrices: true,
    },
    annotationTraits: {
      line: {
        width: 1,
        color: "#888",
        dashStyle: "Solid",
      },
      fill: {
        color: "rgba(136,136,136,0.3)",
      },
      zIndex: 8,
    },
  },
  panes: [
    {
      axes: [
        {
          plots: [
            {
              curves: [
                {
                  attributes: ["ChangeBased"],
                  colors: ["#b63400", "#007f3e", "#1664db", "#333", "#777"],
                  fields: ["Open", "High", "Low", "Close", "Change"],
                  style: "Candlestick",
                  varyColorPerBar: true,
                  lineWidth: 1,
                },
              ],
              main: true,
              symbol: "PLACEHOLDER",
              type: "Symbol",
              showPrevious: false,
              events: {
                earnings: {
                  show: true,
                },
              },
            },
          ],
          comparison: "None",
          scale: "Linear",
        },
      ],
      height: 4,
    },
    {
      axes: [
        {
          plots: [
            {
              type: "Study",
              study: "VOL",
            },
          ],
        },
      ],
    },
  ],
  version: 21,
};
