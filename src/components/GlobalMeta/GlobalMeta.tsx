import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
}

const GlobalMeta: FC<Props> = ({ title, description, keywords, type }) => {
  const { asPath } = useRouter();

  const defaultTitle =
    "Aggregated financial and geopolitical stories from the world | KITCO";
  const defaultDescription =
    "Kitco  News  collects  and  features  the  top  financial, economic, and geopolitical news from around the world.";
  const defaultKeywords =
    "KITCO News, Newswire, Off the Wire, Aggregated News, World News, Financial News, Global Economy, International Policy, Politics";

  const defaultType = "off-the-wire";
  return (
    <Head>
      <meta name="description" content={description ?? defaultDescription} />
      <meta name="keywords" content={keywords ?? defaultKeywords} />
      <meta property="og:url" content={asPath} />
      <meta property="og:type" content={type ?? defaultType} />
      <meta property="og:title" content={title ?? defaultTitle} />
      <meta
        property="og:description"
        content={description ?? defaultDescription}
      />
    </Head>
  );
};

export default GlobalMeta;
