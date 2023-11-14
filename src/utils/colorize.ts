import cs from "./cs";
import isNegative from "./isNegative";

import styles from "~/src/styles/text.module.scss";

const colorize = (n: number) => {
  if (isNegative(n)) {
    return cs([styles.colorRed, styles.bold]);
  }
  return cs([styles.colorGreen, styles.bold]);
};

export default colorize;
