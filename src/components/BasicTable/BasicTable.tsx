import React from "react";
import cs from "~/src/utils/cs";
import styles from "./BasicTable.module.scss";

interface Props {
  headers: string[];
  data;
  headerClassName?: string;
  cellClassName?: string;
}

const BasicTable: React.FC<Props> = ({
  headers,
  data,
  headerClassName,
  cellClassName,
}) => {
  return (
    <div className={styles.container}>
      <div
        className={cs([styles.row, styles.header, headerClassName])}
        style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
      >
        {headers.map((header) => (
          <div
            key={header}
            className={cs([cellClassName, styles.cell])}
            dangerouslySetInnerHTML={{ __html: header }}
          ></div>
        ))}
      </div>
      {data.map((item: any, index: number) => (
        <div
          key={item}
          className={cs([
            "bg-white",
            styles.row,
            index % 2 !== 0 && styles.odd,
          ])}
          style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
        >
          {item.map((value, index) => (
            <div
              key={value + index}
              className={cs([cellClassName, styles.cell])}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BasicTable;

export const BasicTableTwo: React.FC<Props> = ({ headers, data }) => {
  return (
    <div className={styles.containerTableTwo}>
      <div
        className={cs([styles.row, styles.header])}
        style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
      >
        {headers.map((header) => (
          <div key={header} className={styles.cell}>
            {header}
          </div>
        ))}
      </div>
      {data.map((item: any, index: number) => (
        <div
          key={item}
          className={cs([
            styles.row,
            index % 2 !== 0 ? styles.odd : styles.even,
          ])}
          style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
        >
          {item.map((value, index) => (
            <div
              key={value + index}
              className={cs([
                styles.cell,
                value === "1.00" ? styles.colorRed : "",
              ])}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
