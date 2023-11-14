import React from "react";
import { ForexPath, getLinksfromPaths } from "~/src/lib/map-forex-paths";
import {
  FOREX_AUD_PATHS,
  FOREX_BRL_PATHS,
  FOREX_CAD_PATHS,
  FOREX_CHF_PATHS,
  FOREX_CNY_PATHS,
  FOREX_EUR_PATHS,
  FOREX_GBP_PATHS,
  FOREX_HKD_PATHS,
  FOREX_INR_PATHS,
  FOREX_JPY_PATHS,
  FOREX_MXN_PATHS,
  FOREX_RUB_PATHS,
  FOREX_USD_PATHS,
  FOREX_ZAR_PATHS,
} from "~/src/lib/map-forex-paths";
import styles from "./AdditionalForexQuotesBlock.module.scss";

export const AdditionalForexQuotesBlock = () => {
  return (
    <div className={styles.container}>
      <ForexQuotesLinksBlockContainer country={"USA"} paths={FOREX_USD_PATHS} />
      <ForexQuotesLinksBlockContainer country={"AUD"} paths={FOREX_AUD_PATHS} />
      <ForexQuotesLinksBlockContainer country={"GBP"} paths={FOREX_GBP_PATHS} />
      <ForexQuotesLinksBlockContainer country={"CAD"} paths={FOREX_CAD_PATHS} />
      <ForexQuotesLinksBlockContainer country={"CHF"} paths={FOREX_CHF_PATHS} />
      <ForexQuotesLinksBlockContainer country={"EUR"} paths={FOREX_EUR_PATHS} />
      <ForexQuotesLinksBlockContainer country={"JPY"} paths={FOREX_JPY_PATHS} />
      <ForexQuotesLinksBlockContainer country={"CNY"} paths={FOREX_CNY_PATHS} />
      <ForexQuotesLinksBlockContainer country={"HKD"} paths={FOREX_HKD_PATHS} />
      <ForexQuotesLinksBlockContainer country={"BRL"} paths={FOREX_BRL_PATHS} />
      <ForexQuotesLinksBlockContainer country={"INR"} paths={FOREX_INR_PATHS} />
      <ForexQuotesLinksBlockContainer country={"MXN"} paths={FOREX_MXN_PATHS} />
      <ForexQuotesLinksBlockContainer country={"RUB"} paths={FOREX_RUB_PATHS} />
      <ForexQuotesLinksBlockContainer country={"ZAR"} paths={FOREX_ZAR_PATHS} />
    </div>
  );
};

interface Props {
  country: string;
  paths: ForexPath;
}

const ForexQuotesLinksBlockContainer: React.FC<Props> = ({
  country,
  paths,
}) => {
  const links = getLinksfromPaths(paths);

  return <ForexQuotesLinksBlock country={country} links={links} />;
};

interface ForexQuoteLink {
  name: string;
  url: string;
}

const ForexQuotesLinksBlock: React.FC<{
  country: string;
  links: ForexQuoteLink[];
}> = ({ country, links }) => {
  return (
    <div className={styles.containerTwo}>
      <div className={styles.country}>{country}</div>
      <ul>
        {links.map(({ name, url }) => (
          <li key={url} className={styles.listItem}>
            <a href={`/forex/${url}`} className={styles.link}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
