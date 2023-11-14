import Icon from "../../Icon/Icon";

import styles from "./MobileFooter.module.scss";

const MobileFooter = () => {
  const iconProps = {
    strokeWidth: "0",
    color: "#333",
    size: "18px",
  };
  return (
    <div className={styles.wrapper}>
      <h3>Follow Kitco</h3>
      <ul className={styles.shareItemsContainer}>
        <li className={styles.shareItem}>
          <Icon icon="facebook" fill={true} margin="0 2px 0 0" {...iconProps} />
        </li>
        <li className={styles.shareItem}>
          <Icon
            icon="twitter"
            fill={true}
            margin="2px 0 0 2px"
            {...iconProps}
          />
        </li>
        <li className={styles.shareItem}>
          <Icon icon="mail" fill={false} strokeWidth="2px" size="18px" />
        </li>
      </ul>
    </div>
  );
};

export default MobileFooter;
