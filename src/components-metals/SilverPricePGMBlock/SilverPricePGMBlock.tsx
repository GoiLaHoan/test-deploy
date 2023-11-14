import type { SilverPgmQuery } from "~/src/generated";

import colorize from "~/src/utils/colorize";
import Link from "next/link";
import React from "react";
import cs from "~/src/utils/cs";
import BlockShell from "~/src/components/BlockShell/BlockShell";
import styles from "./SilverPricePGMBlock.module.scss";
import dates from "~/src/utils/dates";
import currency from "currency.js";

interface Props {
  data: SilverPgmQuery;
}

const SilverPricePGMBlock: React.FC<Props> = ({ data }) => {
  const silver = data?.silver?.results[0];
  const platinum = data?.platinum?.results[0];
  const palladium = data?.palladium?.results[0];
  const rhodium = data?.rhodium?.results[0];

  return (
    <BlockShell title={"Silver Price & PGMs"}>
      <div className={styles.intro}>
        <div>
          <time className="font-bold text-xs">{dates.dayTime()} NY Time</time>
        </div>
        <Link className={styles.link} href="/fix">
          Kitco 10AM Silver Fix
        </Link>
      </div>
      <div className={styles.table}>
        <div className={cs([styles.tableRow, styles.odd])}>
          <div>Silver</div>
          <div className="text-right">{currency(silver?.bid).format()}</div>
          <div className={colorize(silver?.change)}>
            {currency(silver?.change).format()}
          </div>
        </div>
        <div className={cs([styles.tableRow])}>
          <div>Platinum</div>
          <div>{currency(platinum?.bid).format()}</div>
          <div className={colorize(platinum?.change)}>
            {currency(platinum?.change).format()}
          </div>
        </div>
        <div className={cs([styles.tableRow, styles.odd])}>
          <div>Palladium</div>
          <div>{currency(palladium?.bid).format()}</div>
          <div className={colorize(palladium?.change)}>
            {currency(platinum?.change).format()}
          </div>
        </div>
        <div className={cs([styles.tableRow])}>
          <div>Rhodium</div>
          <div>{currency(rhodium?.bid).format()}</div>
          <div className={colorize(rhodium?.change)}>
            {currency(data?.rhodium?.results?.[0]?.change).format()}
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <small>Click on the metal names to see the associated charts</small>
      </footer>
    </BlockShell>
  );
};

export default SilverPricePGMBlock;
