import { FC } from "react";
import st from "./Table.module.scss";

interface Props {
  title: string;
  /** Children are intended to be TableItems*/
  children: React.ReactNode;
}

const Table: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <header className={st.head}>
        <h3 className={st.txt}>{title}</h3>
      </header>

      <div className="border">{children}</div>
    </div>
  );
};

export default Table;
