import { CurrencySelect } from "../CurrencySelect/CurrencySelect";

import { Socials } from "~/src/components/socials/Socials";
import styles from "./CommodityTitle.module.scss";

interface Props {
  commodity: string;
}

const CommodityTitle = ({ commodity }: Props) => {
  return (
    <div>
      <h1 className="text-4xl capitalize font-bold">{commodity} Price Today</h1>
      <div className={styles.mainTitleFlexSb}>
        <CurrencySelect classNamesListbox={styles.listbox} />
        <Socials
          email={""}
          facebook={"kitco"}
          linkedIn={"kitco"}
          twitter={"kitco"}
        />
      </div>
    </div>
  );
};

export default CommodityTitle;
