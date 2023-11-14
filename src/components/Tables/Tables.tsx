/**
 * Building blocks for tables
 * If you need to see usage examples, please check out
 * src/components-cryptos/CryptosTable/CryptosTable.tsx
 */

import clsx from "clsx";
import {
  Cell as CellAria,
  Column,
  Row as RowAria,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";
import isOdd from "~/src/utils/isOdd";

type BaseProps = {
  children: React.ReactNode;
};

const Root = (props: BaseProps & { label: string }) => (
  <div className="overflow-x-scroll w-full">
    <Table aria-label={props.label} className="w-full">
      {props.children}
    </Table>
  </div>
);

const Header = (props: BaseProps) => (
  <TableHeader>{props.children}</TableHeader>
);

const ColumnHeader = (
  props: BaseProps & { isRowHeader?: boolean; index: number },
) => (
  <Column
    className={clsx(
      props.index !== 1
        ? clsx("text-right relative")
        : clsx("text-left sticky left-0 w-[146px] bg-white z-20"),
    )}
    isRowHeader
  >
    <div
      className={clsx(
        "py-2",
        props.index !== 1
          ? clsx("")
          : clsx(
              "absolute z-20 left-0 top-0 h-full w-full",
              "shadow-[rgba(0,0,15,0.075)_2px_0px_4px_0px] md:shadow-noshadow",
              "flex items-center px-3",
            ),
      )}
    >
      {props.children}
    </div>
  </Column>
);

const Body = (props: BaseProps) => <TableBody>{props.children}</TableBody>;

const Row = (props: BaseProps & { index: number }) => (
  <RowAria
    className={clsx(
      "h-14 relative",
      !isOdd(props.index) ? "bg-neutral-100" : "bg-white",
    )}
  >
    {props.children}
  </RowAria>
);

const RowLabelCell = (props: BaseProps & { index: number }) => (
  <CellAria
    className={clsx(
      "sticky z-20 left-0",
      "h-14 w-[146px]",
      "flex items-center",
      "shadow-[rgba(0,0,15,0.075)_2px_0px_4px_0px] md:shadow-noshadow",
      !isOdd(props.index) ? "bg-neutral-100" : "bg-white",
    )}
  >
    {props.children}
  </CellAria>
);

const NumberCell = (props: BaseProps) => (
  <CellAria className="text-right px-2">{props.children}</CellAria>
);

export { Root, Header, ColumnHeader, Body, Row, RowLabelCell, NumberCell };
