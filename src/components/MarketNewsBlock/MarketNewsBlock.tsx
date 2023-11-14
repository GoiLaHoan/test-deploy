import React from "react";
import styles from "./MarketNewsBlock.module.scss";

const MarketNewsBlock = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.title}>Market News</h3>
      </header>
      <div className={styles.controls}>
        <input type="text" placeholder={"Search News"} />
        <select>
          <option>All Markets</option>
          <option>Futures</option>
          <option>Metals</option>
        </select>
      </div>
      <section className={styles.articleList}>
        <article className={styles.articleContainer}>
          <span>15:43</span>
          <p className={styles.articleTitle}>
            <a>
              Wall Street slides to seven-week low on new lockdown fears Wall
              Street slides to seven-week low on new lockdown fears
            </a>{" "}
            - Reuters
          </p>
        </article>
        <div className={styles.divider} />
        <article className={styles.articleContainer}>
          <span>15:43</span>
          <p className={styles.articleTitle}>
            <a>
              Wall Street slides to seven-week low on new lockdown fears Wall
              Street slides to seven-week low on new lockdown fears
            </a>{" "}
            - Reuters
          </p>
        </article>
        <div className={styles.divider} />
        <article className={styles.articleContainer}>
          <span>15:43</span>
          <p className={styles.articleTitle}>
            <a>
              Wall Street slides to seven-week low on new lockdown fears Wall
              Street slides to seven-week low on new lockdown fears
            </a>{" "}
            - Reuters
          </p>
        </article>
        <div className={styles.divider} />
        <article className={styles.articleContainer}>
          <span>15:43</span>
          <p className={styles.articleTitle}>
            <a>
              Wall Street slides to seven-week low on new lockdown fears Wall
              Street slides to seven-week low on new lockdown fears
            </a>{" "}
            - Reuters
          </p>
        </article>
        <div className={styles.divider} />
      </section>
    </div>
  );
};

export default MarketNewsBlock;
