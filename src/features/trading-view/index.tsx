import dynamic from "next/dynamic";

export const TradingViewFullFeaturedChartLazy = dynamic(
  async () => {
    try {
      return await import("./trading-view-full-featured-chart.component");
    } catch (err) {
      console.warn(err);
    }
  },
  { ssr: false },
);
