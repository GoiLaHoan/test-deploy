import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  nameChart: string;
}

const ChartsMeta: FC<Props> = ({ nameChart }) => {
  const { asPath } = useRouter();

  const defaultTitle = `${nameChart} Price Today | Price of ${nameChart} Per Ounce | 24 Hour Spot Chart | KITCO`;
  const defaultDescription = `Live ${nameChart} Charts and ${nameChart} Spot Price from International ${nameChart} Markets, Prices from New York, London, Hong Kong and Sydney provided by Kitco.`;
  const defaultKeywords = `KITCO ${nameChart}, Live ${nameChart} Prices, 24-hour ${nameChart} Chart, New York Spot ${nameChart} Chart, Live ${nameChart} Chart, ${nameChart} Market Trends, Precious Metals, Investing, Commodities, ${nameChart} Spot Price, ${nameChart} Historical Performance, Real-time ${nameChart} Price.`;

  return (
    <Head>
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content={defaultKeywords} />
      <meta property="og:url" content={asPath} />
      <meta property="og:type" content="charts" />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta name="twitter:title" content={defaultTitle} />
    </Head>
  );
};

export default ChartsMeta;
