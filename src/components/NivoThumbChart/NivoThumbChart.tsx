import { Timescales } from "~/src/utils/ctxTimestamp";
import priceFormatter from "~/src/utils/priceFormatter";
import { ResponsiveLine } from "@nivo/line";
import currency from "currency.js";
import dayjs from "dayjs";
import React, { type FC } from "react";

// const fakeData = [
//   { x: 23189023, y: 7 },
//   { x: 23189023, y: 5 },
//   { x: 23189023, y: 11 },
//   { x: 23189023, y: 9 },
//   { x: 23189023, y: 12 },
//   { x: 23189023, y: 16 },
//   { x: 23189013, y: 13 },
//   { x: 23189023, y: 13 },
// ]

interface Props {
  data: Array<{ x: number; y: number }>;
  timescale: Timescales;
}

// D3 time formatting https://d3-wiki.readthedocs.io/zh_CN/master/Time-Formatting/
const NivoThumbChart: FC<Props> = ({ data, timescale }) => {
  function getMinY(): number {
    return data?.reduce((min, p) => (p?.y < min ? p?.y : min), data[0]?.y) ?? 0;
  }

  function getMaxY(): number {
    return (
      data?.reduce((max, p) => (p?.y > max ? p?.y : max), data[0]?.y) ?? 20000
    );
  }

  function tickValueManufacturer(): string {
    switch (timescale) {
      case Timescales.FIVE_MIN:
        return "every 30 minutes";
      case Timescales.ONE_HOUR:
        return "every 5 hours";
      case Timescales.ONE_DAY:
        return "every 5 days";
      default:
        break;
    }
  }

  function tickFormatManufacturer(): string {
    switch (timescale) {
      case Timescales.ONE_DAY:
        return "%m-%d";
      default:
        return "%-I:%M";
    }
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <ResponsiveLine
        margin={{ top: 20, right: 20, bottom: 30, left: 55 }}
        animate={true}
        data={[
          {
            id: "Precious metal",
            data: data ?? [],
          },
        ]}
        colors={["#000"]}
        xScale={{
          type: "time",
          format: "%s",
          // useUTC: false,
          // precision: 'minute',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          stacked: false,
          min: getMinY() - 1,
          max: getMaxY() + 1,
        }}
        axisLeft={{
          legendOffset: 12,
          format: (x: number) => currency(x).format(),
          tickValues: 5,
        }}
        axisBottom={{
          // format: '%b %d',
          // legend: 'time scale',
          format: tickFormatManufacturer(),
          tickValues: tickValueManufacturer(),
          tickPadding: 10,
          legendOffset: -12,
        }}
        pointSize={0}
        pointBorderWidth={1}
        // pointBorderColor={{
        // 	from: 'color',
        // 	modifiers: [['darker', 0.3]],
        // }}
        curve="linear"
        useMesh={true}
        enableSlices="x"
        sliceTooltip={({ slice }) => <CustomTooltip slice={slice} />}
      />
    </div>
  );
};

export default NivoThumbChart;

const CustomTooltip = ({ slice }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "9px 12px",
        border: "1px solid #ccc",
      }}
    >
      {/* <h5 className="font-bold uppercase">{name}</h5> */}
      {slice.points.map((point) => (
        <div key={point.id} style={{ padding: "3px 0" }}>
          <h6>
            <strong className="text-gray-600 uppercase">
              {dayjs(point?.data?.x).format("MMM DD, hh:mm A")}
            </strong>
          </h6>
          <h6>
            <strong className="text-base">
              {priceFormatter(point?.data?.y)}
            </strong>
          </h6>
        </div>
      ))}
    </div>
  );
};
