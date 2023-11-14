import React from "react";
import { dwtToGram, dwtToOunce } from "~/src/utils/weight-conversions";
import BasicTable from "../BasicTable/BasicTable";
import styles from "./DwtOzGramReferenceTable.module.scss";

function generateData(from, to) {
  const data = [];
  for (let i = from; i <= to; i += 10) {
    data.push([i, dwtToOunce(i), dwtToGram(i)]);
  }
  return data;
}

interface Props {
  from: number;
  to: number;
}

const DwtOzGramReferenceTable: React.FC<Props> = ({ from, to }) => {
  const data = generateData(from, to);

  return (
    <div className={styles.container}>
      <div className={styles.results}>
        <BasicTable
          headers={["DWT", "OZ", "GRAM"]}
          data={data}
          cellClassName="sm:!p-2.5 !p-1"
        />
      </div>
    </div>
  );
};

export default DwtOzGramReferenceTable;
