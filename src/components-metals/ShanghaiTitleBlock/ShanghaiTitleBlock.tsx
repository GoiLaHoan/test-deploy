import styles from "./ShanghaiTitleBlock.module.scss";

const ShanghaiTitleBlock = () => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <h1 className="text-4xl font-semibold text-gray-800">
          Shanghai Gold Exchange
        </h1>
        <h3 className="text-lg text-gray-700">
          Shanghai Daily Gold Benchmark Historical Prices
        </h3>
      </div>
      <p className={styles.about}>
        The Shanghai Gold Benchmark Price, or Shanghai Gold Fix, is the result
        of an auction held twice daily on trading days by the Shanghai Gold
        Exchange (SGE), at 10:15 am and 2:15 pm, Beijing Time. Intended to
        represent a price where supply and demand reach a balance, the benchmark
        is quoted in RMB per gram, and based on the auction of physical lots of
        1 kilogram of gold, with a purity of 99.99% or higher, to be delivered
        in the form of standard gold ingots to certified SGE vault facilities.
      </p>
      <p className={styles.about}>
        The value in other currencies as calculated by Kitco, is based on the
        midpoint between bid and ask of the different exchanges at the time of
        each auction. The currency and conversion in other units of measure are
        for convenience purposes only and not official SGE indicators. The
        official benchmark is quoted in RMB per gram.
      </p>
    </div>
  );
};

export default ShanghaiTitleBlock;
