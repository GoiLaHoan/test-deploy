import { FC } from "react";
import styles from "~/src/styles/pages/maintenance-page.module.scss";

const Maintenance: FC<any> = () => {
  return (
    <main className={styles.wrapItUp}>
      <div>
        <img
          src="/logo_kitco.png"
          alt="Kitco"
          className={styles.howToCenterAnElementStackoverflow}
        />
        <h1 className={styles.标题}>Down for Maintenance.</h1>
        <br />
        <div className={styles.spinner}>
          <img src="/haha-gold.png" alt="Maintenance gold for days" />
        </div>
      </div>
    </main>
  );
};

export default Maintenance;
