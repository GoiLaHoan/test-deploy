import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

// news pages have some 100vh sections
// for background color differentations
// this component wraps the content of each section
export const ContentWrapper: FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "w-full px-6",
        "mx-auto lg:!max-w-[1240px] lg:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
};
