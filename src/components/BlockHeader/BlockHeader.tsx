import React from "react";
import styles from "./BlockHeader.module.scss";

interface Props {
  title: string;
}

const BlockHeader: React.FC<Props> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h3 className="font-semibold capitalize text-lg">{title}</h3>
    </header>
  );
};

export default BlockHeader;
