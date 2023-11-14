import React from "react";
import styles from "./AdvertBlock.module.scss";

const AdvertBlock: React.FC = () => {
  return (
    <div>
      <span className={styles.note}>Sponsored Content</span>
      <div className={styles.advert}>ADVERT</div>
    </div>
  );
};

export default AdvertBlock;
