import React from "react";
import styles from "./ForexPageTitle.module.scss";

interface Props {
  title: string;
  subtitle?: string;
}

const ForexPageTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default ForexPageTitle;
