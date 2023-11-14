import { FC } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
  columns: 1 | 2 | 3;
}

const BarchartChartGrid: FC<Props> = ({ children, columns }) => {
  return (
    <div
      className={`mb-8 grid lg:gap-8 lg:grid-cols-${JSON.stringify(
        columns,
      )} sm:grid-cols-1 sm:gap-0`}
    >
      {children}
    </div>
  );
};

export default BarchartChartGrid;
