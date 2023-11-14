import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}

const PodcastsMeta: FC<Props> = ({ title, description, keywords }) => {
  const { asPath } = useRouter();

  const defaultTitle =
    "Mining Podcast, Gold Podcast, Silver Podcast, Cryptocurrency Podcast | KITCO";
  const defaultDescription =
    "Kitco Podcasts are available on Google Podcasts and Apple Podcasts. Stay on top of the latest news in the world of precious metals, mining and cryptocurrency.";
  const defaultKeywords =
    "Mining Podcast, Kitco Podcast, Mining Stocks Podcast, Mining News Podcast, Kitco News Podcast, Market News Podcast, Cryptocurrency Podcast, Kitco Audio News, Precious Metals Market Podcast, Gold News Podcast, Gold Podcast, Silver Podcast";

  return (
    <Head>
      <meta name="description" content={description ?? defaultDescription} />
      <meta name="keywords" content={keywords ?? defaultKeywords} />
      <meta property="og:url" content={asPath} />
      <meta property="og:type" content="podcasts" />
      <meta property="og:title" content={title ?? defaultTitle} />
      <meta
        property="og:description"
        content={description ?? defaultDescription}
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Roundtable"
        href="https://feeds.simplecast.com/GrFDbDMP"
      ></link>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS The Metals, Money, and Markets Weekly"
        href="https://feeds.simplecast.com/Njt3P_Vc"
      ></link>
    </Head>
  );
};

export default PodcastsMeta;
