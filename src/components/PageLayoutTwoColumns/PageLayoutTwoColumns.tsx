import { FC } from "react";

const PageLayoutTwoColumns: FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return (
    <div className="px-4 grid gap-8 lg:grid-cols-layout-2 lg:px-0 sm:grid-cols-1">
      {children}
    </div>
  );
};

export default PageLayoutTwoColumns;
