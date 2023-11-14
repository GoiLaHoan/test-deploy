import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import currency from "currency.js";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  scales: {},
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export type ChartData = {
  labels: number[];
  values: number[];
};

export function CanvasChart({ data, scale }) {
  const calcSuggestedMax = () => {
    if (data?.values?.length) {
      const vals = data.values.filter((v) => v > 0);
      const maxNumber: number = Math.max(...vals) * 1.003;
      return maxNumber;
    }
    return;
  };

  const calcSuggestedMin = () => {
    if (data?.values?.length) {
      const vals = data.values.filter((v) => v > 0);
      const minNumber: number = Math.min(...vals) * 0.997;
      return minNumber;
    }
    return;
  };

  return (
    <Line
      options={{
        responsive: true,
        interaction: {
          mode: "nearest",
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            displayColors: false,
            callbacks: {
              // this is the dollar value in the tooltip
              label: (c) => `${c.formattedValue}`,
              title: ([item]) => {
                item.formattedValue = currency(item.raw as number, {
                  symbol: "",
                }).format();
                const prevLabel = JSON.parse(item.label);
                item.label = dayjs.unix(prevLabel).format("MM/DD h:mm A");
                return;
              },
            },
          },
        },
        scales: {
          y: {
            suggestedMax: calcSuggestedMax(),
            suggestedMin: calcSuggestedMin(),
            position: "right",
            border: { display: false },
            ticks: {
              autoSkipPadding: 6,
              font: { size: 10 },
              callback: (tickValue) =>
                currency(tickValue, { symbol: "" }).format(),
            },
          },
          x: {
            grid: { drawOnChartArea: false },
            ticks: {
              font: { size: 10 },
              minRotation: 0,
              maxRotation: 0,
              align: "start",
              autoSkipPadding: 30,
              callback: (idx) => {
                const label = data?.labels[idx] ?? [];
                if (scale === "5m") {
                  return dayjs.unix(label).format("h:mm");
                }
                return dayjs.unix(label).format("MM/DD");
              },
            },
          },
        },
      }}
      data={{
        labels: data?.labels ?? [],
        datasets: [
          {
            data: data?.values ?? [],
            fill: false,
            borderColor: (c) => {
              const idx = c.dataIndex;
              const isDown = data?.values?.[idx] < data?.values?.[idx - 1];
              return isDown ? "rgb(222, 51, 29)" : "rgb(25, 182, 130)";
            },
            pointRadius: 0, // this disables dots on the line
            tension: 0.7, // give line curves
            borderWidth: 2,
          },
        ],
      }}
    />
  );
}
