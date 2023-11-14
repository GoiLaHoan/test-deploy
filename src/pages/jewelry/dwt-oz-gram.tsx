import React from "react";
import cs from "~/src/utils/cs";
import styles from "./dwt-oz-gram.module.scss";

import AdvertBlock from "~/src/components/AdvertBlock/AdvertBlock";
import DwtOzGramConverter from "~/src/components/DwtOzGramConverter/DwtOzGramConverter";
import DwtOzGramReferenceTable from "~/src/components/DwtOzGramReferenceTable/DwtOzGramReferenceTable";
import Layout from "~/src/components/Layout/Layout";
import PlaceholderBlock from "~/src/components/PlaceholderBlock/PlaceholderBlock";

const DwtOzGram = () => {
  return (
    <Layout title={"Jeweler Resources - DWT/Oz/Gram Conversion"}>
      <div className={styles.container}>
        <main className={styles.main}>
          <section className={cs([styles.block, styles.converter])}>
            <DwtOzGramConverter />
          </section>
          <h3 className={styles.tableTitle}>Reference table</h3>
          <section className={cs([styles.block, styles.referenceTable])}>
            <DwtOzGramReferenceTable from={10} to={330} />
            <DwtOzGramReferenceTable from={340} to={660} />
          </section>
        </main>
        <aside>
          <div className={styles.block}>
            <AdvertBlock />
          </div>
          <div className={styles.block}>
            <PlaceholderBlock />
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default DwtOzGram;
