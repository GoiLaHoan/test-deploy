import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

const NewsMeta: FC<{
  title?: string;
  description?: string;
  image?: string;
  authorTwitter?: string;
}> = ({ title, description, image, authorTwitter }) => {
  const { asPath } = useRouter();

  const defaultTitle =
    "Latest News, Video News, Analysis and Opinions | KITCO NEWS";
  const defaultDescription =
    "The Kitco News Team brings you the latest news, videos, analysis and opinions regarding Precious Metals, Crypto, Mining, World Markets and Global Economy.";
  const defaultImage = "/fallbacks/ktc_img_fallback_lg.jpg";

  return (
    <Head>
      <meta
        name="description"
        content={description ? description : defaultDescription}
      />
      <meta
        name="keywords"
        content="Kitco news,Gold,Silver,Platinum,Palladium,PGM,Platinum Group Metals,Metals,Precious Metals,Mining News,Crypto News,Bitcoin News,Ethereum News,Mining News,Interviews,Economic Reports,Forecasts,Central Banks,US Dollar,Charts,Tech Metals,Rare Earth Metals,Currency,Global Economy,International Policy,Politics,Bank Forecasts,Market Nugget,Mining Minutes,Roundups"
      />
      <meta property="og:url" content={asPath} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title ? title : defaultTitle} />
      <meta
        property="og:description"
        content={description ? description : defaultDescription}
      />
      <meta property="og:image" content={image ? image : defaultImage} />
      <meta name="twitter:title" content={title ? title : defaultTitle} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@KitcoNewsNOW" />
      {authorTwitter ? (
        <meta name="twitter:creator" content={"@" + authorTwitter} />
      ) : null}
    </Head>
  );
};

export default NewsMeta;
