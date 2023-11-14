import React, { useState } from "react";
import {
  dwtToGram,
  dwtToOunce,
  gramToDwt,
  gramToOz,
  ozToDwt,
  ozToGram,
  renderNumberSafely,
} from "~/src/utils/weight-conversions";
import BasicTable from "../BasicTable/BasicTable";
import styles from "./DwtOzGramConverter.module.scss";

enum ConversionType {
  DWT,
  OZ,
  GRAM,
}

const DwtOzGramConverter = () => {
  const [type, setType] = useState<ConversionType>(ConversionType.DWT);
  const [value, setValue] = useState<string>("-");

  const calculateResult = () => {
    let DWT = "-";
    let OZ = "-";
    let GRAM = "-";

    switch (type) {
      case ConversionType.DWT:
        DWT = renderNumberSafely(value);
        OZ = dwtToOunce(value);
        GRAM = dwtToGram(value);
        break;
      case ConversionType.OZ:
        DWT = ozToDwt(value);
        OZ = renderNumberSafely(value);
        GRAM = ozToGram(value);
        break;
      case ConversionType.GRAM:
        DWT = gramToDwt(value);
        OZ = gramToOz(value);
        GRAM = renderNumberSafely(value);
        break;
    }

    return (
      <BasicTable
        headers={["DWT", "OZ", "GRAM"]}
        data={[[DWT, OZ, GRAM]]}
        cellClassName="sm:!p-2.5 !p-1"
      />
    );
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Pennyweight to Ounces to Grams Conversion Calculator
      </h3>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <input
            name={"type"}
            type={"radio"}
            id="dwt"
            value={ConversionType.DWT}
            checked={type === ConversionType.DWT}
            onChange={() => setType(ConversionType.DWT)}
            className={styles.inputRadio}
          />
          <label htmlFor="dwt">DWT</label>
        </div>
        <div className={styles.controlGroup}>
          <input
            name={"type"}
            type={"radio"}
            id="oz"
            value={ConversionType.OZ}
            checked={type === ConversionType.OZ}
            onChange={() => setType(ConversionType.OZ)}
            className={styles.inputRadio}
          />
          <label htmlFor="oz">OZ</label>
        </div>
        <div className={styles.controlGroup}>
          <input
            name={"type"}
            type={"radio"}
            id="gram"
            value={ConversionType.GRAM}
            checked={type === ConversionType.GRAM}
            onChange={() => setType(ConversionType.GRAM)}
            className={styles.inputRadio}
          />
          <label htmlFor="gram">GRAM</label>
        </div>
      </div>
      <div className={styles.valueInput}>
        <input
          className={styles.input}
          type={"number"}
          value={value}
          placeholder={"Enter a value to convert"}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className={styles.results}>{calculateResult()}</div>
    </div>
  );
};

export default DwtOzGramConverter;
